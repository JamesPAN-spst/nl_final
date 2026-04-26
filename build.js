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
const pool = [];
for (const sim of OLD) {
  for (const q of sim.questions) {
    pool.push({
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
  pool.push({
    type: q.type, points: q.points || 2, q: q.q,
    options: q.options, answer: q.answer, explain: q.explain || "",
    topic: q.topic || inferTopic(q.q),
    _src: "new",
  });
}

console.log(`总池: ${pool.length} 题 (旧+新), 丢弃 ${dropped} 道格式错误的新题`);

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

// 每个 bucket 内打乱
const topics = Object.keys(buckets).sort();
for (const t of topics) buckets[t] = shuffle(buckets[t], t.charCodeAt(0) * 31 + t.length);

// ---- 分配：15 套 × 20 题，主题轮转保证均衡 ----
const NUM_SIMS = 15, PER_SIM = 20;
const sims = Array.from({ length: NUM_SIMS }, () => []);

// 全局 round-robin：把所有题一道道分到 sim[0..14]，按主题轮转挑题
const flatten = [];
let cursor = 0;
const idxByTopic = Object.fromEntries(topics.map(t => [t, 0]));
const totalNeeded = NUM_SIMS * PER_SIM;
while (flatten.length < totalNeeded) {
  const t = topics[cursor % topics.length]; cursor++;
  if (idxByTopic[t] < buckets[t].length) {
    flatten.push(buckets[t][idxByTopic[t]++]);
  }
  // 若所有桶耗尽，跳出
  if (topics.every(tt => idxByTopic[tt] >= buckets[tt].length)) break;
}
console.log(`分配前题数: ${flatten.length}, 需要: ${totalNeeded}`);

// 分配到 sim：用"蛇形"使难度更均衡
let simIdx = 0, dir = 1;
for (let k = 0; k < flatten.length; k++) {
  sims[simIdx].push(flatten[k]);
  simIdx += dir;
  if (simIdx === NUM_SIMS) { simIdx = NUM_SIMS - 1; dir = -1; }
  else if (simIdx === -1) { simIdx = 0; dir = 1; }
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
vm.runInContext(out.join("\n"), ctx3);
console.log("✓ 校验通过：", ctx3.QUIZZES.length, "套，", ctx3.QUIZZES.reduce((s, q) => s + q.questions.length, 0), "题");
