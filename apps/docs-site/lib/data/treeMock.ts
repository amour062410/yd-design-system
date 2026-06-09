import type { ApiTableRow } from "@/components/docs/api-table";

export const TREE_INTRO =
  "Tree（树形控件）以结构化的可展开格式展示层级数据，适用于门店组织、区域筛选、权限配置等云盯后台场景。";

export const TREE_WHEN_TO_USE = [
  "门店 / 区域层级浏览与筛选（StoreTree）",
  "组织架构选择（OrganizationTree）",
  "权限勾选配置（PermissionTree）",
  "需要搜索定位节点并自动展开父级",
  "大区数据异步懒加载",
] as const;

export const TREE_CODE_EXAMPLE = `import { StoreTree } from "@yd-ds/ui/tree";

<StoreTree
  searchable
  selectedKeys={selectedKeys}
  onSelect={(keys) => setSelectedKeys(keys)}
/>`;

export const TREE_DEMO_CODES = {
  basic: `import { Tree, STORE_TREE_DATA } from "@yd-ds/ui/tree";

<Tree
  treeData={STORE_TREE_DATA}
  defaultExpandedKeys={["nation", "chengdu"]}
  blockNode
/>`,
  checkable: `import { Tree, STORE_TREE_DATA } from "@yd-ds/ui/tree";

<Tree
  treeData={STORE_TREE_DATA}
  checkable
  showIcon
  defaultExpandedKeys={["nation"]}
  defaultCheckedKeys={["cd-mixc"]}
/>`,
  searchable: `import { StoreTree } from "@yd-ds/ui/tree";

<StoreTree searchable defaultExpandedKeys={["nation"]} />`,
  async: `import { Tree, ASYNC_TREE_ROOT, mockLoadTreeChildren } from "@yd-ds/ui/tree";

<Tree treeData={ASYNC_TREE_ROOT} loadData={mockLoadTreeChildren} showIcon />`,
  storeTree: `import { StoreTree } from "@yd-ds/ui/tree";

<StoreTree searchable />`,
  organizationTree: `import { OrganizationTree } from "@yd-ds/ui/tree";

<OrganizationTree searchable />`,
  permissionTree: `import { PermissionTree } from "@yd-ds/ui/tree";

<PermissionTree searchable checkedKeys={checkedKeys} onCheck={setCheckedKeys} />`,
} as const;

export const TREE_API_ROWS: ApiTableRow[] = [
  { prop: "treeData", description: "树形数据", type: "TreeDataNode[]", default: "[]" },
  { prop: "selectedKeys", description: "选中节点 key（受控）", type: "string[]", default: "-" },
  { prop: "defaultSelectedKeys", description: "默认选中", type: "string[]", default: "[]" },
  { prop: "expandedKeys", description: "展开节点 key（受控）", type: "string[]", default: "-" },
  { prop: "defaultExpandedKeys", description: "默认展开", type: "string[]", default: "[]" },
  { prop: "defaultExpandAll", description: "默认展开全部", type: "boolean", default: "false" },
  { prop: "checkedKeys", description: "勾选节点 key（受控）", type: "string[]", default: "-" },
  { prop: "checkable", description: "是否可勾选", type: "boolean", default: "false" },
  { prop: "checkStrictly", description: "勾选严格模式，父子不联动", type: "boolean", default: "false" },
  { prop: "multiple", description: "是否多选", type: "boolean", default: "false" },
  { prop: "searchable", description: "是否可搜索", type: "boolean", default: "false" },
  { prop: "searchValue", description: "搜索关键词（受控）", type: "string", default: "-" },
  { prop: "onSearchChange", description: "搜索变更回调", type: "(value) => void", default: "-" },
  { prop: "showIcon", description: "显示节点图标", type: "boolean", default: "false" },
  { prop: "loadedKeys", description: "已异步加载的节点 key", type: "string[]", default: "[]" },
  { prop: "loadData", description: "异步加载子节点", type: "(node) => Promise<TreeDataNode[]>", default: "-" },
  { prop: "onSelect", description: "选中回调", type: "(keys, info) => void", default: "-" },
  { prop: "onCheck", description: "勾选回调", type: "(keys, info) => void", default: "-" },
  { prop: "onExpand", description: "展开回调", type: "(keys, info) => void", default: "-" },
];

export const TREE_BUSINESS_API_ROWS: ApiTableRow[] = [
  { prop: "StoreTree", description: "门店区域树，内置全国门店数据", type: "Component", default: "-" },
  { prop: "OrganizationTree", description: "组织架构树", type: "Component", default: "-" },
  { prop: "PermissionTree", description: "权限树，默认 checkable", type: "Component", default: "-" },
];

export const TREE_TOKEN_ROWS = [
  { token: "treeColorBg", cssVar: "--tree-color-bg", description: "容器背景 (#FFFFFF)" },
  { token: "treeColorBorder", cssVar: "--tree-color-border", description: "边框 (#F0F0F0)" },
  { token: "treeColorTitleSelected", cssVar: "--tree-color-title-selected", description: "选中文字 (#165DFF)" },
  { token: "treeColorNodeSelectedBg", cssVar: "--tree-color-node-selected-bg", description: "选中背景" },
  { token: "treeIndentSize", cssVar: "--tree-indent-size", description: "层级缩进 24px" },
  { token: "treeNodeHeight", cssVar: "--tree-node-height", description: "节点行高 32px" },
] as const;

export type StoreManagementRow = {
  key: string;
  storeName: string;
  region: string;
  manager: string;
  status: string;
  lastInspection: string;
  treeKey: string;
};

export const STORE_MANAGEMENT_ROWS: StoreManagementRow[] = [
  { key: "1", storeName: "万象城店", region: "成都区域", manager: "张三", status: "正常", lastInspection: "2026-06-08", treeKey: "cd-mixc" },
  { key: "2", storeName: "IFS店", region: "成都区域", manager: "李四", status: "整改中", lastInspection: "2026-06-07", treeKey: "cd-ifs" },
  { key: "3", storeName: "银泰店", region: "成都区域", manager: "王五", status: "正常", lastInspection: "2026-06-06", treeKey: "cd-intime" },
  { key: "4", storeName: "来福士店", region: "重庆区域", manager: "赵六", status: "正常", lastInspection: "2026-06-05", treeKey: "cq-raffles" },
  { key: "5", storeName: "龙湖天街店", region: "重庆区域", manager: "钱七", status: "待巡检", lastInspection: "2026-06-04", treeKey: "cq-longfor" },
  { key: "6", storeName: "光环购物公园店", region: "重庆区域", manager: "孙八", status: "正常", lastInspection: "2026-06-03", treeKey: "cq-ring" },
];

export const STORE_TREE_KEY_TO_REGION: Record<string, string | null> = {
  nation: null,
  chengdu: "成都区域",
  chongqing: "重庆区域",
  "cd-mixc": "成都区域",
  "cd-ifs": "成都区域",
  "cd-intime": "成都区域",
  "cq-raffles": "重庆区域",
  "cq-longfor": "重庆区域",
  "cq-ring": "重庆区域",
};
