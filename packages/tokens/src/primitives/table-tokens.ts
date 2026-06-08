import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";

export const tableTokens = {
  "table-bg": neutralGray[1],
  "table-header-bg": "#FAFAFA",
  "table-header-border-color": "#F0F0F0",
  "table-header-height": "48px",
  "table-row-height-lg": "72px",
  "table-row-height-md": "60px",
  "table-row-height-sm": "38px",
  "table-row-hover-bg": neutralGray[2],
  "table-row-stripe-bg": neutralGray[2],
  "table-row-selected-bg": brandPrimary[1],
  "table-border-color": neutralGray[4],
  "table-cell-padding-lg": "20px",
  "table-cell-padding-md": "16px",
  "table-cell-padding-sm": "12px",
  "table-font-size-lg": "15px",
  "table-font-size-md": "14px",
  "table-font-size-sm": "13px",
  "table-radius": radius.md,
  "table-action-color": brandPrimary[6],
  "table-empty-icon": neutralGray[5],
  "table-skeleton-bg": neutralGray[3],
  "table-pagination-active": brandPrimary[6],
  "table-detail-panel-bg": neutralGray[2],
  "table-detail-panel-border": brandPrimary[2],
  "table-detail-panel-padding": "24px",
  "table-risk-bar-width": "4px",
  "table-risk-expired": "#EB5757",
  "table-risk-warning": "#F2994A",
  "table-risk-normal": "#6FCF97",
} as const;

export type TableTokenKey = keyof typeof tableTokens;

export const tableSizeSpecs = {
  lg: {
    rowHeight: tableTokens["table-row-height-lg"],
    fontSize: tableTokens["table-font-size-lg"],
    cellPadding: tableTokens["table-cell-padding-lg"],
    label: "Large",
  },
  md: {
    rowHeight: tableTokens["table-row-height-md"],
    fontSize: tableTokens["table-font-size-md"],
    cellPadding: tableTokens["table-cell-padding-md"],
    label: "Middle",
  },
  sm: {
    rowHeight: tableTokens["table-row-height-sm"],
    fontSize: tableTokens["table-font-size-sm"],
    cellPadding: tableTokens["table-cell-padding-sm"],
    label: "Dense",
  },
} as const;

export type TableSizeKey = keyof typeof tableSizeSpecs;

export const tableUsageTokenNames = [
  "table-bg",
  "table-header-bg",
  "table-header-border-color",
  "table-header-height",
  "table-row-height-md",
  "table-row-height-sm",
  "table-row-hover-bg",
  "table-row-selected-bg",
  "table-border-color",
  "table-cell-padding-md",
  "table-cell-padding-sm",
  "table-font-size-md",
  "table-font-size-sm",
  "table-radius",
  "table-action-color",
] as const;

export const tableDesignSpecRows = [
  { token: "table-header-height", value: tableTokens["table-header-height"], desc: "表头高度" },
  { token: "table-row-height-md", value: tableTokens["table-row-height-md"], desc: "Medium 行高" },
  { token: "table-row-height-sm", value: tableTokens["table-row-height-sm"], desc: "Small 行高" },
  { token: "table-border-color", value: tableTokens["table-border-color"], desc: "边框颜色" },
  { token: "table-row-hover-bg", value: tableTokens["table-row-hover-bg"], desc: "Hover 行背景" },
  { token: "table-row-selected-bg", value: tableTokens["table-row-selected-bg"], desc: "Selected 行背景" },
  { token: "table-header-bg", value: tableTokens["table-header-bg"], desc: "表头填充" },
  {
    token: "table-header-border-color",
    value: tableTokens["table-header-border-color"],
    desc: "表头描边",
  },
  { token: "table-skeleton-bg", value: tableTokens["table-skeleton-bg"], desc: "Loading 骨架" },
  { token: "table-empty-icon", value: tableTokens["table-empty-icon"], desc: "Empty 图标色" },
] as const;

export const tableBusinessSpecRows = [
  { token: "table-detail-panel-bg", value: tableTokens["table-detail-panel-bg"], desc: "展开区域 · 背景 Gray-1" },
  { token: "table-detail-panel-border", value: tableTokens["table-detail-panel-border"], desc: "展开区域 · 1px Border-2" },
  { token: "table-detail-panel-padding", value: tableTokens["table-detail-panel-padding"], desc: "展开区域 · Padding 24px" },
  { token: "table-radius", value: tableTokens["table-radius"], desc: "展开区域 · 圆角 6px" },
  { token: "table-risk-expired", value: tableTokens["table-risk-expired"], desc: "状态标签 / 色条 · Danger" },
  { token: "table-risk-warning", value: tableTokens["table-risk-warning"], desc: "状态标签 / 色条 · Warning" },
  { token: "table-risk-normal", value: tableTokens["table-risk-normal"], desc: "状态标签 / 色条 · Success" },
  { token: "table-risk-bar-width", value: tableTokens["table-risk-bar-width"], desc: "行左侧风险色条宽度" },
] as const;
