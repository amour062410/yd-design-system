import type { TablePaginationConfig } from "../../components/table-pagination";
import type { StatusTabItem } from "./table-business-patterns";

/** 门店巡检风险等级 */
export type StoreRiskLevel = "high" | "medium" | "low";

/** 整改状态 */
export type RectificationStatus =
  | "abnormal"
  | "pending_rectification"
  | "rectifying"
  | "completed";

export interface InspectionRiskRecord {
  key: string;
  storeName: string;
  storeType?: string;
  region: string;
  template: string;
  inspectionType: string;
  score: number;
  abnormalCount: number;
  riskLevel: StoreRiskLevel;
  lastInspectionAt: string;
  rectificationStatus: RectificationStatus;
  /** 0–100 */
  rectificationRate: number;
  statusFilterKey: RectificationStatus | "all";
}

export interface InspectionOverviewCardItem {
  key: string;
  title: string;
  value: number | string;
  unit?: string;
  tone: "danger" | "warning" | "success" | "brand";
  metrics?: string[];
}

export interface InspectionOverviewCardsProps {
  items: InspectionOverviewCardItem[];
  className?: string;
}

export interface InspectionBusinessFilterProps {
  storeValue: string;
  regionValue: string;
  templateValue: string;
  typeValue: string;
  keyword: string;
  onStoreChange: (v: string) => void;
  onRegionChange: (v: string) => void;
  onTemplateChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onKeywordChange: (v: string) => void;
  storeOptions: { label: string; value: string }[];
  regionOptions: { label: string; value: string }[];
  templateOptions: { label: string; value: string }[];
  typeOptions: { label: string; value: string }[];
  className?: string;
}

export interface InspectionRiskTableProps {
  dataSource: InspectionRiskRecord[];
  statusTabItems: StatusTabItem[];
  statusFilter: string;
  onStatusFilterChange: (key: string) => void;
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  className?: string;
  onView?: (record: InspectionRiskRecord) => void;
}
