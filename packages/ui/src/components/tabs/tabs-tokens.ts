/**
 * Tabs tokens — aligned with @yd-ds/tokens and showcase CSS variables.
 * Brand #165DFF · card radius 6px (radius.md)
 */
export {
  tabsTokens,
  tabsSizeSpecs,
  tabsTokenRows,
  type TabsTokenKey,
  type TabsSizeKey,
} from "@yd-ds/tokens";

/** CSS custom properties used by Tabs (defined in showcase-tokens.css) */
export const tabsCssVars = {
  colorActive: "--tabs-color-active",
  colorHover: "--tabs-color-hover",
  colorDisabled: "--tabs-color-disabled",
  borderColor: "--tabs-border-color",
  indicatorColor: "--tabs-indicator-color",
  textDefault: "--tabs-text-default",
  segmentTrack: "--tabs-segment-track",
  cardRadius: "--tabs-card-radius",
  heightSm: "--tabs-height-sm",
  heightMd: "--tabs-height-md",
  heightLg: "--tabs-height-lg",
} as const;
