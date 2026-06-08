import type { TokenValue } from "./types";
import { getTokenString } from "./flatten";

type Flat = Record<string, TokenValue | import("./types").TokenCompositeLeaf>;

function scaleFromPaths(
  flat: Flat,
  prefix: string,
  steps: readonly (string | number)[]
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const step of steps) {
    const v = getTokenString(flat, `${prefix}.${step}`);
    if (v !== undefined) out[String(step)] = v;
  }
  return out;
}

function mapFromPaths(
  flat: Flat,
  entries: readonly { key: string; path: string }[]
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const { key, path } of entries) {
    const v = getTokenString(flat, path);
    if (v !== undefined) out[key] = v;
  }
  return out;
}

const BRAND_STEPS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
const GRAY_STEPS = BRAND_STEPS;

/** Primitive: brand primary scale from JSON */
export function brandPrimaryFromJson(flat: Flat) {
  return scaleFromPaths(flat, "color.brand.primary", BRAND_STEPS) as Record<
    (typeof BRAND_STEPS)[number],
    string
  >;
}

/** Primitive: neutral gray scale from JSON */
export function neutralGrayFromJson(flat: Flat) {
  return scaleFromPaths(flat, "color.neutral.gray", GRAY_STEPS) as Record<
    (typeof GRAY_STEPS)[number],
    string
  >;
}

/** Primitive: functional colors from JSON */
export function functionalColorsFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "success", path: "color.functional.success" },
    { key: "warning", path: "color.functional.warning" },
    { key: "danger", path: "color.functional.danger" },
    { key: "info", path: "color.functional.info" },
  ]) as {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

/** Semantic colors from JSON `color.semantic.*` */
export function semanticColorsFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "primary", path: "color.semantic.primary" },
    { key: "primaryHover", path: "color.semantic.primaryHover" },
    { key: "primaryActive", path: "color.semantic.primaryActive" },
    { key: "textOnPrimary", path: "color.semantic.textOnPrimary" },
    { key: "textDisabled", path: "color.semantic.textDisabled" },
    { key: "border", path: "color.semantic.border" },
    { key: "transparent", path: "color.semantic.transparent" },
    { key: "controlOutline", path: "color.semantic.controlOutline" },
  ]);
}

/** Text role colors from JSON `color.text.*` */
export function textColorsFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "primary", path: "color.text.primary" },
    { key: "secondary", path: "color.text.secondary" },
    { key: "tertiary", path: "color.text.tertiary" },
    { key: "disabled", path: "color.text.disabled" },
    { key: "inverse", path: "color.text.inverse" },
    { key: "link", path: "color.text.link" },
  ]);
}

/** Spacing scale from JSON */
export function spacingScaleFromJson(flat: Flat) {
  const keys = [
    "0",
    "px",
    "0.5",
    "1",
    "1.5",
    "2",
    "2.5",
    "3",
    "3.5",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "20",
    "24",
    "32",
  ] as const;
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = getTokenString(flat, `spacing.scale.${k}`);
    if (v !== undefined) out[k] = v;
  }
  return out;
}

/** Semantic spacing from JSON */
export function spacingSemanticFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "marginXS", path: "spacing.semantic.marginXS" },
    { key: "marginSM", path: "spacing.semantic.marginSM" },
    { key: "margin", path: "spacing.semantic.margin" },
    { key: "marginMD", path: "spacing.semantic.marginMD" },
    { key: "marginLG", path: "spacing.semantic.marginLG" },
    { key: "marginXL", path: "spacing.semantic.marginXL" },
    { key: "buttonPaddingHorizontal", path: "spacing.semantic.buttonPaddingHorizontal" },
    {
      key: "buttonPaddingHorizontalSM",
      path: "spacing.semantic.buttonPaddingHorizontalSM",
    },
    { key: "controlHeight", path: "spacing.semantic.controlHeight" },
    { key: "controlHeightLG", path: "spacing.semantic.controlHeightLG" },
    { key: "controlHeightSM", path: "spacing.semantic.controlHeightSM" },
    { key: "lineWidth", path: "spacing.semantic.lineWidth" },
    { key: "controlOutlineWidth", path: "spacing.semantic.controlOutlineWidth" },
  ]);
}

/** Radius from JSON */
export function radiusFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "none", path: "radius.none" },
    { key: "sm", path: "radius.sm" },
    { key: "md", path: "radius.md" },
    { key: "lg", path: "radius.lg" },
    { key: "xl", path: "radius.xl" },
    { key: "2xl", path: "radius.2xl" },
    { key: "full", path: "radius.full" },
  ]);
}

/** Elevation shadows from JSON */
export function shadowElevationFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "sm", path: "shadow.elevation.sm" },
    { key: "md", path: "shadow.elevation.md" },
    { key: "lg", path: "shadow.elevation.lg" },
    { key: "xl", path: "shadow.elevation.xl" },
  ]);
}

/** Semantic shadows from JSON */
export function shadowSemanticFromJson(flat: Flat) {
  return mapFromPaths(flat, [
    { key: "dropdown", path: "shadow.semantic.dropdown" },
    { key: "dropdownSubmenu", path: "shadow.semantic.dropdownSubmenu" },
    { key: "modal", path: "shadow.semantic.modal" },
    { key: "popover", path: "shadow.semantic.popover" },
  ]);
}

export type JsonTokenGroups = {
  primitive: {
    brandPrimary: ReturnType<typeof brandPrimaryFromJson>;
    neutralGray: ReturnType<typeof neutralGrayFromJson>;
    functional: ReturnType<typeof functionalColorsFromJson>;
    text: ReturnType<typeof textColorsFromJson>;
    spacing: ReturnType<typeof spacingScaleFromJson>;
    radius: ReturnType<typeof radiusFromJson>;
    shadow: ReturnType<typeof shadowElevationFromJson>;
  };
  semantic: {
    color: ReturnType<typeof semanticColorsFromJson>;
    spacing: ReturnType<typeof spacingSemanticFromJson>;
    shadow: ReturnType<typeof shadowSemanticFromJson>;
  };
};

export function buildTokenGroups(flat: Flat): JsonTokenGroups {
  return {
    primitive: {
      brandPrimary: brandPrimaryFromJson(flat),
      neutralGray: neutralGrayFromJson(flat),
      functional: functionalColorsFromJson(flat),
      text: textColorsFromJson(flat),
      spacing: spacingScaleFromJson(flat),
      radius: radiusFromJson(flat),
      shadow: shadowElevationFromJson(flat),
    },
    semantic: {
      color: semanticColorsFromJson(flat),
      spacing: spacingSemanticFromJson(flat),
      shadow: shadowSemanticFromJson(flat),
    },
  };
}
