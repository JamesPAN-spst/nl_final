/* =====================================================
   APP — 路由 + 答题逻辑 + 计分 + 持久化
   ===================================================== */

const STORAGE_KEY = "nl_quiz_state_v1";

/* ---------- 状态 ---------- */
let state = {
  history: [],          // [{quizId, score, total, date, answers, wrongIds}]
  currentQuiz: null,    // 正在做的 quiz
  answers: {},          // qId -> 用户答案
  startTime: null,
  timerInterval: null,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.history = parsed.history || [];
    }
  } catch (e) { console.warn("load state failed", e); }
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ history: state.history }));
}

/* ---------- 路由 ---------- */
const app = document.getElementById("app");

function setActive(navId) {
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  if (navId) document.getElementById(navId).classList.add("active");
}

function go(view, ...args) {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
  app.innerHTML = "";
  views[view](...args);
  // 重渲染数学
  if (window.renderMathInElement) {
    setTimeout(() => renderMathInElement(app, {
      delimiters: [{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]
    }), 30);
  }
}

document.getElementById("nav-home").onclick = () => { setActive("nav-home"); go("home"); };
document.getElementById("nav-stats").onclick = () => { setActive("nav-stats"); go("stats"); };
document.getElementById("nav-review").onclick = () => { setActive("nav-review"); go("review"); };
document.getElementById("nav-notes").onclick = () => { setActive("nav-notes"); go("notes"); };

/* ---------- 视图 ---------- */
const views = {};

views.home = () => {
  const grid = document.createElement("div");
  grid.className = "quiz-grid";
  QUIZZES.forEach(q => {
    const lastAttempt = [...state.history].reverse().find(h => h.quizId === q.id);
    const card = document.createElement("div");
    card.className = "quiz-card";
    const dCls = "d" + Math.floor(q.difficulty);
    card.innerHTML = `
      <h3>${q.title}</h3>
      <div class="meta">⏱ ${q.duration} 分钟 · ${q.questions.length} 题</div>
      <div class="meta">分类：${q.category}</div>
      <span class="difficulty ${dCls}">难度 ${q.difficulty}</span>
      ${lastAttempt ? `<div class="progress">上次：${lastAttempt.score}/${lastAttempt.total} 分（${new Date(lastAttempt.date).toLocaleDateString()}）</div>` : ""}
    `;
    card.onclick = () => go("quiz", q.id);
    grid.appendChild(card);
  });

  app.appendChild(makeCard(`
    <h2 style="color:#1f3a68;margin-bottom:8px">📚 模拟试卷列表</h2>
    <p style="color:#666">共 ${QUIZZES.length} 套，覆盖 CC3 标准 / 强陷阱 / Karnaugh 等。点击进入答题。</p>
  `));
  app.appendChild(grid);
};

views.quiz = (quizId) => {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return go("home");

  state.currentQuiz = quiz;
  state.answers = {};
  state.startTime = Date.now();

  const header = document.createElement("div");
  header.className = "quiz-header";
  header.innerHTML = `
    <div>
      <h2>${quiz.title}</h2>
      <small>分类：${quiz.category} · 难度 ${quiz.difficulty}</small>
    </div>
    <div class="timer" id="timer">${formatDuration(quiz.duration * 60)}</div>
  `;
  app.appendChild(header);

  // 倒计时
  let remaining = quiz.duration * 60;
  state.timerInterval = setInterval(() => {
    remaining--;
    const t = document.getElementById("timer");
    if (t) t.textContent = formatDuration(remaining);
    if (remaining <= 0) { clearInterval(state.timerInterval); submitQuiz(); }
  }, 1000);

  // 题目
  quiz.questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "question";
    div.id = "q-" + q.id;
    div.innerHTML = renderQuestion(q, idx);
    app.appendChild(div);
    bindQuestion(q, div);
  });

  // 提交
  const sub = document.createElement("div");
  sub.style.textAlign = "center";
  sub.style.marginTop = "18px";
  sub.innerHTML = `<button class="action success" id="submit-btn">📝 提交并查看讲解</button>
    <button class="action secondary no-print" id="print-btn">🖨️ 打印此卷（PDF）</button>`;
  app.appendChild(sub);
  document.getElementById("submit-btn").onclick = submitQuiz;
  document.getElementById("print-btn").onclick = () => {
    document.body.classList.add("print-mode", "print-questions-only");
    setTimeout(() => { window.print(); document.body.classList.remove("print-mode", "print-questions-only"); }, 200);
  };
};

