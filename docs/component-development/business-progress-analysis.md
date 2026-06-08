# Business Progress Pack 设计分析报告

> **状态：** 审阅通过 · 开发中（2026-06-01）  
> **补充审阅：** trend · status（good/warning/danger）· variant=card · 独立文档菜单  
> **前置条件：** YD Design Code **基础 Progress 已完成**，本期**不重新设计**基础组件  
> **推导来源：** 现有 Progress 能力 + Table 巡检业务 + Tag 业务预设模式 + 云盯风险管理场景

---

## 0. 目标与范围

### 0.1 本期目标

在**不修改基础 Progress API / 文档页主体结构**的前提下，新增 **Business Progress Pack（巡检业务进度组件包）**，作为 YD Design System 与云盯业务页面之间的组合层。

```text
┌─────────────────────────────────────────────────────────┐
│  YD Design Code · 基础 Progress（已完成，不改动）          │
│  Line · Circle · Segmented · Success/Error · S/M/L      │
└───────────────────────────┬─────────────────────────────┘
                            │ 组合 / 映射
┌───────────────────────────▼─────────────────────────────┐
│  Business Progress Pack（本期新增）                       │
│  RectificationProgress                                    │
│  InspectionCoverageProgress                               │
│  RiskHandlingProgress                                     │
│  StoreHealthProgress                                      │
│  InspectionStageProgress                                  │
└───────────────────────────┬─────────────────────────────┘
                            │ 消费
┌───────────────────────────▼─────────────────────────────┐
│  云盯业务页                                               │
│  StoreInspectionDemo · InspectionRiskTable · 驾驶舱卡片   │
└─────────────────────────────────────────────────────────┘
```

### 0.2 设计约束（审阅确认）

| 约束 | 说明 |
|------|------|
| **不改动基础 Progress** | 不新增 `type`、不调整 Token、不重构 `progress.tsx` |
| **不改动 Progress 文档页** | 业务组件**独立成页**，不挂在 Progress 页底部 |
| **独立文档菜单** | 新增「巡检业务组件」菜单，形成 YD Business Components |
| **视觉对齐 YD** | 品牌色 `#165DFF`、圆角 `6px`、中文文案、大展示区占比 |
| **薄封装原则** | 与 `InspectionStatusTag` / `RiskLevelTag` 相同：业务组件内部组合基础 Progress |

### 0.3 与 `progress-design-analysis.md` 的关系

| 文档 | 关系 |
|------|------|
| `progress-design-analysis.md` | 基础 Progress 一期方案；**基础能力视为已完成** |
| 本文档 | 二期业务包；覆盖并扩展原预设中的 3 个组件，新增 2 个 |

| 原预设名 | 本期组件 | 变化 |
|----------|----------|------|
| `RectificationProgress` | `RectificationProgress` | 扩展：展示已整改 / 待整改数量 |
| `InspectionProgress` | `InspectionCoverageProgress` | 更名 + 扩展：覆盖率 + 已巡 / 未巡门店数 |
| — | `RiskHandlingProgress` | **新增** |
| `StoreHealthProgress` | `StoreHealthProgress` | 扩展：A / B / C / D 评级 |
| — | `InspectionStageProgress` | **新增**：五段流程 |

### 0.5 补充审阅要求（已纳入）

**要求一 — `trend`**

所有 Business Progress 必须支持 `trend`，用于驾驶舱环比展示：

```tsx
trend={{ label: "较上周", value: 12, direction: "up" }}
// 展示：较上周 ↑12%
```

支持文案：较上周 / 较昨日 / 同比 等，由业务传入 `label`。

**要求二 — `status`（业务主动指定）**

```tsx
status="good" | "warning" | "danger"
```

**不要只根据 percent 判断颜色。** 业务可主动指定，例如：

- 风险处理率 40% + `status="danger"`
- 门店健康度 75% + `status="warning"`

未传 `status` 时，可选用 `autoStatus` 回退推导（默认关闭）。

**要求三 — `variant="card"`**

统一 Card Mode，用于驾驶舱标准业务卡片：

```tsx
<StoreHealthProgress variant="card" trend={…} status="good" />
```

卡片结构：**标题 → 数值 → 趋势 → 进度 → 辅助说明**。

**开发顺序（调整）：**

1. RectificationProgress
2. StoreHealthProgress
3. InspectionCoverageProgress
4. RiskHandlingProgress
5. InspectionStageProgress

