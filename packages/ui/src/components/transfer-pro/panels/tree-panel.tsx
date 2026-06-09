"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Checkbox } from "../../checkbox";
import {
  buildTransferProTreeIndex,
  filterTransferProTree,
  getTransferProLeafKeys,
  toggleTreeSelection,
} from "../core/transfer-engine";
import { SearchBar } from "../components/search-bar";
import { TransferFooter } from "../components/transfer-footer";
import {
  getTransferProModeBadgeStyle,
  transferProItemClass,
  transferProModeBadgeClass,
  transferProPanelBodyClass,
  transferProPanelClass,
  transferProPanelHeaderClass,
} from "../transfer-pro.tokens";
import type { TransferProTreeNode, TransferProTreePanelProps } from "../transfer-pro.types";

function TreeNodeRow({
  node,
  level,
  expanded,
  selected,
  halfChecked,
  disabled,
  diffType,
  onExpand,
  onToggle,
  onDoubleClick,
}: {
  node: TransferProTreeNode;
  level: number;
  expanded: boolean;
  selected: boolean;
  halfChecked: boolean;
  disabled?: boolean;
  diffType?: "add" | "remove";
  onExpand: () => void;
  onToggle: (checked: boolean) => void;
  onDoubleClick: () => void;
}) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  return (
    <div
      className={transferProItemClass({ selected, disabled, diffType })}
      style={{ paddingLeft: `calc(${level} * var(--transfer-pro-node-indent, 24px) + 12px)` }}
      onDoubleClick={() => !disabled && onDoubleClick()}
    >
      {hasChildren ? (
        <button
          type="button"
          className="inline-flex size-4 shrink-0 items-center justify-center text-[color:var(--transfer-pro-color-text-secondary,#86909c)]"
          onClick={(event) => {
            event.stopPropagation();
            onExpand();
          }}
        >
          {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>
      ) : (
        <span className="inline-block size-4 shrink-0" />
      )}
      <Checkbox
        size="sm"
        checked={selected}
        indeterminate={halfChecked}
        disabled={disabled}
        onChange={onToggle}
      />
      <span className="min-w-0 flex-1 truncate">{node.title}</span>
    </div>
  );
}

export function TreePanel({
  direction,
  title,
  treeData,
  expandedKeys,
  onExpandChange,
  selectedKeys,
  onSelectChange,
  searchValue,
  onSearchChange,
  showSearch,
  disabled,
  disabledKeys = [],
  diffKeys,
  onItemDoubleClick,
  panelWidth,
  checkStrictly = false,
  transferableKeys,
}: TransferProTreePanelProps) {
  const index = useMemo(() => buildTransferProTreeIndex(treeData), [treeData]);
  const { filtered, expandedKeys: searchExpanded } = useMemo(
    () => filterTransferProTree(treeData, searchValue),
    [treeData, searchValue]
  );
  const mergedExpanded = useMemo(
    () => Array.from(new Set([...expandedKeys, ...searchExpanded])),
    [expandedKeys, searchExpanded]
  );

  const renderNodes = (nodes: TransferProTreeNode[], level = 0) =>
    nodes.map((node) => {
      const nodeDisabled = disabled || disabledKeys.includes(node.key) || node.disabled;
      const leafKeys = getTransferProLeafKeys(node.key, index).filter((key) => transferableKeys.has(key));
      const selectedLeafCount = leafKeys.filter((key) => selectedKeys.includes(key)).length;
      const selected = checkStrictly
        ? selectedKeys.includes(node.key)
        : leafKeys.length > 0
          ? selectedLeafCount === leafKeys.length
          : selectedKeys.includes(node.key);
      const halfChecked =
        !checkStrictly && leafKeys.length > 0 && selectedLeafCount > 0 && selectedLeafCount < leafKeys.length;
      const diffType = diffKeys?.added.has(node.key)
        ? "add"
        : diffKeys?.removed.has(node.key)
          ? "remove"
          : undefined;

      return (
        <div key={node.key}>
          <TreeNodeRow
            node={node}
            level={level}
            expanded={mergedExpanded.includes(node.key)}
            selected={selected}
            halfChecked={halfChecked}
            disabled={nodeDisabled}
            diffType={diffType}
            onExpand={() =>
              onExpandChange(
                mergedExpanded.includes(node.key)
                  ? expandedKeys.filter((key) => key !== node.key)
                  : [...expandedKeys, node.key]
              )
            }
            onToggle={(checked) =>
              onSelectChange(
                toggleTreeSelection(
                  node.key,
                  checked,
                  selectedKeys,
                  index,
                  checkStrictly,
                  transferableKeys
                )
              )
            }
            onDoubleClick={() => onItemDoubleClick?.(node.key)}
          />
          {node.children && mergedExpanded.includes(node.key)
            ? renderNodes(node.children, level + 1)
            : null}
        </div>
      );
    });

  return (
    <div className={transferProPanelClass()} style={{ width: panelWidth }}>
      <div className={transferProPanelHeaderClass()}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate">{title}</span>
          <span className={transferProModeBadgeClass()} style={getTransferProModeBadgeStyle("tree")}>
            Tree
          </span>
        </div>
        <span className="text-[12px] font-normal text-[color:var(--transfer-pro-color-text-secondary,#86909c)]">
          {direction === "left" ? "源" : "目标"}
        </span>
      </div>
      {showSearch ? <SearchBar value={searchValue} onChange={onSearchChange} disabled={disabled} /> : null}
      <div className={transferProPanelBodyClass()}>
        {renderNodes(filtered)}
      </div>
      <TransferFooter selectedCount={selectedKeys.length} totalCount={transferableKeys.size} />
    </div>
  );
}
