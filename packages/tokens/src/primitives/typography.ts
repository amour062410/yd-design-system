/**
 * Typography primitives — font families, sizes, weights, line heights.
 * Semantic text roles are composed in typography-scales.ts for documentation.
 */

export const fontFamilyStacks = {
  primary: {
    token: "font.family.primary",
    label: "Primary Font",
    description: "界面主字体，由 --font-sans 注入（Inter）",
    stack: [
      "var(--font-sans)",
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
    ] as const,
  },
  fallback: {
    token: "font.family.fallback",
    label: "Fallback Font",
    description: "系统无 Web 字体时的降级方案",
    stack: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "sans-serif",
    ] as const,
  },
  mono: {
    token: "font.family.mono",
    label: "Monospace Font",
    description: "等宽字体，用于代码与 Token 展示",
    stack: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"] as const,
  },
} as const;

/** Tailwind-compatible font family keys */
export const fontFamily = {
  sans: [...fontFamilyStacks.primary.stack],
  mono: [...fontFamilyStacks.mono.stack],
} as const;

export const fontSize = {
  "2xs": ["0.6875rem", { lineHeight: "1rem" }],
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
  "5xl": ["3rem", { lineHeight: "3.5rem" }],
} as const;

export type FontSizeKey = keyof typeof fontSize;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type FontWeightKey = keyof typeof fontWeight;

export const lineHeight = {
  none: { token: "line-height-none", value: "1" },
  tight: { token: "line-height-tight", value: "1.25" },
  snug: { token: "line-height-snug", value: "1.375" },
  base: { token: "line-height-base", value: "1.5" },
  relaxed: { token: "line-height-relaxed", value: "1.625" },
  loose: { token: "line-height-loose", value: "2" },
} as const;

export type LineHeightKey = keyof typeof lineHeight;

export const fontWeightTokens = {
  regular: {
    token: "font-weight-regular",
    label: "Regular",
    value: fontWeight.normal,
    description: "正文默认字重",
  },
  medium: {
    token: "font-weight-medium",
    label: "Medium",
    value: fontWeight.medium,
    description: "次级强调、小标题",
  },
  semibold: {
    token: "font-weight-semibold",
    label: "Semibold",
    value: fontWeight.semibold,
    description: "标题、按钮标签",
  },
  bold: {
    token: "font-weight-bold",
    label: "Bold",
    value: fontWeight.bold,
    description: "页面主标题、强强调",
  },
} as const;

/** Resolve Tailwind fontSize tuple to size + default line height */
export function resolveFontSize(key: FontSizeKey): {
  fontSize: string;
  lineHeight: string;
  fontSizeToken: string;
} {
  const entry = fontSize[key];
  return {
    fontSize: entry[0],
    lineHeight: entry[1].lineHeight,
    fontSizeToken: `font-size-${key}`,
  };
}
