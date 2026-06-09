import type { TransferProDirection, TransferProTreeNode } from "../transfer-pro.types";

export type TransferProNodeIndex = Map<
  string,
  {
    node: TransferProTreeNode;
    parentKey: string | null;
    childrenKeys: string[];
  }
>;

export function buildTransferProTreeIndex(
  nodes: TransferProTreeNode[],
  parentKey: string | null = null
): TransferProNodeIndex {
  const index: TransferProNodeIndex = new Map();
  const walk = (list: TransferProTreeNode[], parent: string | null) => {
    list.forEach((node) => {
      const childrenKeys = node.children?.map((child) => child.key) ?? [];
      index.set(node.key, { node, parentKey: parent, childrenKeys });
      if (node.children?.length) walk(node.children, node.key);
    });
  };
  walk(nodes, parentKey);
  return index;
}

export function getTransferProDescendantKeys(key: string, index: TransferProNodeIndex): string[] {
  const entry = index.get(key);
  if (!entry) return [];
  const keys: string[] = [];
  const walk = (childKey: string) => {
    keys.push(childKey);
    index.get(childKey)?.childrenKeys.forEach(walk);
  };
  entry.childrenKeys.forEach(walk);
  return keys;
}

export function getTransferProLeafKeys(key: string, index: TransferProNodeIndex): string[] {
  const entry = index.get(key);
  if (!entry) return [];
  if (entry.node.isLeaf || entry.childrenKeys.length === 0) return [key];
  return getTransferProDescendantKeys(key, index).filter((childKey) => {
    const child = index.get(childKey);
    return child?.node.isLeaf || (child?.childrenKeys.length ?? 0) === 0;
  });
}

export function getTransferProAllLeafKeys(nodes: TransferProTreeNode[]): string[] {
  const index = buildTransferProTreeIndex(nodes);
  return Array.from(index.keys()).flatMap((key) => {
    const entry = index.get(key);
    if (!entry) return [];
    if (entry.node.isLeaf || entry.childrenKeys.length === 0) return [key];
    return [];
  });
}

export function getTransferProAncestorKeys(key: string, index: TransferProNodeIndex): string[] {
  const ancestors: string[] = [];
  let current = index.get(key)?.parentKey ?? null;
  while (current) {
    ancestors.unshift(current);
    current = index.get(current)?.parentKey ?? null;
  }
  return ancestors;
}

export function filterTransferProTree(
  nodes: TransferProTreeNode[],
  keyword: string
): { filtered: TransferProTreeNode[]; expandedKeys: string[]; matchKeys: Set<string> } {
  const q = keyword.trim().toLowerCase();
  if (!q) return { filtered: nodes, expandedKeys: [], matchKeys: new Set() };

  const expandedKeys: string[] = [];
  const matchKeys = new Set<string>();

  const walk = (list: TransferProTreeNode[]): TransferProTreeNode[] =>
    list
      .map((node) => {
        const title = typeof node.title === "string" ? node.title : "";
        const selfMatch = title.toLowerCase().includes(q);
        const children = node.children ? walk(node.children) : [];
        if (selfMatch) matchKeys.add(node.key);
        if (selfMatch || children.length) {
          if (children.length) expandedKeys.push(node.key);
          return { ...node, children: children.length ? children : node.children };
        }
        return null;
      })
      .filter(Boolean) as TransferProTreeNode[];

  return { filtered: walk(nodes), expandedKeys, matchKeys };
}

export function moveTransferKeys(
  targetKeys: string[],
  moveKeys: string[],
  direction: TransferProDirection
): string[] {
  const uniqueMove = Array.from(new Set(moveKeys));
  if (direction === "right") return Array.from(new Set([...targetKeys, ...uniqueMove]));
  return targetKeys.filter((key) => !uniqueMove.includes(key));
}

export function resolveTransferableMoveKeys(
  selectedKeys: string[],
  index: TransferProNodeIndex,
  checkStrictly: boolean,
  transferableKeys: Set<string>
): string[] {
  const result = new Set<string>();
  selectedKeys.forEach((key) => {
    if (!transferableKeys.has(key)) return;
    const leafKeys = getTransferProLeafKeys(key, index);
    leafKeys.forEach((leaf) => {
      if (transferableKeys.has(leaf)) result.add(leaf);
    });
    if (checkStrictly && leafKeys.length === 0 && transferableKeys.has(key)) {
      result.add(key);
    }
  });
  return Array.from(result);
}

export function toggleTreeSelection(
  key: string,
  checked: boolean,
  selectedKeys: string[],
  index: TransferProNodeIndex,
  checkStrictly: boolean,
  transferableKeys: Set<string>
): string[] {
  const leafKeys = getTransferProLeafKeys(key, index).filter((leaf) => transferableKeys.has(leaf));
  const keysToToggle = checkStrictly
    ? transferableKeys.has(key)
      ? [key]
      : leafKeys
    : leafKeys.length
      ? leafKeys
      : transferableKeys.has(key)
        ? [key]
        : [];

  if (checked) return Array.from(new Set([...selectedKeys, ...keysToToggle]));
  return selectedKeys.filter((item) => !keysToToggle.includes(item));
}

export function filterRecordsByKeyword<T extends { title: string; region?: string; mall?: string; inspector?: string }>(
  records: T[],
  keyword: string
): T[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return records;
  return records.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.region?.toLowerCase().includes(q) ||
      item.mall?.toLowerCase().includes(q) ||
      item.inspector?.toLowerCase().includes(q)
  );
}
