"use client";

import { ORGANIZATION_TREE_DATA } from "./tree-data";
import { Tree } from "./tree";
import type { OrganizationTreeProps } from "./tree.types";

export function OrganizationTree({
  treeData = ORGANIZATION_TREE_DATA,
  defaultExpandedKeys = ["hq", "ops-center"],
  showIcon = true,
  blockNode = true,
  searchPlaceholder = "搜索组织",
  ...props
}: OrganizationTreeProps) {
  return (
    <Tree
      treeData={treeData}
      defaultExpandedKeys={defaultExpandedKeys}
      showIcon={showIcon}
      blockNode={blockNode}
      searchPlaceholder={searchPlaceholder}
      {...props}
    />
  );
}

OrganizationTree.displayName = "OrganizationTree";
