/* notes.js — 笔记快速参考（核心要点摘录，markdown-lite） */

const NOTES = [
  {
    id: "highfreq",
    title: "★ 高频考点速查",
    md: `# 高频考点 / 复习清单

## 进制转换
- 整数：除法法（10→b）、权值（b→10）、$2 \\leftrightarrow 4/8/16$ 分组
- 小数：乘法法迭代；精度 $b^{-k}$ 必须算 $k$ 位
- **有限性判定**：$p/q$ 在 base $b$ 有限 ⟺ $q$ 的素因子 ⊆ $b$ 的素因子
  - $0.7 = 7/(2 \\cdot 5)$ in base 2：含 5 ⇒ **无限**

## CA2 补码
- $n$ 位范围 $[-2^{n-1}, 2^{n-1} - 1]$（不对称）
- **溢出准则**：同号相加结果异号；异号相加永不溢出
- 负数 = 取反 + 1

## 浮点
- 标准（无隐含位 $0.d_1 d_2$）vs IEEE（隐含位 $1.d_1 d_2$）
- IEEE 32: bias=127；64: bias=1023
- ULP 在 $[2^k, 2^{k+1}]$ = $2^{k-p}$
- **加法非结合**；大数+小数 → 小数被吞

## 模运算 / RSA
- 逆元 ⟺ $\\gcd(a, n) = 1$
- 费马 $a^{p-1} \\equiv 1 \\pmod p$
- 欧拉 $a^{\\varphi(n)} \\equiv 1$
- **RSA: $d \\cdot e \\equiv 1 \\pmod \\varphi$**（不是 $\\bmod n$）

## 布尔 / Karnaugh
- FND 选 1 行 minterm；FNC 选 0 行 maxterm
- Karnaugh 圈大小 $2^k$，环面相邻
- De Morgan: $\\overline{a+b} = \\overline a \\cdot \\overline b$

## Beth 树
- α 不分叉：$\\land, \\neg(\\lor), \\neg(\\to), \\neg\\neg$
- β 分叉：$\\lor, \\to, \\leftrightarrow, \\neg(\\land)$
- $\\Sigma \\models F$ ⟺ $\\Sigma \\cup \\{\\neg F\\}$ 全闭
- 反模型 = 开放支的赋值

## TOP 易错
1. $0.1, 0.7$ in base 2 无限
2. CA2 $-2^{n-1}$ 无正对偶
3. RSA $d \\bmod \\varphi$
4. $\\mathbb{Z}_n$ 多解
5. 浮点加法非结合
`
  },
  {
    id: "ca2",
    title: "CA2 补码",
    md: `# CA2 补码

## 编码
- $n$ 位 CA2 范围 $[-2^{n-1}, 2^{n-1} - 1]$
- 8 位：$[-128, 127]$；12 位：$[-2048, 2047]$；16 位：$[-32768, 32767]$
- 负数：原码取反 + 1

## 加法
- 直接二进制加；丢弃最高进位
- 减法 $a - b = a + (-b)$

## 溢出准则
- **同号相加结果异号** ⇒ 溢出
- **异号相加** ⇒ 永不溢出
- 例：8 位中 $127 + 1 = 1000\\,0000 = -128$（溢出）

## 易错
- $-128$ 取反+1 还是 $-128$（无正对偶）
- 不要把 8 位规则套到 16 位
- 进位 ≠ 溢出（最高进位丢弃 ≠ 错误）
`
  },
  {
    id: "float",
    title: "浮点 IEEE 754",
    md: `# 浮点 IEEE 754

## 格式
| 类型 | 总位 | 符号 | 指数 | 尾数 | bias |
|---|---|---|---|---|---|
| 单精度 | 32 | 1 | 8 | 23 | 127 |
| 双精度 | 64 | 1 | 11 | 52 | 1023 |

## 表示
$x = (-1)^s \\cdot (1.m_1 m_2 \\ldots) \\cdot 2^{E - bias}$

隐含位 = leading 1（规约数）

## 极值
- 最小正规约：$2^{1 - bias}$（指数 = 1）
- 最大正规约：$\\approx 2^{bias + 1}$
- 非规约：指数全 0，mant ≠ 0
- $\\pm 0$：指数全 0，mant 全 0
- $\\pm \\infty$：指数全 1，mant 全 0
- NaN：指数全 1，mant ≠ 0

## ULP
在区间 $[2^k, 2^{k+1}]$ 中，相邻数间隔 = $2^{k - p}$（$p$ = 尾数位数）

## 易错
- **加法非结合**
- 大数 + 小数（ULP < 小数）→ 小数被吞
- 不同区间 ULP 不同（不是固定精度）
`
  },
  {
    id: "rsa",
    title: "RSA / 模运算",
    md: `# RSA / 模运算

## 基本
- $\\mathbb{Z}_n = \\{0, 1, \\ldots, n-1\\}$ 模 $n$ 加乘
- 逆元 $a^{-1}$ 存在 ⟺ $\\gcd(a, n) = 1$
- 可逆元个数 = $\\varphi(n)$

## 费马 / 欧拉
- $p$ 素，$\\gcd(a,p) = 1 \\Rightarrow a^{p-1} \\equiv 1 \\pmod p$
- 通用 $a^{\\varphi(n)} \\equiv 1 \\pmod n$（$\\gcd(a,n)=1$）

## RSA
1. 选 $p, q$ 素数；$n = pq$；$\\varphi = (p-1)(q-1)$
2. 选 $e$ 与 $\\varphi$ 互素（常用 $e = 65537$）
3. $d = e^{-1} \\bmod \\varphi$ ★（**不是 mod $n$**）
4. 加密 $c = m^e \\bmod n$
5. 解密 $m = c^d \\bmod n$

## 例 $p=5, q=11, e=3$
- $n = 55$, $\\varphi = 40$
- $d = 27$（$3 \\cdot 27 = 81 = 2 \\cdot 40 + 1$）

## 易错
- $d \\bmod \\varphi$ 不是 mod $n$
- $\\mathbb{Z}_n$ 非整环（$n$ 非素）⇒ 方程可多解
`
  },
  {
    id: "boolean",
    title: "布尔代数 / Karnaugh",
    md: `# 布尔代数 / Karnaugh

## 13 条公理
- 交换 / 结合 / 分配
- 单位元 $a + 0 = a$, $a \\cdot 1 = a$
- 零元 $a + 1 = 1$, $a \\cdot 0 = 0$
- 互补 $a + \\overline a = 1$, $a \\cdot \\overline a = 0$
- 幂等 $a + a = a$, $a \\cdot a = a$
- 吸收 $a + ab = a$, $a(a + b) = a$
- 双重否定 $\\overline{\\overline a} = a$
- De Morgan $\\overline{a + b} = \\overline a \\cdot \\overline b$
- $a + \\overline a b = a + b$

## 范式
- **FND**（DNF）= minterm 析取，对应真值表中 = 1 的行
- **FNC**（CNF）= maxterm 合取，对应 = 0 的行（变量取反）
- 口诀：**FND 选 1，FNC 选 0**

## Karnaugh
- 行/列用格雷码（相邻仅差 1 位）
- 圈 1 大小必为 $2^k$
- **环面相邻**：左右、上下边界相连
- don't-care 灵活配合
- 4 变量典型：ab × cd，圈最大 $= 8$ 项
`
  },
  {
    id: "beth",
    title: "Beth 树（语义树）",
    md: `# Beth 树

## α / β 规则
- **α**（不分叉）：
  - $a \\land b$ → $a, b$
  - $\\neg(a \\lor b)$ → $\\neg a, \\neg b$
  - $\\neg(a \\to b)$ → $a, \\neg b$
  - $\\neg \\neg a$ → $a$
- **β**（分叉）：
  - $a \\lor b$ → $a | b$
  - $\\neg(a \\land b)$ → $\\neg a | \\neg b$
  - $a \\to b$ → $\\neg a | b$
  - $a \\leftrightarrow b$ → $(a, b) | (\\neg a, \\neg b)$

## 用途
- $F$ 重言 ⟺ $\\{\\neg F\\}$ 全闭
- $\\Sigma \\models F$ ⟺ $\\Sigma \\cup \\{\\neg F\\}$ 全闭
- $\\Sigma$ SAT ⟺ 至少有一开放支
- **反模型** = 开放支上 littéraux 的赋值

## 关闭分支
出现 $p$ 与 $\\neg p$ 同时在分支上 → 闭 ⊗

## 演绎定理
$\\Sigma, A \\vdash B \\iff \\Sigma \\vdash A \\to B$
`
  }
];

if (typeof module !== "undefined") module.exports = NOTES;
