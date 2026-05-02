/* build.js — 把旧 quizzes + newpool 混合分到 15 套 × 20 题，重写 quizzes.js
   用法：node build.js
*/
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const oldSrc = fs.readFileSync(path.join(ROOT, "quizzes.js"), "utf8");
const newSrc = fs.readFileSync(path.join(ROOT, "_newpool_raw.js"), "utf8");

// ---- 加载旧题 ----
const ctx1 = {};
vm.createContext(ctx1);
vm.runInContext(oldSrc + "\nthis._Q = QUIZZES;", ctx1);
const OLD = ctx1._Q;

// ---- 加载新池 ----
const ctx2 = { module: { exports: null } };
vm.createContext(ctx2);
vm.runInContext(newSrc, ctx2);
const NEW = ctx2.module.exports;

// ---- 主题推断 ----
function inferTopic(qstr) {
  const s = qstr || "";
  if (/RSA|公钥|私钥|公私钥|加密.*解密|解密.*加密|m\^e|c\^d/i.test(s)) return "rsa";
  if (/Karnaugh|K-?map|K-?表/i.test(s)) return "karnaugh";
  if (/Beth|α 规则|β 规则|β-|α-|tableau|展开|分支|支闭|闭支|重言式/i.test(s)) return "beth";
  if (/IEEE|浮点|尾数|偏置|bias|denormal|非规约|NaN|\\pm\\infty|\$2\^\{-?\d+/i.test(s)) return "float";
  if (/CA2|补码|溢出|符号扩展/i.test(s)) return "ca2";
  if (/CRT|Bézout|Bezout|\\gcd|gcd|lcm|素数|整除/i.test(s)) return "numtheory";
  if (/\\varphi|欧拉|费马|\\bmod|\\pmod|模 \d|逆元|\\mathbb Z_/i.test(s)) return "modular";
  if (/De Morgan|布尔|FND|FNC|化简|\\overline|析取|合取|吸收/i.test(s)) return "boolean";
  if (/二进制|十六进制|八进制|base|进制|_\{2\}|_\{16\}|_\{8\}|_\{10\}/i.test(s)) return "base";
  return "boolean"; // 默认
}

// ---- 收集旧题（去掉旧 id, 加 topic）----
const rawPool = [];
for (const sim of OLD) {
  for (const q of sim.questions) {
    rawPool.push({
      type: q.type, points: q.points || 2, q: q.q,
      options: q.options, answer: q.answer, explain: q.explain || "",
      topic: q.topic || inferTopic(q.q),
      _src: "old:" + sim.id,
    });
  }
}

// ---- 校验并加入新题 ----
let dropped = 0;
for (const q of NEW) {
  // 类型校验
  if (q.type === "mcq") {
    if (typeof q.answer !== "number" || !Array.isArray(q.options)) { dropped++; continue; }
    if (q.answer < 0 || q.answer >= q.options.length) { dropped++; continue; }
  } else if (q.type === "mcq-multi") {
    if (!Array.isArray(q.answer) || !Array.isArray(q.options)) { dropped++; continue; }
    if (q.answer.some(i => i < 0 || i >= q.options.length)) { dropped++; continue; }
  } else if (q.type === "judge") {
    if (typeof q.answer !== "boolean") { dropped++; continue; }
  } else if (q.type === "fill" || q.type === "subjective") {
    if (typeof q.answer !== "string") { dropped++; continue; }
  } else { dropped++; continue; }
  rawPool.push({
    type: q.type, points: q.points || 2, q: q.q,
    options: q.options, answer: q.answer, explain: q.explain || "",
    topic: q.topic || inferTopic(q.q),
    _src: "new",
  });
}

function questionKey(q) {
  return String(q.q || "").replace(/\s+/g, " ").trim();
}

function shouldDropQuestion(q) {
  const text = `${q.q || ""}\n${q.answer || ""}\n${q.explain || ""}`;
  const prompt = String(q.q || "");
  if (/^\s*续上/.test(prompt)) return true;
  if (/⚠️.*4x\s*\\equiv\s*8/.test(prompt)) return true;
  if (/\$53\.82\$\s*既约分数/.test(prompt)) return true;
  if (/CRT[：:]/.test(prompt)) return true;
  if (/素数无穷多|模 \$17\$ 的阶|\\text\{lcm\}|欧拉函数 \$\\varphi\(30\)|\$3\^\{2024\}|从 3 个密文恢复/.test(text)) return true;
  return false;
}

let filtered = 0, deduped = 0;
const pool = [];
const seen = new Set();
for (const q of rawPool.sort((a, b) => (a._src === "new" ? 0 : 1) - (b._src === "new" ? 0 : 1))) {
  if (shouldDropQuestion(q)) { filtered++; continue; }
  const key = questionKey(q);
  if (!key || seen.has(key)) { deduped++; continue; }
  seen.add(key);
  pool.push(q);
}

console.log(`总池: ${pool.length} 题可用 (原始 ${rawPool.length}, 丢弃格式错误 ${dropped}, 过滤 ${filtered}, 去重 ${deduped})`);

// ---- 按主题桶 ----
const buckets = {};
for (const q of pool) {
  (buckets[q.topic] = buckets[q.topic] || []).push(q);
}
console.log("各主题题数:");
for (const t of Object.keys(buckets).sort()) {
  console.log(`  ${t}: ${buckets[t].length}`);
}

// 确定性洗牌（基于种子）
function shuffle(arr, seed) {
  let s = seed;
  const rng = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x100000000; };
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 每个 bucket 内打乱；同题型优先使用人工整理的新题，再用旧题补足。
const topics = Object.keys(buckets).sort();
for (const t of topics) {
  const mixed = shuffle(buckets[t], t.charCodeAt(0) * 31 + t.length);
  buckets[t] = mixed.filter(q => q._src === "new").concat(mixed.filter(q => q._src !== "new"));
}

// ---- 分配：15 套 × 20 题，按 CC3 方法能力配比 ----
const NUM_SIMS = 15, PER_SIM = 20;
const sims = Array.from({ length: NUM_SIMS }, () => []);
const idxByTopic = Object.fromEntries(topics.map(t => [t, 0]));

const TOPIC_PLAN = [
  "base", "base",
  "ca2", "ca2",
  "float", "float",
  "boolean", "boolean", "boolean", "boolean",
  "beth", "beth",
  "karnaugh", "karnaugh",
  "rsa", "rsa", "rsa",
  "modular", "modular", "modular",
];
const FALLBACK_TOPICS = ["boolean", "beth", "karnaugh", "rsa", "modular", "base", "ca2", "float", "numtheory"];

function takeFromTopic(topic) {
  const bucket = buckets[topic];
  if (!bucket) return null;
  const idx = idxByTopic[topic] || 0;
  if (idx >= bucket.length) return null;
  idxByTopic[topic] = idx + 1;
  return bucket[idx];
}

function takeFallback(preferredTopic) {
  const order = [preferredTopic].concat(FALLBACK_TOPICS.filter(t => t !== preferredTopic));
  for (const topic of order) {
    const q = takeFromTopic(topic);
    if (q) return q;
  }
  return null;
}

for (let i = 0; i < NUM_SIMS; i++) {
  const plan = shuffle(TOPIC_PLAN, 20260503 + i * 101);
  for (const topic of plan) {
    const q = takeFromTopic(topic) || takeFallback(topic);
    if (q) sims[i].push(q);
  }
}

// 每个 sim 内打乱顺序，保证体验
for (let i = 0; i < NUM_SIMS; i++) {
  sims[i] = shuffle(sims[i], 9973 + i * 17);
  // 截到 PER_SIM
  if (sims[i].length > PER_SIM) sims[i] = sims[i].slice(0, PER_SIM);
}
const counts = sims.map(s => s.length);
console.log("各 sim 题数:", counts.join(", "));

// ---- 生成 quizzes.js 文本 ----
function jsStr(s) {
  // 单行 JS 字符串字面量 (使用反引号避免转义地狱)
  return "`" + String(s).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";
}
function jsValue(v) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  if (typeof v === "string") return jsStr(v);
  if (Array.isArray(v)) return "[" + v.map(jsValue).join(", ") + "]";
  return JSON.stringify(v);
}
function renderQuestion(q, idx) {
  const lines = [
    `      type: ${jsStr(q.type)}`,
    `      points: ${q.points}`,
    `      topic: ${jsStr(q.topic)}`,
    `      q: ${jsValue(q.q)}`,
  ];
  if (q.options) lines.push(`      options: ${jsValue(q.options)}`);
  lines.push(`      answer: ${jsValue(q.answer)}`);
  lines.push(`      explain: ${jsValue(q.explain)}`);
  return `    {\n      id: "q${idx + 1}",\n${lines.join(",\n")}\n    }`;
}

