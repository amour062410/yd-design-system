import { selectTokens } from "./select-tokens";

/**
 * Cascader 语义令牌 —— 触发器复用 Select 高度/边框/圆角，
 * 面板为多列级联菜单，列宽与 Select 下拉面板阴影对齐 YD 规范。
 */
export const cascaderTokens = {
  "cascader-height-sm": selectTokens["select-height-sm"],
  "cascader-height-md": selectTokens["select-height-md"],
  "cascader-height-lg": selectTokens["select-height-lg"],
  "cascader-border-default": selectTokens["select-border-default"],
  "cascader-border-focus": selectTokens["select-border-focus"],
  "cascader-border-error": selectTokens["select-border-error"],
  "cascader-panel-shadow": selectTokens["select-panel-shadow"],
  "cascader-option-hover": selectTokens["select-option-hover"],
  "cascader-option-selected": selectTokens["select-option-selected"],
  "cascader-radius": selectTokens["select-radius"],
  "cascader-column-width": "180px",
  "cascader-column-max-height": "200px",
} as const;

export type CascaderTokenKey = keyof typeof cascaderTokens;

export const cascaderSizeSpecs = {
  sm: {
    height: cascaderTokens["cascader-height-sm"],
    fontSizeKey: "xs" as const,
    paddingX: "10px",
    optionFontSizeKey: "xs" as const,
  },
  md: {
    height: cascaderTokens["cascader-height-md"],
    fontSizeKey: "sm" as const,
    paddingX: "12px",
    optionFontSizeKey: "sm" as const,
  },
  lg: {
    height: cascaderTokens["cascader-height-lg"],
    fontSizeKey: "base" as const,
    paddingX: "14px",
    optionFontSizeKey: "sm" as const,
  },
} as const;

export type CascaderSizeKey = keyof typeof cascaderSizeSpecs;

export const cascaderUsageTokenNames = [
  "cascader-height-sm",
  "cascader-height-md",
  "cascader-height-lg",
  "cascader-border-default",
  "cascader-border-focus",
  "cascader-panel-shadow",
  "cascader-option-hover",
  "cascader-option-selected",
  "cascader-column-width",
] as const;