function renderQuestion(q, idx) {
  let body = "";
  if (q.type === "fill") {
    body = `<input type="text" data-qid="${q.id}" placeholder="输入答案" autocomplete="off">`;
  } else if (q.type === "judge") {
    body = `
      <ul class="options">
        <li data-val="true"><input type="radio" name="${q.id}" value="true"> 正确</li>
        <li data-val="false"><input type="radio" name="${q.id}" value="false"> 错误</li>
      </ul>`;
  } else if (q.type === "mcq") {
    body = `<ul class="options">` +
      q.options.map((o, i) => `<li data-val="${i}"><input type="radio" name="${q.id}" value="${i}"> ${escapeHtml(o)}</li>`).join("") +
      `</ul>`;
  } else if (q.type === "mcq-multi") {
    body = `<ul class="options">` +
      q.options.map((o, i) => `<li data-val="${i}"><input type="checkbox" name="${q.id}" value="${i}"> ${escapeHtml(o)}</li>`).join("") +
      `</ul>`;
  } else if (q.type === "subjective") {
    body = `<textarea data-qid="${q.id}" placeholder="写下你的解答（提交后用参考答案自评）"></textarea>`;
  }
  return `
    <div><span class="q-num">题 ${idx + 1}</span><span class="q-points">${q.points} 分</span></div>
    <div class="q-text">${q.q}</div>
    ${body}
  `;
}

function bindQuestion(q, div) {
  if (q.type === "fill" || q.type === "subjective") {
    const inp = div.querySelector("[data-qid]");
    inp.oninput = () => state.answers[q.id] = inp.value;
  } else if (q.type === "judge" || q.type === "mcq") {
    div.querySelectorAll("li").forEach(li => {
      li.onclick = () => {
        div.querySelectorAll("li").forEach(x => x.classList.remove("selected"));
        li.classList.add("selected");
        const radio = li.querySelector("input");
        radio.checked = true;
        let v = li.dataset.val;
        if (q.type === "judge") v = v === "true";
        else v = parseInt(v);
        state.answers[q.id] = v;
      };
    });
  } else if (q.type === "mcq-multi") {
    div.querySelectorAll("li").forEach(li => {
      li.onclick = (e) => {
        if (e.target.tagName !== "INPUT") {
          const cb = li.querySelector("input");
          cb.checked = !cb.checked;
        }
        li.classList.toggle("selected", li.querySelector("input").checked);
        const sel = [...div.querySelectorAll("input:checked")].map(x => parseInt(x.value));
        state.answers[q.id] = sel;
      };
    });
  }
}

/* ---------- 判分 ---------- */
function gradeQuestion(q, ans) {
  if (ans === undefined || ans === "" || (Array.isArray(ans) && ans.length === 0)) {
    return { correct: false, score: 0, status: "未作答" };
  }
  if (q.type === "fill") {
    const norm = s => String(s).trim().toLowerCase().replace(/\s+/g, "");
    const ok = norm(ans) === norm(q.answer);
    return { correct: ok, score: ok ? q.points : 0, status: ok ? "正确" : "错误" };
  }
  if (q.type === "judge" || q.type === "mcq") {
    const ok = ans === q.answer;
    return { correct: ok, score: ok ? q.points : 0, status: ok ? "正确" : "错误" };
  }
  if (q.type === "mcq-multi") {
    const a = [...ans].sort().join(",");
    const b = [...q.answer].sort().join(",");
    const ok = a === b;
    return { correct: ok, score: ok ? q.points : 0, status: ok ? "正确" : "错误" };
  }
  if (q.type === "subjective") {
    return { correct: null, score: null, status: "待自评" };
  }
}