const out = [];
out.push(`/* =====================================================`);
out.push(`   QUIZZES — 15 套混合卷 × 20 题（自动生成于 build.js）`);
out.push(`   每套涵盖多主题：base / ca2 / float / boolean / karnaugh / beth / modular / rsa / numtheory`);
out.push(`   ===================================================== */`);
out.push(``);
out.push(`const QUIZZES = [`);
for (let i = 0; i < NUM_SIMS; i++) {
  const idStr = String(i + 1).padStart(2, "0");
  const totalPts = sims[i].reduce((s, q) => s + (q.points || 2), 0);
  out.push(`  {`);
  out.push(`    id: "sim${idStr}",`);
  out.push(`    title: "Sim CC3 — ${idStr} (混合 / ${sims[i].length} 题 / ${totalPts} 分)",`);
  out.push(`    duration: 90,`);
  out.push(`    difficulty: 3,`);
  out.push(`    category: "CC3 混合",`);
  out.push(`    questions: [`);
  out.push(sims[i].map(renderQuestion).join(",\n"));
  out.push(`    ]`);
  out.push(`  }${i === NUM_SIMS - 1 ? "" : ","}`);
}
out.push(`];`);
out.push(``);
out.push(`if (typeof module !== "undefined") module.exports = QUIZZES;`);
out.push(``);

fs.writeFileSync(path.join(ROOT, "quizzes.js"), out.join("\n"));
console.log("✓ quizzes.js 已生成");

// 验证
const ctx3 = {};
vm.createContext(ctx3);
vm.runInContext(out.join("\n") + "\nthis.QUIZZES = QUIZZES;", ctx3);
console.log("✓ 校验通过：", ctx3.QUIZZES.length, "套，", ctx3.QUIZZES.reduce((s, q) => s + q.questions.length, 0), "题");
