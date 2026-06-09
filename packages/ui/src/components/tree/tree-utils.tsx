import type { ReactNode } from "react";
import type { TreeDataNode } from "./tree.types";

export type TreeNodeIndex = Map<
  string,
  {
    node: TreeDataNode;
    parentKey: string | null;
    childrenKeys: string[];
  }
>;

export function buildTreeIndex(nodes: TreeDataNode[], parentKey: string | null = null): TreeNodeIndex {
  const index: TreeNodeIndex = new Map();
  const walk = (list: TreeDataNode[], parent: string | null) => {
    list.forEach((node) => {
      const childrenKeys = node.children?.map((child) => child.key) ?? [];
      index.set(node.key, { node, parentKey: parent, childrenKeys });
      if (node.children?.length) walk(node.children, node.key);
    });
  };
  walk(nodes, parentKey);
  return index;
}

export function getAncestorKeys(key: string, index: TreeNodeIndex): string[] {
  const ancestors: string[] = [];
  let current = index.get(key)?.parentKey ?? null;
  while (current) {
    ancestors.unshift(current);
    current = index.get(current)?.parentKey ?? null;
  }
  return ancestors;
}

export function getDescendantKeys(key: string, index: TreeNodeIndex): string[] {
  const entry = index.get(key);
  if (!entry) return [];
  const keys: string[] = [];
  const walk = (childKey: string) => {
    const child = index.get(childKey);
    if (!child) return;
    keys.push(childKey);
    child.childrenKeys.forEach(walk);
  };
  entry.childrenKeys.forEach(walk);
  return keys;
}

export function getNodeTitleText(title: ReactNode): string {
  if (typeof title === "string" || typeof title === "number") return String(title);
  return "";
}

export function filterTreeByKeyword(
  nodes: TreeDataNode[],
  keyword: string
): { visibleKeys: Set<string>; expandedKeys: string[]; matchKeys: Set<string> } {
  const q = keyword.trim().toLowerCase();
  if (!q) {
    return { visibleKeys: new Set(getAllNodeKeys(nodes)), expandedKeys: [], matchKeys: new Set() };
  }

  const visibleKeys = new Set<string>();
  const expandedKeys = new Set<string>();
  const matchKeys = new Set<string>();

  const walk = (node: TreeDataNode, ancestors: string[]): boolean => {
    const title = getNodeTitleText(node.title).toLowerCase();
    const selfMatch = title.includes(q);
    let childMatch = false;

    node.children?.forEach((child) => {
      if (walk(child, [...ancestors, node.key])) childMatch = true;
    });

    if (selfMatch || childMatch) {
      visibleKeys.add(node.key);
      ancestors.forEach((key) => {
        visibleKeys.add(key);
        expandedKeys.add(key);
      });
      if (selfMatch) matchKeys.add(node.key);
      return true;
    }
    return false;
  };

  nodes.forEach((node) => walk(node, []));
  return { visibleKeys, expandedKeys: [...expandedKeys], matchKeys };
}

function getAllNodeKeys(nodes: TreeDataNode[]): string[] {
  const keys: string[] = [];
  const walk = (list: TreeDataNode[]) => {
    list.forEach((node) => {
      keys.push(node.key);
      if (node.children?.length) walk(node.children);
    });
  };
  walk(nodes);
  return keys;
}

export function computeCheckState(
  checkedKeys: string[],
  halfCheckedKeys: string[],
  index: TreeNodeIndex
): { checked: Set<string>; halfChecked: Set<string> } {
  return {
    checked: new Set(checkedKeys),
    halfChecked: new Set(halfCheckedKeys),
  };
}

export function toggleNodeCheckStrict(
  key: string,
  checked: boolean,
  checkedKeys: string[]
): { checkedKeys: string[]; halfCheckedKeys: string[] } {
  const next = new Set(checkedKeys);
  if (checked) next.add(key);
  else next.delete(key);
  return { checkedKeys: [...next], halfCheckedKeys: [] };
}

export function toggleNodeCheck(
  key: string,
  checked: boolean,
  checkedKeys: string[],
  index: TreeNodeIndex
): { checkedKeys: string[]; halfCheckedKeys: string[] } {
  const next = new Set(checkedKeys);
  const descendants = getDescendantKeys(key, index);

  if (checked) {
    next.add(key);
    descendants.forEach((childKey) => next.add(childKey));
  } else {
    next.delete(key);
    descendants.forEach((childKey) => next.delete(childKey));
  }

  let parentKey = index.get(key)?.parentKey ?? null;
  while (parentKey) {
    const entry = index.get(parentKey);
    if (!entry) break;
    const allChildrenChecked = entry.childrenKeys.every((childKey) => next.has(childKey));
    if (allChildrenChecked) next.add(parentKey);
    else next.delete(parentKey);
    parentKey = entry.parentKey;
  }

  const halfCheckedKeys: string[] = [];
  index.forEach((entry, nodeKey) => {
    if (!entry.childrenKeys.length || next.has(nodeKey)) return;
    const descendantChecked = entry.childrenKeys.some((childKey) => {
      if (next.has(childKey)) return true;
      return getDescendantKeys(childKey, index).some((d) => next.has(d));
    });
    if (descendantChecked) halfCheckedKeys.push(nodeKey);
  });

  return { checkedKeys: [...next], halfCheckedKeys };
}

export function updateTreeNodeChildren(
  nodes: TreeDataNode[],
  targetKey: string,
  children: TreeDataNode[]
): TreeDataNode[] {
  return nodes.map((node) => {
    if (node.key === targetKey) {
      return { ...node, children, isLeaf: children.length === 0 };
    }
    if (node.children?.length) {
      return { ...node, children: updateTreeNodeChildren(node.children, targetKey, children) };
    }
    return node;
  });
}

export function highlightTitle(title: ReactNode, keyword: string): ReactNode {
  const text = getNodeTitleText(title);
  if (!keyword.trim() || !text) return title;
  const q = keyword.trim();
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx < 0) return title;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-transparent text-[color:var(--tree-color-search-highlight,#165dff)]">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
