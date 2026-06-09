import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";
import { selectTokens } from "./select-tokens";

/**
 * Dropdown 语义令牌 —— 面板阴影 / 选项态复用 Select & Popover，
 * 仅新增 min-width / item-height / z-index / item-radius 四项专用变量。
 */
export const dropdownTokens = {
  "dropdown-min-width": "140px",
  "dropdown-item-height": "36px",
  "dropdown-z-index": "1050",
  "dropdown-item-radius": radius.md,
  "dropdown-panel-radius": radius.lg,
  "dropdown-panel-shadow": shadowTokens["shadow-popover"],
  "dropdown-border": neutralGray[4],
  "dropdown-bg": neutralGray[1],
  "dropdown-option-hover": selectTokens["select-option-hover"],
  "dropdown-option-active": brandPrimary[1],
  "dropdown-text-primary": neutralGray[10],
  "dropdown-text-secondary": neutralGray[8],
  "dropdown-danger": functionalColors.danger,
  "dropdown-motion-duration": "150ms",
  "dropdown-motion-easing": "ease-out",
} as const;

export type DropdownTokenKey = keyof typeof dropdownTokens;

export const dropdownUsageTokenNames = [
  "dropdown-min-width",
  "dropdown-item-height",
  "dropdown-z-index",
  "dropdown-item-radius",
  "dropdown-panel-shadow",
  "dropdown-option-hover",
  "dropdown-option-active",
  "dropdown-danger",
] as const;
