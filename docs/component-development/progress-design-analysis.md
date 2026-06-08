# Progress 组件设计分析报告

> **状态：** 待审阅（先分析后开发）  
> **推导来源：** `packages/tokens` + Button / Tag / Upload / Table 业务页 + 云盯巡检场景  
> **定位：** YD Design System 与云盯业务组件之间的**桥梁组件**

---

## 0. 目标与范围

### 0.1 组件目标

在 `packages/ui` 中新增通用 **Progress** 体系，统一当前散落在 Upload、Table 业务套件中的进度展示实现，并支撑云盯巡检场景的**完成率 / 健康度 / 整改闭环**可视化。

Progress 不是任务状态组件（那是 Tag 的职责），而是**连续量指标**的载体：百分比、得分映射、目标达成度。

### 0.2 与现有实现的差距

| 现状 | 文件 | 问题 |
|------|------|------|
| Upload 内联 `ProgressBar` | `upload.tsx` | 私有实现，绑定 `--upload-progress-*`，不可复用 |
| `RectificationRate` 仅文字百分比 | `inspection-risk-table.tsx` | 有色阶逻辑，**无进度条** |
| `InspectionOverviewCards` 巡检完成率 | `store-inspection-demo.tsx` | 大数字 `86%`，**无条形/环形可视化** |
| `InspectionScore` 得分徽章 | `inspection-score.tsx` | 离散色阶标签，非进度语义 |
| 设计稿提及「操作 - 带进度条形态」 | `TABLE_MIGRATION_PROMPT.md` | 尚未有统一 Progress 组件承接 |

本期补齐通用 Progress，并为二期 Table 迁移预留接口。

### 0.3 API 范围（确认后实现）

| 维度 | 枚举 |
|------|------|
| `type` | `line` · `circle` · `dashboard` |
| `status` | `default` · `success` · `warning` · `danger` |
| `size` | `sm` · `md` · `lg` |

附加能力：

| 能力 | 说明 |
|------|------|
| `percent` | 0–100，受控进度值 |
| `showInfo` | 展示百分比文案（右侧 / 环形中心 / 仪表盘中心） |
| `showTrack` | 是否渲染轨道背景 |
| `animated` | 进度变化过渡动画 |
| `striped` | 条纹动画（仅 `line`，用于进行中态） |
| `ProgressLabel` | 标签 + 百分比 + 条形组合（业务文案层） |
| 业务预设 | `RectificationProgress` · `InspectionProgress` · `StoreHealthProgress` |

### 0.4 不在本期范围

- Figma MCP 同步（额度受限时由现有规范反推）
- `token.json` 全量回写（仅新增 `progress-tokens.ts`）
- 直接改造 `InspectionRiskTable` / `Upload` 内部实现（二期迁移）
- `steps` 步骤条、`progress` 原生元素封装（非本期）

### 0.5 开发优先级

1. `progress-tokens.ts`（tokens 包）
2. `Progress` 线性（`line`）— 最高频
3. `ProgressLabel` — 业务桥梁层
4. `ProgressCircle` — 概览卡片 / 表格紧凑列
5. `ProgressDashboard` — 驾驶舱大指标
6. 三个业务预设
7. 文档页 `/components/progress`（全中文）
8. 单元测试 + Storybook

---

## 1. 继承哪些 Token

### 1.1 `packages/tokens` 直接继承

| 参考模块 | 继承内容 | Progress 映射 |
|----------|----------|---------------|
| `primitives/colors.ts` | `brandPrimary[6]` `#165DFF` | `status="default"` 轨道填充色（进行中 / 品牌态） |
| | `functionalColors.success` `#00B42A` | `status="success"` |
| | `functionalColors.warning` `#FF7D00` | `status="warning"` |
| | `functionalColors.danger` `#F53F3F` | `status="danger"` |
| | `neutralGray[3]` `#F2F3F5` | 轨道背景（track） |
| | `neutralGray[4]` `#E5E6EB` | 条纹间隔 / 禁用轨道 |
| `primitives/radius.ts` | `full` | 线性进度条圆角（胶囊轨道） |
| | `md` `6px` | 仪表盘外框、文档展示容器圆角 |
| `primitives/typography.ts` | `fontSize` xs/sm | `showInfo` 字号随 size 阶梯 |
| `primitives/spacing.ts` | 4px 网格 | 标签与轨道间距 `gap-1` / `gap-2` |

