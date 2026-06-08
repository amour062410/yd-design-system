import type { ProgressStatus } from "./progress.types";

export const PROGRESS_STATUS_FILL: Record<ProgressStatus, string> = {
  good: "var(--progress-fill-good, #165DFF)",
  warning: "var(--progress-fill-warning, #FF7D00)",
  danger: "var(--progress-fill-danger, #F53F3F)",
};

export const PROGRESS_STATUS_TEXT: Record<ProgressStatus, string> = {
  good: "var(--progress-fill-good, #165DFF)",
  warning: "var(--progress-fill-warning, #FF7D00)",
  danger: "var(--progress-fill-danger, #F53F3F)",
};

export function clampPercent(percent: number) {
  return Math.min(100, Math.max(0, percent));
}
