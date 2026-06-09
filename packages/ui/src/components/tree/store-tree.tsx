"use client";

import { STORE_TREE_DATA } from "./tree-data";
import { Tree } from "./tree";
import type { StoreTreeProps } from "./tree.types";

export function StoreTree({
  treeData = STORE_TREE_DATA,
  defaultExpandedKeys = ["nation", "chengdu"],
  showIcon = true,
  blockNode = true,
  searchPlaceholder = "搜索门店 / 区域",
  ...props
}: StoreTreeProps) {
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

StoreTree.displayName = "StoreTree";
