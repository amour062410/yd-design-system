import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

export const uploadTokens = {
  "upload-border-default": neutralGray[4],
  "upload-border-hover": brandPrimary[4],
  "upload-border-active": brandPrimary[6],
  "upload-radius": radius.md,
  "upload-dragger-radius": "12px",
  "upload-progress-track": brandPrimary[1],
  "upload-progress-fill": brandPrimary[6],
  "upload-card-size": "80px",
  "upload-avatar-size": "96px",
  "upload-panel-shadow": shadowTokens["shadow-dropdown"],
  "upload-color-error": functionalColors.danger,
} as const;

export type UploadTokenKey = keyof typeof uploadTokens;

export const uploadUsageTokenNames = [
  "upload-border-default",
  "upload-border-hover",
  "upload-border-active",
  "upload-radius",
  "upload-dragger-radius",
  "upload-progress-track",
  "upload-progress-fill",
  "upload-card-size",
  "upload-avatar-size",
] as const;
