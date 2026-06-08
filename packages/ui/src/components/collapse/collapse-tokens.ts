export {
  collapseTokens,
  collapseSizeSpecs,
  collapseUsageTokenNames,
  type CollapseTokenKey,
  type CollapseSizeKey,
} from "@yd-ds/tokens";

export const collapseCssVars = {
  colorBorder: "--collapse-color-border",
  colorBg: "--collapse-color-bg",
  colorBgHover: "--collapse-color-bg-hover",
  colorBgActive: "--collapse-color-bg-active",
  colorTitle: "--collapse-color-title",
  colorSubtitle: "--collapse-color-subtitle",
  colorContent: "--collapse-color-content",
  colorIcon: "--collapse-color-icon",
  colorIconActive: "--collapse-color-icon-active",
  colorDisabled: "--collapse-color-disabled",
  colorFocusRing: "--collapse-color-focus-ring",
  radius: "--collapse-radius",
  motionDuration: "--collapse-motion-duration",
  motionEasing: "--collapse-motion-easing",
} as const;
