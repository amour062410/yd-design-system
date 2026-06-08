"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronRight,
  Filter,
  Inbox,
  Search,
  type LucideIcon,
} from "lucide-react";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { tableSizeSpecs } from "./table-tokens";
import { Checkbox } from "../checkbox";
import { cn } from "../../lib/utils";
import type {
  FilterValue,
  SortOrder,
  TableChangeFilters,
  TableChangeSorter,
  TableColumn,
  TableProps,
  TableRowShowcaseState,
  TableSize,
  TableSorter,
} from "./table.types";
import { TableActionGroup, TableActionLink } from "../table-actions";
import { TablePagination, type TablePaginationConfig } from "../table-pagination";

export type {
  FilterValue,
  SortOrder,
  TableChangeFilters,
  TableChangeSorter,
  TableColumn,
  TableColumnFilter,
  TableExpandableConfig,
  TableProps,
  TableRowSelection,
  TableRowShowcaseState,
  TableSize,
  TableSorter,
} from "./table.types";

export type { TablePaginationConfig } from "../table-pagination";
export { TablePagination, TableActionGroup, TableActionLink };
export { TableToolbar } from "./table-toolbar";
export {
  TableColumnSetting,
  useColumnVisibility,
  loadColumnVisibility,
  saveColumnVisibility,
} from "./table-column-setting";
export { TableBatchActions } from "./table-batch-actions";
export type {
  ColumnSettingItem,
  TableBatchAction,
  TableBatchActionsProps,
  TableColumnSettingProps,
  TableToolbarFilterOption,
  TableToolbarProps,
} from "./table.types";

const DEFAULT_SORT_DIRECTIONS: SortOrder[] = ["ascend", "descend", null];

function getRowKey<T extends Record<string, unknown>>(
  record: T,
  index: number,
  rowKey?: string | ((record: T) => string)
): string {
  if (typeof rowKey === "function") return rowKey(record);
  if (typeof rowKey === "string" && record[rowKey] != null) return String(record[rowKey]);
  if (record.key != null) return String(record.key);
  return String(index);
}

function isSorterEnabled<T>(sorter?: TableSorter<T>): boolean {
  return sorter === true || typeof sorter === "function";
}

function getNextSortOrder(current: SortOrder, directions: SortOrder[]): SortOrder {
  const dirs = directions.length ? directions : DEFAULT_SORT_DIRECTIONS;
  const idx = dirs.indexOf(current);
  const nextIdx = idx < 0 ? 0 : (idx + 1) % dirs.length;
  return dirs[nextIdx] ?? null;
}

function buildInitialFilters<T extends Record<string, unknown>>(
  columns: TableColumn<T>[]
): Record<string, FilterValue[]> {
  const initial: Record<string, FilterValue[]> = {};
  for (const col of columns) {
    if (col.defaultFilteredValue?.length) {
      initial[col.key] = [...col.defaultFilteredValue];
    }
  }
  return initial;
}

function getInitialSort<T extends Record<string, unknown>>(
  columns: TableColumn<T>[]
): TableChangeSorter {
  for (const col of columns) {
    if (col.defaultSortOrder) {
      return { columnKey: col.key, order: col.defaultSortOrder };
    }
  }
  return { columnKey: "", order: null };
}

function getResolvedFilters<T extends Record<string, unknown>>(
  columns: TableColumn<T>[],
  internalFilters: Record<string, FilterValue[]>
): TableChangeFilters {
  const result: TableChangeFilters = {};
  for (const col of columns) {
    if (!col.filters?.length) continue;
    if (col.filteredValue !== undefined) {
      result[col.key] = col.filteredValue;
    } else {
      result[col.key] = internalFilters[col.key] ?? null;
    }
  }
  return result;
}

function applyColumnFilters<T extends Record<string, unknown>>(
  data: T[],
  columns: TableColumn<T>[],
  filters: TableChangeFilters
): T[] {
  return data.filter((record) =>
    columns.every((col) => {
      if (!col.onFilter || !col.filters?.length) return true;
      const values = filters[col.key];
      if (!values?.length) return true;
      return values.some((value) => col.onFilter!(value, record));
    })
  );
}

