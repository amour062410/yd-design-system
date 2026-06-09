"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchInput } from "../input";
import { getAllExpandableKeys } from "./tree-data";
import { TreeNodeList } from "./tree-node";
import { treeEmptyClass, treeListClass, treeRootClass, treeSearchClass } from "./tree.styles";
import {
  buildTreeIndex,
  filterTreeByKeyword,
  toggleNodeCheck,
  toggleNodeCheckStrict,
  updateTreeNodeChildren,
} from "./tree-utils";
import type { TreeCheckInfo, TreeDataNode, TreeExpandInfo, TreeProps, TreeSelectInfo } from "./tree.types";

export function Tree({
  treeData,
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  expandedKeys: controlledExpandedKeys,
  defaultExpandedKeys = [],
  checkedKeys: controlledCheckedKeys,
  defaultCheckedKeys = [],
  checkable = false,
  checkStrictly = false,
  multiple = false,
  searchable = false,
  searchValue: controlledSearchValue,
  defaultSearchValue = "",
  searchPlaceholder = "搜索节点",
  onSearchChange,
  showIcon = false,
  blockNode = true,
  defaultExpandAll = false,
  loadedKeys: controlledLoadedKeys,
  defaultLoadedKeys = [],
  loadData,
  onSelect,
  onExpand,
  onCheck,
  onLoad,
  className,
  style,
}: TreeProps) {
  const [data, setData] = useState(treeData);
  const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(defaultSelectedKeys);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState(() =>
    defaultExpandAll ? getAllExpandableKeys(treeData) : defaultExpandedKeys
  );
  const [internalCheckedKeys, setInternalCheckedKeys] = useState(defaultCheckedKeys);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([]);
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);
  const [internalLoadedKeys, setInternalLoadedKeys] = useState(defaultLoadedKeys);

  useEffect(() => {
    setData(treeData);
  }, [treeData]);

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys;
  const checkedKeys = controlledCheckedKeys ?? internalCheckedKeys;
  const searchValue = controlledSearchValue ?? internalSearchValue;
  const loadedKeys = controlledLoadedKeys ?? internalLoadedKeys;

  const setSearchValue = useCallback(
    (next: string) => {
      if (controlledSearchValue === undefined) setInternalSearchValue(next);
      onSearchChange?.(next);
    },
    [controlledSearchValue, onSearchChange]
  );

  const setLoadedKeys = useCallback(
    (next: string[]) => {
      if (controlledLoadedKeys === undefined) setInternalLoadedKeys(next);
      onLoad?.(next);
    },
    [controlledLoadedKeys, onLoad]
  );

  const index = useMemo(() => buildTreeIndex(data), [data]);

  const searchResult = useMemo(
    () => filterTreeByKeyword(data, searchValue),
    [data, searchValue]
  );

  const effectiveExpandedKeys = useMemo(() => {
    if (!searchValue.trim()) return expandedKeys;
    return [...new Set([...expandedKeys, ...searchResult.expandedKeys])];
  }, [expandedKeys, searchResult.expandedKeys, searchValue]);

  const setExpandedKeys = useCallback(
    (next: string[], info?: TreeExpandInfo) => {
      if (controlledExpandedKeys === undefined) setInternalExpandedKeys(next);
      if (info) onExpand?.(next, info);
    },
    [controlledExpandedKeys, onExpand]
  );

  const setSelectedKeys = useCallback(
    (next: string[], info: TreeSelectInfo) => {
      if (controlledSelectedKeys === undefined) setInternalSelectedKeys(next);
      onSelect?.(next, info);
    },
    [controlledSelectedKeys, onSelect]
  );

  const setCheckedKeys = useCallback(
    (next: string[], half: string[], info: TreeCheckInfo) => {
      if (controlledCheckedKeys === undefined) setInternalCheckedKeys(next);
      setHalfCheckedKeys(half);
      onCheck?.(next, info);
    },
    [controlledCheckedKeys, onCheck]
  );

  const handleExpand = useCallback(
    async (node: TreeDataNode) => {
      const expanded = effectiveExpandedKeys.includes(node.key);
      const nextExpanded = expanded
        ? effectiveExpandedKeys.filter((key) => key !== node.key)
        : [...effectiveExpandedKeys, node.key];

      setExpandedKeys(nextExpanded, { node, expanded: !expanded, expandedKeys: nextExpanded });

      if (expanded || !loadData) return;
      const hasChildren = Boolean(node.children?.length);
      if (hasChildren || node.isLeaf || loadedKeys.includes(node.key)) return;

      setLoadingKeys((prev) => [...prev, node.key]);
      try {
        const children = await loadData(node);
        const nextLoadedKeys = [...new Set([...loadedKeys, node.key])];
        setLoadedKeys(nextLoadedKeys);
        if (children?.length) {
          setData((prev) => updateTreeNodeChildren(prev, node.key, children));
        }
      } finally {
        setLoadingKeys((prev) => prev.filter((key) => key !== node.key));
      }
    },
    [effectiveExpandedKeys, loadData, loadedKeys, setExpandedKeys, setLoadedKeys]
  );

  const handleSelect = useCallback(
    (node: TreeDataNode) => {
      if (node.disabled) return;
      const selected = selectedKeys.includes(node.key);
      let next: string[];
      if (multiple) {
        next = selected ? selectedKeys.filter((key) => key !== node.key) : [...selectedKeys, node.key];
      } else {
        next = selected ? [] : [node.key];
      }
      setSelectedKeys(next, { node, selected: !selected, selectedKeys: next });
    },
    [multiple, selectedKeys, setSelectedKeys]
  );

  const handleCheck = useCallback(
    (node: TreeDataNode, checked: boolean) => {
      const result = checkStrictly
        ? toggleNodeCheckStrict(node.key, checked, checkedKeys)
        : toggleNodeCheck(node.key, checked, checkedKeys, index);
      setCheckedKeys(result.checkedKeys, result.halfCheckedKeys, {
        node,
        checked,
        checkedKeys: result.checkedKeys,
        halfCheckedKeys: result.halfCheckedKeys,
      });
    },
    [checkStrictly, checkedKeys, index, setCheckedKeys]
  );

  const visibleKeys = searchValue.trim() ? searchResult.visibleKeys : undefined;
  const isEmpty = visibleKeys && data.every((node) => !visibleKeys.has(node.key));

  return (
    <div className={treeRootClass(className)} style={style} data-tree="root">
      {searchable ? (
        <div className={treeSearchClass()}>
          <SearchInput
            variant="button-icon"
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={(event) => setSearchValue(event.target.value)}
            className="max-w-none"
          />
        </div>
      ) : null}

      <div className={treeListClass()} role="tree">
        {isEmpty ? (
          <div className={treeEmptyClass()}>未找到匹配节点</div>
        ) : (
          <TreeNodeList
            nodes={data}
            context={{
              visibleKeys,
              expandedKeys: new Set(effectiveExpandedKeys),
              selectedKeys: new Set(selectedKeys),
              checkedKeys: new Set(checkedKeys),
              halfCheckedKeys: new Set(halfCheckedKeys),
              loadingKeys: new Set(loadingKeys),
              checkable,
              showIcon,
              blockNode,
              searchKeyword: searchValue,
              onExpand: handleExpand,
              onSelect: handleSelect,
              onCheck: handleCheck,
            }}
          />
        )}
      </div>
    </div>
  );
}

Tree.displayName = "Tree";