**文档策略（调整）：**

- 新增独立菜单 **《巡检业务组件》**（`/business-components`）
- **不**放在 Progress 页面底部
- 目录：五个组件各一页，形成 YD Business Components 体系

---

## 1. 基础 Progress 能力映射（沿用，不扩展）

YD Design Code 已有能力直接映射到业务包，**不做二次抽象**：

| 基础能力 | 业务包用法 |
|----------|------------|
| **Line Progress** | 整改完成率、巡检覆盖率、风险处理率主进度条 |
| **Circle Progress** | 门店健康度（列表 / 详情紧凑展示） |
| **Segmented Progress** | 巡检阶段流程（创建→派发→执行→整改→完成） |
| **Success State** | 达标完成率、A/B 评级、流程已完成段 |
| **Error State** | 未达标、D 评级、流程异常 / 超时段 |
| **Small** | 表格列内（`InspectionRiskTable` 整改完成率列） |
| **Regular** | 卡片内、抽屉详情默认尺寸 |
| **Large** | 驾驶舱概览区、文档大规格展示区 |

> 注：基础 Progress 的 `warning` 态在业务层通过 `status` 映射或副文案色阶表达；业务包不引入新状态枚举。

---

## 2. Business Progress Pack 总览

### 2.1 包结构

```text
packages/ui/src/components/progress/
  progress-presets/                    # 或 business-progress/
    rectification-progress.tsx
    inspection-coverage-progress.tsx
    risk-handling-progress.tsx
    store-health-progress.tsx
    inspection-stage-progress.tsx
    business-progress.types.ts
    business-progress-utils.ts           # 共享阈值 / 评级 / percent 计算
    business-progress.test.tsx
```

导出路径建议：

```text
@yd-ds/ui/progress          # 基础 Progress（已有）
@yd-ds/ui/progress/business # 业务包（新增子路径，或主入口 re-export）
@yd-ds/ui/table             # 兼容期 re-export 高频组件
```

### 2.2 共享布局模式 `BusinessProgressLayout`

五个组件共用同一信息架构，保证云盯各页面视觉一致：

```text
┌────────────────────────────────────────────────────────┐
│  [标题] 整改完成率                          82%       │  ← 主指标 + 百分比
│  ████████████████████░░░░░░░░░░░░░░░░░░░░░           │  ← 基础 Line / Circle
│  已整改 41 项  ·  待整改 9 项                         │  ← 辅助指标（可选）
└────────────────────────────────────────────────────────┘
```

| 区域 | 规范 |
|------|------|
| 标题 | `text-sm font-medium`，`--color-text-secondary` |
| 主百分比 | `tabular-nums font-semibold`，随阈值变色 |
| 进度条 | 基础 `Progress`，尺寸由 `size` prop 透传 |
| 辅助指标 | `text-xs`，`--color-text-tertiary`，`·` 分隔 |

---

## 3. 组件一 · RectificationProgress

### 3.1 业务语义

**整改完成率** — 门店巡检异常项的整改闭环进度，对应 `InspectionRiskTable`「整改完成率」列及整改详情抽屉。

### 3.2 展示内容

| 字段 | 说明 | 示例 |
|------|------|------|
| 整改完成率 | 主百分比 | 82% |
| 已整改数量 | `rectifiedCount` | 41 项 |
| 待整改数量 | `pendingCount` | 9 项 |

### 3.3 API 草案

```tsx
interface RectificationProgressProps {
  /** 已整改数量 */
  rectifiedCount: number;
  /** 待整改数量 */
  pendingCount: number;
  /** 可选覆盖百分比；默认由数量计算 */
  percent?: number;
  size?: "small" | "regular" | "large";
  showStats?: boolean;      // 默认 true
  className?: string;
}
```

**百分比计算：**

```text
percent = rectifiedCount / (rectifiedCount + pendingCount) × 100
空集时 percent = 0
```

### 3.4 状态映射（沿用 Table 现有逻辑）

| 区间 | 基础 Progress 状态 | 色值参考 |
|------|-------------------|----------|
| ≥ 90% | `success` | `#00B42A` |
| 60% – 89% | `warning` | `#FF7D00` |
| < 60% | `error` | `#F53F3F` |

### 3.5 基础 Progress 组合

```tsx
<Progress type="line" percent={percent} status={resolved} size={size} showInfo />
// + 标题行「整改完成率」+ 辅助文案
```