function compareRows<T extends Record<string, unknown>>(
  rowA: T,
  rowB: T,
  col: TableColumn<T>,
  order: "ascend" | "descend"
): number {
  const sorter = col.sorter;
  if (typeof sorter === "function") {
    const result = sorter(rowA, rowB, order);
    return order === "descend" ? -result : result;
  }
  const field = col.dataIndex ?? col.key;
  const av = String(rowA[field] ?? "");
  const bv = String(rowB[field] ?? "");
  const cmp = av.localeCompare(bv, "zh");
  return order === "descend" ? -cmp : cmp;
}

function applyColumnSort<T extends Record<string, unknown>>(
  data: T[],
  columns: TableColumn<T>[],
  sorter: TableChangeSorter
): T[] {
  if (!sorter.order || !sorter.columnKey) return data;
  const col = columns.find((c) => c.key === sorter.columnKey);
  if (!col || !isSorterEnabled(col.sorter)) return data;
  return [...data].sort((a, b) => compareRows(a, b, col, sorter.order!));
}

function SortIcon({ order }: { order: SortOrder }) {
  const Icon: LucideIcon =
    order === "ascend" ? ArrowUp : order === "descend" ? ArrowDown : ArrowUpDown;
  return (
    <Icon
      className={cn(
        "ml-1 inline size-3.5 shrink-0",
        order ? "text-[color:var(--table-action-color)]" : "text-[color:var(--color-text-tertiary)]"
      )}
      aria-hidden
    />
  );
}

function FilterIcon({ active }: { active: boolean }) {
  return (
    <Filter
      className={cn(
        "ml-1 inline size-3.5 shrink-0",
        active
          ? "text-[color:var(--table-action-color)]"
          : "text-[color:var(--color-text-tertiary)]"
      )}
      aria-hidden
    />
  );
}

function TableFilterDropdown<T extends Record<string, unknown>>({
  column,
  draft,
  filterMultiple,
  onDraftChange,
  onConfirm,
  onReset,
}: {
  column: TableColumn<T>;
  draft: FilterValue[];
  filterMultiple: boolean;
  onDraftChange: (values: FilterValue[]) => void;
  onConfirm: () => void;
  onReset: () => void;
}) {
  const toggle = (value: FilterValue) => {
    if (filterMultiple) {
      onDraftChange(
        draft.includes(value) ? draft.filter((v) => v !== value) : [...draft, value]
      );
    } else {
      onDraftChange(draft.includes(value) ? [] : [value]);
    }
  };

  return (
    <div
      className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[160px] overflow-hidden rounded-md bg-background py-2"
      style={{ boxShadow: "var(--select-panel-shadow)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="max-h-[240px] overflow-y-auto px-1">
        {column.filters?.map((item) => (
          <li key={String(item.value)}>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-[13px] text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--select-option-hover)]"
              onClick={() => toggle(item.value)}
            >
              {filterMultiple ? (
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border",
                    draft.includes(item.value)
                      ? "border-[color:var(--table-action-color)] bg-[color:var(--table-action-color)] text-white"
                      : "border-[color:var(--table-border-color)]"
                  )}
                >
                  {draft.includes(item.value) ? (
                    <span className="text-[10px] leading-none">✓</span>
                  ) : null}
                </span>
              ) : (
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border",
                    draft.includes(item.value)
                      ? "border-[color:var(--table-action-color)]"
                      : "border-[color:var(--table-border-color)]"
                  )}
                >
                  {draft.includes(item.value) ? (
                    <span className="size-2 rounded-full bg-[color:var(--table-action-color)]" />
                  ) : null}
                </span>
              )}
              <span>{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-[color:var(--table-border-color)] px-3 pt-2">
        <button
          type="button"
          className="text-[13px] text-[color:var(--color-text-tertiary)] hover:text-[color:var(--color-text-primary)]"
          onClick={onReset}
        >
          重置
        </button>
        <button
          type="button"
          className="rounded-[var(--table-radius)] bg-[color:var(--table-action-color)] px-3 py-1 text-[13px] text-white"
          onClick={onConfirm}
        >
          确定
        </button>
      </div>
    </div>
  );
}

