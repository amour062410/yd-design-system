import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

/**
 * Popconfirm 语义令牌 —— 面板阴影 / 圆角 / 边框复用 Popover & Modal，
 * 仅新增 width / icon-size / footer-gap 三项专用变量。
 */
export const popconfirmTokens = {
  "popconfirm-width": "260px",
  "popconfirm-icon-size": "18px",
  "popconfirm-footer-gap": "8px",
  "popconfirm-panel-radius": radius.lg,
  "popconfirm-panel-shadow": shadowTokens["shadow-popover"],
  "popconfirm-border": neutralGray[4],
  "popconfirm-bg": neutralGray[1],
  "popconfirm-title-color": neutralGray[10],
  "popconfirm-description-color": neutralGray[8],
  "popconfirm-warning": functionalColors.warning,
  "popconfirm-danger": functionalColors.danger,
  "popconfirm-primary": brandPrimary[6],
  "popconfirm-z-index": "1060",
  "popconfirm-motion-duration": "150ms",
  "popconfirm-motion-easing": "ease-out",
} as const;

export type PopconfirmTokenKey = keyof typeof popconfirmTokens;

export const popconfirmUsageTokenNames = [
  "popconfirm-width",
  "popconfirm-icon-size",
  "popconfirm-footer-gap",
  "popconfirm-panel-shadow",
  "popconfirm-warning",
  "popconfirm-danger",
] as const;
