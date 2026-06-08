import type { CSSProperties, ReactNode } from "react";

export type StepStatus = "wait" | "process" | "finish" | "error" | "warning";

export type StepsDirection = "horizontal" | "vertical";

export type StepsSize = "small" | "middle" | "large";

export interface StepItem {
  title?: ReactNode;
  description?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  status?: StepStatus;
  disabled?: boolean;
}

export interface StepsProps {
  /** 当前步骤索引，从 0 开始 */
  current?: number;
  /** 当前步骤状态，如 error */
  status?: StepStatus;
  direction?: StepsDirection;
  size?: StepsSize;
  items?: StepItem[];
  onChange?: (current: number) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface StepProps {
  title?: ReactNode;
  description?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  status?: StepStatus;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export type InspectionStepsProps = Omit<StepsProps, "items"> & {
  current?: number;
};

export type RectificationStepsProps = Omit<StepsProps, "items">;
export type StoreSetupStepsProps = Omit<StepsProps, "items">;
export type ReportGenerateStepsProps = Omit<StepsProps, "items">;
