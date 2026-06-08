export * from "./table/table";
export type * from "./table/table.types";
export { tableCssVars } from "./table/table-tokens";

/**
 * @deprecated Use `@yd-ds/ui/business-patterns/table`
 */
export {
  CandidateTableDemo,
  type CandidateRecord,
  InspectionTable,
  INSPECTION_COLUMN_SETTING_ITEMS,
  StoreInspectionDemo,
  STORE_INSPECTION_RISK_DATA,
  STORE_INSPECTION_V3_OVERVIEW,
  STORE_INSPECTION_DEMO_DATA,
  STORE_INSPECTION_TASK_DATA,
  STORE_INSPECTION_TASK_SAMPLE,
  STORE_INSPECTION_SAMPLE_DATA,
  InspectionOverviewCards,
  InspectionBusinessFilter,
  InspectionRiskTable,
  InspectionScore,
  resolveScoreTone,
  StoreRiskLevelTag,
  getStoreRiskLevelLabel,
  RectificationStatusTag,
  getRectificationStatusLabel,
  InspectionQuickFilter,
  buildQuickFilterItems,
  InspectionOverviewStats,
  InspectionAdvancedFilter,
  isAdvancedFilterActive,
  InspectionStatusTag,
  getInspectionStatusLabel,
  RiskColorBar,
  RiskLevelTag,
  StatusTabs,
  DetailPanel,
  ExpandableDetailTable,
  CertificateStatusTable,
  InteractiveExpandableDetailTable,
} from "../business-patterns/table";
export type {
  InspectionRiskRecord,
  InspectionOverviewCardItem,
  InspectionOverviewCardsProps,
  InspectionBusinessFilterProps,
  InspectionRiskTableProps,
  StoreRiskLevel,
  RectificationStatus,
  InspectionRecord,
  InspectionTableProps,
  InspectionStatus,
  QuickFilterItem,
  QuickFilterValue,
  InspectionOverviewItem,
  InspectionAdvancedFilterValues,
  RiskLevel,
  StatusTabItem,
  StatusTabsProps,
  DetailKnowledgePoint,
  DetailCourse,
  DetailMaterial,
  DetailPanelProps,
  ImportanceLevel,
  ExpandableDetailRow,
  ExpandableDetailTableProps,
  CertificateRecord,
  CertificateStatusTableProps,
} from "../business-patterns/table";

/**
 * @deprecated Use `@yd-ds/ui/business-patterns/progress`
 */
export {
  RectificationProgress,
  StoreHealthProgress,
  InspectionCoverageProgress,
  RiskHandlingProgress,
  InspectionStageProgress,
  resolveRateStatus,
  resolveHealthGrade,
} from "../business-patterns/progress";

/**
 * @deprecated Use `@yd-ds/ui/business-patterns/tag`
 */
export {
  StoreStatusTag,
  getStoreStatusLabel,
  type StoreStatus,
} from "../business-patterns/tag";