### 1.2 参考 Upload 进度条 Token（不直接复用键名）

Upload 已定义：

```text
--upload-progress-track: brandPrimary[1]  (#E8F0FF)
--upload-progress-fill:  brandPrimary[6]  (#165DFF)
```

Progress 应**独立命名空间**，避免 Upload 主题变更影响全局进度语义：

```text
packages/tokens/src/primitives/progress-tokens.ts   # 新增

progress-track-default    → neutralGray[3]     # 通用轨道（比 upload 更中性）
progress-track-brand      → brandPrimary[1]    # default 状态浅底
progress-fill-default     → brandPrimary[6]
progress-fill-success     → functionalColors.success
progress-fill-warning     → functionalColors.warning
progress-fill-danger      → functionalColors.danger
progress-text-default     → rgba(0,0,0,0.65)   # 对齐 tag-text-default
progress-radius-line      → radius.full
progress-height-sm        → 4px
progress-height-md        → 6px
progress-height-lg        → 8px
progress-circle-sm        → 48px
progress-circle-md        → 72px
progress-circle-lg        → 120px
progress-dashboard-size   → 132px              # 驾驶舱卡片
progress-animation-duration → 200ms            # 对齐 --transition-base
```

### 1.3 参考 Tag Token 对齐语义色

Tag 与 Progress **共用功能色源**，但角色不同：

| 语义 | Tag 用法 | Progress 用法 |
|------|----------|---------------|
| 成功 | `tag-success` 浅底标签 | `progress-fill-success` 填充条 |
| 警告 | `tag-warning` 待整改标签 | `progress-fill-warning` 未达标完成率 |
| 危险 | `tag-danger` 异常 / 高风险 | `progress-fill-danger` 低完成率 / 低健康度 |
| 品牌 | `tag-primary` 进行中 | `progress-fill-default` 正常推进中 |

**不引入** `primary` / `info` 作为 Progress `status` 枚举（与用户规格一致），`default` 承担品牌蓝进行中语义。

### 1.4 参考 Button / Table 规格

| 参考 | 借鉴 |
|------|------|
| Button `transition-colors` · `duration-200` | `animated` 宽度 / stroke 过渡 |
| Table `RectificationRate` 色阶阈值 | 业务预设自动 `status` 映射 |
| Table `--table-radius` `6px` | `ProgressLabel` 外层与表格行视觉一致 |
| Table 字号 `13px` / `14px` | `ProgressLabel` 文案 `text-sm` |

### 1.5 `progressSizeSpecs`（与 Tag / Switch 同级）

```text
sm: { lineHeight: 4px,  circle: 48px,  fontSize: 12px, strokeWidth: 4 }
md: { lineHeight: 6px,  circle: 72px,  fontSize: 12px, strokeWidth: 6 }
lg: { lineHeight: 8px,  circle: 120px, fontSize: 14px, strokeWidth: 8 }
```

线性高度**低于**表单控件，高于 Upload 细条（`h-0.5`/`h-1.5`），以便在表格与卡片中可读。

---

## 2. 与 Tag 的关系

### 2.1 职责边界

```text
┌─────────────────────────────────────────────────────────────┐
│  同一表格行 · 整改闭环场景                                    │
├─────────────────────────────────────────────────────────────┤
│  整改状态        │  Tag（离散态）    │  待整改 / 整改中 / 已完成  │
│  整改完成率      │  Progress（连续量）│  82% + ████████░░         │
│  风险等级        │  Tag（离散态）    │  高风险 / 中风险 / 低风险  │
│  巡检得分        │  InspectionScore  │  82分（色阶徽章，非进度条）│
└─────────────────────────────────────────────────────────────┘
```

| 维度 | Tag | Progress |
|------|-----|----------|
| 数据类型 | 枚举 / 分类 | 0–100 连续值 |
| 默认视觉 | `outline`（中立） | 中性灰轨道 + 语义色填充 |
| 业务预设策略 | 内部 `variant="light"` | 内部 `ProgressLabel` + 自动 `status` |
| 筛选交互 | `TagGroup segmented` | 不参与筛选，仅展示 |
| 同页共存 | StatusTabs 选「待整改」 | 行内展示该项完成百分比 |

