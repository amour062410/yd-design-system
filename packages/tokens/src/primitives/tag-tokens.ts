import { brandPrimary, functionalColors, neutralGray, primitiveColors } from "./colors";
import { radius } from "./radius";

export const tagTokens = {
  "tag-radius-sm": radius.sm,
  "tag-radius-md": radius.md,
  "tag-height-sm": "24px",
  "tag-height-md": "28px",
  "tag-height-lg": "32px",
  "tag-padding-x-sm": "6px",
  "tag-padding-x-md": "8px",
  "tag-padding-x-lg": "10px",
  "tag-gap": "4px",
  "tag-font-size-sm": "12px",
  "tag-font-size-md": "12px",
  "tag-font-size-lg": "14px",
  "tag-font-weight": "500",
  "tag-border-default": neutralGray[4],
  "tag-text-default": "rgba(0,0,0,0.65)",
  "tag-bg-default-light": neutralGray[2],
  "tag-segment-track": neutralGray[3],
  "tag-segment-indicator": neutralGray[1],
  "tag-primary": brandPrimary[6],
  "tag-primary-light": brandPrimary[1],
  "tag-primary-hover": brandPrimary[5],
  "tag-success": functionalColors.success,
  "tag-success-light": primitiveColors.success[50],
  "tag-warning": functionalColors.warning,
  "tag-warning-light": primitiveColors.warning[50],
  "tag-danger": functionalColors.danger,
  "tag-danger-light": primitiveColors.destructive[50],
  "tag-info": functionalColors.info,
  "tag-info-light": "#E8F3FF",
} as const;

export type TagTokenKey = keyof typeof tagTokens;

export const tagSizeSpecs = {
  sm: {
    height: tagTokens["tag-height-sm"],
    paddingX: tagTokens["tag-padding-x-sm"],
    fontSize: tagTokens["tag-font-size-sm"],
    radius: tagTokens["tag-radius-sm"],
    iconSize: "12px",
    dotSize: "6px",
  },
  md: {
    height: tagTokens["tag-height-md"],
    paddingX: tagTokens["tag-padding-x-md"],
    fontSize: tagTokens["tag-font-size-md"],
    radius: tagTokens["tag-radius-md"],
    iconSize: "14px",
    dotSize: "6px",
  },
  lg: {
    height: tagTokens["tag-height-lg"],
    paddingX: tagTokens["tag-padding-x-lg"],
    fontSize: tagTokens["tag-font-size-lg"],
    radius: tagTokens["tag-radius-md"],
    iconSize: "14px",
    dotSize: "8px",
  },
} as const;

export type TagSizeKey = keyof typeof tagSizeSpecs;

export const tagUsageTokenNames = [
  "tag-height-sm",
  "tag-height-md",
  "tag-height-lg",
  "tag-radius-md",
  "tag-primary",
  "tag-border-default",
  "tag-segment-track",
] as const;
