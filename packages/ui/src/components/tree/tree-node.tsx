"use client";

import { ChevronDown, ChevronRight, Folder, FolderOpen, Store } from "lucide-react";
import { Checkbox } from "../checkbox";
import {
  treeCheckboxWrapClass,
  treeIconClass,
  treeLoadingClass,
  treeNodeRowClass,
  treeNodeTitleClass,
  treeSwitcherClass,
} from "./tree.styles";
import { highlightTitle } from "./tree-utils";
import type { TreeDataNode } from "./tree.types";

function DefaultNodeIcon({ expanded, isLeaf }: { expanded: boolean; isLeaf?: boolean }) {
  if (isLeaf) return <Store className="size-4" aria-hidden />;
  return expanded ? <FolderOpen className="size-4" aria-hidden /> : <Folder className="size-4" aria-hidden />;
}

export type TreeNodeRenderContext = {
  level: number;
  visibleKeys?: Set<string>;
  expandedKeys: Set<string>;
  selectedKeys: Set<string>;
  checkedKeys: Set<string>;
  halfCheckedKeys: Set<string>;
  loadingKeys: Set<string>;
  checkable?: boolean;
  showIcon?: boolean;
  blockNode?: boolean;
  searchKeyword?: string;
  onExpand: (node: TreeDataNode) => void;
  onSelect: (node: TreeDataNode) => void;
  onCheck: (node: TreeDataNode, checked: boolean) => void;
};

export function TreeNode({
  node,
  context,
}: {
  node: TreeDataNode;
  context: TreeNodeRenderContext;
}) {
  const {
    level,
    visibleKeys,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    halfCheckedKeys,
    loadingKeys,
    checkable,
    showIcon,
    blockNode,
    searchKeyword,
    onExpand,
    onSelect,
    onCheck,
  } = context;

  const hasChildren = Boolean(node.children?.length);
  const isLeaf = node.isLeaf ?? !hasChildren;
  const expanded = expandedKeys.has(node.key);
  const indent = level * 24;
  const disabled = Boolean(node.disabled);

  if (visibleKeys && !visibleKeys.has(node.key)) return null;

  return (
    <div data-tree-node={node.key}>
      <div
        className={treeNodeRowClass({
          selected: selectedKeys.has(node.key),
          disabled,
          blockNode,
        })}
        style={{ paddingLeft: `${indent + 4}px` }}
        role="treeitem"
        aria-selected={selectedKeys.has(node.key)}
        aria-expanded={!isLeaf ? expanded : undefined}
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return;
          onSelect(node);
        }}
      >
        <button
          type="button"
          className={treeSwitcherClass({ disabled, leaf: isLeaf })}
          tabIndex={-1}
          aria-label={expanded ? "收起" : "展开"}
          onClick={(event) => {
            event.stopPropagation();
            if (disabled || isLeaf) return;
            onExpand(node);
          }}
        >
          {loadingKeys.has(node.key) ? (
            <span className={treeLoadingClass()} aria-hidden />
          ) : expanded ? (
            <ChevronDown className="size-4" aria-hidden />
          ) : (
            <ChevronRight className="size-4" aria-hidden />
          )}
        </button>

        {checkable ? (
          <span className={treeCheckboxWrapClass()} onClick={(event) => event.stopPropagation()}>
            <Checkbox
              size="sm"
              checked={checkedKeys.has(node.key)}
              indeterminate={halfCheckedKeys.has(node.key)}
              disabled={disabled}
              onChange={(next) => onCheck(node, next)}
            />
          </span>
        ) : null}

        {showIcon ? (
          <span className={treeIconClass()}>
            {node.icon ?? <DefaultNodeIcon expanded={expanded} isLeaf={isLeaf} />}
          </span>
        ) : null}

        <span className={treeNodeTitleClass({ selected: selectedKeys.has(node.key), disabled })}>
          {searchKeyword ? highlightTitle(node.title, searchKeyword) : node.title}
        </span>
      </div>

      {expanded && hasChildren ? (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNode key={child.key} node={child} context={{ ...context, level: level + 1 }} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function TreeNodeList({
  nodes,
  context,
}: {
  nodes: TreeDataNode[];
  context: Omit<TreeNodeRenderContext, "level"> & { level?: number };
}) {
  const { level = 0, ...rest } = context;
  return (
    <>
      {nodes.map((node) => (
        <TreeNode key={node.key} node={node} context={{ ...rest, level }} />
      ))}
    </>
  );
}
