# StoreInspectionDemo V3 重构报告

## 背景

V2 参考了 Jira / 飞书任务等**任务管理系统**布局（今日待巡检、进行中、快捷任务状态 Tag），与云盯**风险管理平台**定位不符。

云盯用户打开巡检页的第一诉求是：

- 哪些门店有问题
- 哪些门店风险最高
- 哪些整改没有完成

而非「今天还有多少任务待执行」。

## 设计原则

| 遵循 | 禁止参考 |
|------|----------|
| 证照管理页筛选布局 | Jira / Asana |
| 风险管理驾驶舱指标 | 飞书任务中心 |
| 整改管理 StatusTabs | Linear 任务看板 |
| CertificateStatusTable 表格范式 | 任务状态 Select |

## 页面结构（四层）

```
┌──────────────────────────────────────────────────────────────┐
│ 门店巡检总览                              刷新 · 导出报表     │
│ 风险驾驶舱 — 聚焦异常门店、整改闭环与高风险预警               │
├──────────────────────────────────────────────────────────────┤
│ [异常门店 18] [待整改项 42] [高风险门店 7] [巡检完成率 86%]  │  ← InspectionOverviewCards
├──────────────────────────────────────────────────────────────┤
│ 门店 ▼  区域 ▼  巡检模板 ▼  巡检类型 ▼  │  🔍 关键词        │  ← InspectionBusinessFilter
├──────────────────────────────────────────────────────────────┤
│ 全部 30  异常 6  待整改 8  整改中 5  已完成 11              │  ← StatusTabs
├──────────────────────────────────────────────────────────────┤
│ ▌门店  得分  异常项  风险等级  最近巡检  整改状态  完成率  操作│  ← InspectionRiskTable
└──────────────────────────────────────────────────────────────┘
```

### 第一层 · InspectionOverviewCards（风险驾驶舱）

| 指标 | 演示值 | 语义 |
|------|--------|------|
| 异常门店 | 18 家 | 存在巡检异常需关注 |
| 待整改项 | 42 项 | 未闭环整改条目 |
| 高风险门店 | 7 家 | 低分 / 高异常门店 |
| 巡检完成率 | 86% | 周期内完成比例 |

**已移除**：今日待巡检、进行中任务、超期任务等任务中心指标。

### 第二层 · InspectionBusinessFilter

对齐证照管理页 `h-14` 单行筛选：

- 门店筛选
- 区域筛选
- 巡检模板筛选
- 巡检类型筛选
- 关键词搜索

### 第三层 · StatusTabs（Tab + Count）

| Tab | 说明 |
|-----|------|
| 全部 | 所有记录 |
| 异常 | `abnormal` |
| 待整改 | `pending_rectification` |
| 整改中 | `rectifying` |
| 已完成 | `completed` |

不使用 Select，支持数量展示与快速切换；异常 / 待整改带 danger / warning 色调。

### 第四层 · InspectionRiskTable

**移除字段**：负责人、执行周期、巡检方式（任务态）

**优先字段**：

| 列 | 组件 |
|----|------|
| 门店名称 | 含门店类型 Tag |
| 巡检得分 | `InspectionScore` |
| 异常项数量 | 红色高亮 > 0 |
| 风险等级 | `StoreRiskLevelTag` |
| 最近巡检时间 | — |
| 整改状态 | `RectificationStatusTag` |
| 整改完成率 | 百分比色阶 |
| 操作 | 查看 / 发起整改 |

左侧保留 `RiskColorBar`（高→红 / 中→橙 / 低→绿），默认按风险等级排序。

## 新增组件

### StoreRiskLevelTag

```tsx
<StoreRiskLevelTag level="high" />   // 高风险
<StoreRiskLevelTag level="medium" /> // 中风险
<StoreRiskLevelTag level="low" />    // 低风险
```

> 与证照域 `RiskLevelTag`（已过期/即将到期/正常）区分，避免语义冲突。

### InspectionScore

```tsx
<InspectionScore score={95} /> // 90+ 绿色
<InspectionScore score={82} /> // 80+ 蓝色
<InspectionScore score={67} /> // 60+ 橙色 / 60以下红色
```

### RectificationStatusTag

异常 / 待整改 / 整改中 / 已完成 四态标签。

## 文件清单

| 文件 | 职责 |
|------|------|
| `inspection-risk.types.ts` | V3 业务类型 |
| `inspection-overview-cards.tsx` | 风险驾驶舱卡片 |
| `inspection-business-filter.tsx` | 业务筛选单行 |
| `inspection-risk-table.tsx` | 风险优先表格 |
| `store-risk-level-tag.tsx` | 门店风险等级 |
| `inspection-score.tsx` | 巡检得分 |
| `rectification-status-tag.tsx` | 整改状态 |
| `store-inspection-demo.tsx` | V3 完整页面 |
| `inspection-task-mock.ts` | V2 InspectionTable 任务态 mock（兼容） |

## 导出（`@yd-ds/ui/table`）

```ts
StoreInspectionDemo
STORE_INSPECTION_RISK_DATA
STORE_INSPECTION_V3_OVERVIEW
InspectionOverviewCards
InspectionBusinessFilter
InspectionRiskTable
InspectionScore
StoreRiskLevelTag
RectificationStatusTag
```

`InspectionTable`（任务态 V2）与 `STORE_INSPECTION_TASK_DATA` 保留，供通用表格文档使用。

## Storybook

- `StoreInspectionDemo V3`
- `RiskLevelAndScore`
- `OverviewCards`
- `RectificationTags`
- `InspectionTable（任务态 V2）`（兼容）

## 验证

```bash
pnpm --filter @yd-ds/ui test
pnpm --filter @yd-ds/ui build
pnpm --filter docs-site exec tsc --noEmit
```
