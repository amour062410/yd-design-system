import type {
  CascaderFieldNames,
  CascaderOption,
  CascaderPanelFocus,
  CascaderSearchResult,
  NormalizedCascaderOption,
} from "./cascader.types";

const DEFAULT_FIELD_NAMES: Required<CascaderFieldNames> = {
  label: "label",
  value: "value",
  children: "children",
  isLeaf: "isLeaf",
};

export function resolveFieldNames(
  fieldNames?: CascaderFieldNames
): Required<CascaderFieldNames> {
  return { ...DEFAULT_FIELD_NAMES, ...fieldNames };
}

export function normalizeCascaderOptions(
  options: CascaderOption[] = [],
  fieldNames?: CascaderFieldNames
): NormalizedCascaderOption[] {
  const keys = resolveFieldNames(fieldNames);

  return options.map((raw) => {
    const label = String(
      raw[keys.label as keyof CascaderOption] ?? raw.label ?? ""
    );
    const value = String(
      raw[keys.value as keyof CascaderOption] ?? raw.value ?? label
    );
    const childRaw = raw[keys.children as keyof CascaderOption] as
      | CascaderOption[]
      | undefined;
    const children = Array.isArray(childRaw)
      ? normalizeCascaderOptions(childRaw, fieldNames)
      : raw.children
        ? normalizeCascaderOptions(raw.children, fieldNames)
        : undefined;
    const isLeafRaw = raw[keys.isLeaf as keyof CascaderOption];
    const isLeaf =
      typeof isLeafRaw === "boolean" ? isLeafRaw : raw.isLeaf ?? false;

    return {
      label,
      value,
      disabled: raw.disabled,
      loading: raw.loading,
      isLeaf,
      children: children?.length ? children : undefined,
    };
  });
}

export function findOptionPath(
  options: NormalizedCascaderOption[],
  targetValues: string[]
): CascaderOption[] {
  const path: CascaderOption[] = [];
  let current = options;

  for (const val of targetValues) {
    const node = current.find((item) => item.value === val);
    if (!node) break;
    path.push(node);
    current = node.children ?? [];
  }

  return path;
}

export function getColumnsFromPath(
  options: NormalizedCascaderOption[],
  activeValues: string[]
): NormalizedCascaderOption[][] {
  const columns: NormalizedCascaderOption[][] = [options];
  let current = options;

  for (const val of activeValues) {
    const node = current.find((item) => item.value === val);
    if (!node?.children?.length) break;
    columns.push(node.children);
    current = node.children;
  }

  return columns;
}

export function formatPathLabels(
  path: CascaderOption[],
  separator = " / "
): string {
  return path.map((item) => item.label).join(separator);
}

export function pathsEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function pathKey(path: string[]) {
  return path.join("\0");
}

export function isSelectableNode(option: CascaderOption): boolean {
  return Boolean(option.isLeaf) || !option.children?.length;
}

export function searchCascaderOptions(
  options: NormalizedCascaderOption[],
  query: string,
  filter?: (inputValue: string, path: CascaderOption[]) => boolean
): CascaderSearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const results: CascaderSearchResult[] = [];
  const lowerQ = q.toLowerCase();

  const walk = (nodes: NormalizedCascaderOption[], trail: CascaderOption[]) => {
    for (const node of nodes) {
      const nextTrail = [...trail, node];
      const labels = formatPathLabels(nextTrail, " / ");
      const selectable = isSelectableNode(node);

      if (selectable) {
        const haystack = `${labels} ${node.value}`.toLowerCase();
        const matched = filter
          ? filter(q, nextTrail)
          : haystack.includes(lowerQ);
        if (matched) results.push({ path: nextTrail, labels });
      }

      if (node.children?.length) {
        walk(node.children, nextTrail);
      }
    }
  };

  walk(options, []);
  return results;
}

export function getFocusFromActiveValues(
  columns: NormalizedCascaderOption[][],
  activeValues: string[]
): CascaderPanelFocus {
  if (!columns.length) return { column: 0, index: 0 };
  const column = Math.min(
    activeValues.length > 0 ? activeValues.length - 1 : 0,
    columns.length - 1
  );
  const activeValue = activeValues[column];
  const index = Math.max(
    0,
    columns[column]?.findIndex((item) => item.value === activeValue) ?? 0
  );
  return { column, index };
}

export function movePanelFocus(
  columns: NormalizedCascaderOption[][],
  focus: CascaderPanelFocus,
  key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
): CascaderPanelFocus {
  const columnOptions = columns[focus.column] ?? [];
  if (!columnOptions.length) return focus;

  if (key === "ArrowUp") {
    return {
      ...focus,
      index: focus.index <= 0 ? columnOptions.length - 1 : focus.index - 1,
    };
  }
  if (key === "ArrowDown") {
    return {
      ...focus,
      index:
        focus.index >= columnOptions.length - 1 ? 0 : focus.index + 1,
    };
  }
  if (key === "ArrowLeft") {
    return {
      column: Math.max(0, focus.column - 1),
      index: 0,
    };
  }

  const option = columnOptions[focus.index];
  if (option?.children?.length && focus.column < columns.length - 1) {
    return { column: focus.column + 1, index: 0 };
  }
  return focus;
}

export function focusToActiveValues(
  columns: NormalizedCascaderOption[][],
  focus: CascaderPanelFocus
): string[] {
  const values: string[] = [];
  for (let col = 0; col <= focus.column; col += 1) {
    const option = columns[col]?.[col === focus.column ? focus.index : 0];
    if (!option) break;
    values.push(option.value);
    if (col < focus.column && !option.children?.length) break;
  }
  return values;
}
