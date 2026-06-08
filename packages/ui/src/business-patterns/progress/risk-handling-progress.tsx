"use client";

import {
  calcPercent,
  resolveStatus,
} from "./business-progress-utils";
import { BusinessProgressShell } from "./business-progress-layout";
import type { BusinessProgressBaseProps } from "../../components/progress/progress.types";

export interface RiskHandlingProgressProps extends BusinessProgressBaseProps {
  highRiskCount: number;
  inProgressCount: number;
  pendingCount: number;
  handledCount?: number;
  showStats?: boolean;
}

export function RiskHandlingProgress({
  highRiskCount,
  inProgressCount,
  pendingCount,
  handledCount,
  percent: percentProp,
  status,
  autoStatus = false,
  trend,
  variant = "default",
  size = "regular",
  showStats = true,
  className,
}: RiskHandlingProgressProps) {
  const handled =
    handledCount ?? Math.max(0, highRiskCount - inProgressCount - pendingCount);
  const percent = percentProp ?? calcPercent(handled, highRiskCount);
  const resolvedStatus = resolveStatus(percent, status, autoStatus);

  const footer = showStats
    ? `高风险 ${highRiskCount} · 处理中 ${inProgressCount} · 待处理 ${pendingCount}`
    : undefined;

  return (
    <BusinessProgressShell
      title="风险处理率"
      percent={percent}
      status={resolvedStatus}
      trend={trend}
      variant={variant}
      size={size}
      footer={footer}
      className={className}
    />
  );
}
