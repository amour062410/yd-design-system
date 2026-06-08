export {
  tableTokens,
  tableSizeSpecs,
  tableUsageTokenNames,
  tableDesignSpecRows,
  tableBusinessSpecRows,
  type TableTokenKey,
  type TableSizeKey,
} from "@yd-ds/tokens";

export const tableCssVars = {
  radius: "--table-radius",
  bg: "--table-bg",
  headerBg: "--table-header-bg",
  headerBorder: "--table-header-border-color",
  headerHeight: "--table-header-height",
  borderColor: "--table-border-color",
  rowHoverBg: "--table-row-hover-bg",
  rowSelectedBg: "--table-row-selected-bg",
  rowStripeBg: "--table-row-stripe-bg",
  actionColor: "--table-action-color",
  skeletonBg: "--table-skeleton-bg",
  emptyIcon: "--table-empty-icon",
} as const;
