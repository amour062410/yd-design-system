import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const transferTokens = {
  "transfer-panel-width": "240px",
  "transfer-list-height": "320px",
  "transfer-item-height": "32px",
  "transfer-header-height": "40px",
  "transfer-border-radius": radius.lg,
  "transfer-gap": spacing[4],
  "transfer-title-font-size": "14px",
  "transfer-title-font-weight": "500",
  "transfer-color-bg": neutralGray[1],
  "transfer-color-border": "#F0F0F0",
  "transfer-color-title": neutralGray[10],
  "transfer-color-text": neutralGray[10],
  "transfer-color-text-secondary": neutralGray[6],
  "transfer-color-item-hover-bg": brandPrimary[1],
  "transfer-color-item-selected-bg": "rgba(22, 93, 255, 0.08)",
  "transfer-color-operation-bg": brandPrimary[6],
  "transfer-color-operation-disabled-bg": neutralGray[3],
  "transfer-color-operation-disabled-text": neutralGray[5],
  "transfer-color-search-bg": neutralGray[1],
  "transfer-color-footer-bg": neutralGray[2],
  "transfer-color-disabled-opacity": "0.45",
} as const;

export type TransferTokenKey = keyof typeof transferTokens;

export const transferTokenRows = [
  {
    token: "transfer-panel-width" as const,
    value: transferTokens["transfer-panel-width"],
    description: "面板宽度 240px",
  },
  {
    token: "transfer-item-height" as const,
    value: transferTokens["transfer-item-height"],
    description: "列表项高度 32px",
  },
  {
    token: "transfer-header-height" as const,
    value: transferTokens["transfer-header-height"],
    description: "头部高度 40px",
  },
  {
    token: "transfer-border-radius" as const,
    value: transferTokens["transfer-border-radius"],
    description: "圆角 8px",
  },
  {
    token: "transfer-gap" as const,
    value: transferTokens["transfer-gap"],
    description: "面板与操作区间距 16px",
  },
  {
    token: "transfer-title-font-size" as const,
    value: transferTokens["transfer-title-font-size"],
    description: "标题字号 14px",
  },
] as const;

export const transferUsageTokenNames = [
  "transfer-panel-width",
  "transfer-item-height",
  "transfer-header-height",
  "transfer-border-radius",
  "transfer-gap",
  "transfer-title-font-size",
  "transfer-color-border",
  "transfer-color-item-hover-bg",
] as const;
