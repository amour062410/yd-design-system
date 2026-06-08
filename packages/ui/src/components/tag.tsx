export { Tag, type TagProps, type TagStatus, type TagVariant } from "./tag/tag";
export { TagGroup } from "./tag/tag-group";
export { tagCssVars } from "./tag/tag-tokens";
export type {
  TagGroupItem,
  TagGroupMode,
  TagGroupProps,
} from "./tag/tag.types";

/**
 * @deprecated Use `@yd-ds/ui/business-patterns/tag`
 */
export {
  InspectionStatusTag,
  getInspectionStatusLabel,
  type InspectionStatus,
  RiskLevelTag,
  StoreRiskLevelTag,
  getStoreRiskLevelLabel,
  type StoreRiskLevel,
  StoreStatusTag,
  getStoreStatusLabel,
  type StoreStatus,
} from "../business-patterns/tag";
