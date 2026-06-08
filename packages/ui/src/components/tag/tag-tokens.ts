export { tagTokens, tagSizeSpecs, type TagSizeKey } from "@yd-ds/tokens";

/** CSS custom properties for Tag — inject via className on root or docs showcase */
export const tagCssVars = {
  radiusSm: "--tag-radius-sm",
  radiusMd: "--tag-radius-md",
  heightSm: "--tag-height-sm",
  heightMd: "--tag-height-md",
  heightLg: "--tag-height-lg",
  borderDefault: "--tag-border-default",
  textDefault: "--tag-text-default",
  segmentTrack: "--tag-segment-track",
  segmentIndicator: "--tag-segment-indicator",
  primary: "--tag-primary",
  primaryLight: "--tag-primary-light",
  success: "--tag-success",
  successLight: "--tag-success-light",
  warning: "--tag-warning",
  warningLight: "--tag-warning-light",
  danger: "--tag-danger",
  dangerLight: "--tag-danger-light",
  info: "--tag-info",
  infoLight: "--tag-info-light",
} as const;
