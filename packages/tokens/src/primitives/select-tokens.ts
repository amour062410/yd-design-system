import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

export const selectTokens = {
  "select-height-sm": "32px",
  "select-height-md": "40px",
  "select-height-lg": "48px",
  "select-border-default": neutralGray[4],
  "select-border-focus": brandPrimary[6],
  "select-border-error": functionalColors.danger,
  "select-panel-shadow": shadowTokens["shadow-popover"],
  "select-option-hover": brandPrimary[1],
  "select-option-selected": brandPrimary[1],
  "select-radius": radius.md,
} as const;

export type SelectTokenKey = keyof typeof selectTokens;

export const selectSizeSpecs = {
  sm: {
    height: selectTokens["select-height-sm"],
    fontSizeKey: "xs" as const,
    paddingX: "10px",
    optionFontSizeKey: "xs" as const,
  },
  md: {
    height: selectTokens["select-height-md"],
    fontSizeKey: "sm" as const,
    paddingX: "12px",
    optionFontSizeKey: "sm" as const,
  },
  lg: {
    height: selectTokens["select-height-lg"],
    fontSizeKey: "base" as const,
    paddingX: "14px",
    optionFontSizeKey: "sm" as const,
  },
} as const;

export type SelectSizeKey = keyof typeof selectSizeSpecs;

export const selectUsageTokenNames = [
  "select-height-sm",
  "select-height-md",
  "select-height-lg",
  "select-border-default",
  "select-border-focus",
  "select-panel-shadow",
  "select-option-hover",
  "select-option-selected",
] as const;
