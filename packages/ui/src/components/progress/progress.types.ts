import type { ReactNode } from "react";
import type { ProgressSizeKey } from "@yd-ds/tokens";

export type ProgressSize = ProgressSizeKey;

export type ProgressStatus = "good" | "warning" | "danger";

export interface ProgressLineProps {
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
  showInfo?: boolean;
  showTrack?: boolean;
  className?: string;
}

export interface ProgressCircleProps {
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
  showInfo?: boolean;
  className?: string;
}

export type SegmentedStepStatus = "wait" | "process" | "finish" | "error";

export interface ProgressSegmentedProps {
  steps: { label: string; status: SegmentedStepStatus }[];
  size?: ProgressSize;
  className?: string;
}

export type BusinessProgressVariant = "default" | "card";

export interface BusinessProgressTrend {
  /** 较上周 / 较昨日 / 同比 */
  label: string;
  value: number;
  direction: "up" | "down";
}

export interface BusinessProgressBaseProps {
  /** 可省略，由数量字段自动计算 */
  percent?: number;
  /** 业务主动指定；优先于 autoStatus */
  status?: ProgressStatus;
  /** 未传 status 时是否按 percent 推导，默认 false */
  autoStatus?: boolean;
  trend?: BusinessProgressTrend;
  variant?: BusinessProgressVariant;
  size?: ProgressSize;
  className?: string;
}

export type StoreHealthGrade = "A" | "B" | "C" | "D";

export type InspectionStage =
  | "created"
  | "dispatched"
  | "executing"
  | "rectifying"
  | "completed";

export interface BusinessProgressShellProps {
  title: string;
  percent: number;
  status: ProgressStatus;
  trend?: BusinessProgressTrend;
  variant?: BusinessProgressVariant;
  size?: ProgressSize;
  footer?: ReactNode;
  progressType?: "line" | "circle";
  extra?: ReactNode;
  className?: string;
}
