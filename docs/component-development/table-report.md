# Table 组件开发报告

**日期**：2026-06-01  
**范围**：`packages/ui` · 文档 `/components/table`  
**约束**：不新建组件包，仅使用 `@yd-ds/ui` 与现有 Token 体系。

## 目标

基于 YD Design System 实现 Table，参考 Ant Design / Arco Design：

- 品牌色 `#165DFF`（`--table-action-color`）
- 圆角 `6px`（`--table-radius`）
- 与 Input / Select / Tabs / Modal / Drawer 风格一致

## 交付物

| 路径 | 说明 |
|------|------|
| `packages/ui/src/components/table/table.tsx` | 核心 Table |
| `packages/ui/src/components/table/table.types.ts` | 类型 |
| `packages/ui/src/components/table/table-tokens.ts` | Token 重导出 |
| `packages/ui/src/components/table/candidate-table-demo.tsx` | 门店巡检业务示例 |
| `packages/ui/src/components/table/table.test.tsx` | Vitest |
| `packages/ui/src/components/table/table.stories.tsx` | Storybook |
| `packages/ui/src/components/table.tsx` | 构建 re-export |
| `packages/ui/src/components/table-pagination.tsx` | 分页（保留同级） |
| `packages/ui/src/components/table-actions.tsx` | 操作列（保留同级） |
| `packages/ui/src/components/table-business-patterns.tsx` | 业务表格（保留同级） |

## 功能矩阵

| 能力 | 实现 |
|------|------|
| Basic Table | `Table` + columns / dataSource |
| Fixed Header | `scroll.y` + sticky thead |
| Fixed Column | `column.fixed` + `scroll.x` |
| Empty / Loading | `empty` / `loading` skeleton |
| Zebra Row | `striped` |
| Hover Row | CSS hover + `showcaseRowState` |
| Pagination | `TablePagination` |
| Sorting / Filtering | 列 `sorter` / `filters` + `onChange` |
| Search Integration | `searchValue` + `onSearch` + 内置搜索框 |
| Row Selection | `rowSelection` |
| Expandable Row | `expandable.expandedRowRender` |
| Dense / Middle / Large | `size`: `sm` / `md` / `lg` |
| Custom Cell / Action Column | `column.render` + `TableActionLink` |
| Editable Cell / Row | 文档 `EditableCell` + 行内编辑示例 |

## CandidateTableDemo

门店巡检案例字段：

- 门店名称、门店负责人、执行周期、状态、巡检方式
- 内置搜索、状态列筛选、行选择、斑马纹、横向滚动、分页

```tsx
import { CandidateTableDemo } from "@yd-ds/ui/table";

<CandidateTableDemo />
```

## 文档页

`/components/table` 展示：Basic、Sorting、Filtering、Selection、Expandable、Editable、Fixed Header、Fixed Column、Empty、Loading、CandidateTableDemo。

## 验证

```bash
pnpm --filter @yd-ds/tokens build
pnpm --filter @yd-ds/ui build
pnpm --filter @yd-ds/ui test
pnpm --filter docs-site exec tsc --noEmit
```

## Token 变更

- 新增 `lg` 尺寸（Large 72px 行高）
- `sm` / `md` 别名 Dense / Middle
- 新增 `--table-row-stripe-bg`
