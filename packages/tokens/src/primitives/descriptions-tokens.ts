import { neutralGray } from "./colors";
import { radius } from "./radius";

/**
 * Descriptions 语义令牌 —— 文字 / 边框 / 圆角复用 Card & Table & Typography，
 * 仅新增 label-width / row-gap / column-gap / item-padding 四项专用变量。
 */
export const descriptionsTokens = {
  "descriptions-label-width": "120px",
  "descriptions-row-gap": "16px",
  "descriptions-column-gap": "24px",
  "descriptions-item-padding": "12px",
  "descriptions-radius": radius.lg,
  "descriptions-border": neutralGray[4],
  "descriptions-bg": neutralGray[1],
  "descriptions-label-bg": neutralGray[2],
  "descriptions-text-primary": neutralGray[10],
  "descriptions-text-secondary": neutralGray[8],
  "descriptions-title-size": "14px",
  "descriptions-content-size": "13px",
} as const;

export type DescriptionsTokenKey = keyof typeof descriptionsTokens;

export const descriptionsUsageTokenNames = [
  "descriptions-label-width",
  "descriptions-row-gap",
  "descriptions-column-gap",
  "descriptions-item-padding",
  "descriptions-text-primary",
  "descriptions-text-secondary",
] as const;
