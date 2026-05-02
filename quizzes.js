/* =====================================================
   QUIZZES — 15 套混合卷 × 20 题（自动生成于 build.js）
   每套涵盖多主题：base / ca2 / float / boolean / karnaugh / beth / modular / rsa / numtheory
   ===================================================== */

const QUIZZES = [
  {
    id: "sim01",
    title: "Sim CC3 — 01 (混合 / 20 题 / 53 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `mcq`,
      points: 2,
      topic: `boolean`,
      q: `下列哪个**不是**重言式？`,
      options: [`$a + \\overline a$`, `$ab + \\overline a + \\overline b$`, `$a \\to (a + b)$`, `$\\overline{(ab)\\to(a+b)}$`],
      answer: 3,
      explain: `$ab \\to a+b$ 恒真 ⇒ 其否定恒假，不是重言式。`
    },
    {
      id: "q2",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `FNC 在 K-map 中通过圈 0 读出，每项是析取。`,
      answer: true,
      explain: `FNC 外层合取，内层析取。`
    },
    {
      id: "q3",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `只要 $e$ 与 $n$ 互素，就一定能作为 RSA 的公钥指数。`,
      answer: false,
      explain: `条件应是 $\\gcd(e,\\varphi(n))=1$，不是与 $n$ 互素。`
    },
    {
      id: "q4",
      type: `mcq`,
      points: 3,
      topic: `beth`,
      q: `Beth 树某支已闭后，应：`,
      options: [`继续穷尽展开`, `停止该支`, `分裂新支`, `交语义`],
      answer: 1,
      explain: `闭支即矛盾，无需展开。`
    },
    {
      id: "q5",
      type: `subjective`,
      points: 4,
      topic: `base`,
      q: `为何 $(0.1)_{10}$ 在二进制中无限循环？与浮点舍入误差有何关系？`,
      answer: `分母 $10 = 2\\cdot 5$ 含 5 ⇒ 无限循环。浮点舍入截断 → 经典 $0.1+0.2 \\neq 0.3$。`,
      explain: `$5 \\nmid 2$ ⇒ 无有限二进制；浮点必舍入，累积误差。`
    },
    {
      id: "q6",
      type: `subjective`,
      points: 4,
      topic: `rsa`,
      q: `给出 RSA 小例子的完整检查清单：从 $p,q$ 到加密，必须依次检查哪些对象？`,
      answer: `检查 $p,q$ 为素数；算 $n=pq$；算 $\\varphi=(p-1)(q-1)$；选 $e$ 且 $\\gcd(e,\\varphi)=1$；求 $d=e^{-1}\\bmod\\varphi$；用 $c=m^e\\bmod n$ 加密。`,
      explain: `这题考方法流程，不考大数计算。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 4,
      topic: `float`,
      q: `下列哪个浮点计算会因舍入产生反直觉结果？`,
      options: [`$0.1 + 0.2 = 0.3$`, `$(a+b)+c = a+(b+c)$ 总成立`, `$10^{20}+1-10^{20} = 0$`, `正数累加 > 0`],
      answer: 2,
      explain: `$10^{20}$ 量级时 1 被吞没。`
    },
    {
      id: "q8",
      type: `mcq-multi`,
      points: 3,
      topic: `modular`,
      q: `十进制一位错校验选择模数 $p$ 时，哪些条件有助于证明可检出一位错误？`,
      options: [`$p>9$`, `$\\gcd(10,p)=1$`, `$p$ 必须小于 10`, `$10$ 在模 $p$ 下不可逆`],
      answer: [0, 1],
      explain: `数字差绝对值最多 9；同时 $10^i$ 需要可逆，才能保证非零差量不会消失。`
    },
    {
      id: "q9",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$5/8$ 在二进制中有有限表示。`,
      answer: true,
      explain: `$8 = 2^3$；分母质因子 $\\{2\\} \\subseteq \\{2\\}$ ⇒ 有限。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 2,
      topic: `ca2`,
      q: `$-42$ 的 8 位 CA2 = ?`,
      answer: `11010110`,
      explain: `$42=00101010$；取反 $11010101$；+1 $11010110$。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 例题中 $p=7,q=11,e=13$。为什么 $e$ 合法？`,
      options: [`$13$ 与 $\\varphi=60$ 互素`, `$13>n$`, `$13$ 是奇数即可`, `$13$ 等于 $p+q$`],
      answer: 0,
      explain: `$\\varphi=(7-1)(11-1)=60$，$\\gcd(13,60)=1$。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 3,
      topic: `beth`,
      q: `证 $\\{p, p\\to q\\}\\models q$：加 $\\neg q$，β 拆 $p\\to q$ 得 = ?`,
      answer: `¬p | q`,
      explain: `两支均闭：$\\neg p$ 与 $p$，$q$ 与 $\\neg q$。`
    },
    {
      id: "q13",
      type: `mcq-multi`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 下列说法哪些正确？`,
      options: [`范围 $[0, 255]$`, `最小负数 $-128$`, `最大正数 $127$`, `存在两个零`],
      answer: [1, 2],
      explain: `范围 $[-128,127]$；只有一个 0。`
    },
    {
      id: "q14",
      type: `judge`,
      points: 2,
      topic: `boolean`,
      q: `$\\overline{(ab)\\lor(cd)} = (\\overline a\\lor\\overline b)\\land(\\overline c\\lor\\overline d)$`,
      answer: true,
      explain: `外层 De Morgan + 内层各自展开。`
    },
    {
      id: "q15",
      type: `judge`,
      points: 2,
      topic: `boolean`,
      q: `$\\overline{ab+c} = \\overline a + \\overline b \\cdot \\overline c$`,
      answer: false,
      explain: `正确为 $\\overline{ab+c} = (\\overline a + \\overline b)\\cdot \\overline c$。`
    },
    {
      id: "q16",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `$\\overline{\\overline a + b}\\cdot c$ 化简（无嵌套否定）= ?`,
      answer: `a b̄ c`,
      explain: `De Morgan：$\\overline{\\overline a + b} = a\\overline b$。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 2,
      topic: `karnaugh`,
      q: `4 变量 K-map 行（ab）按格雷码：00, ?, 11, 10。问号 = ?`,
      answer: `01`,
      explain: `格雷码序列。`
    },
    {
      id: "q18",
      type: `judge`,
      points: 2,
      topic: `float`,
      q: `IEEE 浮点中指数全 0、尾数全 0 表示 0。`,
      answer: true,
      explain: `符号位 0 或 1 ⇒ $+0$ 或 $-0$。`
    },
    {
      id: "q19",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `在 $\\mathbb Z_{12}$ 中，方程 $4x\\equiv 8\\pmod{12}$ 有几个解？`,
      options: [`0`, `1`, `3`, `4`],
      answer: 3,
      explain: `$\\gcd(4,12)=4$ 且 $4|8$，所以有 4 个解；约简得 $x\\equiv2\\pmod3$，即 $\\{2,5,8,11\\}$。`
    },
    {
      id: "q20",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `用模 7 校验码 $c(s)=7-(s\\bmod7)$ 时，校验的核心目的是什么？`,
      options: [`压缩信息`, `检测录入错误`, `加密明文`, `把十进制转二进制`],
      answer: 1,
      explain: `校验码不是加密；它用同余性质检测某些传输或录入错误。`
    }
    ]
  },
  {
    id: "sim02",
    title: "Sim CC3 — 02 (混合 / 20 题 / 55 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `judge`,
      points: 2,
      topic: `boolean`,
      q: `判断 $F$ 是否为重言式时，只找到一个反例就足够否定。`,
      answer: true,
      explain: `重言式要求所有赋值为真；一个反例即可说明不是重言式。`
    },
    {
      id: "q2",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `若 $m$ 与 $n$ 不互素，课堂小例子中仍应先检查 RSA 参数流程，而不是把问题改成普通模幂题。`,
      answer: true,
      explain: `考试重点通常是 RSA 参数、模数和逆元条件；不要把应用题降格成孤立大数计算。`
    },
    {
      id: "q3",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `RSA 的加密和解密都发生在 $\\mathbb Z_n$ 中。`,
      answer: true,
      explain: `明文、密文都按模 $n$ 的剩余类处理。`
    },
    {
      id: "q4",
      type: `subjective`,
      points: 4,
      topic: `float`,
      q: `解释 IEEE 浮点隐含位的作用。`,
      answer: `规约数最高位恒为 1，不存储以省 1 bit；存储 23 位 + 隐含 1 = 24 位有效，精度提升 1 bit。`,
      explain: `前提是规约数 $m \\in [1, 2)$。`
    },
    {
      id: "q5",
      type: `subjective`,
      points: 4,
      topic: `base`,
      q: `证明 $(0.\\overline{142857})_{10} = 1/7$ 并判断在二进制中是否有限。`,
      answer: `$x = 142857/999999 = 1/7$；$7 \\nmid 2$ ⇒ 二进制无限。`,
      explain: `周期 6 ⇒ 分母 $10^6-1 = 999999 = 7\\cdot 142857$。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 2,
      topic: `beth`,
      q: `$\\neg(a\\leftrightarrow b)$ 是何类型？分支 = ?`,
      answer: `β; (a∧¬b) | (¬a∧b)`,
      explain: `等价的否定 = 异或。`
    },
    {
      id: "q7",
      type: `fill`,
      points: 2,
      topic: `beth`,
      q: `Beth 树中含 $p$ 与 $\\neg p$ 的支称 = ?`,
      answer: `闭支`,
      explain: `Closed branch / closed.`
    },
    {
      id: "q8",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb Z_6$ 中 $3x\\equiv 3\\pmod6$ 有唯一解。`,
      answer: false,
      explain: `$\\gcd(3,6)=3$ 且 $3|3$，所以有 3 个解：$\\{1,3,5\\}$。`
    },
    {
      id: "q9",
      type: `mcq`,
      points: 2,
      topic: `base`,
      q: `$(1011.101)_2$ 转十进制 = ?`,
      options: [`11.625`, `12.625`, `10.5`, `11.5`],
      answer: 0,
      explain: `$8+2+1+0.5+0.125 = 11.625$`
    },
    {
      id: "q10",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$(a + \\overline b)(\\overline a + b)$ 的 minterm（写成 $m_i$ 求和形式）= ?`,
      answer: `m0 + m3`,
      explain: `真值表中 $f=1$：$(a,b)=(0,0)$ 即 $m_0$，$(1,1)$ 即 $m_3$。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `K-map 分组规则下列哪个**错**？`,
      options: [`分组必须为矩形`, `分组大小必须 $2^k$`, `同一个 1 可在多分组`, `对角格可在同分组`],
      answer: 3,
      explain: `K-map 仅按边相邻；对角不能直接相圈。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `IEEE 32 位最小正规约数 ≈ $2^{?}$（填指数）`,
      answer: `-126`,
      explain: `$e_\\min = 1 - 127 = -126$。`
    },
    {
      id: "q13",
      type: `mcq-multi`,
      points: 3,
      topic: `modular`,
      q: `在 $\\mathbb Z_{12}$ 中，哪些元素有乘法逆元？`,
      options: [`1`, `5`, `6`, `7`, `11`],
      answer: [0, 1, 3, 4],
      explain: `可逆当且仅当与 12 互素；$1,5,7,11$ 可逆，6 不可逆。`
    },
    {
      id: "q14",
      type: `subjective`,
      points: 4,
      topic: `boolean`,
      q: `给 $f = \\overline a bc + a\\overline b c + abc$，求 FND 与 FNC。`,
      answer: `FND = $\\overline a bc + a\\overline b c + abc$；FNC 可从 $f=0$ 行构造。`,
      explain: `FND 直接读 1 行；FNC 读 0 行（每项对值取反）。`
    },
    {
      id: "q15",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 中 $p=5,q=11,e=3$。下列哪个是正确的 $d$？`,
      options: [`3`, `13`, `27`, `40`],
      answer: 2,
      explain: `$\\varphi=4\\cdot10=40$，$3\\cdot27=81\\equiv1\\pmod{40}$。`
    },
    {
      id: "q16",
      type: `judge`,
      points: 3,
      topic: `modular`,
      q: `若校验模数为 11，十进制数码的一位错误一定会改变校验值。`,
      answer: true,
      explain: `一位错误差量为 $\\Delta=(d'-d)10^i$；$|d'-d|<11$ 且 $\\gcd(10,11)=1$，所以 $\\Delta\\not\\equiv0\\pmod{11}$。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `化简 $a(a+b) + b(a+b)$。`,
      answer: `a+b`,
      explain: `$(a+b)(a+b) = a+b$（幂等律）。`
    },
    {
      id: "q18",
      type: `mcq-multi`,
      points: 3,
      topic: `karnaugh`,
      q: `K-map 中 don't-care 用法正确的有？`,
      options: [`可视为 1 扩大圈`, `可视为 0 避免某项`, `× 必须被覆盖`, `× 可不全覆盖`],
      answer: [0, 1, 3],
      explain: `× 不强制覆盖，仅 1 必须覆盖。`
    },
    {
      id: "q19",
      type: `judge`,
      points: 2,
      topic: `ca2`,
      q: `CA2 自反性 $\\text{CA2}(\\text{CA2}(x)) = x$ 对所有 8 位值成立。`,
      answer: true,
      explain: `取反 + 1 两次回到原值（mod $2^8$ 自动）。`
    },
    {
      id: "q20",
      type: `mcq`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 码 $(11110000)_2$ 对应十进制 = ?`,
      options: [`-16`, `-240`, `-128`, `-15`],
      answer: 0,
      explain: `首位 1 → 取反+1：$(00010000) = 16$ ⇒ $-16$。`
    }
    ]
  },
  {
    id: "sim03",
    title: "Sim CC3 — 03 (混合 / 20 题 / 50 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `subjective`,
      points: 4,
      topic: `ca2`,
      q: `为何 8 位 CA2 范围不对称？给 $k$ 位通用公式。`,
      answer: `范围 $[-2^{k-1}, 2^{k-1}-1]$；$2^k$ 个值分正负，0 归非负 ⇒ 负数比正数多 1。`,
      explain: `0 归正端导致负方向多一个值。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `$-24$ 的 8 位 CA2 符号扩展到 16 位 = ?`,
      answer: `1111111111101000`,
      explain: `8 位 $-24 = 11101000$；扩展左侧补符号位 1。`
    },
    {
      id: "q3",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(1101)_2$ 转十进制 = ?`,
      answer: `13`,
      explain: `$8+4+0+1 = 13$`
    },
    {
      id: "q4",
      type: `judge`,
      points: 2,
      topic: `float`,
      q: `IEEE 浮点非规约数（denormal）出现在指数全 0 且尾数非 0 时。`,
      answer: true,
      explain: `用于平滑过渡到 0。`
    },
    {
      id: "q5",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `$f = ab + \\overline a\\overline c + bc$ 化简后**不**等价的是？`,
      options: [`$ab + \\overline a\\overline c$`, `$b + \\overline a\\overline c$`, `$ab + \\overline c$`, `$\\overline a\\overline c + bc$`],
      answer: 2,
      explain: `$ab + \\overline c$ 缺少 $bc$ 在 $a=1, b=0, c=0$ 时的覆盖。`
    },
    {
      id: "q6",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `RSA 私钥 $d$ 满足 $ed\\equiv1\\pmod n$。`,
      answer: false,
      explain: `模数应是 $\\varphi(n)$，不是 $n$。这是高频陷阱。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 2,
      topic: `base`,
      q: `$(0.625)_{10}$ 转二进制 = ?`,
      options: [`$(0.101)_2$`, `$(0.110)_2$`, `$(0.111)_2$`, `$(0.011)_2$`],
      answer: 0,
      explain: `$0.625\\times 2=1.25 → 1$；$0.25\\times 2=0.5 → 0$；$0.5\\times 2=1.0 → 1$。`
    },
    {
      id: "q8",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `下列哪一步错误使用了费马小定理？`,
      options: [`$2^{10}\\equiv1\\pmod{11}$`, `$3^6\\equiv1\\pmod7$`, `$2^4\\equiv1\\pmod{15}$`, `$5^{12}\\equiv1\\pmod{13}$`],
      answer: 2,
      explain: `费马小定理要求模数是素数；15 不是素数，不能直接套用。`
    },
    {
      id: "q9",
      type: `mcq-multi`,
      points: 3,
      topic: `modular`,
      q: `关于 $\\mathbb Z_n$ 中的逆元，下列哪些说法正确？`,
      options: [`加法逆元总存在`, `乘法逆元总存在`, `乘法逆元存在当且仅当 $\\gcd(x,n)=1$`, `$n$ 为素数时非零元都有乘法逆元`],
      answer: [0, 2, 3],
      explain: `加法逆元与乘法逆元条件不同，这是同余方程与 RSA 的核心边界。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 2,
      topic: `beth`,
      q: `对 $\\neg(a\\land b)$ Beth 树用何规则？分支 = ?`,
      answer: `β; ¬a | ¬b`,
      explain: `$\\neg(\\land)$ 是 β 规则。`
    },
    {
      id: "q11",
      type: `fill`,
      points: 2,
      topic: `beth`,
      q: `α 规则代表形式有 $a\\land b$ 和 = ?`,
      answer: `¬(a∨b) 或 ¬(a→b)`,
      explain: `α: ∧, ¬∨, ¬→, ¬¬。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `化简 $\\overline a\\overline b\\overline c + \\overline a\\overline bc + \\overline a bc + abc$ = ?`,
      answer: `ā b̄ + bc`,
      explain: `$\\overline a\\overline b(\\overline c + c) + bc(\\overline a + a) = \\overline a\\overline b + bc$。`
    },
    {
      id: "q13",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `化简 $ab + \\overline a b + \\overline a \\overline b$ = ?`,
      options: [`$\\overline a$`, `$a+b$`, `$\\overline a + b$`, `$\\overline{ab}$`],
      answer: 2,
      explain: `$= b + \\overline a \\overline b = b + \\overline a$。`
    },
    {
      id: "q14",
      type: `fill`,
      points: 2,
      topic: `karnaugh`,
      q: `K-map 用格雷码的主要优势 = ?`,
      answer: `保证相邻格仅 1 位差异`,
      explain: `便于直观找最大矩形。`
    },
    {
      id: "q15",
      type: `mcq-multi`,
      points: 3,
      topic: `karnaugh`,
      q: `关于 don't-care 的使用，哪些正确？`,
      options: [`可以当 1 用来扩大圈`, `可以当 0 不圈`, `必须全部圈入`, `不能覆盖真正的 0`],
      answer: [0, 1, 3],
      explain: `don't-care 服务于化简；是否圈入取决于能否得到更大合法圈。`
    },
    {
      id: "q16",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `由 $2a\\equiv2b\\pmod6$ 可以直接推出 $a\\equiv b\\pmod6$。`,
      answer: false,
      explain: `2 在 $\\mathbb Z_6$ 中不可逆，不能直接约掉。反例：$a=1,b=4$。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 2,
      topic: `rsa`,
      q: `RSA $p=7,q=11$ 时 $\\varphi(n)$ 等于？`,
      answer: `60`,
      explain: `$\\varphi(n)=(7-1)(11-1)=60$。`
    },
    {
      id: "q18",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 中选择 $e$ 时，下列哪一项最关键？`,
      options: [`$e$ 必须是偶数`, `$e$ 必须与 $\\varphi(n)$ 互素`, `$e$ 必须等于 $p$`, `$e$ 必须大于 $n$`],
      answer: 1,
      explain: `只有 $\\gcd(e,\\varphi(n))=1$，$e$ 才有模 $\\varphi(n)$ 的逆元 $d$。`
    },
    {
      id: "q19",
      type: `mcq`,
      points: 2,
      topic: `boolean`,
      q: `布尔代数中 0 和 1 分别表示？`,
      options: [`真 假`, `假 真`, `空 全`, `否 是`],
      answer: 1,
      explain: `$1 = T$, $0 = F$。`
    },
    {
      id: "q20",
      type: `mcq`,
      points: 2,
      topic: `float`,
      q: `IEEE 单精度（32 位）结构 = ?`,
      options: [`1+8+23`, `1+11+52`, `1+7+24`, `1+9+22`],
      answer: 0,
      explain: `符号 1 + 指数 8 + 尾数 23。`
    }
    ]
  },
  {
    id: "sim04",
    title: "Sim CC3 — 04 (混合 / 20 题 / 50 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `学生说 $p=7,q=13,e=5$ 时 $d$ 是 $5^{-1}\\bmod91$。错在哪里？`,
      options: [`$n$ 算错`, `$e$ 不能为 5`, `$d$ 应模 $\\varphi(n)=72$，且 $d=29$`, `$d$ 应等于 $\\varphi(n)$`],
      answer: 2,
      explain: `$n=91$，但求私钥指数要模 $\\varphi=6\\cdot12=72$；$5\\cdot29=145\\equiv1\\pmod{72}$。`
    },
    {
      id: "q2",
      type: `mcq-multi`,
      points: 3,
      topic: `base`,
      q: `下列哪些数在六进制中有有限表示？`,
      options: [`$1/3$`, `$1/4$`, `$1/9$`, `$5/12$`],
      answer: [0, 2, 3],
      explain: `$6 = 2\\times 3$；$1/3$ ✓；$1/4 = 1/2^2$，需 4 ∉ 因子集 ✗；$1/9 = 1/3^2$ ✓；$5/12 = 5/(2^2\\cdot 3)$ ✓。`
    },
    {
      id: "q3",
      type: `mcq`,
      points: 2,
      topic: `ca2`,
      q: `16 位 CA2 范围 = ?`,
      options: [`$[-32768, 32767]$`, `$[-32767, 32768]$`, `$[-65536, 65535]$`, `$[-32768, 32768]$`],
      answer: 0,
      explain: `$[-2^{15}, 2^{15}-1]$。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$9^{-1} \\bmod 26 = ?$`,
      answer: `3`,
      explain: `$1=3\\cdot9-26$，所以 $9^{-1}\\equiv3\\pmod{26}$。这类小扩欧是 RSA 求 $d$ 的准备。`
    },
    {
      id: "q5",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$f = 0$ 在 $(0,0,0),(0,1,0),(1,0,0)$；其 FNC 最简（化简后）= ?`,
      answer: `(a+c)(b̄+c)`,
      explain: `公共特征 $c=0$ 部分约束，结合最简。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 2,
      topic: `rsa`,
      q: `RSA $p=5,q=11,e=3,m=4$，密文 $c=m^e\\bmod n$ 等于？`,
      answer: `9`,
      explain: `$n=55$，$4^3=64\\equiv9\\pmod{55}$。`
    },
    {
      id: "q7",
      type: `fill`,
      points: 2,
      topic: `float`,
      q: `IEEE 32 位浮点 bias = ?`,
      answer: `127`,
      explain: `$2^{8-1} - 1 = 127$。`
    },
    {
      id: "q8",
      type: `fill`,
      points: 2,
      topic: `ca2`,
      q: `8 位补码表示范围（写成 $a, b$ 形式）：`,
      answer: `-128,127`,
      explain: `$[-2^{k-1}, 2^{k-1}-1]$。`
    },
    {
      id: "q9",
      type: `fill`,
      points: 3,
      topic: `base`,
      q: `$(0.2)_8$ 转二进制 = ?`,
      answer: `0.010`,
      explain: `$2_8 = (010)_2$。`
    },
    {
      id: "q10",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `若 4 变量 K-map 中四个角都是 1，最合理的处理是？`,
      options: [`四角可合成一个 4 格圈`, `四角必须分开`, `四角是对角所以全不能圈`, `只能圈左上角`],
      answer: 0,
      explain: `四角通过上下和左右环绕相邻，构成合法 4 格圈。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `$F = (a\\to b)\\land(b\\to c)\\land\\neg c$ 为真的赋值有几个？`,
      options: [`0`, `1`, `2`, `3`],
      answer: 1,
      explain: `$\\neg c\\Rightarrow c=0$；$b\\to c\\Rightarrow b=0$；$a\\to b\\Rightarrow a=0$。唯一解 $(0,0,0)$。`
    },
    {
      id: "q12",
      type: `judge`,
      points: 2,
      topic: `boolean`,
      q: `$\\overline{a+b}\\cdot c = \\overline a c + \\overline b c$。`,
      answer: false,
      explain: `$\\overline{a+b}\\cdot c = \\overline a\\overline b c$，不是和。`
    },
    {
      id: "q13",
      type: `judge`,
      points: 2,
      topic: `boolean`,
      q: `$a + a = a$ 和 $a + 0 = a$ 是布尔代数公理。`,
      answer: true,
      explain: `幂等律 + 单位元。`
    },
    {
      id: "q14",
      type: `mcq`,
      points: 2,
      topic: `rsa`,
      q: `RSA 安全性主要依赖什么困难问题？`,
      options: [`大整数 $n$ 难以分解成 $p,q$`, `十进制转换困难`, `Karnaugh 分组困难`, `加法很慢`],
      answer: 0,
      explain: `知道 $p,q$ 就能得到 $\\varphi(n)$ 和 $d$；难点是从大 $n$ 分解出 $p,q$。`
    },
    {
      id: "q15",
      type: `judge`,
      points: 2,
      topic: `float`,
      q: `浮点加法满足结合律。`,
      answer: false,
      explain: `因舍入误差非结合，例 $(10^{20}+1)-10^{20} \\neq 10^{20}+(1-10^{20})$。`
    },
    {
      id: "q16",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `在 $\\mathbb Z_{15}$ 中，为什么不能把 $3x\\equiv6$ 两边同时除以 3 得 $x\\equiv2$？`,
      options: [`3 在 $\\mathbb Z_{15}$ 中不可逆`, `6 不是偶数`, `15 是奇数`, `同余式不能加减`],
      answer: 0,
      explain: `$\\gcd(3,15)=3$，3 没有乘法逆元。原方程有多个解，直接除法会丢解。`
    },
    {
      id: "q17",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `3 变量 K-map 中 $(a,b,c)=(0,1,1)$ 编号为 $m_3$。`,
      answer: true,
      explain: `二进制 011 = 3。`
    },
    {
      id: "q18",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `若 $n=pq$ 且 $p,q$ 是不同素数，$\\varphi(n)$ 应怎样算？`,
      options: [`$n-1$`, `$(p-1)(q-1)$`, `$p+q$`, `$pq-p$`],
      answer: 1,
      explain: `RSA 中使用 $\\varphi(pq)=(p-1)(q-1)$。`
    },
    {
      id: "q19",
      type: `fill`,
      points: 3,
      topic: `beth`,
      q: `证 $\\vdash (a\\to b)\\lor(b\\to a)$ Beth 树第一步 = ?`,
      answer: `对 ¬F 应用 ¬∨（α）展开为 ¬(a→b) 与 ¬(b→a)`,
      explain: `都得 $a, \\neg b$ 与 $b, \\neg a$ 同时存在 ⇒ 矛盾。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 3,
      topic: `beth`,
      q: `若 $\\Sigma\\cup\\{\\neg F\\}$ 的 Beth 树全闭，则 $\\Sigma \\models F$。`,
      answer: true,
      explain: `无反模型 ⇒ 蕴含成立。`
    }
    ]
  },
  {
    id: "sim05",
    title: "Sim CC3 — 05 (混合 / 20 题 / 54 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `mcq`,
      points: 2,
      topic: `base`,
      q: `下列哪个分数在二进制中无有限表示？`,
      options: [`$1/16$`, `$3/8$`, `$1/5$`, `$7/4$`],
      answer: 2,
      explain: `$1/5$ 分母含 5 ∉ {2}。`
    },
    {
      id: "q2",
      type: `subjective`,
      points: 4,
      topic: `rsa`,
      q: `解释为什么 RSA 中 $d$ 要满足 $ed\\equiv1\\pmod{\\varphi(n)}$。`,
      answer: `因为 $ed=1+k\\varphi(n)$，解密时 $c^d=(m^e)^d=m^{1+k\\varphi(n)}\\equiv m$，核心用到欧拉定理。`,
      explain: `重点是说明指数回到 $1$，而不是机械求一个逆元。`
    },
    {
      id: "q3",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `若把校验模数改成 6，哪种一位错误可能漏检？`,
      options: [`个位 0 改 6`, `个位 0 改 1`, `十位 0 改 1`, `百位 2 改 3`],
      answer: 0,
      explain: `个位差量 6 在模 6 下为 0，校验值可能不变。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 3,
      topic: `base`,
      q: `$(0.65625)_{10}$ 转二进制（精度 $2^{-5}$）= ?`,
      answer: `0.10101`,
      explain: `$0.65625\\times 2 = 1.3125 → 1$；$0.3125\\times 2 = 0.625 → 0$；$0.625\\times 2 = 1.25 → 1$；$0.25\\times 2 = 0.5 → 0$；$0.5\\times 2 = 1 → 1$。`
    },
    {
      id: "q5",
      type: `judge`,
      points: 2,
      topic: `ca2`,
      q: `8 位 CA2 中 $-64 + (-64)$ 会溢出。`,
      answer: false,
      explain: `$-128 \\in [-128, 127]$ 可表 ⇒ 不溢出。$11000000 + 11000000 = 1\\,10000000$ 截 $10000000 = -128$。`
    },
    {
      id: "q6",
      type: `mcq`,
      points: 3,
      topic: `float`,
      q: `IEEE 32 位编码哪个表示 NaN？`,
      options: [`指数全 1、尾数全 0`, `指数全 1、尾数非 0`, `指数全 0、尾数非 0`, `指数 128、尾数全 0`],
      answer: 1,
      explain: `指数全 1 + 尾数 0 = $\\pm\\infty$；指数全 1 + 尾数非 0 = NaN。`
    },
    {
      id: "q7",
      type: `fill`,
      points: 2,
      topic: `rsa`,
      q: `RSA $p=7,q=11$ 时 $n$ 等于？`,
      answer: `77`,
      explain: `$n=pq=77$。这一步简单，但后续的 $\\varphi,e,d$ 都依赖它。`
    },
    {
      id: "q8",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `对 $E = a(\\overline b + c)$ 应用分配律 = ?`,
      answer: `a b̄ + ac`,
      explain: `标准分配律。`
    },
    {
      id: "q9",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 中 $35 + (-28)$ 结果（二进制）= ?`,
      answer: `00000111`,
      explain: `$35 + (-28) = 7$；异号永不溢；二进制 $0000\\,0111$。`
    },
    {
      id: "q10",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `从真值表构造 FNC 时，应读取哪些行？`,
      options: [`$F=1$ 的行`, `$F=0$ 的行`, `只读第一行`, `只读 don't-care`],
      answer: 1,
      explain: `FNC 是合取范式，读取 $F=0$ 的行并写成 maxterm。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `4 变量 K-map 单项最大有效圈 = ?`,
      options: [`4`, `8`, `16`, `取决于函数`],
      answer: 1,
      explain: `16 = 常 1；最大单 littéral 圈 = 8 = $2^3$。`
    },
    {
      id: "q12",
      type: `subjective`,
      points: 4,
      topic: `beth`,
      q: `用 Beth 验证 $\\{a\\lor b, \\neg a\\to c\\} \\models b\\lor c$。`,
      answer: `假设 $\\neg b, \\neg c$；β $a\\lor b$：$a$ 支由 $\\neg a\\to c$ + $\\neg c$ 推 $a$ 矛盾；$b$ 支与 $\\neg b$ 矛盾。全闭。`,
      explain: `经典分情况推理。`
    },
    {
      id: "q13",
      type: `mcq`,
      points: 2,
      topic: `boolean`,
      q: `下列哪个恒等式**错误**？`,
      options: [`$a + ab = a$`, `$aa = a$`, `$a+b = \\overline{\\overline a\\overline b}$`, `$a\\to b = a + b$`],
      answer: 3,
      explain: `$a\\to b \\equiv \\overline a + b$，不是 $a+b$。`
    },
    {
      id: "q14",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 密钥生成的正确顺序是？`,
      options: [`选 $e$ → 选 $p,q$ → 算 $d$ → 算 $n$`, `选 $p,q$ → 算 $n,\\varphi(n)$ → 选与 $\\varphi$ 互素的 $e$ → 求 $d$`, `选 $n$ → 任取 $e,d$`, `先加密明文再决定私钥`],
      answer: 1,
      explain: `RSA 的流程是先得到 $n$ 和 $\\varphi(n)$，再选择合法 $e$，最后求 $d=e^{-1}\\pmod{\\varphi(n)}$。`
    },
    {
      id: "q15",
      type: `mcq-multi`,
      points: 3,
      topic: `float`,
      q: `IEEE 32 位 $00000000\\ldots$ 与 $10000000\\ldots$（其余全 0）分别表示？`,
      options: [`第一个是 +0`, `第二个是 −0`, `都表示 0（值相等）`, `是最大和最小`],
      answer: [0, 1, 2],
      explain: `$+0$ 与 $-0$ 在比较中相等。`
    },
    {
      id: "q16",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `4 变量 K-map 的左右边界可以相邻。`,
      answer: true,
      explain: `K-map 具有环绕相邻性，边界可跨边合并。`
    },
    {
      id: "q17",
      type: `mcq-multi`,
      points: 3,
      topic: `modular`,
      q: `下列哪些同余方程可以直接乘以系数的逆元来求解？`,
      options: [`$5x\\equiv7\\pmod{12}$`, `$4x\\equiv8\\pmod{12}$`, `$7x\\equiv3\\pmod{12}$`, `$6x\\equiv1\\pmod{12}$`],
      answer: [0, 2],
      explain: `只有系数与模数互素时才可直接除以系数；5 与 7 在 $\\mathbb Z_{12}$ 中可逆。`
    },
    {
      id: "q18",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$(a + \\overline b)(\\overline a + c)(b + \\overline c)$ 真值表中为真的行数 = ?`,
      answer: `2`,
      explain: `枚举 8 行真值表得 2 个为真组合。`
    },
    {
      id: "q19",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb Z_{10}$ 中所有可逆元集合是？`,
      answer: `{1,3,7,9}`,
      explain: `可逆元正是与 10 互素的剩余类。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `Beth 树支闭合 ⇔ 出现 $p$ 与 $\\neg p$ 矛盾。`,
      answer: true,
      explain: `矛盾字面量定义。`
    }
    ]
  },
  {
    id: "sim06",
    title: "Sim CC3 — 06 (混合 / 20 题 / 54 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb Z_{15}$ 是整环。`,
      answer: false,
      explain: `$3\\cdot5\\equiv0\\pmod{15}$，但 3 和 5 都不是 0；存在零因子。课件只需掌握这个边界，不需深入环论。`
    },
    {
      id: "q2",
      type: `subjective`,
      points: 4,
      topic: `ca2`,
      q: `12 位 CA2 加法溢出检测器逻辑。`,
      answer: `若两输入同号但输出异号 ⇒ 溢出；等价于最高两位进位异或 $C_{n-1} \\oplus C_n = 1$。`,
      explain: `硬件常用最高两位进位异或检测，效率高。`
    },
    {
      id: "q3",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `浮点中大数 + 小数（差超 ULP）时小数被吞没；$a+b$ ≈ ?（填变量）`,
      answer: `a`,
      explain: `对齐时小数尾数被截 ⇒ $a + b = a$。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `将十进制数 $(47)_{10}$ 转换为二进制（不含括号）。`,
      answer: `101111`,
      explain: `47÷2 余 1, 23÷2 余 1, 11÷2 余 1, 5÷2 余 1, 2÷2 余 0, 1÷2 余 1，自下而上读 $(101111)_2$。`
    },
    {
      id: "q5",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `$a + \\overline a b = a + b$ 称 = ?`,
      answer: `吸收律`,
      explain: `Absorption。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 3,
      topic: `base`,
      q: `$(2AC.B)_{16}$ 转二进制（不含小数点前导 0 限制）`,
      answer: `1010101100.1011`,
      explain: `每位十六进制 → 4 位：$2=0010, A=1010, C=1100, B=1011$。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `若 $n=55$ 且 $\\varphi(n)=40$，则 $p+q$ 等于？`,
      options: [`14`, `16`, `40`, `55`],
      answer: 1,
      explain: `$\\varphi=pq-p-q+1=n-(p+q)+1$，所以 $p+q=55-40+1=16$。`
    },
    {
      id: "q8",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 中若只给 $n=77$ 和 $e=13$，还缺少哪项才能直接求私钥 $d$？`,
      options: [`$\\varphi(n)$ 或 $p,q$`, `密文长度`, `K-map 分组`, `浮点 bias`],
      answer: 0,
      explain: `求 $d$ 需要在模 $\\varphi(n)$ 下取 $e$ 的逆元；不知道 $p,q$ 通常就不知道 $\\varphi(n)$。`
    },
    {
      id: "q9",
      type: `fill`,
      points: 4,
      topic: `float`,
      q: `IEEE 32 位机器精度 $\\varepsilon_\\text{mach} = 2^{?}$`,
      answer: `-23`,
      explain: `尾数 23 位 ⇒ $\\varepsilon = 2^{-23} \\approx 1.19\\times 10^{-7}$。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 2,
      topic: `karnaugh`,
      q: `5 变量 K-map 通常画为两张 4 变量表，跨页相邻指 = ?`,
      answer: `两表对应位置`,
      explain: `$e=0$ 与 $e=1$ 同位置视为相邻。`
    },
    {
      id: "q11",
      type: `mcq-multi`,
      points: 3,
      topic: `boolean`,
      q: `下列哪些操作保持布尔等价？`,
      options: [`对所有变量同时取否`, `用 De Morgan 展开否定`, `$a\\to b$ 替换为 $\\overline a + b$`, `交换合取项顺序`],
      answer: [1, 2, 3],
      explain: `对所有变量同时取否一般**不**保持等价（除非函数自对偶）。`
    },
    {
      id: "q12",
      type: `subjective`,
      points: 4,
      topic: `boolean`,
      q: `证 De Morgan 律对 3 个变量：$\\overline{abc} = \\overline a + \\overline b + \\overline c$。`,
      answer: `$\\overline{abc} = \\overline{(ab)c} = \\overline{ab} + \\overline c = \\overline a + \\overline b + \\overline c$（递归用 2 元 De Morgan）。`,
      explain: `n 元归纳。`
    },
    {
      id: "q13",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `K-map 中 don't-care 圈入分组后，最终公式对该位置输出确定。`,
      answer: true,
      explain: `化简后表达式确定，don't-care 仅化简过程灵活。`
    },
    {
      id: "q14",
      type: `mcq-multi`,
      points: 3,
      topic: `rsa`,
      q: `若 $\\varphi(n)=40$，下列哪些 $e$ 可作为 RSA 公钥指数？`,
      options: [`3`, `10`, `20`, `37`],
      answer: [0, 3],
      explain: `需要 $1<e<\\varphi(n)$ 且 $\\gcd(e,40)=1$；3 和 37 合法。`
    },
    {
      id: "q15",
      type: `mcq`,
      points: 2,
      topic: `ca2`,
      q: `$+42$ 的 8 位 CA2 = ?`,
      options: [`00101010`, `10101010`, `11010110`, `01010101`],
      answer: 0,
      explain: `正数直接二进制。`
    },
    {
      id: "q16",
      type: `mcq`,
      points: 3,
      topic: `beth`,
      q: `$\\Sigma=\\{a\\to b, \\neg b\\}$ 验证 $\\models \\neg a$ 的 Beth 树关键步骤？`,
      options: [`$\\neg a, \\neg b, a$ 三字面`, `$b, \\neg a, \\neg b$ 三字面`, `β 拆 $a\\to b$ 两支自闭`, `$a, b$ 待分析`],
      answer: 2,
      explain: `$\\neg a$ 支与 $a$ 矛盾；$b$ 支与 $\\neg b$ 矛盾。`
    },
    {
      id: "q17",
      type: `mcq-multi`,
      points: 3,
      topic: `boolean`,
      q: `化简 $ab+a\\overline b+\\overline a b$ 时，哪些思路有效？`,
      options: [`提取 $a$ 得 $a(b+\\overline b)$`, `用 K-map 圈三个 1`, `把它误写成 $abc$`, `识别最终等价于 $a+b$`],
      answer: [0, 1, 3],
      explain: `$ab+a\\overline b=a$，再 $a+\\overline a b=a+b$。`
    },
    {
      id: "q18",
      type: `mcq`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb Z_{11}$ 中 $7 + 5 = ?$`,
      options: [`12`, `1`, `0`, `11`],
      answer: 1,
      explain: `$12 \\equiv 1 \\pmod{11}$。这是保留的少量基础计算，用来确认同余代表元。`
    },
    {
      id: "q19",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `Beth 树中 α 规则不分叉，β 规则分叉。`,
      answer: true,
      explain: `α: ∧, ¬∨, ¬→；β: ∨, →, ↔, ¬∧。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `若 $p$ 素数，$\\mathbb Z_p$ 中每个非零元都有乘法逆元。`,
      answer: true,
      explain: `$1\\le k\\le p-1$ 时 $\\gcd(k,p)=1$，因此存在 $k^{-1}$。`
    }
    ]
  },
  {
    id: "sim07",
    title: "Sim CC3 — 07 (混合 / 20 题 / 53 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$1/3$ 在十进制中有有限表示。`,
      answer: false,
      explain: `分母含 3 ∉ {2,5}。`
    },
    {
      id: "q2",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `Beth 树中遇 $\\neg\\neg a$ 应用双否消除得 $a$（α 规则）。`,
      answer: true,
      explain: `$\\neg\\neg$ 化简为原子。`
    },
    {
      id: "q3",
      type: `mcq`,
      points: 3,
      topic: `modular`,
      q: `$\\mathbb{Z}_{10}$ 中下面哪个有逆元？`,
      options: [`2`, `5`, `6`, `9`],
      answer: 3,
      explain: `$\\gcd(k,10)=1$ ⇒ $k\\in\\{1,3,7,9\\}$。`
    },
    {
      id: "q4",
      type: `mcq`,
      points: 3,
      topic: `float`,
      q: `IEEE 32 位浮点 overflow 时结果通常是？`,
      options: [`舍入到最大`, `$\\pm\\infty$`, `NaN`, `保持原值`],
      answer: 1,
      explain: `超出最大可表数 ⇒ $\\pm\\infty$。`
    },
    {
      id: "q5",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `若 $p=3,q=11$，为什么 $e=5$ 不合法？`,
      options: [`$n=33$ 太小`, `$5$ 与 $\\varphi(n)=20$ 不互素`, `$5$ 不是素数`, `$5$ 不能公开`],
      answer: 1,
      explain: `$\\varphi=20$，$\\gcd(5,20)=5$，所以不存在 $d=5^{-1}\\pmod{20}$。`
    },
    {
      id: "q6",
      type: `mcq`,
      points: 3,
      topic: `ca2`,
      q: `下列 8 位 CA2 加法哪个会溢出？`,
      options: [`$+50 + (-30)$`, `$+70 + (+60)$`, `$-70 + (-60)$`, `$+100 + (-100)$`],
      answer: 1,
      explain: `$130 > 127$；同号正+正变负 ⇒ 溢出。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 2,
      topic: `float`,
      q: `IEEE 64 位浮点有效尾数（含隐含位）宽度 = ?`,
      options: [`52 位`, `53 位`, `51 位`, `64 位`],
      answer: 1,
      explain: `隐含 1 + 存储 52 = 53。`
    },
    {
      id: "q8",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `学生把 $a+bc$ 化成 $(a+b)c$。正确诊断是？`,
      options: [`正确`, `错，应为 $(a+b)(a+c)$`, `错，应为 $ab+ac$`, `错，应为 $abc$`],
      answer: 1,
      explain: `布尔代数中 $a+bc=(a+b)(a+c)$，不能把 $c$ 强行提出。`
    },
    {
      id: "q9",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `若 $\\gcd(a,n) = d > 1$，$ax\\equiv b\\pmod n$ 有解 ⇔ $d|b$。`,
      answer: true,
      explain: `可解性定理。`
    },
    {
      id: "q10",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `从真值表构造 FND 时，应读取哪些行？`,
      options: [`$F=1$ 的行`, `$F=0$ 的行`, `变量全为 0 的行`, `任意两行`],
      answer: 0,
      explain: `FND 是析取范式，直接由使函数为真的 minterm 构成。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `K-map 中圈 1 得到的通常是哪种形式？`,
      options: [`FND / 和项之和`, `FNC / 积项之积`, `二进制补码`, `RSA 私钥`],
      answer: 0,
      explain: `圈 1 读出积项，再把积项相加，即 FND 思路。`
    },
    {
      id: "q12",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `化简布尔式时，哪一步最适合先做？$F=a b+a\\overline b$`,
      options: [`提取公共因子 $a$`, `直接画 4 变量 K-map`, `把 $a$ 取反`, `枚举 16 行`],
      answer: 0,
      explain: `$ab+a\\overline b=a(b+\\overline b)=a$；这题考方法选择。`
    },
    {
      id: "q13",
      type: `judge`,
      points: 2,
      topic: `ca2`,
      q: `8 位 CA2 中 $-128$ 有对应的正数 $+128$。`,
      answer: false,
      explain: `$+128 \\notin [-128, 127]$（CA2 不对称）。`
    },
    {
      id: "q14",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `给定公钥 $(n,e)=(33,3)$，明文 $m=5$。加密公式应写成？`,
      options: [`$c\\equiv 5^3\\pmod{33}$`, `$c\\equiv 3^5\\pmod{33}$`, `$c\\equiv 5^{33}\\pmod3$`, `$c\\equiv 33^3\\pmod5$`],
      answer: 0,
      explain: `RSA 加密是 $c=m^e\\bmod n$。`
    },
    {
      id: "q15",
      type: `mcq-multi`,
      points: 3,
      topic: `modular`,
      q: `在 $\\mathbb{Z}_{12}$ 中，下列哪些有乘法逆元？`,
      options: [`$1$`, `$5$`, `$6$`, `$7$`, `$11$`],
      answer: [0, 1, 3, 4],
      explain: `存在逆元 ⟺ $\\gcd(k, 12) = 1$。$6$ 不互质于 12，无逆元。`
    },
    {
      id: "q16",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `若攻击者知道 $n=pq$ 与 $\\varphi(n)$，就能恢复 $p,q$。`,
      answer: true,
      explain: `$p+q=n-\\varphi(n)+1$ 且 $pq=n$，可解二次方程恢复两个素因子。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 3,
      topic: `karnaugh`,
      q: `5 变量 K-map 中两页对应位置 4 元矩形分组合并后消去的变量 = ?`,
      answer: `e`,
      explain: `$e=0$ 与 $e=1$ 都覆盖 ⇒ 消去 $e$。`
    },
    {
      id: "q18",
      type: `mcq`,
      points: 3,
      topic: `beth`,
      q: `$a \\to (b \\lor c)$ 的 Beth 树第一步分支 = ?`,
      options: [`$\\neg a$ 单支`, `$b\\lor c$ 单支`, `$\\neg a$ | $(b\\lor c)$`, `$a \\land \\neg(b\\lor c)$`],
      answer: 2,
      explain: `$\\to$ 是 β 规则。`
    },
    {
      id: "q19",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `化 $F = ab + a\\overline b + \\overline a b$ = ?`,
      answer: `a + b`,
      explain: `$F = a(b+\\overline b) + \\overline a b = a + \\overline a b = a + b$。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$(0.408)_{10}$ 在二进制中有有限表示。`,
      answer: false,
      explain: `$0.408 = 51/125$；$125=5^3$ ⇒ 无限。`
    }
    ]
  },
  {
    id: "sim08",
    title: "Sim CC3 — 08 (混合 / 20 题 / 54 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `mcq-multi`,
      points: 3,
      topic: `boolean`,
      q: `下列哪些布尔等式正确？`,
      options: [`$a + ab = a$（吸收）`, `$a + \\overline a b = a + b$`, `$a(\\overline a + b) = ab$`, `$\\overline{a + b} = \\overline a + \\overline b$`],
      answer: [0, 1, 2],
      explain: `前 3 是基本律。第 4 错（De Morgan 应为 $\\overline{a+b} = \\overline a \\cdot \\overline b$）。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$\\{p\\to q, q\\to r\\} \\models r\\to p$？答 yes/no`,
      answer: `no`,
      explain: `反模型 $p=0,q=0,r=1$：前提满足，结论 $r\\to p = 0$ 假。`
    },
    {
      id: "q3",
      type: `mcq`,
      points: 2,
      topic: `beth`,
      q: `$\\neg(p\\to q)$ 展开后字面量 = ?`,
      options: [`$\\neg p, \\neg q$`, `$p, \\neg q$`, `$\\neg p, q$`, `$p, q$`],
      answer: 1,
      explain: `$\\neg(p\\to q) = p \\land \\neg q$。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `5 变量函数 minterm = {0,8,16,24} 最简 = ?`,
      answer: `ē`,
      explain: `0=00000, 8=01000, 16=10000, 24=11000；公因 $e=0$ ⇒ $F=\\overline e$。`
    },
    {
      id: "q5",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA $p=7,q=11,\\varphi=60$，哪个 $e$ 合法？`,
      options: [`6`, `10`, `13`, `15`],
      answer: 2,
      explain: `只有 $\\gcd(13,60)=1$。`
    },
    {
      id: "q6",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `⚠️ '$a \\equiv b \\pmod p$ 意思是 $p$ 是 $a$ 除以 $b$ 的余数'。`,
      answer: false,
      explain: `错误。正确：$p \\mid (a-b)$，即 $a, b$ 除 $p$ 余数相同。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 加密后得到密文 $c$，接收者用什么信息解密？`,
      options: [`私钥指数 $d$ 和模数 $n$`, `只用公钥 $e$`, `只用 $p+q$`, `只用明文 $m$`],
      answer: 0,
      explain: `解密公式是 $m\\equiv c^d\\pmod n$。`
    },
    {
      id: "q8",
      type: `mcq-multi`,
      points: 3,
      topic: `beth`,
      q: `$F$ 是重言式 ⇔ 下列哪些等价？`,
      options: [`真值表全 1`, `$\\{\\neg F\\}$ 的 Beth 树全闭`, `所有赋值满足`, `$\\models F$`],
      answer: [0, 1, 2, 3],
      explain: `都是等价刻画。`
    },
    {
      id: "q9",
      type: `subjective`,
      points: 4,
      topic: `float`,
      q: `$0.1 \\times 10 \\times 100$ 与 $0.1 \\times 1000$ 哪个更精确？`,
      answer: `前者更易累积误差；后者一次乘法误差更小。一般从大量级到小量级或反之要规划顺序。`,
      explain: `浮点乘法非可交换性导致中间结果舍入差异。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `4 变量函数 minterm={1,5,9,13} 最简 = ?`,
      answer: `c̄d`,
      explain: `1=0001,5=0101,9=1001,13=1101；公共 $cd=01$ ⇒ $\\overline c d$。`
    },
    {
      id: "q11",
      type: `fill`,
      points: 3,
      topic: `base`,
      q: `$(0.3)_{10}$ 转 base 2，循环节是？`,
      answer: `1001`,
      explain: `$(0.3)_{10} = (0.0\\overline{1001})_2$；循环节 $1001$。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `IEEE 754 单精度 32 位，$x = 1$ 的偏置指数（十进制）= ?`,
      answer: `127`,
      explain: `$x = 1.0 \\cdot 2^0$；偏置 = $0 + 127 = 127$。`
    },
    {
      id: "q13",
      type: `judge`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 中 $-90 + (-90)$ 会溢出。`,
      answer: true,
      explain: `$-180 < -128$；负+负变正 ⇒ 溢出。`
    },
    {
      id: "q14",
      type: `mcq`,
      points: 2,
      topic: `ca2`,
      q: `8 位 CA2 中 $100 + 50$ 的结果是？`,
      options: [`150（无溢出）`, `$-106$（溢出）`, `$+150$（首位 1 但有效）`, `0（错误）`],
      answer: 1,
      explain: `$150 \\notin [-128, 127]$；同号正+正得首位 1 ⇒ 溢出。结果二进制 $1001\\,0110$ 解读为 $-106$。`
    },
    {
      id: "q15",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `4 变量 K-map 四角格子之间相邻关系？`,
      options: [`完全不相邻`, `两两相邻`, `仅上下或左右`, `四角构成一个连通分组`],
      answer: 3,
      explain: `环面拓扑使四角相邻。`
    },
    {
      id: "q16",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$-5 \\bmod 12$ 的标准代表元 = ?`,
      answer: `7`,
      explain: `$-5 + 12 = 7$。`
    },
    {
      id: "q17",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `同学把 RSA 解密写成 $m\\equiv c^e\\pmod n$。问题是？`,
      options: [`解密应使用 $d$ 而非 $e$`, `不能取模`, `应模 $\\varphi(n)$`, `明文不能是数字`],
      answer: 0,
      explain: `加密用公钥指数 $e$，解密用私钥指数 $d$：$m\\equiv c^d\\pmod n$。`
    },
    {
      id: "q18",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$7/15$ 在 base 6 中是有限小数。`,
      answer: false,
      explain: `$15 = 3\\cdot 5$；$6 = 2\\cdot 3$；含质因子 5 ∉ {2,3} ⇒ 无限。`
    },
    {
      id: "q19",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `K-map 中圈选的优先目标是什么？`,
      options: [`尽量圈最大且合法的 $2^k$ 矩形`, `每个 1 单独成圈`, `只圈对角线`, `只圈第一行`],
      answer: 0,
      explain: `最大合法圈能消去最多变量，使表达式更简。`
    },
    {
      id: "q20",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb{Z}_{12}$ 中有逆元的元素集 = ?`,
      answer: `{1,5,7,11}`,
      explain: `$\\gcd(k,12)=1$ ⇒ $\\{1,5,7,11\\}$，共 $\\varphi(12)=4$ 个。`
    }
    ]
  },
  {
    id: "sim09",
    title: "Sim CC3 — 09 (混合 / 20 题 / 55 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `subjective`,
      points: 4,
      topic: `float`,
      q: `说明浮点运算的三大陷阱。`,
      answer: `(1) 精度丢失；(2) 非结合性；(3) 分配律失效`,
      explain: `(1) 小数被截断（如 $0.1$ 在二进制无限）；(2) $(a+b)+c \\neq a+(b+c)$（量级差异下舍入差异）；(3) $a(b+c)\\neq ab+ac$ 由舍入。`
    },
    {
      id: "q2",
      type: `mcq`,
      points: 2,
      topic: `modular`,
      q: `$n = pq$（$p,q$ 素），$\\varphi(n) = ?$`,
      options: [`$(p-1)(q-1)$`, `$n-1$`, `$(p-1)q$`, `$pq$`],
      answer: 0,
      explain: `Euler 函数乘性。`
    },
    {
      id: "q3",
      type: `mcq`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb{F}_5$ 中 $3x \\equiv 2 \\pmod 5$ 的解 = ?`,
      options: [`1`, `2`, `3`, `4`],
      answer: 3,
      explain: `$3^{-1}=2$（$3\\times 2=6\\equiv 1$）；$x = 2\\times 2 = 4$。验：$3\\times 4=12\\equiv 2$ ✓。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 4,
      topic: `float`,
      q: `8 位浮点 1+3+4：$[2^0, 2^1]$ 区间内有几个可表正规化数？`,
      answer: `16`,
      explain: `尾数 4 位 → $2^4=16$ 个值。`
    },
    {
      id: "q5",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `$\\varphi(12) = ?$（欧拉函数）`,
      answer: `4`,
      explain: `$12 = 2^2\\cdot 3$；$\\varphi(12) = 12(1-1/2)(1-1/3) = 4$。`
    },
    {
      id: "q6",
      type: `mcq-multi`,
      points: 3,
      topic: `rsa`,
      q: `RSA 小例子里哪些量通常需要保密？`,
      options: [`$p$`, `$q$`, `$d$`, `$e$`],
      answer: [0, 1, 2],
      explain: `$e$ 属于公钥可公开；$p,q,d$ 泄露会破坏安全。`
    },
    {
      id: "q7",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `$(a\\land b)\\lor(\\overline a\\land\\overline b)$ 的常用名 = ?`,
      answer: `XNOR 或 a ↔ b`,
      explain: `等价于双蕴含 $a\\leftrightarrow b$。`
    },
    {
      id: "q8",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `对 3 变量，FND 中 minterm $\\overline a b \\overline c$ 对应的二进制编号 = ?`,
      answer: `010`,
      explain: `$\\overline a = 0, b = 1, \\overline c = 0$ ⇒ $abc = 010 = m_2$。`
    },
    {
      id: "q9",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `Beth 演绎中公式集总能化为 CNF 进行树分析。`,
      answer: true,
      explain: `任意命题公式可化 CNF；Beth 树等价于在 CNF 上做归结。`
    },
    {
      id: "q10",
      type: `subjective`,
      points: 4,
      topic: `boolean`,
      q: `化简布尔式 $F = a\\overline b + ab + \\overline a b$，给出最简形式并简要说明。`,
      answer: `$F = a + b$`,
      explain: `$F = a(\\overline b + b) + \\overline a b = a + \\overline a b = a + b$（吸收律 $a + \\overline a b = a + b$）。`
    },
    {
      id: "q11",
      type: `fill`,
      points: 3,
      topic: `karnaugh`,
      q: `5 变量 K-map 跨两页的最大矩形分组 = ?（格子数）`,
      answer: `16`,
      explain: `每页最多 8（共 16 格中半数），跨页合并最多 16。`
    },
    {
      id: "q12",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `K-map 分组大小必须是 $1,2,4,8,\\ldots$。`,
      answer: true,
      explain: `分组大小必须是 $2^k$，并且形状是合法矩形。`
    },
    {
      id: "q13",
      type: `mcq-multi`,
      points: 3,
      topic: `rsa`,
      q: `关于 RSA 公钥/私钥，下列哪些正确？`,
      options: [`公钥常写 $(n,e)$`, `私钥可写 $(n,d)$`, `$e$ 可公开`, `$p,q$ 应公开`],
      answer: [0, 1, 2],
      explain: `$p,q$ 泄露后可算 $\\varphi(n)$，进而恢复私钥 $d$。`
    },
    {
      id: "q14",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(BAD)_{16}$ 转十进制 = ?`,
      answer: `2989`,
      explain: `$11 \\times 256 + 10 \\times 16 + 13 = 2989$。`
    },
    {
      id: "q15",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$G = (p+q\\overline{r})(p\\overline{q} + r)$ 化简：`,
      answer: `p`,
      explain: `展开后 $G = p\\overline{q} + pr = p(\\overline{q}+r)$；进一步并验真值表 → 化为 $p$ 形式。`
    },
    {
      id: "q16",
      type: `mcq-multi`,
      points: 3,
      topic: `rsa`,
      q: `下列哪些信息泄露会明显削弱 RSA？`,
      options: [`$p,q$`, `$\\varphi(n)$`, `私钥指数 $d$`, `公钥指数 $e$`],
      answer: [0, 1, 2],
      explain: `$e$ 本来公开；$p,q,\\varphi,d$ 任一类核心秘密泄露都会使解密可行。`
    },
    {
      id: "q17",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$(0.1)_3 = 1/3$ 在 base 9 中是有限小数。`,
      answer: true,
      explain: `$9 = 3^2$；分母质因子 $\\{3\\}\\subseteq\\{3\\}$ ⇒ 有限。$(0.3)_9$。`
    },
    {
      id: "q18",
      type: `mcq`,
      points: 2,
      topic: `ca2`,
      q: `8 位 CA2，$-(-128)$ 是？`,
      options: [`$+128$`, `$-128$（不可表）`, `0`, `溢出错误`],
      answer: 1,
      explain: `$+128 \\notin [-128, 127]$；CA2 不对称，$-128$ 无正对偶；运算结果仍是 $-128$ (取反+1 还是自身)。`
    },
    {
      id: "q19",
      type: `subjective`,
      points: 4,
      topic: `beth`,
      q: `用 Beth 树证 $\\Sigma = \\{a \\to (b \\lor c), \\neg(b \\lor c)\\} \\models \\neg a$。`,
      answer: `树全闭`,
      explain: `假设 $a$；$a\\to(b\\lor c)$ β拆 $\\neg a | (b\\lor c)$；左支与 $a$ 矛盾；右支与 $\\neg(b\\lor c)$ 矛盾 ⇒ 全闭。`
    },
    {
      id: "q20",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 表示 $-1$（二进制串）：`,
      answer: `11111111`,
      explain: `$-1$ 在 CA2 中为全 1。`
    }
    ]
  },
  {
    id: "sim10",
    title: "Sim CC3 — 10 (混合 / 20 题 / 54 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(75)_8$ 转 base 16 = ?`,
      answer: `3D`,
      explain: `$(75)_8 = 111\\,101_2 = (3D)_{16}$。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `$\\mathbb{Z}_9$ 中 $5^{-1} = ?$`,
      answer: `2`,
      explain: `$5\\times 2 = 10 \\equiv 1\\pmod 9$。`
    },
    {
      id: "q3",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `化简 $F = \\overline{(a+\\overline b)(b+\\overline c)c}$ = ?`,
      answer: `ā + b̄ + c̄`,
      explain: `De Morgan：$\\overline{XYZ} = \\overline X + \\overline Y + \\overline Z$；化简后再合并。`
    },
    {
      id: "q4",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `RSA 私钥 $d$ 满足 $ed\\equiv 1\\pmod n$。`,
      answer: false,
      explain: `应是 mod $\\varphi(n)$，**不是** mod $n$（高频陷阱）。`
    },
    {
      id: "q5",
      type: `judge`,
      points: 2,
      topic: `float`,
      q: `浮点加法满足结合律：$(a + b) + c = a + (b + c)$。`,
      answer: false,
      explain: `**不结合**。CC2 经典：当 $|a| \\gg |b|, |c|$ 时小数被吞，先后加结果不同。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 表示 $-25$ = ?`,
      answer: `11100111`,
      explain: `$25 = 0001\\,1001$；取反 + 1 = $1110\\,0111$。`
    },
    {
      id: "q7",
      type: `judge`,
      points: 3,
      topic: `boolean`,
      q: `$\\Sigma = \\{a \\to b, \\neg b\\} \\models \\neg a$（modus tollens）？`,
      answer: true,
      explain: `Beth 树两分支全闭。`
    },
    {
      id: "q8",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `若 $p$ 素数，$\\mathbb Z_p$ 中每个非零元都有逆元。`,
      answer: true,
      explain: `Bézout：$\\gcd(k,p)=1$ 对所有 $1\\le k\\le p-1$。`
    },
    {
      id: "q9",
      type: `subjective`,
      points: 4,
      topic: `rsa`,
      q: `为什么课堂上的 RSA 例子通常选很小的 $p,q$，而真实应用不能这样做？`,
      answer: `小数便于手算流程；真实应用若 $n$ 太小会被快速分解，从而算出 $\\varphi$ 和 $d$。`,
      explain: `重点是区分教学例子和安全参数。`
    },
    {
      id: "q10",
      type: `mcq`,
      points: 2,
      topic: `boolean`,
      q: `$F = \\neg(p\\to q) \\to p$ 的 FND 最简 = ?`,
      options: [`$1$（恒真）`, `$p\\lor q$`, `$\\neg(p\\land q)$`, `$0$`],
      answer: 0,
      explain: `$\\neg(p\\to q) = p\\land\\neg q$；$(p\\land\\neg q)\\to p$ 恒真。`
    },
    {
      id: "q11",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `IEEE 754 单精度的 bias = ?`,
      answer: `127`,
      explain: `32 位 = 1+8+23；指数 8 位 → bias = $2^7 - 1 = 127$。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(123)_8$ 转十进制 = ?`,
      answer: `83`,
      explain: `$1\\cdot 64 + 2\\cdot 8 + 3 = 83$。`
    },
    {
      id: "q13",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb Z_6$ 中 $3x\\equiv 3\\pmod 6$ 有唯一解。`,
      answer: false,
      explain: `$\\gcd(3,6)=3$ ⇒ 3 个解：$\\{1,3,5\\}$。`
    },
    {
      id: "q14",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `K-map 中同一个 1 可以被多个分组覆盖。`,
      answer: true,
      explain: `重复覆盖允许，常用于得到更大的圈或覆盖必要项。`
    },
    {
      id: "q15",
      type: `mcq`,
      points: 3,
      topic: `karnaugh`,
      q: `K-map 中圈 0 得到的通常是哪种形式？`,
      options: [`FNC`, `FND`, `补码`, `校验码`],
      answer: 0,
      explain: `圈 0 读出和项，最后合取，得到 FNC。`
    },
    {
      id: "q16",
      type: `subjective`,
      points: 4,
      topic: `modular`,
      q: `证费马小定理：$p$ 素 ∧ $\\gcd(a,p)=1$ ⇒ $a^{p-1}\\equiv 1\\pmod p$。`,
      answer: `由欧拉定理，$\\varphi(p)=p-1$；$a^{\\varphi(p)} = a^{p-1} \\equiv 1 \\pmod p$。`,
      explain: `费马是欧拉在素数情形的特例。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `12 位 CA2 中 $-2048$ = ?`,
      answer: `100000000000`,
      explain: `$-2048 = -2^{11}$ ⇒ $1\\,0000\\,0000\\,0000$。`
    },
    {
      id: "q18",
      type: `judge`,
      points: 4,
      topic: `beth`,
      q: `$F = (a \\to b) \\to ((c \\to a) \\to (c \\to b))$ 是重言式。`,
      answer: true,
      explain: `蕴含传递的形式化，Beth 树全闭。`
    },
    {
      id: "q19",
      type: `fill`,
      points: 3,
      topic: `rsa`,
      q: `RSA 中给 $\\varphi(n) = 40, e = 7$。$d \\equiv ?$ (mod 40)`,
      answer: `23`,
      explain: `$7d \\equiv 1 \\pmod{40}$；扩欧 $d = 23$（验 $7 \\cdot 23 = 161 = 4 \\cdot 40 + 1$）。**注意 mod $\\varphi$ 不是 mod $n$**。`
    },
    {
      id: "q20",
      type: `mcq`,
      points: 3,
      topic: `beth`,
      q: `小数 $5/12$ 在哪些进制中有有限展开？`,
      options: [`仅 base 6 和 base 12`, `仅 base 2`, `base 2,6,12 都有`, `都没有`],
      answer: 0,
      explain: `$12 = 2^2 \\times 3$；分母质因子集 $\\{2,3\\}$ 须 $\\subseteq$ 进制质因子集。`
    }
    ]
  },
  {
    id: "sim11",
    title: "Sim CC3 — 11 (混合 / 20 题 / 57 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `$11^{20} \\bmod 7 = ?$`,
      answer: `2`,
      explain: `$11\\equiv 4$；费马 $4^6\\equiv 1$；$20=3\\cdot 6+2$ ⇒ $4^2=16\\equiv 2$。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 2,
      topic: `karnaugh`,
      q: `Karnaugh 4 变量表中，单项最大圈大小 = $2^?$`,
      answer: `4`,
      explain: `$2^4 = 16$ 总格；最大单项圈含 $2^4 = 16$ 项时为常 1，1 个 littéral 圈 $= 2^3 = 8$ 项；常用最大有效圈 $= 8 = 2^3$。`
    },
    {
      id: "q3",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(101010101)_2$ 转 base 16 = ?`,
      answer: `155`,
      explain: `分组（从右每 4 位）：$0001\\,0101\\,0101 = (155)_{16}$。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `格雷码 4 位中，$0110$ 之后是？`,
      answer: `0111`,
      explain: `格雷码 0,1,3,2,6,7,5,4,12,13,15,14,10,11,9,8 → $0110 = 6$ 后是 $0111 = 7$ 的格雷形 = $0100$？等等：标准 4 位格雷码 0=0000, 1=0001, 2=0011, 3=0010, 4=0110, 5=0111, ... ⇒ $0110$ 是 4，下一个是 $0111$（即 5）。`
    },
    {
      id: "q5",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `化简 $F = (\\overline{a} + b)(a + \\overline{c})(b + c)$ 的最简 = ?`,
      answer: `ab + bc̄`,
      explain: `展开消重，得 $b(a + \\overline c)$ 形式。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 2,
      topic: `ca2`,
      q: `8 位 CA2 中 $-50 + 100$ 十进制结果 = ?`,
      answer: `50`,
      explain: `异号加法不会溢出；结果直接为 $50$。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 2,
      topic: `modular`,
      q: `$\\mathbb Z_{13}$ 中 $2^{-1}\\cdot 3^{-1} = ?$`,
      options: [`$6^{-1}$`, `$18^{-1}$`, `$5^{-1}$`, `$8$`],
      answer: 0,
      explain: `$(ab)^{-1} = a^{-1}b^{-1}$。`
    },
    {
      id: "q8",
      type: `mcq-multi`,
      points: 2,
      topic: `ca2`,
      q: `关于 CA2 溢出，下列正确的是？`,
      options: [`异号加法永不溢出`, `同号加结果变号 ⇒ 溢出`, `减法可用加补码判溢出`, `比较符号位即可判定`],
      answer: [0, 1, 2],
      explain: `比较符号位不充分；正确判定看输入符号 + 输出符号。`
    },
    {
      id: "q9",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$7^{100} \\bmod 13 = ?$`,
      answer: `9`,
      explain: `费马 $7^{12}\\equiv 1$；$100 = 8\\cdot 12 + 4$；$7^4 = 2401 \\equiv 9 \\pmod{13}$。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `5 变量 minterm={2,6,18,22} 最简表达式（共同字段）= ?`,
      answer: `cd̄ē 或 cde̅ 形式（$c=0,d=1,e=0$ 公共）`,
      explain: `2=00010,6=00110,18=10010,22=10110；$a$ 不固定，$b$ 不固定，$cde$ 部分公共 = $010$ ⇒ $\\overline c d \\overline e$。`
    },
    {
      id: "q11",
      type: `subjective`,
      points: 4,
      topic: `karnaugh`,
      q: `用 Karnaugh 化简 $F(a,b,c) = \\sum m(0, 2, 4, 6)$（即偶数 minterm 全 1）。`,
      answer: `$F = \\overline c$`,
      explain: `0=000, 2=010, 4=100, 6=110；这些都是 $c=0$ 的行 ⇒ $F = \\overline c$。`
    },
    {
      id: "q12",
      type: `judge`,
      points: 4,
      topic: `beth`,
      q: `$((p\\leftrightarrow q)\\land(q\\leftrightarrow r))\\to(p\\leftrightarrow r)$ 是重言式。`,
      answer: true,
      explain: `等价关系传递性。`
    },
    {
      id: "q13",
      type: `subjective`,
      points: 4,
      topic: `float`,
      q: `$x_1=1.0, x_2=x_3=0.0625$（8 位浮点）。比较 $(x_1+x_2)+x_3$ 与 $x_1+(x_2+x_3)$。`,
      answer: `(a) = 1.0；(b) = 1.125；非结合性`,
      explain: `(a) $1+0.0625$ 时 $0.0625$ 因尾数精度被舍去 → 1.0，再 +0.0625 仍 1.0。(b) $0.0625+0.0625=0.125$ 可表 → $1+0.125=1.125$。证明浮点加法非结合。`
    },
    {
      id: "q14",
      type: `fill`,
      points: 2,
      topic: `rsa`,
      q: `RSA $m=5, e=3, n=33$；$c = ?$`,
      answer: `26`,
      explain: `$5^3 = 125 = 3\\cdot 33 + 26 \\equiv 26\\pmod{33}$。`
    },
    {
      id: "q15",
      type: `subjective`,
      points: 4,
      topic: `beth`,
      q: `用 Beth 证 $\\{p\\to(q\\to r), \\neg r, p\\} \\models \\neg q$。`,
      answer: `树全闭`,
      explain: `假设 $q$；从 $p, p\\to(q\\to r)$ ⇒ $q\\to r$；从 $q$ ⇒ $r$；与 $\\neg r$ 矛盾。`
    },
    {
      id: "q16",
      type: `mcq`,
      points: 3,
      topic: `rsa`,
      q: `RSA 安全性主要依赖：`,
      options: [`AES 混合`, `大素数因式分解困难`, `$e$ 足够大`, `密钥对数`],
      answer: 1,
      explain: `因式分解 $n = pq$ 的难度是 RSA 核心。`
    },
    {
      id: "q17",
      type: `subjective`,
      points: 5,
      topic: `rsa`,
      q: `RSA 中给 $p = 5, q = 11, e = 3$。求 $n, \\varphi, d$。`,
      answer: `$n = 55$, $\\varphi = 40$, $d = 27$`,
      explain: `$n = pq = 55$；$\\varphi = 4 \\cdot 10 = 40$；$3d \\equiv 1 \\pmod{40}$；扩欧：$d = 27$（验 $3 \\cdot 27 = 81 = 2 \\cdot 40 + 1$）。⚠️ $d \\bmod \\varphi$ 不是 $\\bmod n$！`
    },
    {
      id: "q18",
      type: `fill`,
      points: 3,
      topic: `base`,
      q: `$(2024)_{10}$ 转 base 16（大写）= ?`,
      answer: `7E8`,
      explain: `$2024 = 7 \\times 256 + 14 \\times 16 + 8 = (7E8)_{16}$。`
    },
    {
      id: "q19",
      type: `mcq`,
      points: 2,
      topic: `float`,
      q: `8 位浮点中 $1.0 + 0.0625 + 0.0625 + 0.0625$ 最接近？`,
      options: [`1.0`, `1.1875`, `1.25`, `1.3125`],
      answer: 0,
      explain: `每次加 $0.0625$ 时小数被截断；累计误差导致结果回到 1.0。`
    },
    {
      id: "q20",
      type: `subjective`,
      points: 3,
      topic: `boolean`,
      q: `化 $F = \\overline{p \\land (q \\to r)}$ 为仅用 $\\neg, \\lor$ 形式。`,
      answer: `$\\overline p \\lor (q \\land \\overline r)$`,
      explain: `$p \\land (q \\to r) = p \\land (\\neg q \\lor r)$；取反 + De Morgan = $\\overline p \\lor (q \\land \\overline r)$。`
    }
    ]
  },
  {
    id: "sim12",
    title: "Sim CC3 — 12 (混合 / 20 题 / 53 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `judge`,
      points: 3,
      topic: `boolean`,
      q: `$\\{p\\lor q, \\neg p\\lor r\\} \\models q\\lor r$。`,
      answer: true,
      explain: `Resolution / Beth 全闭；分情况：$p$ 真 → $r$；$q$ 真 → $q$。`
    },
    {
      id: "q2",
      type: `subjective`,
      points: 4,
      topic: `beth`,
      q: `证明 $((p \\to q) \\land (q \\to r)) \\to (p \\to r)$ 是重言式（用 Beth 树）。`,
      answer: `Beth 树全闭`,
      explain: `$\\neg F = (p\\to q) \\land (q\\to r) \\land p \\land \\neg r$；β $(p\\to q)$：$\\neg p|q$
  - $\\neg p$ ⊗ ($p$ 矛盾)
  - $q$: β $(q\\to r)$: $\\neg q$⊗ | $r$⊗
全闭 ✓。`
    },
    {
      id: "q3",
      type: `fill`,
      points: 2,
      topic: `rsa`,
      q: `RSA $p=5, q=7, e=5$；公钥 = ?（写成 (n,e)）`,
      answer: `(35,5)`,
      explain: `$n = pq = 35$。`
    },
    {
      id: "q4",
      type: `judge`,
      points: 3,
      topic: `boolean`,
      q: `$\\mathbb{Z}_8$ 中 $4x\\equiv 2$ 有解吗？`,
      answer: false,
      explain: `$\\gcd(4,8)=4 \\nmid 2$ ⇒ 无解。`
    },
    {
      id: "q5",
      type: `judge`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 中 $60 + 80$ 会溢出。`,
      answer: true,
      explain: `$140 > 127$；同号正+正首位变 1 ⇒ 溢出。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `$\\mathbb{Z}_8$ 中解 $3x \\equiv 5 \\pmod{8}$；$x=?$`,
      answer: `7`,
      explain: `$3^{-1}=3$（因 $3\\times 3=9\\equiv 1$）；$x=3\\times 5=15\\equiv 7$。`
    },
    {
      id: "q7",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `解 $5x \\equiv 7 \\pmod{11}$；$x=?$`,
      answer: `8`,
      explain: `$5^{-1}=9$（$5\\times 9=45\\equiv 1$）；$x = 9\\times 7=63\\equiv 8$。`
    },
    {
      id: "q8",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `$(p \\to q) \\to p$ 是重言式。`,
      answer: false,
      explain: `$p=q=F$ 时：$F\\to F = T$；$T\\to F = F$。Peirce 公式非重言。`
    },
    {
      id: "q9",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `Karnaugh 表的左右边界 / 上下边界是相邻的（环面拓扑）。`,
      answer: true,
      explain: `用格雷码确保物理相邻，边界首尾仅差 1 位。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(2026)_{10}$ 转 base 2 = ?（不带前缀）`,
      answer: `11111101010`,
      explain: `$2026 = 1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2^{10}+2^9+\\ldots$；标准除 2 法可验。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 2,
      topic: `ca2`,
      q: `16 位 CA2 中 $-32768$ 的编码 = ?`,
      options: [`$0111\\ldots 1111$`, `$1000\\ldots 0000$`, `$1111\\ldots 1111$`, `$1000\\ldots 0001$`],
      answer: 1,
      explain: `$-2^{15}$ ⇒ 符号位 1，其余 0。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `化简 $\\overline{(\\overline a \\lor b)\\land(a\\lor\\overline b)}$ = ?`,
      answer: `a ⊕ b`,
      explain: `De Morgan + 简化：$= (a\\land\\overline b)\\lor(\\overline a\\land b) = a\\oplus b$。`
    },
    {
      id: "q13",
      type: `subjective`,
      points: 3,
      topic: `float`,
      q: `12 位浮点 1+4+7, bias=8。$[2^5, 2^6]$ 内相邻可表数间隔 = ?`,
      answer: `$2^{-2} = 0.25$`,
      explain: `尾数 7 位精度 = $2^{-7}$；区间精度 = $2^5 \\cdot 2^{-7} = 2^{-2}$。`
    },
    {
      id: "q14",
      type: `mcq-multi`,
      points: 3,
      topic: `rsa`,
      q: `关于 RSA，下列哪些正确？`,
      options: [`公钥 $(n,e)$，私钥 $(n,d)$`, `$\\gcd(e,\\varphi(n))=1$`, `$c \\equiv m^e\\pmod n$`, `$d \\equiv e^{-1}\\pmod n$`],
      answer: [0, 1, 2],
      explain: `(D) 错：$d \\equiv e^{-1}\\pmod{\\varphi(n)}$。`
    },
    {
      id: "q15",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `⚠️ $0.7$ 在 base 2 中是有限小数。`,
      answer: false,
      explain: `CC2 经典陷阱。$0.7 = 7/10 = 7/(2\\cdot 5)$；含 5 ⇒ 无限循环。`
    },
    {
      id: "q16",
      type: `mcq`,
      points: 2,
      topic: `rsa`,
      q: `RSA 安全性主要基于：`,
      options: [`乘法难`, `大数分解难`, `模运算复杂`, `指数增长`],
      answer: 1,
      explain: `因式分解 $n = pq$ 的计算困难性。`
    },
    {
      id: "q17",
      type: `subjective`,
      points: 3,
      topic: `modular`,
      q: `陈述费马小定理。`,
      answer: `若 $p$ 质数且 $\\gcd(a,p)=1$，则 $a^{p-1} \\equiv 1 \\pmod{p}$。`,
      explain: `等价形式：$a^p \\equiv a \\pmod{p}$ 对任意 $a$ 成立（不要求互质）。`
    },
    {
      id: "q18",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `12 位浮点 1+4+7 隐含位，bias=8。$-7.5$ 编码 = ?`,
      answer: `111111110000`,
      explain: `$7.5 = (0.1111)_2 \\times 2^3$；exp=3+8=11=$1011$；mant=$1110000$；符号 1 ⇒ $1\\,1011\\,1110000$。`
    },
    {
      id: "q19",
      type: `subjective`,
      points: 4,
      topic: `boolean`,
      q: `化简 $F = \\overline{(a + \\overline b) \\cdot (\\overline a + b)}$（用 De Morgan + 化简）。`,
      answer: `$F = a \\oplus b$`,
      explain: `$F = \\overline{a + \\overline b} + \\overline{\\overline a + b} = \\overline a b + a \\overline b = a \\oplus b$。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 2,
      topic: `karnaugh`,
      q: `Karnaugh 图中对角相邻的格可直接相圈。`,
      answer: false,
      explain: `Karnaugh 圈仅按边相邻（Hamming 距 1）；对角距 2 不能。`
    }
    ]
  },
  {
    id: "sim13",
    title: "Sim CC3 — 13 (混合 / 20 题 / 55 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `$4x \\equiv 5 \\pmod{12}$ 有解。`,
      answer: false,
      explain: `$\\gcd(4,12)=4 \\nmid 5$ ⇒ 无解。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 3,
      topic: `rsa`,
      q: `RSA $p=7, q=13, e=5$；$d \\bmod 72 = ?$`,
      answer: `29`,
      explain: `$\\varphi = 6\\times 12 = 72$；扩欧解 $5d\\equiv 1 \\pmod{72}$ ⇒ $d=29$。`
    },
    {
      id: "q3",
      type: `subjective`,
      points: 3,
      topic: `boolean`,
      q: `真值表 $F=1$ 在 $\\{(000),(011),(100),(111)\\}$；识别模式。`,
      answer: `$F = \\overline{a \\oplus b \\oplus c}$（偶校验）`,
      explain: `$F=1$ 当 $a,b,c$ 中 1 的个数为偶数（含 0）⇒ 反 XOR。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `16 位 CA2 中 $32767 + 1$ = ?（十进制）`,
      answer: `-32768`,
      explain: `$32768 \\notin [-32768, 32767]$；同号正+正变负 ⇒ 溢出，结果按位读 = $-32768$。`
    },
    {
      id: "q5",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$0.1_{10}$ 在 base 2 中是有限小数。`,
      answer: false,
      explain: `$0.1 = 1/10 = 1/(2 \\cdot 5)$；含 5 ∉ $\\{2\\}$ ⇒ **无限循环**。CC2 经典陷阱。`
    },
    {
      id: "q6",
      type: `mcq`,
      points: 2,
      topic: `karnaugh`,
      q: `Karnaugh 4 变量 minterm={0,1,2,3,8,9,10,11} 最简 = ?`,
      options: [`$a + b$`, `$\\overline b$`, `$a\\overline b$`, `$b$`],
      answer: 1,
      explain: `所有 minterm 中 $b=0$ ⇒ $F = \\overline b$。`
    },
    {
      id: "q7",
      type: `mcq-multi`,
      points: 3,
      topic: `float`,
      q: `关于浮点运算精度，下列正确的是？`,
      options: [`所有实数浮点中都有舍入误差`, `浮点加法满足结合律`, `Denormal 数扩展可表范围`, `NaN 与自身相等`],
      answer: [0, 2],
      explain: `(B) 错（非结合）；(D) 错（NaN ≠ NaN）。`
    },
    {
      id: "q8",
      type: `judge`,
      points: 2,
      topic: `base`,
      q: `$0.7_{10}$ 在 base 2 中是有限小数。`,
      answer: false,
      explain: `$0.7 = 7/10 = 7/(2 \\cdot 5)$；含 5 ∉ $\\{2\\}$ ⇒ **无限**。`
    },
    {
      id: "q9",
      type: `judge`,
      points: 3,
      topic: `beth`,
      q: `$F = (a \\lor b) \\land (\\neg a \\lor c)$ 是重言式吗？`,
      answer: false,
      explain: `$a=b=c=0$ 时 $F=0$，反例存在。`
    },
    {
      id: "q10",
      type: `fill`,
      points: 5,
      topic: `rsa`,
      q: `RSA 小模攻击 $(n,e)=(35,5), c=10$。明文 $m = ?$`,
      answer: `5`,
      explain: `$35 = 5\\times 7$；$\\varphi=24$；$5d\\equiv 1\\pmod{24}$ ⇒ $d=5$；$m = 10^5 \\bmod 35 = 5$。说明小模数易破，需 $n > 2^{1024}$。`
    },
    {
      id: "q11",
      type: `mcq`,
      points: 3,
      topic: `ca2`,
      q: `下列哪个 8 位 CA2 运算会溢出？`,
      options: [`$-100 + (-50)$`, `$50 + 40$`, `$60 - 30$`, `$127 - 50$`],
      answer: 0,
      explain: `$-150 < -128$；同号负+负变正 ⇒ 溢出。`
    },
    {
      id: "q12",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `$(11.101)_4$ 在 base 2 中有有限展开。`,
      answer: true,
      explain: `$4 = 2^2$，质因子集 $\\{2\\}\\subseteq\\{2\\}$。`
    },
    {
      id: "q13",
      type: `fill`,
      points: 2,
      topic: `boolean`,
      q: `$F(a,b,c) = a\\oplus b\\oplus c$ 的 minterm 个数 = ?`,
      answer: `4`,
      explain: `三变量 1 个数为奇时 $F=1$ ⇒ minterm $\\{1,2,4,7\\}$ 共 4 个。`
    },
    {
      id: "q14",
      type: `judge`,
      points: 2,
      topic: `rsa`,
      q: `RSA 中若攻击者知 $\\varphi(n)$ 和 $n$，可分解 $n = pq$。`,
      answer: true,
      explain: `由 $p+q = n - \\varphi + 1$ 与 $pq = n$ 解二次方程。`
    },
    {
      id: "q15",
      type: `subjective`,
      points: 5,
      topic: `karnaugh`,
      q: `Karnaugh 4 变量 minterm={0,1,4,5,6,7,8,9}；FND 最简 = ?`,
      answer: `$\\overline a b + \\overline b\\overline c$（或等价形式）`,
      explain: `K-map 圈 $\\overline a b$（minterm 4,5,6,7）+ $\\overline b\\overline c$（minterm 0,1,8,9）。`
    },
    {
      id: "q16",
      type: `judge`,
      points: 3,
      topic: `boolean`,
      q: `$\\{a\\to(b\\land c), \\neg b\\lor d, c\\to\\neg d\\} \\models \\neg a$。`,
      answer: true,
      explain: `假设 $a$ ⇒ 得 $b, c$；$\\neg b\\lor d$ 必取 $d$；$c\\to\\neg d$ 取 $\\neg d$，矛盾。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$\\varphi(100) = ?$`,
      answer: `40`,
      explain: `$100 = 2^2\\cdot 5^2$；$100\\cdot 1/2\\cdot 4/5 = 40$。`
    },
    {
      id: "q18",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$2^{-1} \\bmod 19 = ?$`,
      answer: `10`,
      explain: `$2\\cdot 10 = 20 \\equiv 1\\pmod{19}$。`
    },
    {
      id: "q19",
      type: `mcq`,
      points: 3,
      topic: `float`,
      q: `浮点表示中减小 bias 会导致：`,
      options: [`增大可表最大数`, `增大最小正规化数`, `减小可表最大数`, `无影响`],
      answer: 2,
      explain: `bias 减小 ⇒ 实际指数 $E - $ bias 范围下移 ⇒ 最大值减小。`
    },
    {
      id: "q20",
      type: `mcq-multi`,
      points: 3,
      topic: `boolean`,
      q: `⚠️ 关于 $\\mathbb{Z}_n$（$n$ 非质数），下列正确的有？`,
      options: [`每个非零元都有逆元`, `可能存在零因子`, `$x^n = x$ 不一定成立`, `$ax = b$ 可能多解或无解`],
      answer: [1, 2, 3],
      explain: `合环非域：逆元仅存在于与 $n$ 互质的元素；零因子常见；费马形式失效。`
    }
    ]
  },
  {
    id: "sim14",
    title: "Sim CC3 — 14 (混合 / 20 题 / 55 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `subjective`,
      points: 4,
      topic: `karnaugh`,
      q: `用 Karnaugh 化简 $F(a,b,c,d) = \\sum m(0,1,4,5,8,9,12,13)$。`,
      answer: `$F = \\overline c$`,
      explain: `这 8 个 minterm 二进制 cd 部分都是 00 或 01 ⇒ $c = 0$ ⇒ $F = \\overline c$。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 2,
      topic: `karnaugh`,
      q: `Karnaugh 4 变量 minterm={0,4,8,12} 最简 = ?`,
      answer: `c̄d̄`,
      explain: `全部 minterm 满足 $c=0, d=0$ ⇒ $\\overline c \\overline d$。`
    },
    {
      id: "q3",
      type: `mcq`,
      points: 2,
      topic: `ca2`,
      q: `⚠️ 8 位 CA2 中 $-(-128)$ 的情况？`,
      options: [`= 128，可表`, `= $-128$，溢出`, `超出范围，不可表`, `无法定义`],
      answer: 2,
      explain: `CA2 不对称：范围 $[-128, 127]$；$128 \\notin$ 范围。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 中，$-45$ 的编码（不带空格，二进制串）：`,
      answer: `11010011`,
      explain: `$45 = 0010\\,1101$；取反 = $1101\\,0010$；+1 = $1101\\,0011$。`
    },
    {
      id: "q5",
      type: `mcq-multi`,
      points: 2,
      topic: `boolean`,
      q: `关于吸收律 $a + ab = a$，下列正确的是？`,
      options: [`可由分配律 + 恒等式推导`, `对偶为 $a(a+b)=a$`, `$\\mathbb F_2$ 中不成立`, `需 De Morgan`],
      answer: [0, 1],
      explain: `吸收律普遍成立，不需要 De Morgan；对偶形式同样成立。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 3,
      topic: `rsa`,
      q: `小模数 RSA $n = 91$。$\\varphi(n) = ?$`,
      answer: `72`,
      explain: `$91 = 7\\cdot 13$；$\\varphi = 6\\cdot 12 = 72$。`
    },
    {
      id: "q7",
      type: `fill`,
      points: 2,
      topic: `float`,
      q: `8 位浮点 1+3+4 隐含位，码 $0\\,000\\,0000$ 表示 $2^?$`,
      answer: `-5`,
      explain: `exp = 0 - 4(bias) = -4；mant = $0.10000$ ⇒ $x = 2^{-5}$。`
    },
    {
      id: "q8",
      type: `judge`,
      points: 3,
      topic: `base`,
      q: `$(0.125)_{10}$ 在 base 2 中有限。`,
      answer: true,
      explain: `$0.125 = 1/8 = 2^{-3} = (0.001)_2$。`
    },
    {
      id: "q9",
      type: `fill`,
      points: 3,
      topic: `rsa`,
      q: `⚠️ RSA $(p,q,e)=(11,23,7)$。$d$ 满足 $de\\equiv 1$ mod 几？`,
      answer: `220 (即 φ(n))`,
      explain: `$\\varphi = 10\\times 22 = 220$；常见错误：写成 mod $n=253$。`
    },
    {
      id: "q10",
      type: `mcq`,
      points: 3,
      topic: `boolean`,
      q: `$F = \\sum m(1, 3, 5, 7)$（3 变量 $a,b,c$）化简为？`,
      options: [`$c$`, `$\\overline c$`, `$a$`, `$abc$`],
      answer: 0,
      explain: `minterm 1,3,5,7 二进制末位都 1 ⇒ $c = 1$ 的所有行 ⇒ $F = c$。`
    },
    {
      id: "q11",
      type: `subjective`,
      points: 4,
      topic: `rsa`,
      q: `为何 RSA 中 $d$ 必须满足 $ed\\equiv 1\\pmod{\\varphi(n)}$ 而非 mod $n$？`,
      answer: `解密 $c^d = m^{ed} = m^{1+k\\varphi(n)} = m\\cdot(m^{\\varphi(n)})^k \\equiv m\\pmod n$（欧拉定理）。仅 mod $\\varphi$ 才能消去额外指数。`,
      explain: `mod $n$ 无周期保证，解密失败。`
    },
    {
      id: "q12",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `8 位浮点 1+4+3, bias=8, 隐含位。$0.5$ 编码 = ?`,
      answer: `01000000`,
      explain: `$0.5 = (0.1)_2 \\times 2^0$；exp=0+8=8=$1000$；mant=$000$ ⇒ $0\\,1000\\,000$。`
    },
    {
      id: "q13",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$F(p,q,r)$ 真值表：$1$ 出现在 $(0,0,0),(0,1,1),(1,0,0),(1,1,1)$。模式 = ?`,
      answer: `p ↔ (q ↔ r) 或反 XOR`,
      explain: `$1$ 当变量真值数为偶（含 0 个 1）；等价于 $\\overline{p\\oplus q\\oplus r}$。`
    },
    {
      id: "q14",
      type: `mcq`,
      points: 2,
      topic: `base`,
      q: `$33/40$ 在 base 10 中是？`,
      options: [`有限`, `无限`, `取决于精度`, `无法判断`],
      answer: 0,
      explain: `$40 = 2^3 \\cdot 5$；分母质因子 $\\subseteq \\{2,5\\}$ ⇒ 有限。`
    },
    {
      id: "q15",
      type: `mcq-multi`,
      points: 3,
      topic: `beth`,
      q: `Beth 树中下面哪些是 α 规则（非分叉）？`,
      options: [`$a \\land b$`, `$a \\lor b$`, `$\\neg(a \\to b)$`, `$a \\to b$`, `$\\neg(a \\lor b)$`],
      answer: [0, 2, 4],
      explain: `α 不分叉：$\\land$（合取）、$\\neg(\\lor)$、$\\neg(\\to)$、$\\neg \\neg$。β 分叉：$\\lor, \\to, \\leftrightarrow, \\neg(\\land)$。`
    },
    {
      id: "q16",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `证 $n^5 - n \\equiv 0 \\pmod{30}$ 关键定理 = ?`,
      answer: `费马小定理 + CRT`,
      explain: `$30 = 2\\cdot 3\\cdot 5$，分别 mod 2,3,5 用费马，再合并。`
    },
    {
      id: "q17",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$\\mathbb{Z}_{15}$ 中 $7^{-1} = ?$`,
      answer: `13`,
      explain: `$7\\times 13=91 = 6\\times 15 + 1 \\equiv 1$。`
    },
    {
      id: "q18",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `$3^{100} \\bmod 11 = ?$`,
      answer: `1`,
      explain: `费马：$3^{10}\\equiv 1\\pmod{11}$；$100=10\\times 10$ ⇒ $1$。`
    },
    {
      id: "q19",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `求 $7^{-1} \\bmod 13$ = ?`,
      answer: `2`,
      explain: `$7\\times 2=14\\equiv 1\\pmod{13}$。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `$((p\\to q)\\land(\\neg p\\to q))\\to q$ 是重言式。`,
      answer: true,
      explain: `无论 $p$ 真假，皆推出 $q$；Beth 树全闭。`
    }
    ]
  },
  {
    id: "sim15",
    title: "Sim CC3 — 15 (混合 / 20 题 / 57 分)",
    duration: 90,
    difficulty: 3,
    category: "CC3 混合",
    questions: [
    {
      id: "q1",
      type: `fill`,
      points: 3,
      topic: `boolean`,
      q: `$F = \\overline a b + a \\overline b$ 是哪个常见函数？（填中文 / 英文 / 符号均可，如 XOR）`,
      answer: `XOR`,
      explain: `正是 $a \\oplus b$ 的定义式。`
    },
    {
      id: "q2",
      type: `fill`,
      points: 2,
      topic: `modular`,
      q: `$7^{100} \\bmod 15 = ?$`,
      answer: `1`,
      explain: `$\\varphi(15) = 8$；$100 = 12\\cdot 8 + 4$；$7^4 = 2401 = 160\\cdot 15 + 1 \\equiv 1$。`
    },
    {
      id: "q3",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `12 位浮点 1+4+7：$[2^0, 2^1]$ vs $[2^7, 2^8]$ 间隔比 = ?`,
      answer: `1 : 128 或 1:2^7`,
      explain: `⚠️ CC2 陷阱：浮点精度依赖指数。$[2^k, 2^{k+1}]$ 间隔 $= 2^k\\cdot 2^{-7}$，比值 $= 2^7=128$。`
    },
    {
      id: "q4",
      type: `fill`,
      points: 3,
      topic: `base`,
      q: `$(135.625)_{10}$ 转 base 16 = ?`,
      answer: `87.A`,
      explain: `$135 = (87)_{16}$；$0.625 = 10/16 = (0.A)_{16}$。`
    },
    {
      id: "q5",
      type: `fill`,
      points: 3,
      topic: `float`,
      q: `12 位浮点 1+4+7（隐含位 $0.1m_1...m_7$，bias=8）：在 $[2^7, 2^8]$ 区间相邻数间隔 = $2^?$（填整数）`,
      answer: `0`,
      explain: `ULP = $2^k / 2^p$，其中 $k = 7$（区间幂）, $p = 7$（mant 位）；$2^{7-7} = 2^0 = 1$。`
    },
    {
      id: "q6",
      type: `fill`,
      points: 2,
      topic: `karnaugh`,
      q: `Karnaugh 5 变量化简的常用策略 = ?`,
      answer: `分层（按一变量拆为两个 4 变量 K-map）或 Quine–McCluskey`,
      explain: `5 变量直接画图困难；分层后逐层圈选，合并时跨层按该变量加项。`
    },
    {
      id: "q7",
      type: `mcq`,
      points: 2,
      topic: `beth`,
      q: `$\\Sigma = \\{p \\to q, p\\}$ ⊨ $q$ 的 Beth 证明结构是？`,
      options: [`开放分支`, `全闭`, `α 规则`, `无法判断`],
      answer: 1,
      explain: `$\\Sigma \\cup \\{\\neg q\\} = \\{p \\to q, p, \\neg q\\}$；β $(p\\to q)$: $\\neg p | q$；都闭合 ⇒ 推理合法（modus ponens）。`
    },
    {
      id: "q8",
      type: `judge`,
      points: 2,
      topic: `boolean`,
      q: `$\\{a \\to b\\} \\models b \\to a$。`,
      answer: false,
      explain: `反例 $a=F, b=T$：$a\\to b = T$，$b\\to a = F$。`
    },
    {
      id: "q9",
      type: `fill`,
      points: 2,
      topic: `rsa`,
      q: `RSA 中 $p=3, q=11, e=3$；$\\varphi(n) = ?$`,
      answer: `20`,
      explain: `$(3-1)(11-1) = 20$。`
    },
    {
      id: "q10",
      type: `judge`,
      points: 2,
      topic: `ca2`,
      q: `8 位 CA2 中 $-(-128)$ 可表。`,
      answer: false,
      explain: `范围 $[-128,127]$；$128$ 超出 ⇒ 不可表（CA2 不对称）。`
    },
    {
      id: "q11",
      type: `fill`,
      points: 3,
      topic: `modular`,
      q: `证 $n^7 \\equiv n \\pmod{42}$ 用什么定理 = ?`,
      answer: `费马小定理 + CRT`,
      explain: `$42 = 2\\cdot 3\\cdot 7$；mod 各素因子用费马 $n^p\\equiv n$ 形式。`
    },
    {
      id: "q12",
      type: `subjective`,
      points: 6,
      topic: `rsa`,
      q: `RSA $p=13, q=17, e=5$。求 $n, \\varphi, d$，加密 $m=7$。`,
      answer: `$n=221, \\varphi=192, d=77, c = 7^5 \\bmod 221 = 11$`,
      explain: `$\\varphi = 12\\times 16 = 192$；扩欧 $5d\\equiv 1\\pmod{192}$ ⇒ $d=77$。$7^4 = 2401 \\equiv 191\\pmod{221}$，$7^5 \\equiv 7\\times 191 = 1337 \\equiv 11$。`
    },
    {
      id: "q13",
      type: `fill`,
      points: 2,
      topic: `base`,
      q: `$(7B.4)_{16}$ 十进制 = ?`,
      answer: `123.25`,
      explain: `$7\\cdot 16 + 11 + 4/16 = 123.25$。`
    },
    {
      id: "q14",
      type: `judge`,
      points: 2,
      topic: `beth`,
      q: `$(0.125)_8$ 在 base 2 中有有限展开。`,
      answer: true,
      explain: `$8 = 2^3$，质因子 $\\{2\\}\\subseteq\\{2\\}$。`
    },
    {
      id: "q15",
      type: `subjective`,
      points: 4,
      topic: `boolean`,
      q: `求 $F(a,b,c) = (a + b)(a + c)$ 的最简 FND。`,
      answer: `$F = a + bc$`,
      explain: `分配：$(a+b)(a+c) = a + bc$（布尔分配律变形）。也可枚举 minterm。`
    },
    {
      id: "q16",
      type: `judge`,
      points: 3,
      topic: `ca2`,
      q: `8 位 CA2 中 $100 + 50$ 会溢出。`,
      answer: true,
      explain: `$150 > 127$；同号正+正首位变 1。`
    },
    {
      id: "q17",
      type: `subjective`,
      points: 3,
      topic: `rsa`,
      q: `解释 RSA 解密 $c^d \\equiv m \\pmod n$ 的依据。`,
      answer: `由欧拉定理 $m^{\\varphi(n)} \\equiv 1 \\pmod n$；$ed = 1 + k\\varphi$ ⇒ $c^d = m^{ed} = m\\cdot(m^\\varphi)^k \\equiv m$。`,
      explain: `RSA 正确性依赖欧拉定理；当 $\\gcd(m,n)=1$ 时直接成立，否则用 CRT 延展到 $\\gcd > 1$ 情形。`
    },
    {
      id: "q18",
      type: `fill`,
      points: 5,
      topic: `karnaugh`,
      q: `Karnaugh 4 变量 minterm={2,3,4,5,11,13}, dc={0,8,12,15}；FND 最简 = ?`,
      answer: `$\\overline a b + \\overline a c + ad$（或类似最简）`,
      explain: `用 don't-care 扩展圈：合并相邻项达最简（视具体圈选可有等价答案）。`
    },
    {
      id: "q19",
      type: `judge`,
      points: 2,
      topic: `modular`,
      q: `校验码 $c(s) = 7 - (s \\bmod 7)$ 能检所有 1 位错。`,
      answer: true,
      explain: `$\\gcd(10,7)=1$ 且 $7$ 质数，1 位错差量 $\\Delta=(s'_i-s_i)\\times 10^i$ 不可能 $\\equiv 0\\pmod 7$。`
    },
    {
      id: "q20",
      type: `judge`,
      points: 3,
      topic: `boolean`,
      q: `$\\Sigma = \\{p \\lor q, p \\to r, q \\to r\\} \\models r$。`,
      answer: true,
      explain: `case-by-case 分析：β 拆 $p\\lor q$，两支都导出 $r$。`
    }
    ]
  }
];

if (typeof module !== "undefined") module.exports = QUIZZES;