### 3.6 迁移目标

| 现有 | 替换为 |
|------|--------|
| `inspection-risk-table.tsx` 内联 `RectificationRate` | `<RectificationProgress rectifiedCount={…} pendingCount={…} size="small" />` |

---

## 4. 组件二 · InspectionCoverageProgress

### 4.1 业务语义

**巡检覆盖率** — 周期内应巡门店的覆盖比例，对应驾驶舱 `InspectionOverviewCards` 第四卡「巡检完成率」及区域督导报表。

> 命名由「巡检完成率」调整为「巡检覆盖率」，更准确表达「已巡门店 / 应巡门店」。

### 4.2 展示内容

| 字段 | 说明 | 示例 |
|------|------|------|
| 巡检覆盖率 | 主百分比 | 86% |
| 已巡检门店 | `inspectedCount` | 43 家 |
| 未巡检门店 | `uninspectedCount` | 7 家 |

### 4.3 API 草案

```tsx
interface InspectionCoverageProgressProps {
  inspectedCount: number;
  uninspectedCount: number;
  percent?: number;
  target?: number;          // 默认 90，达标线
  size?: "small" | "regular" | "large";
  variant?: "line" | "circle";  // 驾驶舱卡片可用 circle
  showStats?: boolean;
  className?: string;
}
```

**百分比计算：**

```text
percent = inspectedCount / (inspectedCount + uninspectedCount) × 100
```

### 4.4 状态映射

| 条件 | 状态 |
|------|------|
| `percent >= target`（默认 90） | `success` |
| `percent >= target - 15` | `warning` |
| 否则 | `error` |

### 4.5 应用场景

| 位置 | 推荐 variant / size |
|------|---------------------|
| `InspectionOverviewCards` 卡片 | `circle` · `large` |
| 区域筛选结果摘要 | `line` · `regular` |
| 表格附加列（未来） | `line` · `small` |

---

## 5. 组件三 · RiskHandlingProgress

### 5.1 业务语义

**风险处理率** — 已识别高风险项的处理闭环比例，服务督导看板与异常闭环页。

### 5.2 展示内容

| 字段 | 说明 | 示例 |
|------|------|------|
| 风险处理率 | 主百分比 | 73% |
| 高风险数量 | `highRiskCount` | 12 项 |
| 处理中数量 | `inProgressCount` | 5 项 |
| 待处理数量 | `pendingCount` | 7 项 |

### 5.3 API 草案

```tsx
interface RiskHandlingProgressProps {
  highRiskCount: number;
  inProgressCount: number;
  pendingCount: number;
  /** 已处理数量；可省略，由总数 - 处理中 - 待处理 推导 */
  handledCount?: number;
  percent?: number;
  size?: "small" | "regular" | "large";
  showStats?: boolean;
  className?: string;
}
```

**百分比计算：**

```text
total = highRiskCount（或 handled + inProgress + pending）
handled = handledCount ?? (total - inProgressCount - pendingCount)
percent = handled / total × 100
```

### 5.4 状态映射

与整改完成率共用 `resolveRateStatus(percent)`（≥90 / ≥60 / <60）。

### 5.5 与 Tag 组合

```text
风险等级    [高风险]           ← StoreRiskLevelTag
风险处理率  73%  ███████░░░   ← RiskHandlingProgress
            高风险 12 · 处理中 5 · 待处理 7
```

---

## 6. 组件四 · StoreHealthProgress

### 6.1 业务语义

**门店健康度** — 综合巡检得分、异常密度、整改滞后的加权健康指数，用于门店列表与详情头区。

### 6.2 展示内容

| 字段 | 说明 | 示例 |
|------|------|------|
| 门店健康度 | 主百分比 / 得分 | 91% |
| 评级 | A / B / C / D | A |

### 6.3 评级规则

| 评级 | 分数区间 | 基础 Progress 状态 | 语义 |
|------|----------|-------------------|------|
| **A** | 90 – 100 | `success` | 优秀 |
| **B** | 80 – 89 | `success` 或 `default` | 良好（品牌蓝） |
| **C** | 60 – 79 | `warning` | 一般 |
| **D** | 0 – 59 | `error` | 需改善 |

> B 级使用品牌蓝 `#165DFF`（`default`），与 `InspectionScore` good 档对齐；A/C/D 与 success/warning/error 对齐。

### 6.4 API 草案