function TableSkeleton({ columns, rows, size }: { columns: number; rows: number; size: TableSize }) {
  const rowH = size === "md" ? "var(--table-row-height-md)" : "var(--table-row-height-sm)";
  return (
    <>
      {Array.from({ length: rows }).map((_, ri) => (
        <tr key={ri} style={{ height: rowH }}>
          {Array.from({ length: columns }).map((__, ci) => (
            <td
              key={ci}
              className="border-b border-[color:var(--table-border-color)] px-4"
              style={{
                padding:
                  size === "md"
                    ? "var(--table-cell-padding-md)"
                    : "var(--table-cell-padding-sm)",
              }}
            >
              <div
                className="h-3 animate-pulse rounded"
                style={{
                  backgroundColor: "var(--table-skeleton-bg)",
                  width: ci === 0 ? "60%" : "40%",
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function TableEmpty({ empty }: { empty?: ReactNode }) {
  return (
    <tr>
      <td colSpan={100} className="py-16 text-center">
        {empty ?? (
          <div className="flex flex-col items-center gap-3">
            <Inbox
              className="size-12"
              style={{ color: "var(--table-empty-icon)" }}
              strokeWidth={1.25}
            />
            <p className="text-sm text-[color:var(--color-text-tertiary)]">暂无数据</p>
          </div>
        )}
      </td>
    </tr>
  );
}

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  dataSource = [],
  size = "md",
  loading = false,
  empty,
  bordered = true,
  striped = false,
  rowKey = "key",
  rowSelection,
  expandable,
  pagination,
  sortDirections: tableSortDirections,
  filterOnClose = false,
  onChange,
  sortColumn: controlledSortColumn,
  sortOrder: controlledSortOrder = null,
  onSortChange,
  showcaseRowState,
  className,
  scroll,
  title,
  toolbar,
  searchValue = "",
  onSearch,
  searchPlaceholder = "搜索",
}: TableProps<T>) {
  const spec = tableSizeSpecs[size];
  const rowHeight = spec.rowHeight;
  const fontSize = spec.fontSize;
  const cellPadding = spec.cellPadding;

  const useLegacySortControl = Boolean(onSortChange);
  const hasClientFilter = columns.some((c) => c.filters?.length && c.onFilter);
  const hasClientSort =
    !useLegacySortControl && columns.some((c) => isSorterEnabled(c.sorter));

  const [internalFilters, setInternalFilters] = useState<Record<string, FilterValue[]>>(() =>
    buildInitialFilters(columns)
  );
  const [internalSort, setInternalSort] = useState<TableChangeSorter>(() =>
    getInitialSort(columns)
  );
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);
  const [filterDraft, setFilterDraft] = useState<FilterValue[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const [internalSelected, setInternalSelected] = useState<string[]>(
    rowSelection?.defaultSelectedRowKeys ?? rowSelection?.selectedRowKeys ?? []
  );
  const [internalExpanded, setInternalExpanded] = useState<string[]>(
    expandable?.defaultExpandedRowKeys ?? expandable?.expandedRowKeys ?? []
  );
  const selectedKeys = rowSelection?.selectedRowKeys ?? internalSelected;
  const expandedKeys = expandable?.expandedRowKeys ?? internalExpanded;

  const setExpandedKeys = (keys: string[]) => {
    if (expandable?.expandedRowKeys === undefined) setInternalExpanded(keys);
    expandable?.onExpandedRowsChange?.(keys);
  };

  const activeSort = useMemo((): TableChangeSorter => {
    if (useLegacySortControl) {
      return { columnKey: controlledSortColumn ?? "", order: controlledSortOrder };
    }
    const controlledCol = columns.find((c) => c.sortOrder !== undefined);
    if (controlledCol) {
      return {
        columnKey: controlledCol.sortOrder ? controlledCol.key : "",
        order: controlledCol.sortOrder ?? null,
      };
    }
    return internalSort;
  }, [
    columns,
    controlledSortColumn,
    controlledSortOrder,
    internalSort,
    useLegacySortControl,
  ]);

  const resolvedFilters = useMemo(
    () => getResolvedFilters(columns, internalFilters),
    [columns, internalFilters]
  );

  const displayData = useMemo(() => {
    let data = dataSource;
    if (hasClientFilter) {
      data = applyColumnFilters(data, columns, resolvedFilters);
    }
    if (hasClientSort) {
      data = applyColumnSort(data, columns, activeSort);
    }
    return data;
  }, [dataSource, columns, resolvedFilters, activeSort, hasClientFilter, hasClientSort]);

  const searchedData = useMemo(() => {
    if (!onSearch) return displayData;
    const kw = searchValue?.trim().toLowerCase();
    if (!kw) return displayData;
    return displayData.filter((record) =>
      columns.some((col) => {
        const field = col.dataIndex ?? col.key;
        return String(record[field] ?? "")
          .toLowerCase()
          .includes(kw);
      })
    );
  }, [displayData, searchValue, columns, onSearch]);

  const emitChange = useCallback(
    (filters: TableChangeFilters, sorter: TableChangeSorter) => {
      onChange?.(pagination ?? false, filters, sorter);
    },
    [onChange, pagination]
  );

  const applyFilters = useCallback(
    (colKey: string, values: FilterValue[]) => {
      const col = columns.find((c) => c.key === colKey);
      if (!col) return;

      if (col.filteredValue === undefined) {
        setInternalFilters((prev) => ({ ...prev, [colKey]: values }));
      }

      const filters: TableChangeFilters = {
        ...getResolvedFilters(
          columns,
          col.filteredValue === undefined
            ? { ...internalFilters, [colKey]: values }
            : internalFilters
        ),
        [colKey]: values.length ? values : null,
      };
      emitChange(filters, activeSort);
    },
    [columns, internalFilters, activeSort, emitChange]
  );

  const handleSortClick = (col: TableColumn<T>) => {
    if (!isSorterEnabled(col.sorter)) return;

    const directions =
      col.sortDirections ?? tableSortDirections ?? DEFAULT_SORT_DIRECTIONS;
    const currentOrder =
      activeSort.columnKey === col.key ? activeSort.order : null;
    const nextOrder = getNextSortOrder(currentOrder, directions);

    if (useLegacySortControl) {
      onSortChange?.(col.key, nextOrder);
      return;
    }

    const nextSorter: TableChangeSorter = {
      columnKey: nextOrder ? col.key : "",
      order: nextOrder,
    };
    setInternalSort(nextSorter);
    emitChange(resolvedFilters, nextSorter);
  };

  const openFilterMenu = (col: TableColumn<T>) => {
    const applied =
      col.filteredValue !== undefined
        ? col.filteredValue ?? []
        : internalFilters[col.key] ?? [];
    setFilterDraft([...applied]);
    setOpenFilterKey(col.key);
  };

  const closeFilterMenu = (col: TableColumn<T>) => {
    if (filterOnClose) {
      applyFilters(col.key, filterDraft);
    }
    setOpenFilterKey(null);
  };

  useEffect(() => {
    if (!openFilterKey) return;
    const onDocClick = (e: MouseEvent) => {
      if (filterRef.current?.contains(e.target as Node)) return;
      const col = columns.find((c) => c.key === openFilterKey);
      if (col) closeFilterMenu(col);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  });

  const setSelected = (keys: string[]) => {
    if (rowSelection?.selectedRowKeys === undefined) setInternalSelected(keys);
    rowSelection?.onChange?.(keys);
  };

  const allKeys = searchedData.map((r, i) => getRowKey(r, i, rowKey));
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k));
  const someSelected = selectedKeys.length > 0 && !allSelected;

  const toggleAll = () => setSelected(allSelected ? [] : [...allKeys]);
  const toggleRow = (key: string) => {
    setSelected(
      selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key]
    );
  };

  const getStickyStyle = (
    col: TableColumn<T>,
    index: number,
    isHeader: boolean
  ): CSSProperties | undefined => {
    if (col.fixed === "left") {
      let left = (rowSelection ? 48 : 0) + (expandable ? 40 : 0);
      for (let i = 0; i < index; i++) {
        const prev = columns[i];
        if (prev?.fixed === "left" && prev.width) {
          left += typeof prev.width === "number" ? prev.width : 120;
        }
      }
      return {
        position: "sticky",
        left,
        zIndex: isHeader ? 3 : 2,
        backgroundColor: isHeader ? "var(--table-header-bg)" : "var(--table-bg)",
      };
    }
    if (col.fixed === "right") {
      return {
        position: "sticky",
        right: 0,
        zIndex: isHeader ? 3 : 2,
        backgroundColor: isHeader ? "var(--table-header-bg)" : "var(--table-bg)",
        boxShadow: "-4px 0 8px rgba(15, 20, 25, 0.06)",
      };
    }
    return undefined;
  };

  const colCount =
    columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0);

  const getColumnSortOrder = (col: TableColumn<T>): SortOrder => {
    if (useLegacySortControl) {
      return controlledSortColumn === col.key ? controlledSortOrder : null;
    }
    if (col.sortOrder !== undefined) return col.sortOrder;
    return activeSort.columnKey === col.key ? activeSort.order : null;
  };

  const isColumnFiltered = (col: TableColumn<T>) => {
    const values =
      col.filteredValue !== undefined
        ? col.filteredValue
        : internalFilters[col.key];
    return Boolean(values?.length);
  };

  const stickyHeader = Boolean(scroll?.y);

  return (
    <div className={cn("w-full", className)} ref={filterRef}>
      {title || toolbar || onSearch ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title ? (
            <h3 className="text-base font-semibold text-[color:var(--color-text-primary)]">
              {title}
            </h3>
          ) : (
            <span />
          )}
          <div className="flex flex-wrap items-center gap-2">
            {onSearch ? (
              <label className="relative inline-flex items-center">
                <Search className="pointer-events-none absolute left-2.5 size-4 text-[color:var(--color-text-tertiary)]" />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-9 w-[220px] rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] pl-9 pr-3 text-sm outline-none focus:border-[color:var(--table-action-color)]"
                  aria-label={searchPlaceholder}
                />
              </label>
            ) : null}
            {toolbar}
          </div>
        </div>
      ) : null}
      <div
        className={cn(
          "overflow-x-auto rounded-[var(--table-radius)]",
          bordered && "border border-[color:var(--table-border-color)]"
        )}
        style={{
          maxWidth: scroll?.x ? "100%" : undefined,
          maxHeight: scroll?.y,
          overflowY: scroll?.y ? "auto" : undefined,
        }}
      >
        <table
          className="w-full min-w-full border-collapse text-left"
          style={{ fontSize, minWidth: scroll?.x }}
        >
          <thead className={stickyHeader ? "sticky top-0 z-[2]" : undefined}>
            <tr
              style={{
                height: "var(--table-header-height)",
                backgroundColor: "var(--table-header-bg)",
              }}
            >
              {expandable ? (
                <th
                  className="w-10 border-b border-[color:var(--table-header-border-color)]"
                  style={{ padding: cellPadding }}
                />
              ) : null}
              {rowSelection ? (
                <th
                  className="w-12 border-b border-[color:var(--table-header-border-color)] px-3 text-center"
                  style={{ padding: cellPadding }}
                >
                  <div className="flex justify-center">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => toggleAll()}
                      aria-label="全选"
                    />
                  </div>
                </th>
              ) : null}
              {columns.map((col, ci) => {
                const hasFilter = Boolean(col.filters?.length);
                const hasSort = isSorterEnabled(col.sorter);
                const sortOrder = getColumnSortOrder(col);

                return (
                  <th
                    key={col.key}
                    className={cn(
                      "relative border-b border-[color:var(--table-header-border-color)] font-medium text-[color:var(--color-text-secondary)]",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                    style={{
                      padding: cellPadding,
                      width: col.width,
                      minWidth: col.width,
                      ...getStickyStyle(col, ci, true),
                    }}
                  >
                    <span className="inline-flex items-center">
                      <span
                        className={cn(
                          hasSort && "cursor-pointer select-none"
                        )}
                        onClick={() => hasSort && handleSortClick(col)}
                      >
                        {col.title}
                        {hasSort ? <SortIcon order={sortOrder} /> : null}
                      </span>
                      {hasFilter ? (
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center border-0 bg-transparent p-0"
                          aria-label={`筛选 ${String(col.title)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (openFilterKey === col.key) {
                              closeFilterMenu(col);
                            } else {
                              openFilterMenu(col);
                            }
                          }}
                        >
                          <FilterIcon active={isColumnFiltered(col)} />
                        </button>
                      ) : null}
                    </span>
                    {hasFilter && openFilterKey === col.key ? (
                      <TableFilterDropdown
                        column={col}
                        draft={filterDraft}
                        filterMultiple={col.filterMultiple !== false}
                        onDraftChange={setFilterDraft}
                        onConfirm={() => {
                          applyFilters(col.key, filterDraft);
                          setOpenFilterKey(null);
                        }}
                        onReset={() => {
                          setFilterDraft([]);
                          if (!filterOnClose) {
                            applyFilters(col.key, []);
                          }
                        }}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton columns={colCount} rows={size === "sm" ? 4 : 3} size={size} />
            ) : searchedData.length === 0 ? (
              <TableEmpty empty={empty} />
            ) : (
              searchedData.map((record, ri) => {
                const key = getRowKey(record, ri, rowKey);
                const isSelected = selectedKeys.includes(key);
                const isExpanded = expandedKeys.includes(key);
                const canExpand =
                  !expandable?.rowExpandable || expandable.rowExpandable(record);
                const rowState =
                  showcaseRowState ?? (isSelected ? "selected" : "default");
                const zebra =
                  striped && ri % 2 === 1 ? "var(--table-row-stripe-bg)" : "var(--table-bg)";
                const bg =
                  rowState === "selected"
                    ? "var(--table-row-selected-bg)"
                    : rowState === "hover"
                      ? "var(--table-row-hover-bg)"
                      : zebra;

                return (
                  <Fragment key={key}>
                  <tr
                    style={{ height: rowHeight, backgroundColor: bg }}
                    className={cn(
                      "border-b border-[color:var(--table-border-color)] transition-colors",
                      !showcaseRowState && "hover:bg-[color:var(--table-row-hover-bg)]",
                      isSelected &&
                        !showcaseRowState &&
                        "bg-[color:var(--table-row-selected-bg)]"
                    )}
                  >
                    {expandable ? (
                      <td className="text-center" style={{ padding: cellPadding }}>
                        {canExpand ? (
                          <button
                            type="button"
                            className="inline-flex size-7 items-center justify-center rounded-[var(--table-radius)] text-[color:var(--table-action-color)] hover:bg-[color:var(--table-row-hover-bg)]"
                            aria-expanded={isExpanded}
                            aria-label={isExpanded ? "收起" : "展开"}
                            onClick={() =>
                              setExpandedKeys(
                                isExpanded
                                  ? expandedKeys.filter((k) => k !== key)
                                  : [...expandedKeys, key]
                              )
                            }
                          >
                            <ChevronRight
                              className={cn(
                                "size-4 transition-transform",
                                isExpanded && "rotate-90"
                              )}
                            />
                          </button>
                        ) : null}
                      </td>
                    ) : null}
                    {rowSelection ? (
                      <td className="text-center" style={{ padding: cellPadding }}>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleRow(key)}
                            aria-label={`选择行 ${key}`}
                          />
                        </div>
                      </td>
                    ) : null}
                    {columns.map((col, ci) => {
                      const value = col.dataIndex ? record[col.dataIndex] : undefined;
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "text-[color:var(--color-text-primary)]",
                            col.align === "center" && "text-center",
                            col.align === "right" && "text-right"
                          )}
                          style={{
                            padding: cellPadding,
                            width: col.width,
                            minWidth: col.width,
                            ...getStickyStyle(col, ci, false),
                            backgroundColor:
                              col.fixed === "left" || col.fixed === "right"
                                ? isSelected && !showcaseRowState
                                  ? "var(--table-row-selected-bg)"
                                  : rowState === "hover"
                                    ? "var(--table-row-hover-bg)"
                                    : "var(--table-bg)"
                                : undefined,
                          }}
                        >
                          {col.render
                            ? col.render(value, record, ri)
                            : value != null
                              ? String(value)
                              : "—"}
                        </td>
                      );
                    })}
                  </tr>
                  {expandable && isExpanded && canExpand ? (
                    <tr key={`${key}-expand`} className="bg-[color:var(--table-detail-panel-bg)]">
                      <td colSpan={colCount} className="border-b border-[color:var(--table-detail-panel-border)] p-0">
                        <div
                          className="text-sm"
                          style={{ padding: "var(--table-detail-panel-padding)" }}
                        >
                          {expandable.expandedRowRender(record, ri)}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination !== false && pagination ? (
        <TablePagination
          {...pagination}
          total={pagination.total ?? searchedData.length}
        />
      ) : null}
    </div>
  );
}

