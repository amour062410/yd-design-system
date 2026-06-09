import type { ReactNode } from "react";

export type TreeDataNode = {
  key: string;
  title: ReactNode;
  children?: TreeDataNode[];
  disabled?: boolean;
  isLeaf?: boolean;
  icon?: ReactNode;
};

export type TreeCheckInfo = {
  node: TreeDataNode;
  checked: boolean;
  checkedKeys: string[];
  halfCheckedKeys: string[];
};

export type TreeSelectInfo = {
  node: TreeDataNode;
  selected: boolean;
  selectedKeys: string[];
};

export type TreeExpandInfo = {
  node: TreeDataNode;
  expanded: boolean;
  expandedKeys: string[];
};

export type TreeProps = {
  treeData: TreeDataNode[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultExpandAll?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  checkable?: boolean;
  checkStrictly?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  showIcon?: boolean;
  blockNode?: boolean;
  loadedKeys?: string[];
  defaultLoadedKeys?: string[];
  loadData?: (node: TreeDataNode) => Promise<TreeDataNode[] | void>;
  onSelect?: (selectedKeys: string[], info: TreeSelectInfo) => void;
  onExpand?: (expandedKeys: string[], info: TreeExpandInfo) => void;
  onCheck?: (checkedKeys: string[], info: TreeCheckInfo) => void;
  onLoad?: (loadedKeys: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
};

export type StoreTreeProps = Omit<TreeProps, "treeData"> & {
  treeData?: TreeDataNode[];
};

export type OrganizationTreeProps = Omit<TreeProps, "treeData"> & {
  treeData?: TreeDataNode[];
};

export type PermissionTreeProps = Omit<TreeProps, "treeData"> & {
  treeData?: TreeDataNode[];
};

export type TreeNodeProps = {
  node: TreeDataNode;
  level: number;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  loading: boolean;
  checkable?: boolean;
  showIcon?: boolean;
  blockNode?: boolean;
  searchKeyword?: string;
  onExpand: (node: TreeDataNode) => void;
  onSelect: (node: TreeDataNode) => void;
  onCheck: (node: TreeDataNode, checked: boolean) => void;
};
