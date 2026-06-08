import type { ReactNode } from "react";
import type { TablePaginationConfig } from "../table-pagination";
import type { TableSizeKey } from "./table-tokens";

export type TableSize = TableSizeKey;
export type SortOrder = "ascend" | "descend" | null;
export type TableRowShowcaseState = "default" | "hover" | "selected";
export type FilterValue = string | number | boolean;

export interface TableColumnFilter {
  text: ReactNode;
  value: FilterValue;
}

export type TableSorter<T> =
  | boolean
  | ((rowA: T, rowB: T, sortOrder?: "ascend" | "descend") => number);

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  title: ReactNode;
  dataIndex?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
  sorter?: TableSorter<T>;
  sortOrder?: SortOrder;
  defaultSortOrder?: "ascend" | "descend";
  sortDirections?: SortOrder[];
  filters?: TableColumnFilter[];
  onFilter?: (value: FilterValue, record: T) => boolean;
  filterMultiple?: boolean;
  filteredValue?: FilterValue[] | null;
  defaultFilteredValue?: FilterValue[];
  /** 单元格可编辑（配合 render 或内置 EditableCell） */
  editable?: boolean;
  render?: (value: unknown, record: T, index: number) => ReactNode;
}

export interface TableRowSelection {
  selectedRowKeys?: string[];
  defaultSelectedRowKeys?: string[];
  onChange?: (selectedRowKeys: string[]) => void;
}

export type TableChangeFilters = Record<string, FilterValue[] | null>;
export type TableChangeSorter = { columnKey: string; order: SortOrder };

export interface TableExpandableConfig<T extends Record<string, unknown>> {
  expandedRowKeys?: string[];
  defaultExpandedRowKeys?: string[];
  onExpandedRowsChange?: (keys: string[]) => void;
  expandedRowRender: (record: T, index: number) => ReactNode;
  rowExpandable?: (record: T) => boolean;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<T>[];
  dataSource?: T[];
  size?: TableSize;
  loading?: boolean;
  empty?: ReactNode;
  bordered?: boolean;
  /** 斑马纹行 */
  striped?: boolean;
  rowKey?: string | ((record: T) => string);
  rowSelection?: TableRowSelection;
  expandable?: TableExpandableConfig<T>;
  pagination?: TablePaginationConfig | false;
  sortDirections?: SortOrder[];
  filterOnClose?: boolean;
  onChange?: (
    pagination: TablePaginationConfig | false,
    filters: TableChangeFilters,
    sorter: TableChangeSorter
  ) => void;
  sortColumn?: string | null;
  sortOrder?: SortOrder;
  onSortChange?: (columnKey: string, order: SortOrder) => void;
  showcaseRowState?: TableRowShowcaseState;
  className?: string;
  /** 固定表头：设置 scroll.y；横向滚动：scroll.x */
  scroll?: { x?: number | string; y?: number | string };
  /** 表格标题区 */
  title?: ReactNode;
  /** 工具栏（搜索、筛选按钮等） */
  toolbar?: ReactNode;
  /** 受控搜索关键词（与 toolbar 搜索框配合） */
  searchValue?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
}

export interface ColumnSettingItem {
  key: string;
  title: string;
  defaultVisible?: boolean;
  locked?: boolean;
}

export interface TableToolbarFilterOption {
  label: string;
  value: string;
}

export interface TableToolbarProps {
  searchable?: boolean;
  exportable?: boolean;
  /** @deprecated 使用 resettable */
  refreshable?: boolean;
  resettable?: boolean;
  columnSetting?: boolean;
  advancedFilterable?: boolean;
  advancedFilterExpanded?: boolean;
  advancedFilterActive?: boolean;
  variant?: "default" | "compact";
  searchValue?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  methodOptions?: TableToolbarFilterOption[];
  methodValue?: string;
  onMethodChange?: (value: string) => void;
  /** @deprecated 使用 onReset */
  onRefresh?: () => void;
  onReset?: () => void;
  onToggleAdvancedFilter?: () => void;
  onExport?: () => void;
  onOpenColumnSetting?: () => void;
  className?: string;
  extra?: ReactNode;
}

export interface TableBatchAction {
  key: string;
  label: string;
  variant?: "default" | "outline" | "destructive";
  onClick?: (selectedKeys: string[]) => void;
}

export interface TableBatchActionsProps {
  selectedCount: number;
  selectedKeys: string[];
  actions?: TableBatchAction[];
  onClear?: () => void;
  className?: string;
}

export interface TableColumnSettingProps {
  open: boolean;
  onClose: () => void;
  items: ColumnSettingItem[];
  visibleKeys: string[];
  defaultVisibleKeys: string[];
  onChange: (keys: string[]) => void;
  onSave?: (keys: string[]) => void;
  storageKey?: string;
}
