# Transfer Pro 企业级穿梭系统

业务调度中枢组件，用于云盯店铺巡检任务分配、门店层级管理、巡检员调度与权限分配。

## 架构

```
UI (panels/components) + Transfer Engine + Rule Engine + Diff Engine
```

## 基础用法

```tsx
import { TransferPro } from "@yd-ds/ui/transfer-pro";

<TransferPro
  mode="list"
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={["待分配", "已分配"]}
/>
```

## 业务模式

```tsx
import { StoreTransferPro, InspectorTransferPro, PermissionTransferPro } from "@yd-ds/ui/transfer-pro";

<StoreTransferPro mode="tree" showSearch showBatchToolbar />
<InspectorTransferPro showSearch />
<PermissionTransferPro oneWay showDiff baselineKeys={[]} />
```

## 三模式

| 模式 | 说明 |
|------|------|
| list | 基础列表穿梭 |
| tree | 集团→区域→商场→门店，父子联动选中 |
| table | 门店名称/区域/巡检状态/最近巡检/人员归属 |

左右面板可独立模式：`mode={{ left: 'tree', right: 'table' }}`

## Rule Engine

- `by-region` 按区域自动分配
- `by-store-level` 按门店等级分配
- `by-inspection-frequency` 按巡检频率分配
- `by-inspector-load` 按人员负载均衡

## Batch Strategy

- `manual` 手动选择
- `recommend` 智能推荐
- `full` 一键全量分配

## Design Token

| Token | 说明 |
|-------|------|
| transfer-pro-mode-tree | Tree 模式色 |
| transfer-pro-mode-table | Table 模式色 |
| transfer-pro-diff-add | Diff 新增（绿） |
| transfer-pro-diff-remove | Diff 移除（红） |
| transfer-pro-panel-min-width | 面板最小宽度 |
| transfer-pro-node-indent | Tree 缩进 |

## 最佳实践

1. 门店层级管理优先使用 `StoreTransferPro` + `mode="tree"`
2. 运营视角分配使用 `mode={{ left: 'tree', right: 'table' }}`
3. 权限中心使用 `oneWay` + `showDiff` 做审计对比
4. 批量调度配合 `showBatchToolbar` + Rule Engine