### 2.2 色阶逻辑共享（建议抽取）

Table 中已有两套阈值逻辑，Progress 业务预设应**统一**：

**RectificationRate / 整改完成率（已有）：**

| 区间 | 颜色 | Progress status |
|------|------|-----------------|
| ≥ 90% | `#00B42A` | `success` |
| 60% – 89% | `#FF7D00` | `warning` |
| < 60% | `#F53F3F` | `danger` |

**InspectionScore / 门店健康度（可复用）：**

| 区间 | 色调 | Progress status |
|------|------|-----------------|
| ≥ 90 | excellent → | `success` |
| 80 – 89 | good → | `default`（品牌蓝） |
| 60 – 79 | fair → | `warning` |
| < 60 | poor → | `danger` |

Tag 的 `RectificationStatusTag` 表示**流程节点**，Progress 的 `RectificationProgress` 表示**节点完成比例**，二者互补而非替代。

### 2.3 组合示例（目标态）

```text
整改状态   [待整改]          ← RectificationStatusTag
整改完成率 整改完成率 82%     ← ProgressLabel
           ████████░░
```

```text
巡检完成率 86%               ← InspectionProgress（概览卡片可用 dashboard）
风险处理率 73%               ← ProgressLabel + warning
门店健康度 91%               ← StoreHealthProgress + success
```

---

## 3. 业务预设设计逻辑

### 3.1 设计原则

与 Tag 业务预设一致：

| 原则 | Tag 已有 | Progress 对齐 |
|------|----------|---------------|
| 薄封装 | `InspectionStatusTag` → `<Tag variant="light">` | `RectificationProgress` → `<ProgressLabel>` + 阈值 |
| 对外 API 稳定 | 业务只传 `status` / `level` | 业务只传 `percent` / `value` |
| 禁止页面硬编码色值 | 迁入 Tag 预设 | 迁入 Progress 预设 |
| 中文文案内置 | `getInspectionStatusLabel` | `getRectificationProgressLabel` 等 |

### 3.2 `RectificationProgress`（整改完成率）

| 属性 | 类型 | 说明 |
|------|------|------|
| `percent` | `number` | 0–100 |
| `showLabel` | `boolean` | 默认 `true`，文案「整改完成率」 |
| `size` | `sm \| md \| lg` | 表格列推荐 `sm`，详情抽屉 `md` |
| `type` | 固定 `line` | 表格行内紧凑 |

**内部逻辑：**

1. `resolveRectificationStatus(percent)` → `success | warning | danger`
2. 渲染 `<ProgressLabel label="整改完成率" percent={percent} status={...} />`
3. 替换 `InspectionRiskTable` 内联 `RectificationRate`（二期）

### 3.3 `InspectionProgress`（巡检完成率）

| 属性 | 类型 | 说明 |
|------|------|------|
| `percent` | `number` | 周期内巡检完成比例 |
| `target` | `number` | 可选，默认 `90`，用于未达标时 warning |
| `variant` | `"line" \| "dashboard"` | 概览卡片用 `dashboard`，列表用 `line` |

**内部逻辑：**

1. `percent >= target` → `success`；`percent >= target - 15` → `warning`；否则 `danger`
2. 文案「巡检完成率」
3. 对齐 `InspectionOverviewCards` 第四卡「巡检完成率 86%」，二期可在卡片底部增加条形或改为小型 dashboard

### 3.4 `StoreHealthProgress`（门店健康度）

| 属性 | 类型 | 说明 |
|------|------|------|
| `score` | `number` | 0–100 综合健康分（可对接巡检得分加权） |
| `type` | 默认 `circle` | 门店详情 / 列表头像旁 |
| `showInfo` | 默认 `true` | 中心展示「91%」或「91分」 |

**内部逻辑：**

1. 复用 `resolveScoreTone` 阈值（与 `InspectionScore` 一致）
2. 映射到 Progress `status`
3. 文案「门店健康度」

### 3.5 `ProgressLabel`（桥梁组件）

独立导出，供业务预设与页面直接使用：

```tsx
<ProgressLabel
  label="整改完成率"
  percent={82}
  status="warning"   // 可省略，由 percent 自动推导
  size="md"
/>
```

**结构：**

