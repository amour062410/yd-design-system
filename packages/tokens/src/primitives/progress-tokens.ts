import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";

export const progressTokens = {
  "progress-track": neutralGray[3],
  "progress-fill-good": brandPrimary[6],
  "progress-fill-warning": functionalColors.warning,
  "progress-fill-danger": functionalColors.danger,
  "progress-fill-success": functionalColors.success,
  "progress-radius-line": radius.full,
  "progress-height-small": "4px",
  "progress-height-regular": "6px",
  "progress-height-large": "8px",
  "progress-circle-small": "40px",
  "progress-circle-regular": "56px",
  "progress-circle-large": "72px",
  "progress-stroke-small": "4px",
  "progress-stroke-regular": "6px",
  "progress-stroke-large": "8px",
  "progress-text-default": "rgba(0,0,0,0.65)",
  "progress-trend-up": functionalColors.success,
  "progress-trend-down": functionalColors.danger,
  "progress-animation-duration": "200ms",
} as const;

export type ProgressTokenKey = keyof typeof progressTokens;

export const progressSizeSpecs = {
  small: {
    lineHeight: progressTokens["progress-height-small"],
    circleSize: progressTokens["progress-circle-small"],
    strokeWidth: progressTokens["progress-stroke-small"],
    fontSize: "12px",
  },
  regular: {
    lineHeight: progressTokens["progress-height-regular"],
    circleSize: progressTokens["progress-circle-regular"],
    strokeWidth: progressTokens["progress-stroke-regular"],
    fontSize: "13px",
  },
  large: {
    lineHeight: progressTokens["progress-height-large"],
    circleSize: progressTokens["progress-circle-large"],
    strokeWidth: progressTokens["progress-stroke-large"],
    fontSize: "14px",
  },
} as const;

export type ProgressSizeKey = keyof typeof progressSizeSpecs;