```tsx
type StoreHealthGrade = "A" | "B" | "C" | "D";

interface StoreHealthProgressProps {
  score: number;            // 0–100
  grade?: StoreHealthGrade; // 可省略，由 score 自动推导
  size?: "small" | "regular" | "large";
  variant?: "circle" | "line";
  showGrade?: boolean;        // 默认 true，展示 A/B/C/D 徽章
  showInfo?: boolean;
  className?: string;
}
```

### 6.5 视觉结构

```text
┌─────────────────────────┐
│      ╭───────╮          │
│      │  91%  │  [A]     │  ← Circle Progress + 评级徽章
│      ╰───────╯          │
│      门店健康度          │
└─────────────────────────┘
```

评级徽章样式参考 `InspectionScore` 浅底胶囊，字号 `text-xs font-semibold`。

### 6.6 与 InspectionScore 边界

| 组件 | 场景 | 展示 |
|------|------|------|
| `InspectionScore` | 表格「巡检得分」列 | `82分` 色阶徽章 |
| `StoreHealthProgress` | 门店详情 / 健康度模块 | 环形进度 + A–D 评级 |

**不合并**；健康度可包含得分维度，但语义更广。

---

## 7. 组件五 · InspectionStageProgress

### 7.1 业务语义

**巡检任务流程进度** — 从任务创建到完成的全链路阶段可视化，对应任务详情、督导跟进时间线。

### 7.2 展示内容

五段流程：

| 序号 | 阶段 | 说明 |
|------|------|------|
| 1 | 创建 | 任务已创建 |
| 2 | 派发 | 已派发至门店 / 执行人 |
| 3 | 执行 | 现场巡检执行中 |
| 4 | 整改 | 异常项整改中 |
| 5 | 完成 | 全链路闭环 |

### 7.3 API 草案

```tsx
type InspectionStage =
  | "created"
  | "dispatched"
  | "executing"
  | "rectifying"
  | "completed";

type InspectionStageStatus = "wait" | "process" | "finish" | "error";

interface InspectionStageProgressProps {
  /** 当前所处阶段 */
  currentStage: InspectionStage;
  /** 各阶段状态；可省略，由 currentStage 自动推导 */
  stages?: Partial<Record<InspectionStage, InspectionStageStatus>>;
  size?: "small" | "regular" | "large";
  className?: string;
}
```

### 7.4 基础 Progress 组合

使用基础 **Segmented Progress**（YD 已有），非 Line：

```text
创建 ─── 派发 ─── 执行 ─── 整改 ─── 完成
 ✓       ✓       ●        ○        ○
```

| 阶段状态 | Segmented 段样式 |
|----------|-----------------|
| `finish` | 已完成段 · success 色 |
| `process` | 当前段 · 品牌蓝 + 动画 |
| `wait` | 未到达 · 灰轨道 |
| `error` | 异常 / 逾期 · error 色 |

### 7.5 与 Tag 边界

| 组件 | 粒度 |
|------|------|
| `InspectionStatusTag` | 任务单次状态（待开始 / 进行中 / 已逾期） |
| `InspectionStageProgress` | 全流程五段进度 |

任务列表行用 Tag；任务详情页用 Stage Progress。

---

## 8. 共享工具函数

```text
business-progress-utils.ts

resolveRateStatus(percent: number): "good" | "warning" | "danger"  // 仅 autoStatus 回退
resolveHealthGrade(score: number): "A" | "B" | "C" | "D"
resolveHealthStatus(grade: StoreHealthGrade): ProgressStatus
calcPercent(done: number, total: number): number
deriveStageStatuses(current: InspectionStage): Record<...>
```

业务页**禁止**自行写色值阈值，统一调用上述工具。

---

## 9. 与 Tag / Table 的协作

### 9.1 同一页面的组件分工

```text
StoreInspectionDemo V3
├── InspectionOverviewCards
│   └── InspectionCoverageProgress（替换纯数字 86%）
├── StatusTabs + RectificationStatusTag
├── InspectionRiskTable
│   ├── InspectionScore（得分列，保留）
│   ├── RectificationStatusTag（状态列，保留）
│   └── RectificationProgress（完成率列，替换 RectificationRate）
└── （详情抽屉）
    ├── InspectionStageProgress
    └── StoreHealthProgress
```

### 9.2 业务包 vs Tag 预设对照

