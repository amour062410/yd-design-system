import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";

/**
 * Pagination 语义令牌 —— 圆角 / 边框 / 文字 / 主色复用 Button & Input & Select，
 * 仅新增 item-size / item-gap / jumper-width / min-width 四项专用变量。
 */
export const paginationTokens = {
  "pagination-item-size": "32px",
  "pagination-item-gap": "8px",
  "pagination-jumper-width": "64px",
  "pagination-min-width": "32px",
  "pagination-radius": radius.lg,
  "pagination-border": neutralGray[4],
  "pagination-bg": neutralGray[1],
  "pagination-fill-hover": neutralGray[3],
  "pagination-text-primary": neutralGray[10],
  "pagination-text-secondary": neutralGray[8],
  "pagination-primary": brandPrimary[6],
  "pagination-shadow-sm": shadows.sm,
} as const;

export type PaginationTokenKey = keyof typeof paginationTokens;

export const paginationUsageTokenNames = [
  "pagination-item-size",
  "pagination-item-gap",
  "pagination-jumper-width",
  "pagination-min-width",
  "pagination-primary",
  "pagination-fill-hover",
] as const;
