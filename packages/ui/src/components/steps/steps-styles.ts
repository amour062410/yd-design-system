import type { CSSProperties } from "react";
import type { StepStatus, StepsSize } from "./steps.types";

export function resolveStepStatus(
  index: number,
  current: number,
  itemStatus?: StepStatus,
  stepsStatus?: StepStatus
): StepStatus {
  if (itemStatus) return itemStatus;
  if (index < current) return "finish";
  if (index > current) return "wait";
  if (stepsStatus === "error") return "error";
  if (stepsStatus === "warning") return "warning";
  return "process";
}

export type StepVisualStatus = Exclude<StepStatus, "process" | "wait"> | "process" | "wait";

export const STEP_ICON_STYLES: Record<
  StepStatus,
  {
    border: string;
    bg: string;
    numberColor: string;
    iconColor: string;
    dotColor?: string;
  }
> = {
  finish: {
    border: "var(--steps-icon-border-finish, #1677ff)",
    bg: "var(--steps-icon-bg-finish, #1677ff)",
    numberColor: "#ffffff",
    iconColor: "var(--steps-icon-finish-icon-color, #ffffff)",
  },
  process: {
    border: "var(--steps-icon-border-process, #1677ff)",
    bg: "var(--steps-icon-bg-process, #ffffff)",
    numberColor: "var(--steps-icon-process-number-color, #1677ff)",
    iconColor: "var(--steps-icon-process-number-color, #1677ff)",
    dotColor: "var(--steps-icon-dot-process-color, #1677ff)",
  },
  wait: {
    border: "var(--steps-icon-border-wait, #c9cdd4)",
    bg: "var(--steps-icon-bg-wait, #ffffff)",
    numberColor: "var(--steps-icon-wait-number-color, #86909c)",
    iconColor: "var(--steps-icon-wait-number-color, #86909c)",
  },
  error: {
    border: "var(--steps-icon-border-error, #f53f3f)",
    bg: "var(--steps-icon-bg-error, #f53f3f)",
    numberColor: "#ffffff",
    iconColor: "var(--steps-icon-error-icon-color, #ffffff)",
  },
  warning: {
    border: "var(--steps-icon-border-warning, #ff7d00)",
    bg: "var(--steps-icon-bg-warning, #ff7d00)",
    numberColor: "#ffffff",
    iconColor: "var(--steps-icon-warning-icon-color, #ffffff)",
  },
};

export function getTailColor(status: StepStatus): string {
  if (status === "finish") return "var(--steps-tail-finish-color, #1677ff)";
  return "var(--steps-tail-wait-color, #e5e6eb)";
}

export function getTitleColor(status: StepStatus): string {
  if (status === "process") return "var(--steps-title-process-color, #1677ff)";
  if (status === "finish") return "var(--steps-title-finish-color, #1d2129)";
  if (status === "error") return "var(--steps-title-error-color, #f53f3f)";
  if (status === "warning")
    return "var(--steps-title-warning-color, #ff7d00)";
  return "var(--steps-title-wait-color, #86909c)";
}

export const descriptionStyle: CSSProperties = {
  color: "var(--steps-description-color, #86909c)",
};

export const subTitleStyle: CSSProperties = {
  color: "var(--steps-subtitle-color, #c9cdd4)",
};

export function getSizeSpec(size: StepsSize) {
  const map = {
    small: {
      icon: "var(--steps-icon-size-sm, 24px)",
      title: "var(--steps-title-font-size, 14px)",
      description: "var(--steps-description-font-size, 12px)",
    },
    middle: {
      icon: "var(--steps-icon-size-md, 32px)",
      title: "var(--steps-title-font-size, 14px)",
      description: "var(--steps-description-font-size, 12px)",
    },
    large: {
      icon: "var(--steps-icon-size-lg, 40px)",
      title: "var(--steps-title-font-size, 14px)",
      description: "var(--steps-description-font-size, 12px)",
    },
  } as const;
  return map[size];
}
