# InspectionTable 业务增强报告

**日期**：2026-06-01  
**场景**：云盯（门店巡检 SaaS）  
**原则**：不继续堆叠通用 Table 能力，升级为 **InspectionTable 业务模式**。

## 目标

将 `@yd-ds/ui/table` 从通用表格升级为可复用的巡检业务表格套件，导出路径 **不变**。

## 新增模块

| 文件 | 组件 | 说明 |
|------|------|------|
| `table-toolbar.tsx` | `TableToolbar` | 搜索、状态/方式/日期筛选、刷新、导出、列设置 |
| `table-column-setting.tsx` | `TableColumnSetting` | Drawer 列配置、全选、恢复默认、localStorage |
| `table-batch-actions.tsx` | `TableBatchActions` | 批量操作条（已选 N 项） |
| `inspection-status-tag.tsx` | `InspectionStatusTag` | pending / in_progress / completed / overdue / cancelled |
| `inspection-table.tsx` | `InspectionTable` | 业务表格编排层 |
| `store-inspection-demo.tsx` | `StoreInspectionDemo` | 完整门店巡检管理 Demo |
| `inspection.types.ts` | 类型 | 业务 Record / Toolbar / Batch 类型 |

## 能力说明

### TableToolbar

```tsx
<TableToolbar
  searchable
  exportable
  refreshable
  columnSetting
  searchValue={search}
  onSearch={setSearch}
  onStatusChange={setStatus}
  onMethodChange={setMethod}
  onDateFromChange={setFrom}
  onDateToChange={setTo}
  onRefresh={refresh}
  onExport={exportAll}
  onOpenColumnSetting={() => setOpen(true)}
/>
```

### ColumnSetting

- Drawer 弹层
- 全选 / 恢复默认
- `localStorage` key：`yd-table-columns:{storageKey}`

### TableBatchActions

```tsx
<TableBatchActions
  selectedCount={12}
  selectedKeys={keys}
  actions={[{ key: "assign", label: "批量指派", onClick: onAssign }]}
/>
```

### InspectionStatusTag

禁止业务页自行写状态 Tag，统一使用：

```tsx
<InspectionStatusTag status="in_progress" />
```

### InspectionTable

默认列：门店名称、巡检负责人、执行周期、巡检方式、状态、最近巡检时间；可选：更新时间、创建时间、门店编码。

```tsx
import { InspectionTable, StoreInspectionDemo } from "@yd-ds/ui/table";

<InspectionTable dataSource={rows} storageKey="my-inspection" />
<StoreInspectionDemo />
```

## 文档

- `/components/table` → **InspectionTable · 云盯业务**、**StoreInspectionDemo**

## 验证

```bash
pnpm --filter @yd-ds/ui build
pnpm --filter @yd-ds/ui test
pnpm --filter docs-site exec tsc --noEmit
```

## 与通用 Table 边界

| 层 | 职责 |
|----|------|
| `Table` | 通用渲染、排序、筛选、分页、选择 |
| `InspectionTable` | 云盯巡检业务编排（Toolbar / Batch / 列配置 / 状态 Tag） |
| `StoreInspectionDemo` | 文档与验收用完整页面 |

后续业务表（证照、任务等）可复用 `TableToolbar` + `TableColumnSetting` + `TableBatchActions`，仅替换列定义与筛选逻辑。