| 业务概念 | Tag | Business Progress |
|----------|-----|-------------------|
| 整改流程节点 | `RectificationStatusTag` | — |
| 整改完成比例 | — | `RectificationProgress` |
| 巡检任务状态 | `InspectionStatusTag` | — |
| 巡检任务五段流程 | — | `InspectionStageProgress` |
| 风险等级 | `StoreRiskLevelTag` | — |
| 风险处理比例 | — | `RiskHandlingProgress` |
| 门店经营态 | `StoreStatusTag` | — |
| 门店健康综合指数 | — | `StoreHealthProgress` |

---

## 10. 文档策略

### 10.1 独立菜单「巡检业务组件」

路径：`/business-components`  
顶栏 / 侧边栏独立入口，与「组件」「Business Patterns」并列，**不修改 Progress 文档页**。

```text
巡检业务组件
├── RectificationProgress      /business-components/rectification-progress
├── StoreHealthProgress        /business-components/store-health-progress
├── InspectionCoverageProgress /business-components/inspection-coverage-progress
├── RiskHandlingProgress       /business-components/risk-handling-progress
└── InspectionStageProgress    /business-components/inspection-stage-progress
```

### 10.2 文档展示要求

| 要求 | 说明 |
|------|------|
| 全中文 | 标题、趋势、辅助说明 |
| Card 展示 | 每组件含 `variant="card"` 驾驶舱示例 |
| trend 示例 | 较上周 ↑12% / 较昨日 ↓3% |
| status 示例 | 业务主动指定 good / warning / danger |
| 代码示例 | `@yd-ds/ui/business-progress` |

---

## 11. 开发优先级

| 顺序 | 组件 | 理由 |
|------|------|------|
| 1 | `business-progress-utils.ts` + Card Layout | 共享 trend / status / card |
| 2 | `RectificationProgress` | 表格列替换，复用价值最高 |
| 3 | `StoreHealthProgress` | 驾驶舱 card + 评级 |
| 4 | `InspectionCoverageProgress` | 概览卡第四项 |
| 5 | `RiskHandlingProgress` | 督导看板 |
| 6 | `InspectionStageProgress` | 任务流程 |
| 7 | 独立文档「巡检业务组件」 | YD Business Components |
| 8 | Table re-export + 测试 | `@yd-ds/ui/table` 兼容 |

---

## 12. 风险与待确认项

| # | 问题 | 建议默认 |
|---|------|----------|
| 1 | 基础 Progress `size` 命名：`sm/md/lg` 还是 `small/regular/large`？ | 业务层用 **`small/regular/large`**，内部映射基础 Progress 尺寸 |
| 2 | B 级评级用 `success` 还是 `default`（品牌蓝）？ | **品牌蓝 `default`**，与 `InspectionScore` good 档一致 |
| 3 | `InspectionStageProgress` 是否支持点击切换？ | **否**，一期只读；交互二期 |
| 4 | 业务包导出路径 | `@yd-ds/ui/progress` 主入口 re-export + `@yd-ds/ui/table` 兼容 |
| 5 | `RectificationProgress` 单位「项」是否可配置？ | 默认「项」；`unit` prop 可选覆盖 |

---

## 13. 开发检查清单

- [x] 用户确认不重新设计基础 Progress
- [x] 用户确认 Business Progress Pack 范围（5 组件）
- [x] 实现 `business-progress-utils.ts` + Card Layout + trend / status
- [x] 实现五个业务组件
- [x] 单元测试（阈值、percent 计算、stage 推导）
- [x] 独立文档菜单「巡检业务组件」（五组件各一页）
- [x] `InspectionRiskTable` 迁移 `RectificationProgress`
- [x] `pnpm build` + test 通过

---

## 附录：五组件 Mock 数据（文档 / Story 用）

```ts
// RectificationProgress
{ rectifiedCount: 41, pendingCount: 9 }          // → 82%

// InspectionCoverageProgress
{ inspectedCount: 43, uninspectedCount: 7 }     // → 86%

// RiskHandlingProgress
{ highRiskCount: 12, inProgressCount: 5, pendingCount: 7 }  // → 58% warning

// StoreHealthProgress
{ score: 91 }                                     // → A

// InspectionStageProgress
{ currentStage: "rectifying" }                    // 创建✓ 派发✓ 执行✓ 整改● 完成○
```

---

**审阅已通过。** 确认后按 §11 优先级开发；基础 Progress 与文档页主体结构保持不变，仅扩展业务包与文档末尾章节。
