import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";

export const badgeTokens = {
  "badge-height-sm": "16px",
  "badge-height-md": "18px",
  "badge-height-lg": "20px",
  "badge-min-width-sm": "16px",
  "badge-min-width-md": "18px",
  "badge-min-width-lg": "20px",
  "badge-padding-x-sm": "4px",
  "badge-padding-x-md": "6px",
  "badge-padding-x-lg": "6px",
  "badge-font-size-sm": "10px",
  "badge-font-size-md": "11px",
  "badge-font-size-lg": "12px",
  "badge-dot-sm": "6px",
  "badge-dot-md": "8px",
  "badge-dot-lg": "10px",
  "badge-border-color": neutralGray[1],
  "badge-offset-x": "2px",
  "badge-offset-y": "2px",
  "badge-primary": brandPrimary[6],
  "badge-success": functionalColors.success,
  "badge-warning": functionalColors.warning,
  "badge-danger": functionalColors.danger,
  "badge-info": functionalColors.info,
  "badge-default-bg": neutralGray[4],
  "badge-default-text": "rgba(0,0,0,0.65)",
  "badge-on-solid": "#FFFFFF",
  "badge-radius-pill": radius.full,
  "badge-radius-status": radius.md,
  "badge-ribbon-height": "22px",
  "badge-ribbon-font-size": "12px",
  "badge-ribbon-padding-x": "8px",
  "badge-ribbon-radius": "2px 0 0 2px",
  "badge-ribbon-offset-x": "-6px",
  "badge-ribbon-offset-y": "-1px",
  "badge-ribbon-z-index": "10",
  "badge-ribbon-cut-size": "6px",
  "badge-ribbon-shadow": "0 2px 8px rgba(0, 0, 0, 0.15)",
  "badge-ribbon-primary": "#1677ff",
  "badge-ribbon-success": "#00B42A",
  "badge-ribbon-warning": "#FF7D00",
  "badge-ribbon-danger": "#F53F3F",
  "badge-ribbon-fold-primary": "#0958d9",
  "badge-ribbon-fold-success": "#008F21",
  "badge-ribbon-fold-warning": "#D25F00",
  "badge-ribbon-fold-danger": "#C73636",
  "badge-ribbon-fold-info": "#206CCF",
  "badge-ribbon-fold-default": neutralGray[6],
  "badge-pulse-duration": "200ms",
} as const;

export type BadgeTokenKey = keyof typeof badgeTokens;

export const badgeSizeSpecs = {
  sm: {
    height: badgeTokens["badge-height-sm"],
    minWidth: badgeTokens["badge-min-width-sm"],
    paddingX: badgeTokens["badge-padding-x-sm"],
    fontSize: badgeTokens["badge-font-size-sm"],
    dotSize: badgeTokens["badge-dot-sm"],
  },
  md: {
    height: badgeTokens["badge-height-md"],
    minWidth: badgeTokens["badge-min-width-md"],
    paddingX: badgeTokens["badge-padding-x-md"],
    fontSize: badgeTokens["badge-font-size-md"],
    dotSize: badgeTokens["badge-dot-md"],
  },
  lg: {
    height: badgeTokens["badge-height-lg"],
    minWidth: badgeTokens["badge-min-width-lg"],
    paddingX: badgeTokens["badge-padding-x-lg"],
    fontSize: badgeTokens["badge-font-size-lg"],
    dotSize: badgeTokens["badge-dot-lg"],
  },
} as const;

export type BadgeSizeKey = keyof typeof badgeSizeSpecs;

export const badgeUsageTokenNames = [
  "badge-height-md",
  "badge-primary",
  "badge-danger",
  "badge-dot-md",
  "badge-default-bg",
  "badge-ribbon-height",
] as const;