```text
┌──────────────────────────────────────┐
│ 整改完成率                    82%    │  ← 一行：label + showInfo
│ ████████████████░░░░░░░░░░░░░░░░░░  │  ← Progress type=line
└──────────────────────────────────────┘
```

| Prop | 说明 |
|------|------|
| `label` | 中文业务文案 |
| `percent` | 进度值 |
| `status` | 可选；省略时按预设规则自动推导 |
| `extra` | 可选副文案，如「目标 90%」 |

---

## 4. 巡检行业应用场景

### 4.1 场景地图

```text
云盯巡检平台
├── 风险驾驶舱（StoreInspectionDemo V3）
│   ├── 概览卡片 → InspectionProgress（dashboard / 大数字+条）
│   ├── 业务筛选 → 无 Progress
│   ├── StatusTabs → Tag 域，非 Progress
│   └── 风险表格 → RectificationProgress 列 · InspectionScore 列
├── 任务巡检表（InspectionTable V2）
│   ├── 快捷筛选 → TagGroup segmented
│   └── 批量进度（未来）→ line + striped 进行中
├── 门店详情 / 抽屉
│   ├── 整改清单完成度 → RectificationProgress
│   └── 门店健康度 → StoreHealthProgress（circle）
└── 督导报表导出
    └── 区域完成率对比 → line · lg · 多系列并排
```

### 4.2 四类核心指标

| 指标 | 典型位置 | 推荐 type | 预设组件 |
|------|----------|-----------|----------|
| **整改完成率** | 风险表格列、整改详情 | `line` + `ProgressLabel` | `RectificationProgress` |
| **巡检完成率** | 驾驶舱概览卡、区域报表 | `dashboard` / `line` | `InspectionProgress` |
| **风险处理率** | 督导看板、异常闭环页 | `line` 或 `circle` | `ProgressLabel`（label 内置） |
| **门店健康度** | 门店列表、详情头图 | `circle` | `StoreHealthProgress` |

### 4.3 与 Table 业务组件的迁移关系

| 现有 | 迁移目标 | 阶段 |
|------|----------|------|
| `RectificationRate` 文字 | `RectificationProgress` | 二期 |
| `InspectionOverviewCards` 纯数字 % | 卡片内嵌 `InspectionProgress` | 三期 |
| Upload `ProgressBar` | 保持独立；新上传可换 `Progress type="line" size="sm"` | 三期 |
| `InspectionScore` | **不合并**；得分是离散展示，健康度才用 Progress | — |

### 4.4 状态与 striped 的业务语义

| 视觉 | 场景 |
|------|------|
| `striped` + `animated` | 巡检任务执行中、整改项同步中 |
| `success` 实心 | 整改闭环 ≥ 90%、巡检达标 |
| `warning` | 接近目标未达标（60–89%） |
| `danger` | 高风险门店、整改严重滞后 |
| `showTrack={false}` | 极简表格列，仅保留填充条 |

---

## 5. 组件结构设计

### 5.1 文件清单（确认后开发）

```text
packages/tokens/src/primitives/progress-tokens.ts    # 新增 Token
packages/ui/src/components/progress/
  progress.tsx              # Progress（line）+ 导出主入口
  progress-circle.tsx       # 环形
  progress-dashboard.tsx    # 仪表盘（半圆 / 270° 弧）
  progress-label.tsx        # ProgressLabel 桥梁层
  progress.types.ts
  progress-tokens.ts        # CSS 变量映射（re-export tokens）
  progress-styles.ts        # status → fill / track 样式
  progress-presets/
    rectification-progress.tsx
    inspection-progress.tsx
    store-health-progress.tsx
  progress.test.tsx
  progress.stories.tsx
packages/ui/src/components/progress.tsx             # barrel @yd-ds/ui/progress
```

### 5.2 核心 API 草案

**Progress（line）：**

```tsx
<Progress
  type="line"           // 默认
  percent={82}
  status="warning"      // 可选，默认 default
  size="md"
  showInfo
  showTrack
  animated
  striped
/>
```

**ProgressCircle：**

```tsx
<ProgressCircle percent={91} status="success" size="md" showInfo />
```

**ProgressDashboard：**

```tsx
<ProgressDashboard percent={86} status="default" size="lg" showInfo />
```

### 5.3 无障碍

