import type { ReactNode } from "react";
import type { TablePaginationConfig } from "../../components/table-pagination";
import type {
  ColumnSettingItem,
  TableBatchAction,
  TableBatchActionsProps,
  TableColumnSettingProps,
  TableToolbarFilterOption,
  TableToolbarProps,
} from "../../components/table/table.types";
import type { InspectionStatus } from "./inspection-status-tag";
import type { QuickFilterItem, QuickFilterValue } from "./inspection-quick-filter";

export type { InspectionStatus };
export type {
  ColumnSettingItem,
  TableBatchAction,
  TableBatchActionsProps,
  TableColumnSettingProps,
  TableToolbarFilterOption,
  TableToolbarProps,
};

export interface InspectionRecord extends Record<string, unknown> {
  key: string;
  storeName: string;
  owner: string;
  cycle: string;
  method: string;
  status: InspectionStatus;
  lastInspectionAt: string;
  storeCode?: string;
  region?: string;
  storeLevel?: string;
  /** 风险门店标记 */
  isRisk?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface InspectionTableProps {
  dataSource?: InspectionRecord[];
  loading?: boolean;
  className?: string;
  title?: string;
  /** 快捷状态统计，不传则根据 dataSource 计算 */
  quickFilterItems?: QuickFilterItem[];
  /** localStorage 列配置 key 前缀 */
  storageKey?: string;
  pagination?: TablePaginationConfig | false;
  onRefresh?: () => void;
  onExport?: (selectedKeys: string[]) => void;
  onBatchAssign?: (selectedKeys: string[]) => void;
  onBatchComplete?: (selectedKeys: string[]) => void;
  batchActions?: TableBatchAction[];
  /** 操作列自定义 render */
  renderActions?: (record: InspectionRecord) => ReactNode;
}

export type { QuickFilterItem, QuickFilterValue };