function submitQuiz() {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
  const quiz = state.currentQuiz;
  if (!quiz) return;

  // 计分
  let totalScore = 0, maxScore = 0, autoScore = 0, manualPending = 0;
  let nCorrect = 0, nWrong = 0, nUnanswered = 0, nPending = 0;
  const wrongIds = [];

  quiz.questions.forEach(q => {
    maxScore += q.points;
    const ans = state.answers[q.id];
    const grade = gradeQuestion(q, ans);
    q._grade = grade;
    if (grade.score !== null) {
      autoScore += grade.score;
      totalScore += grade.score;
      if (grade.status === "正确") nCorrect++;
      else if (grade.status === "错误") { nWrong++; wrongIds.push(q.id); }
      else nUnanswered++;
    } else {
      nPending++;
      manualPending += q.points;
    }
  });

  // 渲染汇总
  app.innerHTML = "";
  const summary = document.createElement("div");
  summary.className = "score-summary";
  summary.innerHTML = `
    <div class="label">${quiz.title} — 自动评分结果</div>
    <div class="big">${autoScore} / ${maxScore - manualPending}</div>
    <div class="label">客观题得分（主观题需自评 ${manualPending} 分）</div>
    <div class="stat-grid">
      <div class="stat"><div class="num">${nCorrect}</div><div class="lab">✅ 正确</div></div>
      <div class="stat"><div class="num">${nWrong}</div><div class="lab">❌ 错误</div></div>
      <div class="stat"><div class="num">${nUnanswered}</div><div class="lab">⊘ 未答</div></div>
      <div class="stat"><div class="num">${nPending}</div><div class="lab">📝 待自评</div></div>
    </div>
  `;
  app.appendChild(summary);

  // 操作栏
  const ops = document.createElement("div");
  ops.style.textAlign = "center";
  ops.style.marginBottom = "14px";
  ops.innerHTML = `
    <button class="action" onclick="go('quiz','${quiz.id}')">🔄 重做</button>
    <button class="action secondary" onclick="go('home')">← 返回列表</button>
    <button class="action secondary no-print" id="print-result-btn">🖨️ 打印答卷+解析（PDF）</button>
  `;
  app.appendChild(ops);
  document.getElementById("print-result-btn").onclick = () => {
    document.body.classList.add("print-mode");
    setTimeout(() => { window.print(); document.body.classList.remove("print-mode"); }, 200);
  };

  // 逐题讲解
  quiz.questions.forEach((q, idx) => {
    const div = document.createElement("div");
    const grade = q._grade;
    div.className = "question " + (grade.status === "正确" ? "correct" : grade.status === "错误" ? "wrong" : "answered");
    div.innerHTML = `
      <div><span class="q-num">题 ${idx + 1}</span><span class="q-points">${q.points} 分 · ${grade.status}</span></div>
      <div class="q-text">${q.q}</div>
      ${renderUserAnswer(q, state.answers[q.id])}
      <div class="explanation">
        <div class="label">参考答案：</div>
        <div>${formatAnswer(q.answer)}</div>
        <div class="label" style="margin-top:6px">解析：</div>
        <pre>${escapeHtml(q.explain)}</pre>
        ${q.type === "subjective" ? renderSelfGrade(q) : ""}
      </div>
    `;
    app.appendChild(div);
  });

  // 保存历史
  const record = {
    quizId: quiz.id,
    quizTitle: quiz.title,
    score: autoScore,
    total: maxScore - manualPending,
    maxTotal: maxScore,
    date: Date.now(),
    duration: Math.round((Date.now() - state.startTime) / 1000),
    answers: state.answers,
    wrongIds: wrongIds,
  };
  state.history.push(record);
  saveState();

  // KaTeX
  if (window.renderMathInElement) {
    setTimeout(() => renderMathInElement(app, {
      delimiters: [{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]
    }), 30);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderUserAnswer(q, ans) {
  if (ans === undefined || ans === "" || (Array.isArray(ans) && ans.length === 0)) {
    return `<div style="color:#888"><em>未作答</em></div>`;
  }
  let txt = "";
  if (q.type === "fill" || q.type === "subjective") txt = escapeHtml(String(ans));
  else if (q.type === "judge") txt = ans ? "正确" : "错误";
  else if (q.type === "mcq") txt = escapeHtml(q.options[ans]);
  else if (q.type === "mcq-multi") txt = ans.map(i => escapeHtml(q.options[i])).join("； ");
  return `<div><strong>你的答案：</strong>${txt}</div>`;
}

function renderSelfGrade(q) {
  return `
    <div class="subjective-self-grade">
      <span>自评：</span>
      <button onclick="selfGrade('${q.id}', ${q.points})">满分 ${q.points}</button>
      <button onclick="selfGrade('${q.id}', ${Math.floor(q.points * 0.6)})">部分 ${Math.floor(q.points * 0.6)}</button>
      <button onclick="selfGrade('${q.id}', 0)">0</button>
    </div>
  `;
}

window.selfGrade = (qid, pts) => {
  const last = state.history[state.history.length - 1];
  if (!last) return;
  last.selfGrades = last.selfGrades || {};
  last.selfGrades[qid] = pts;
  last.score += pts;
  last.total += pts;
  saveState();
  // 视觉反馈
  const btns = document.querySelectorAll(`[onclick*="selfGrade('${qid}'"]`);
  btns.forEach(b => b.classList.remove("picked"));
  event.target.classList.add("picked");
};

function formatAnswer(a) {
  if (typeof a === "boolean") return a ? "正确" : "错误";
  if (Array.isArray(a)) return a.join(", ") + "（多选索引）";
  return escapeHtml(String(a));
}

/* ---------- 历史成绩 ---------- */
views.stats = () => {
  if (state.history.length === 0) {
    app.appendChild(makeCard(`<h2>📊 历史成绩</h2><p>尚无答题记录。</p>`));
    return;
  }
  const total = state.history.length;
  const avgPct = state.history.reduce((s, h) => s + (h.score / h.maxTotal), 0) / total * 100;
  const summary = document.createElement("div");
  summary.className = "score-summary";
  summary.innerHTML = `
    <div class="label">累计答题</div>
    <div class="big">${total} 套</div>
    <div class="label">平均得分率</div>
    <div class="stat-grid">
      <div class="stat"><div class="num">${avgPct.toFixed(1)}%</div><div class="lab">平均</div></div>
      <div class="stat"><div class="num">${state.history.reduce((s, h) => s + h.score, 0)}</div><div class="lab">累计得分</div></div>
      <div class="stat"><div class="num">${state.history.reduce((s, h) => s + h.wrongIds.length, 0)}</div><div class="lab">累计错题</div></div>
    </div>
  `;
  app.appendChild(summary);

  const list = document.createElement("div");
  list.className = "card";
  list.innerHTML = `<h3 style="color:#1f3a68">所有记录</h3>` +
    [...state.history].reverse().map((h, i) => `
      <div style="padding:8px 0;border-bottom:1px solid #eee">
        <strong>${h.quizTitle}</strong>
        <span class="tag cat">${h.score}/${h.maxTotal} 分</span>
        <span class="tag diff">用时 ${formatDuration(h.duration)}</span>
        <span style="color:#888;font-size:.85rem;margin-left:6px">${new Date(h.date).toLocaleString()}</span>
      </div>
    `).join("");
  app.appendChild(list);

  const clear = document.createElement("div");
  clear.style.textAlign = "center";
  clear.style.marginTop = "10px";
  clear.innerHTML = `<button class="action secondary" onclick="if(confirm('确定清空所有历史?')){state.history=[];saveState();go('stats');}">🗑 清空历史</button>`;
  app.appendChild(clear);
};

/* ---------- 错题重做 ---------- */
views.review = () => {
  // 收集所有错题
  const wrongs = [];
  state.history.forEach(h => {
    h.wrongIds.forEach(qid => {
      const quiz = QUIZZES.find(q => q.id === h.quizId);
      if (!quiz) return;
      const q = quiz.questions.find(qq => qq.id === qid);
      if (q && !wrongs.some(w => w.q.id === qid && w.quizId === h.quizId))
        wrongs.push({ q, quizId: h.quizId, quizTitle: h.quizTitle, userAnswer: h.answers[qid] });
    });
  });

  if (wrongs.length === 0) {
    app.appendChild(makeCard(`<h2>🔁 错题重做</h2><p>暂无错题记录。先去做几套题吧！</p>`));
    return;
  }

  app.appendChild(makeCard(`<h2>🔁 错题重做（共 ${wrongs.length} 题）</h2><p style="color:#666">回顾以往错题，重新练习。点击「显示答案」复盘解析。</p>`));

  wrongs.forEach((w, idx) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <div><span class="q-num">题 ${idx + 1}</span> <small style="color:#888">来自 ${w.quizTitle}</small><span class="q-points">${w.q.points} 分</span></div>
      <div class="q-text">${w.q.q}</div>
      <div style="color:#a00;margin:6px 0"><strong>你之前的答案：</strong>${escapeHtml(String(w.userAnswer ?? "未作答"))}</div>
      <button class="action secondary" onclick="this.nextElementSibling.style.display='block';this.style.display='none'">显示参考答案 / 解析</button>
      <div class="explanation" style="display:none">
        <div class="label">参考答案：</div><div>${formatAnswer(w.q.answer)}</div>
        <div class="label" style="margin-top:6px">解析：</div>
        <pre>${escapeHtml(w.q.explain)}</pre>
      </div>
    `;
    app.appendChild(div);
  });
};

/* ---------- 笔记 ---------- */
views.notes = () => {
  app.appendChild(makeCard(`<h2 style="color:#1f3a68">📖 笔记速查</h2><p>核心知识点速查，配合做题使用。</p>`));
  const list = document.createElement("div");
  list.className = "note-list";
  NOTES.forEach(n => {
    const item = document.createElement("div");
    item.className = "note-item";
    item.textContent = n.title;
    item.onclick = () => go("note", n.id);
    list.appendChild(item);
  });
  app.appendChild(list);
};

views.note = (id) => {
  const note = NOTES.find(n => n.id === id);
  if (!note) return go("notes");
  const back = document.createElement("button");
  back.className = "action secondary";
  back.textContent = "← 返回笔记列表";
  back.onclick = () => go("notes");
  app.appendChild(back);
  const div = document.createElement("div");
  div.className = "note-content";
  div.style.marginTop = "10px";
  div.innerHTML = mdLite(note.md);
  app.appendChild(div);
};

/* ---------- 工具 ---------- */
function makeCard(html) {
  const c = document.createElement("div");
  c.className = "card";
  c.innerHTML = html;
  return c;
}
function formatDuration(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* 极简 markdown 渲染：标题、列表、表格、加粗、行内 code */
function mdLite(md) {
  const lines = md.split("\n");
  let out = [], inUL = false, inTable = false, tableRows = [];

  function flushTable() {
    if (!inTable) return;
    const [head, , ...body] = tableRows;
    const headCells = head.split("|").slice(1, -1).map(c => `<th>${inline(c.trim())}</th>`).join("");
    const bodyRows = body.map(r => `<tr>${r.split("|").slice(1, -1).map(c => `<td>${inline(c.trim())}</td>`).join("")}</tr>`).join("");
    out.push(`<table><thead><tr>${headCells}</tr></thead><tbody>${bodyRows}</tbody></table>`);
    inTable = false; tableRows = [];
  }

  function inline(t) {
    return t
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  for (const ln of lines) {
    if (ln.startsWith("|")) { inTable = true; tableRows.push(ln); continue; }
    else if (inTable) flushTable();

    if (/^### /.test(ln)) out.push(`<h3>${inline(ln.slice(4))}</h3>`);
    else if (/^## /.test(ln)) out.push(`<h2>${inline(ln.slice(3))}</h2>`);
    else if (/^# /.test(ln)) out.push(`<h1>${inline(ln.slice(2))}</h1>`);
    else if (/^- /.test(ln)) {
      if (!inUL) { out.push("<ul>"); inUL = true; }
      out.push(`<li>${inline(ln.slice(2))}</li>`);
    } else {
      if (inUL) { out.push("</ul>"); inUL = false; }
      if (ln.trim() === "") out.push("<br>");
      else out.push(`<p>${inline(ln)}</p>`);
    }
  }
  if (inUL) out.push("</ul>");
  flushTable();
  return out.join("\n");
}

window.go = go;
window.state = state;

/* ---------- 启动 ---------- */
loadState();
setActive("nav-home");
go("home");
