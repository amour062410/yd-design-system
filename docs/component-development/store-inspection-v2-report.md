# StoreInspectionDemo V2 重构报告

## 背景

原 `InspectionTable` 顶部筛选区将状态 Select、日期范围与搜索并列展示，导致：

1. 筛选区高度过高，挤压表格首屏可视区域
2. 低频日期筛选占据核心位置
3. 状态 Select 切换效率低于 Tag 组
4. 页面缺少巡检 SaaS 业务特征（概览指标、快捷状态统计）

## 设计目标

参考飞书任务、企业微信任务中心、腾讯运营后台：

- **表格优先**：筛选区垂直占用最小化
- **筛选轻量化**：高频在前、低频折叠
- **信息密度提升**：标题区展示业务 KPI
- **首屏垂直占用减少**：三层结构合计约 120px（折叠高级筛选时）

## 架构：三层筛选

```
┌─────────────────────────────────────────────────────────────┐
│ 门店巡检管理          今日待巡检 25 · 超期 13 · 风险 8      │  ← 标题 + InspectionOverviewStats
├─────────────────────────────────────────────────────────────┤
│ [全部 128] [待开始 25] [进行中 32] [已完成 58] [已超期 13]  │  ← InspectionQuickFilter
├─────────────────────────────────────────────────────────────┤
│ 🔍 搜索门店/负责人  [巡检方式▼]     刷新 导出 列设置        │  ← TableToolbar compact
│ ▸ 高级筛选                                                  │  ← InspectionAdvancedFilter（默认折叠）
├─────────────────────────────────────────────────────────────┤
│                        Table                                 │
└─────────────────────────────────────────────────────────────┘
```

### 第一层 · InspectionQuickFilter

| 能力 | 说明 |
|------|------|
| 形式 | QuickFilter Tag Group + Badge 数量 |
| 状态 | 全部 / 待开始 / 进行中 / 已完成 / 已超期 |
| 交互 | 点击切换、当前项高亮、Badge 显示 count |
| 数据 | `quickFilterItems` 可覆盖；默认 `buildQuickFilterItems(dataSource)` |

### 第二层 · TableToolbar `variant="compact"`

| 区域 | 内容 |
|------|------|
| 左侧 | 搜索门店/负责人、巡检方式 |
| 右侧 | 刷新、导出、列设置 |
| 约束 | `flex-nowrap`，禁止换行，高度 `h-10` |

### 第三层 · InspectionAdvancedFilter

| 能力 | 说明 |
|------|------|
| 默认 | 折叠 |
| 展开 | 日期范围、负责人、区域、门店等级 |
| 提示 | 有活跃条件时显示「已筛选」标记 |

## 业务增强 · 巡检概览

`InspectionOverviewStats` 置于标题右侧：

| 指标 | 演示值 | 组件 |
|------|--------|------|
| 今日待巡检 | 25 | Statistic + `pending` StatusTag |
| 超期任务 | 13 | Statistic + `overdue` StatusTag（高亮） |
| 风险门店 | 8 | Statistic + `overdue` StatusTag（高亮） |

通过 `overviewItems` 注入；未传时根据 `dataSource` 自动统计。

## 新增 / 变更文件

| 文件 | 说明 |
|------|------|
| `inspection-quick-filter.tsx` | `InspectionQuickFilter`、`buildQuickFilterItems` |
| `inspection-overview-stats.tsx` | `InspectionOverviewStats` |
| `inspection-advanced-filter.tsx` | `InspectionAdvancedFilter` |
| `inspection-table.tsx` | V2 三层布局重构 |
| `table-toolbar.tsx` | 新增 `variant: compact`，移除状态/日期 |
| `store-inspection-demo.tsx` | 128 条 mock + V2 统计常量 |
| `inspection.types.ts` | 扩展 `region` / `storeLevel` / `isRisk` |

## 导出（`@yd-ds/ui/table`）

```ts
InspectionQuickFilter, buildQuickFilterItems
InspectionOverviewStats
InspectionAdvancedFilter
STORE_INSPECTION_V2_QUICK_FILTER
STORE_INSPECTION_V2_OVERVIEW
STORE_INSPECTION_SAMPLE_DATA
```

## Storybook

`YD Design System/InspectionTable` 新增 Stories：

- `QuickFilter`
- `OverviewStats`
- `ToolbarCompact`
- `AdvancedFilter`
- `StoreInspectionDemo V2`

## 演示数据

`STORE_INSPECTION_DEMO_DATA` 按业务分布生成 128 条：

- 待开始 25 · 进行中 32 · 已完成 58 · 已超期 13
- 含 `region`、`storeLevel`、`isRisk`（前 8 条为风险门店）

## 迁移说明

| V1 | V2 |
|----|-----|
| `TableToolbar` 内状态 Select | `InspectionQuickFilter` Tag 组 |
| 日期在工具栏 | `InspectionAdvancedFilter` 折叠区 |
| 无业务概览 | `InspectionOverviewStats` |
| `TableToolbar` 多行换行 | `variant="compact"` 单行 |

`InspectionTable` API 向后兼容：未传 `quickFilterItems` / `overviewItems` 时自动从 `dataSource` 计算。

## 验证

```bash
pnpm --filter @yd-ds/ui test
pnpm --filter @yd-ds/ui build
pnpm --filter docs-site exec tsc --noEmit
```
