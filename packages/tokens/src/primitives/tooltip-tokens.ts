import { neutralGray, brandPrimary, functionalColors } from "./colors";
import { radius } from "./radius";

/**
 * Tooltip 语义令牌 —— 依据 YD Design `Tooltip` 设计稿截图。
 * 默认深色底 #1D2129（neutral gray-10），白字 14px，小圆角 4px，箭头 8px。
 * 语义色复用 YD 功能色 / 品牌色，自定义色由组件 `color` 直接传任意 hex。
 */
export const tooltipTokens = {
  "tooltip-bg-default": neutralGray[10],
  "tooltip-bg-primary": brandPrimary[6],
  "tooltip-bg-success": functionalColors.success,
  "tooltip-bg-warning": functionalColors.warning,
  "tooltip-bg-danger": functionalColors.danger,
  "tooltip-bg-info": functionalColors.info,
  "tooltip-color": "#FFFFFF",
  "tooltip-font-size": "14px",
  "tooltip-line-height": "22px",
  "tooltip-radius": radius.sm,
  "tooltip-padding": "6px 8px",
  "tooltip-arrow-size": "8px",
  "tooltip-max-width": "280px",
  "tooltip-z-index": "1070",
} as const;

export type TooltipTokenKey = keyof typeof tooltipTokens;

/** 预设语义色 → hex，供组件直接消费（避免依赖运行时 CSS 变量是否注入） */
export const tooltipPresetColors = {
  default: tooltipTokens["tooltip-bg-default"],
  primary: tooltipTokens["tooltip-bg-primary"],
  success: tooltipTokens["tooltip-bg-success"],
  warning: tooltipTokens["tooltip-bg-warning"],
  danger: tooltipTokens["tooltip-bg-danger"],
  info: tooltipTokens["tooltip-bg-info"],
} as const;

export type TooltipPresetColor = keyof typeof tooltipPresetColors;

export interface TooltipTokenRow {
  token: TooltipTokenKey;
  value: string;
  description: string;
}

export const tooltipTokenRows: readonly TooltipTokenRow[] = [
  { token: "tooltip-bg-default", value: tooltipTokens["tooltip-bg-default"], description: "默认深色底（neutral gray-10）" },
  { token: "tooltip-bg-primary", value: tooltipTokens["tooltip-bg-primary"], description: "品牌色底（brand-6）" },
  { token: "tooltip-bg-success", value: tooltipTokens["tooltip-bg-success"], description: "成功色底" },
  { token: "tooltip-bg-warning", value: tooltipTokens["tooltip-bg-warning"], description: "警告色底" },
  { token: "tooltip-bg-danger", value: tooltipTokens["tooltip-bg-danger"], description: "危险色底" },
  { token: "tooltip-bg-info", value: tooltipTokens["tooltip-bg-info"], description: "信息色底" },
  { token: "tooltip-color", value: tooltipTokens["tooltip-color"], description: "文字颜色（白）" },
  { token: "tooltip-font-size", value: tooltipTokens["tooltip-font-size"], description: "字号" },
  { token: "tooltip-radius", value: tooltipTokens["tooltip-radius"], description: "圆角" },
  { token: "tooltip-padding", value: tooltipTokens["tooltip-padding"], description: "内边距" },
  { token: "tooltip-arrow-size", value: tooltipTokens["tooltip-arrow-size"], description: "箭头边长" },
  { token: "tooltip-max-width", value: tooltipTokens["tooltip-max-width"], description: "最大宽度" },
] as const;

export const tooltipUsageTokenNames = [
  "color-text-primary",
  "color-brand",
  "color-success",
  "color-warning",
  "color-danger",
  "color-info",
  "radius-sm",
] as const;
