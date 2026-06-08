import { brandPrimary, functionalColors, neutralGray, primitiveColors } from "./colors";

/** Link semantic color tokens — Foundation / Link documentation */
export const linkColorTokens = {
  "link-color-default": brandPrimary[6],
  "link-color-hover": brandPrimary[5],
  "link-color-active": brandPrimary[7],
  "link-color-disabled": neutralGray[5],
} as const;

export type LinkColorTokenKey = keyof typeof linkColorTokens;

/** Status-specific link colors (warning / danger / success) */
export const linkStatusColors = {
  default: linkColorTokens,
  warning: {
    default: functionalColors.warning,
    hover: primitiveColors.warning[600],
    active: primitiveColors.warning[600],
  },
  danger: {
    default: functionalColors.danger,
    hover: primitiveColors.destructive[600],
    active: primitiveColors.destructive[600],
  },
  success: {
    default: functionalColors.success,
    hover: primitiveColors.success[400],
    active: primitiveColors.success[600],
  },
} as const;
