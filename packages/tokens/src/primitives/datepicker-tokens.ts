import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

export const datePickerTokens = {
  "datepicker-height-sm": "24px",
  "datepicker-height-md": "32px",
  "datepicker-height-lg": "40px",
  "datepicker-border-default": neutralGray[4],
  "datepicker-border-focus": brandPrimary[6],
  "datepicker-panel-shadow": shadowTokens["shadow-popover"],
  "datepicker-radius": radius.md,
  "datepicker-cell-selected": brandPrimary[6],
  "datepicker-range-bg": brandPrimary[1],
} as const;

export type DatePickerTokenKey = keyof typeof datePickerTokens;

export const datePickerSizeSpecs = {
  sm: {
    height: datePickerTokens["datepicker-height-sm"],
    fontSizeKey: "xs" as const,
    paddingX: "10px",
    iconSize: 14,
  },
  md: {
    height: datePickerTokens["datepicker-height-md"],
    fontSizeKey: "sm" as const,
    paddingX: "12px",
    iconSize: 16,
  },
  lg: {
    height: datePickerTokens["datepicker-height-lg"],
    fontSizeKey: "sm" as const,
    paddingX: "14px",
    iconSize: 16,
  },
} as const;

export type DatePickerSizeKey = keyof typeof datePickerSizeSpecs;

export const datePickerUsageTokenNames = [
  "datepicker-height-sm",
  "datepicker-height-md",
  "datepicker-height-lg",
  "datepicker-border-default",
  "datepicker-border-focus",
  "datepicker-panel-shadow",
  "datepicker-radius",
  "datepicker-cell-selected",
  "datepicker-range-bg",
] as const;
