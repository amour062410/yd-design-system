import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

export const timePickerTokens = {
  "timepicker-height-sm": "24px",
  "timepicker-height-md": "32px",
  "timepicker-height-lg": "40px",
  "timepicker-border-default": neutralGray[4],
  "timepicker-border-focus": brandPrimary[6],
  "timepicker-panel-shadow": shadowTokens["shadow-popover"],
  "timepicker-radius": radius.md,
  "timepicker-cell-selected": brandPrimary[6],
  "timepicker-cell-hover": brandPrimary[1],
} as const;

export type TimePickerTokenKey = keyof typeof timePickerTokens;

export const timePickerSizeSpecs = {
  sm: {
    height: timePickerTokens["timepicker-height-sm"],
    fontSizeKey: "xs" as const,
    paddingX: "10px",
    iconSize: 14,
  },
  md: {
    height: timePickerTokens["timepicker-height-md"],
    fontSizeKey: "sm" as const,
    paddingX: "12px",
    iconSize: 16,
  },
  lg: {
    height: timePickerTokens["timepicker-height-lg"],
    fontSizeKey: "sm" as const,
    paddingX: "14px",
    iconSize: 16,
  },
} as const;

export type TimePickerSizeKey = keyof typeof timePickerSizeSpecs;

export const timePickerUsageTokenNames = [
  "timepicker-height-sm",
  "timepicker-height-md",
  "timepicker-height-lg",
  "timepicker-border-default",
  "timepicker-border-focus",
  "timepicker-panel-shadow",
  "timepicker-radius",
  "timepicker-cell-selected",
  "timepicker-cell-hover",
] as const;
