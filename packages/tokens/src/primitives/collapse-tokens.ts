import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const collapseTokens = {
  "collapse-color-border": neutralGray[4],
  "collapse-color-bg": neutralGray[1],
  "collapse-color-bg-hover": neutralGray[2],
  "collapse-color-bg-active": neutralGray[3],
  "collapse-color-title": neutralGray[10],
  "collapse-color-subtitle": neutralGray[6],
  "collapse-color-content": neutralGray[7],
  "collapse-color-icon": neutralGray[8],
  "collapse-color-icon-active": neutralGray[8],
  "collapse-color-content-bg": neutralGray[2],
  "collapse-nested-indent": spacing[6],
  "collapse-color-disabled": neutralGray[5],
  "collapse-color-focus-ring": brandPrimary[6],

  "collapse-radius": radius.sm,
  "collapse-divider-width": "1px",

  "collapse-motion-duration": "200ms",
  "collapse-motion-easing": "ease-out",

  "collapse-header-height-sm": "40px",
  "collapse-header-height-md": "44px",
  "collapse-header-height-lg": "56px",

  "collapse-padding-x-sm": spacing[3],
  "collapse-padding-x-md": spacing[4],
  "collapse-padding-x-lg": spacing[5],

  "collapse-padding-y-sm": spacing[2],
  "collapse-padding-y-md": spacing[0],
  "collapse-padding-y-lg": spacing[4],

  "collapse-content-padding-x-sm": spacing[4],
  "collapse-content-padding-x-md": spacing[4],
  "collapse-content-padding-x-lg": spacing[5],

  "collapse-content-padding-top-sm": spacing[3],
  "collapse-content-padding-bottom-sm": spacing[3],
  "collapse-content-padding-top-md": spacing[4],
  "collapse-content-padding-bottom-md": spacing[4],
  "collapse-content-padding-top-lg": spacing[5],
  "collapse-content-padding-bottom-lg": spacing[5],

  "collapse-title-font-size-sm": "14px",
  "collapse-title-font-size-md": "14px",
  "collapse-title-font-size-lg": "16px",

  "collapse-subtitle-font-size-sm": "12px",
  "collapse-subtitle-font-size-md": "12px",
  "collapse-subtitle-font-size-lg": "14px",

  "collapse-content-font-size-sm": "14px",
  "collapse-content-font-size-md": "14px",
  "collapse-content-font-size-lg": "14px",

  "collapse-icon-size-sm": "14px",
  "collapse-icon-size-md": "12px",
  "collapse-nested-title-font-size": "13px",
  "collapse-icon-size-lg": "16px",

  "collapse-header-gap": spacing[2],
  "collapse-title-gap": spacing[1],
} as const;

export type CollapseTokenKey = keyof typeof collapseTokens;

export const collapseSizeSpecs = {
  sm: {
    headerHeight: collapseTokens["collapse-header-height-sm"],
    paddingX: collapseTokens["collapse-padding-x-sm"],
    paddingY: collapseTokens["collapse-padding-y-sm"],
    contentPaddingX: collapseTokens["collapse-content-padding-x-sm"],
    contentPaddingTop: collapseTokens["collapse-content-padding-top-sm"],
    contentPaddingBottom: collapseTokens["collapse-content-padding-bottom-sm"],
    titleFontSize: collapseTokens["collapse-title-font-size-sm"],
    subtitleFontSize: collapseTokens["collapse-subtitle-font-size-sm"],
    contentFontSize: collapseTokens["collapse-content-font-size-sm"],
    iconSize: collapseTokens["collapse-icon-size-sm"],
  },
  md: {
    headerHeight: collapseTokens["collapse-header-height-md"],
    paddingX: collapseTokens["collapse-padding-x-md"],
    paddingY: collapseTokens["collapse-padding-y-md"],
    contentPaddingX: collapseTokens["collapse-content-padding-x-md"],
    contentPaddingTop: collapseTokens["collapse-content-padding-top-md"],
    contentPaddingBottom: collapseTokens["collapse-content-padding-bottom-md"],
    titleFontSize: collapseTokens["collapse-title-font-size-md"],
    subtitleFontSize: collapseTokens["collapse-subtitle-font-size-md"],
    contentFontSize: collapseTokens["collapse-content-font-size-md"],
    iconSize: collapseTokens["collapse-icon-size-md"],
  },
  lg: {
    headerHeight: collapseTokens["collapse-header-height-lg"],
    paddingX: collapseTokens["collapse-padding-x-lg"],
    paddingY: collapseTokens["collapse-padding-y-lg"],
    contentPaddingX: collapseTokens["collapse-content-padding-x-lg"],
    contentPaddingTop: collapseTokens["collapse-content-padding-top-lg"],
    contentPaddingBottom: collapseTokens["collapse-content-padding-bottom-lg"],
    titleFontSize: collapseTokens["collapse-title-font-size-lg"],
    subtitleFontSize: collapseTokens["collapse-subtitle-font-size-lg"],
    contentFontSize: collapseTokens["collapse-content-font-size-lg"],
    iconSize: collapseTokens["collapse-icon-size-lg"],
  },
} as const;

export type CollapseSizeKey = keyof typeof collapseSizeSpecs;

export const collapseUsageTokenNames = [
  "collapse-color-border",
  "collapse-color-bg",
  "collapse-color-bg-hover",
  "collapse-color-title",
  "collapse-color-subtitle",
  "collapse-color-content",
  "collapse-color-icon",
  "collapse-color-icon-active",
  "collapse-radius",
  "collapse-header-height-md",
  "collapse-motion-duration",
] as const;
