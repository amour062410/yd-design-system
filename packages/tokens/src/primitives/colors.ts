/**
 * Primitive color palette — raw values, not semantic.
 * Semantic aliases live in semantic/colors.ts
 */

/** Brand primary scale · Primary-6 = #165DFF */
export const brandPrimary = {
  1: "#E8F0FF",
  2: "#C5DAFF",
  3: "#9BBCFF",
  4: "#6E9AFF",
  5: "#4378FF",
  6: "#165DFF",
  7: "#0E4AD9",
  8: "#0A3BB3",
  9: "#072D8C",
  10: "#051F66",
} as const;

/** Neutral gray scale · Gray-1 (lightest) → Gray-10 (darkest) */
export const neutralGray = {
  1: "#FFFFFF",
  2: "#F7F8FA",
  3: "#F2F3F5",
  4: "#E5E6EB",
  5: "#C9CDD4",
  6: "#86909C",
  7: "#6B7785",
  8: "#4E5969",
  9: "#272E3B",
  10: "#1D2129",
} as const;

/** Functional semantic colors */
export const functionalColors = {
  success: "#00B42A",
  warning: "#FF7D00",
  danger: "#F53F3F",
  info: "#3491FA",
} as const;

/** Text semantics used in Foundation/Text */
export const textRoleColors = {
  black88: "rgba(0,0,0,0.88)",
  black65: "rgba(0,0,0,0.65)",
  black45: "rgba(0,0,0,0.45)",
  black25: "rgba(0,0,0,0.25)",
  link: brandPrimary[6],
  success: functionalColors.success,
  warning: functionalColors.warning,
  error: functionalColors.danger,
} as const;

export const primitiveColors = {
  white: "#ffffff",
  black: "#000000",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  /** @deprecated Use brandPrimary — kept for Tailwind / legacy keys */
  brand: {
    50: brandPrimary[1],
    100: brandPrimary[2],
    200: brandPrimary[3],
    300: brandPrimary[4],
    400: brandPrimary[5],
    500: brandPrimary[6],
    600: brandPrimary[7],
    700: brandPrimary[8],
    800: brandPrimary[9],
    900: brandPrimary[10],
    950: brandPrimary[10],
  },
  primary: brandPrimary,
  neutral: neutralGray,
  functional: functionalColors,
  text: textRoleColors,
  success: {
    50: "#E8FFEA",
    400: "#23C343",
    500: functionalColors.success,
    600: "#009A29",
  },
  warning: {
    50: "#FFF7E8",
    500: functionalColors.warning,
    600: "#D25F00",
  },
  destructive: {
    50: "#FFECE8",
    500: functionalColors.danger,
    600: "#CB272D",
  },
  info: {
    50: "#E8F3FF",
    500: functionalColors.info,
    600: "#206CCF",
  },
} as const;

export type PrimitiveColors = typeof primitiveColors;
export type BrandPrimaryStep = keyof typeof brandPrimary;
export type NeutralGrayStep = keyof typeof neutralGray;
export type FunctionalColorKey = keyof typeof functionalColors;
