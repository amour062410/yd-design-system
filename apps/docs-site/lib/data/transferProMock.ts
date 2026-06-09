import type { ApiTableRow } from "@/components/docs/api-table";

export const TRANSFER_PRO_INTRO =
  "Transfer Pro 是企业级业务调度中枢组件，在基础 Transfer 之上提供 Tree / Table / List 三模式、Rule Engine 规则分配、Batch Strategy 批量策略与 Diff View 变更审计，适用于云盯巡检任务分配、门店层级管理与权限分配中心。";

export const TRANSFER_PRO_WHEN_TO_USE = [
  "店铺巡检任务需按区域/商场/门店层级批量分配",
  "运营视角需查看门店名称、巡检状态、人员归属等字段",
  "需按区域、等级、频率或负载规则自动分配",
  "权限变更需 Diff 对比与审计留痕",
];

export const TRANSFER_PRO_CODE_EXAMPLE = `import { StoreTransferPro } from "@yd-ds/ui/transfer-pro";

<StoreTransferPro
  mode="tree"
  showSearch
  showBatchToolbar
  showDiff
  baselineKeys={baselineKeys}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
/>`;

export const TRANSFER_PRO_DEMO_CODES = {
  list: `import { TransferPro, TRANSFER_PRO_LIST_DATA } from "@yd-ds/ui/transfer-pro";

<TransferPro mode="list" dataSource={TRANSFER_PRO_LIST_DATA} targetKeys={keys} onChange={setKeys} />`,
  tree: `import { StoreTransferPro } from "@yd-ds/ui/transfer-pro";

<StoreTransferPro showSearch targetKeys={keys} onChange={setKeys} />`,
  table: `import { TransferPro } from "@yd-ds/ui/transfer-pro";

<TransferPro mode={{ left: "tree", right: "table" }} showSearch targetKeys={keys} onChange={setKeys} />`,
  rule: `import { StoreTransferPro } from "@yd-ds/ui/transfer-pro";

<StoreTransferPro
  showBatchToolbar
  activeRule="by-region"
  onRuleApply={(rule, keys) => applyKeys(keys)}
  targetKeys={keys}
  onChange={setKeys}
/>`,
  diff: `import { StoreTransferPro } from "@yd-ds/ui/transfer-pro";

<StoreTransferPro showDiff baselineKeys={baseline} targetKeys={keys} onChange={setKeys} />`,
  inspector: `import { InspectorTransferPro } from "@yd-ds/ui/transfer-pro";

<InspectorTransferPro showSearch targetKeys={keys} onChange={setKeys} />`,
};

export const TRANSFER_PRO_API_ROWS: ApiTableRow[] = [
  { prop: "mode", description: "面板模式", type: "'list' | 'tree' | 'table' | { left?, right? }", default: "'list'" },
  { prop: "dataSource / treeData", description: "列表/树形数据源", type: "TransferProRecord[] / TransferProTreeNode[]", default: "-" },
  { prop: "targetKeys", description: "已分配 key", type: "string[]", default: "-" },
  { prop: "baselineKeys", description: "Diff 基准 key", type: "string[]", default: "-" },
  { prop: "onChange", description: "变更回调", type: "(keys, info) => void", default: "-" },
  { prop: "showSearch", description: "搜索过滤", type: "boolean", default: "true" },
  { prop: "showDiff", description: "Diff 审计视图", type: "boolean", default: "false" },
  { prop: "showBatchToolbar", description: "批量策略工具栏", type: "boolean", default: "true" },
  { prop: "batchStrategy", description: "manual / recommend / full", type: "TransferProBatchStrategy", default: "'manual'" },
  { prop: "activeRule / onRuleApply", description: "规则引擎", type: "TransferProRule", default: "-" },
  { prop: "checkStrictly", description: "Tree 父子独立选中", type: "boolean", default: "false" },
  { prop: "oneWay", description: "单向分配", type: "boolean", default: "false" },
  { prop: "panelWidth / resizable", description: "面板宽度/拖拽", type: "number / boolean", default: "320 / true" },
];

export const TRANSFER_PRO_BUSINESS_API_ROWS: ApiTableRow[] = [
  { prop: "StoreTransferPro", description: "门店层级 Tree 分配", type: "Component", default: "-" },
  { prop: "InspectorTransferPro", description: "巡检员调度", type: "Component", default: "-" },
  { prop: "PermissionTransferPro", description: "权限分配中心（oneWay）", type: "Component", default: "-" },
];

export const TRANSFER_PRO_TOKEN_ROWS = [
  { token: "transferProModeTree", cssVar: "--transfer-pro-mode-tree", description: "Tree 模式标识色" },
  { token: "transferProModeTable", cssVar: "--transfer-pro-mode-table", description: "Table 模式标识色" },
  { token: "transferProDiffAdd", cssVar: "--transfer-pro-diff-add", description: "Diff 新增高亮（绿）" },
  { token: "transferProDiffRemove", cssVar: "--transfer-pro-diff-remove", description: "Diff 移除高亮（红）" },
  { token: "transferProRuleTagBg", cssVar: "--transfer-pro-rule-tag-bg", description: "规则标签背景" },
  { token: "transferProBatchToolbarHeight", cssVar: "--transfer-pro-batch-toolbar-height", description: "批量工具栏高度 44px" },
  { token: "transferProPanelMinWidth", cssVar: "--transfer-pro-panel-min-width", description: "面板最小宽度 280px" },
  { token: "transferProNodeIndent", cssVar: "--transfer-pro-node-indent", description: "Tree 缩进 24px" },
];