| 项 | 实现 |
|----|------|
| 角色 | `role="progressbar"` |
| 属性 | `aria-valuenow` · `aria-valuemin={0}` · `aria-valuemax={100}` |
| 文案 | `aria-label` 或由 `ProgressLabel` 的 `label` 提供 |
| 环形 | SVG `stroke` 动画，保证对比度 ≥ 4.5:1 |

---

## 6. 文档页规划（全中文）

路径：`/components/progress`  
导航：`component-navigation.ts` 新增 `{ label: "Progress", labelZh: "进度条", ready: true }`

### 6.1 页面结构

| 区块 | 标题 | 内容 |
|------|------|------|
| 页头 | **Progress 进度条** | 一句组件说明 |
| 大规格展示 | （无二级标题，置顶色板） | 四态 × 线性完整矩阵 |
| 线性进度条 | 线性进度条 | default / success / warning / danger · animated · striped |
| 环形进度条 | 环形进度条 | sm / md / lg · showInfo |
| 仪表盘进度条 | 仪表盘进度条 | 驾驶舱风格 · 巡检完成率示例 |
| 状态展示 | 状态展示 | 四态并列 |
| 尺寸展示 | 尺寸规格 | 小 / 中 / 大 + 4px / 6px / 8px |
| 业务示例 | 巡检业务示例 | ProgressLabel + 三个预设 |
| 属性说明 | 属性说明 | API 表格（中文描述） |
| 设计规范 | 设计规范 | Token 卡片 · 品牌色 #165DFF · 圆角 6px |

### 6.2 文案规范

- 禁止章节标题使用 Line / Circle / Dashboard / Closable 等英文
- 状态展示：**默认 / 成功 / 警告 / 危险**
- 业务示例文案：**整改完成率 / 巡检完成率 / 风险处理率 / 门店健康度**

---

## 7. 风险与待确认项

| # | 问题 | 建议默认 |
|---|------|----------|
| 1 | `default` status 用品牌蓝还是中性灰填充？ | **品牌蓝填充**，灰轨道；与 Upload / 进行中一致 |
| 2 | `dashboard` 弧度：180° 半圆还是 270°？ | **270°**（Arco / Ant Design Dashboard 惯例），缺口朝下 |
| 3 | `InspectionScore` 是否并入 Progress？ | **否**；得分徽章与进度条并存 |
| 4 | `风险处理率` 阈值是否与整改率相同？ | **是**，统一 `resolveRateStatus(percent)` |
| 5 | Upload 内部 `ProgressBar` 是否本期替换？ | **否**，二期再统一 |
| 6 | circle 中心文案格式 | `82%` 默认；`StoreHealthProgress` 可选 `82分` |

---

## 8. 开发检查清单

- [ ] 用户确认本分析报告
- [ ] 新增 `progress-tokens.ts` 并导出
- [ ] 实现 `Progress`（line）
- [ ] 实现 `ProgressCircle` · `ProgressDashboard`
- [ ] 实现 `ProgressLabel`
- [ ] 实现三个业务预设
- [ ] `package.json` 导出 `@yd-ds/ui/progress`
- [ ] 文档页 `/components/progress`（全中文）
- [ ] 单元测试 + Storybook
- [ ] `pnpm build` + test 通过

---

## 附录 A：与 Upload ProgressBar 对照

| 维度 | Upload 内联 | Progress 组件 |
|------|-------------|---------------|
| 高度 | 2px / 6px | 4px / 6px / 8px |
| 轨道色 | `--upload-progress-track` 浅蓝 | `--progress-track-default` 中性灰 |
| 语义 | 仅上传中 | 四态 + 业务阈值 |
| 条纹 | 无 | `striped` 支持 |
| 复用 | 私有 | 设计系统级 |

## 附录 B：与 Tag 预设对照

| 业务概念 | Tag 预设 | Progress 预设 |
|----------|----------|---------------|
| 巡检任务状态 | `InspectionStatusTag` | — |
| 整改流程状态 | `RectificationStatusTag` | — |
| 整改完成比例 | — | `RectificationProgress` |
| 巡检周期完成 | — | `InspectionProgress` |
| 门店综合健康 | — | `StoreHealthProgress` |
| 风险等级 | `StoreRiskLevelTag` | — |

---

**请先审阅本报告。** 确认后按优先级开发；证照域与门店域 Progress 不冲突（无重名预设）。
