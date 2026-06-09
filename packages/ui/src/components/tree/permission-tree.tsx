"use client";

import { PERMISSION_TREE_DATA } from "./tree-data";
import { Tree } from "./tree";
import type { PermissionTreeProps } from "./tree.types";

export function PermissionTree({
  treeData = PERMISSION_TREE_DATA,
  defaultExpandedKeys = ["inspection", "workorder"],
  checkable = true,
  defaultExpandAll = true,
  blockNode = true,
  searchPlaceholder = "搜索权限",
  ...props
}: PermissionTreeProps) {
  return (
    <Tree
      treeData={treeData}
      defaultExpandedKeys={defaultExpandedKeys}
      checkable={checkable}
      defaultExpandAll={defaultExpandAll}
      blockNode={blockNode}
      searchPlaceholder={searchPlaceholder}
      {...props}
    />
  );
}

PermissionTree.displayName = "PermissionTree";
