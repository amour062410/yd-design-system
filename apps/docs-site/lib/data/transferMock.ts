import type { ApiTableRow } from "@/components/docs/api-table";

export const TRANSFER_INTRO =
  "Transfer（穿梭框）用于在两栏之间移动和选择数据，支持搜索过滤、批量勾选、双击移动与单向分配，适用于门店分配、巡检员分配、权限配置等云盯后台场景。";

export const TRANSFER_WHEN_TO_USE = [
  "巡检任务需从待分配门店/人员中选择目标项",
  "角色权限需从可选列表授权到已选列表",
  "数据量较大时需左右独立搜索过滤",
  "存在不可分配项（冻结门店、停用人员）需 disabled 标记",
];

export const TRANSFER_CODE_EXAMPLE = `import { StoreTransfer } from "@yd-ds/ui/transfer";

<StoreTransfer
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  showSearch
  titles={["待分配门店", "已分配门店"]}
/>`;

export const TRANSFER_DEMO_CODES = {
  basic: `import { Transfer, STORE_TRANSFER_DATA } from "@yd-ds/ui/transfer";

<Transfer
  dataSource={[...STORE_TRANSFER_DATA]}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={["待分配门店", "已分配门店"]}
/>`,
  checkable: `import { Transfer, STORE_TRANSFER_DATA } from "@yd-ds/ui/transfer";

<Transfer
  dataSource={[...STORE_TRANSFER_DATA]}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={["待分配门店", "已分配门店"]}
/>`,
  oneWay: `import { PermissionTransfer } from "@yd-ds/ui/transfer";

<PermissionTransfer oneWay targetKeys={targetKeys} onChange={setTargetKeys} />`,
  store: `import { StoreTransfer } from "@yd-ds/ui/transfer";

<StoreTransfer showSearch targetKeys={targetKeys} onChange={setTargetKeys} />`,
  inspector: `import { InspectorTransfer } from "@yd-ds/ui/transfer";

<InspectorTransfer targetKeys={targetKeys} onChange={setTargetKeys} />`,
  permission: `import { PermissionTransfer } from "@yd-ds/ui/transfer";

<PermissionTransfer targetKeys={targetKeys} onChange={setTargetKeys} />`,
  advanced: `import { StoreTransfer } from "@yd-ds/ui/transfer";

<StoreTransfer
  showSearch
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  footer={({ direction, selectedCount }) =>
    direction === "right" ? \`已选 \${selectedCount} 家门店\` : \`待分配 \${selectedCount} 项\`
  }
/>`,
};

export const TRANSFER_API_ROWS: ApiTableRow[] = [
  { prop: "dataSource", description: "数据源", type: "TransferItem[]", default: "[]" },
  { prop: "targetKeys", description: "右侧已选 key 列表", type: "string[]", default: "-" },
  { prop: "onChange", description: "穿梭变化回调", type: "(targetKeys, direction, moveKeys) => void", default: "-" },
  { prop: "render", description: "自定义渲染项", type: "(item) => ReactNode", default: "-" },
  { prop: "titles", description: "左右标题", type: "[ReactNode, ReactNode]", default: "['源列表','目标列表']" },
  { prop: "showSearch", description: "启用搜索", type: "boolean | { left?, right? }", default: "false" },
  { prop: "searchPlaceholder", description: "搜索占位", type: "string | [string, string]", default: "'请搜索'" },
  { prop: "oneWay", description: "单向分配模式", type: "boolean", default: "false" },
  { prop: "disabledKeys", description: "禁用项 key", type: "string[]", default: "[]" },
  { prop: "disabled", description: "整体禁用", type: "boolean", default: "false" },
  { prop: "footer", description: "底部统计区", type: "ReactNode | (props) => ReactNode", default: "-" },
  { prop: "listStyle", description: "列表样式", type: "CSSProperties | [left, right]", default: "-" },
];

export const TRANSFER_BUSINESS_API_ROWS: ApiTableRow[] = [
  { prop: "StoreTransfer", description: "门店分配，内置万达广场店/环球港店等数据", type: "Component", default: "-" },
  { prop: "InspectorTransfer", description: "巡检员分配，内置张伟/李娜等数据", type: "Component", default: "-" },
  { prop: "PermissionTransfer", description: "权限分配，内置巡检管理/工单管理等", type: "Component", default: "-" },
];

export const TRANSFER_TOKEN_ROWS = [
  { token: "transferPanelWidth", cssVar: "--transfer-panel-width", description: "面板宽度 (240px)" },
  { token: "transferItemHeight", cssVar: "--transfer-item-height", description: "列表项高度 (32px)" },
  { token: "transferHeaderHeight", cssVar: "--transfer-header-height", description: "头部高度 (40px)" },
  { token: "transferBorderRadius", cssVar: "--transfer-border-radius", description: "圆角 (8px)" },
  { token: "transferGap", cssVar: "--transfer-gap", description: "面板间距 (16px)" },
  { token: "transferTitleFontSize", cssVar: "--transfer-title-font-size", description: "标题字号 (14px)" },
  { token: "transferColorBorder", cssVar: "--transfer-color-border", description: "边框 (#F0F0F0)" },
  { token: "transferColorItemHoverBg", cssVar: "--transfer-color-item-hover-bg", description: "列表项 Hover 背景" },
];
