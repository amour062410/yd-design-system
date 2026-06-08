import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";

/** Checkbox semantic tokens — documentation & component theming */
export const checkboxTokens = {
  "checkbox-size-sm": "14px",
  "checkbox-size-md": "16px",
  "checkbox-size-lg": "18px",
  "checkbox-color-border": neutralGray[5],
  "checkbox-color-border-hover": brandPrimary[6],
  "checkbox-color-bg-checked": brandPrimary[6],
  "checkbox-color-border-disabled": neutralGray[4],
  "checkbox-color-bg-disabled": neutralGray[3],
  "checkbox-color-icon-disabled": neutralGray[6],
  "checkbox-border-radius": radius.sm,
} as const;

export type CheckboxTokenKey = keyof typeof checkboxTokens;

export const checkboxSizeSpecs = {
  sm: {
    control: checkboxTokens["checkbox-size-sm"],
    icon: 10,
    fontSizeKey: "xs" as const,
    gap: "6px",
  },
  md: {
    control: checkboxTokens["checkbox-size-md"],
    icon: 12,
    fontSizeKey: "sm" as const,
    gap: "8px",
  },
  lg: {
    control: checkboxTokens["checkbox-size-lg"],
    icon: 14,
    fontSizeKey: "base" as const,
    gap: "10px",
  },
} as const;

export type CheckboxSizeKey = keyof typeof checkboxSizeSpecs;

export const checkboxTokenRows = [
  {
    token: "checkbox-size-sm",
    value: checkboxTokens["checkbox-size-sm"],
    description: "Small 控件边长",
  },
  {
    token: "checkbox-size-md",
    value: checkboxTokens["checkbox-size-md"],
    description: "Medium 控件边长（默认）",
  },
  {
    token: "checkbox-size-lg",
    value: checkboxTokens["checkbox-size-lg"],
    description: "Large 控件边长",
  },
  {
    token: "checkbox-color-border",
    value: checkboxTokens["checkbox-color-border"],
    description: "未选中边框色",
  },
  {
    token: "checkbox-color-border-hover",
    value: checkboxTokens["checkbox-color-border-hover"],
    description: "Hover / Focus 边框色",
  },
  {
    token: "checkbox-color-bg-checked",
    value: checkboxTokens["checkbox-color-bg-checked"],
    description: "选中与半选背景色",
  },
  {
    token: "checkbox-color-border-disabled",
    value: checkboxTokens["checkbox-color-border-disabled"],
    description: "禁用边框色",
  },
  {
    token: "checkbox-color-bg-disabled",
    value: checkboxTokens["checkbox-color-bg-disabled"],
    description: "禁用未选中背景",
  },
  {
    token: "checkbox-color-icon-disabled",
    value: checkboxTokens["checkbox-color-icon-disabled"],
    description: "禁用已选中勾选图标色",
  },
] as const;
