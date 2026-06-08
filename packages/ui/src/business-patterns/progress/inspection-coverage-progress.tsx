"use client";

import { calcPercent, resolveStatus } from "./business-progress-utils";
import { BusinessProgressShell } from "./business-progress-layout";
import type { BusinessProgressBaseProps } from "../../components/progress/progress.types";

export interface InspectionCoverageProgressProps extends BusinessProgressBaseProps {
  inspectedCount: number;
  uninspectedCount: number;
  showStats?: boolean;
  target?: number;
}

export function InspectionCoverageProgress({
  inspectedCount,
  uninspectedCount,
  percent: percentProp,
  status,
  autoStatus = false,
  trend,
  variant = "default",
  size = "regular",
  showStats = true,
  target = 90,
  className,
}: InspectionCoverageProgressProps) {
  const total = inspectedCount + uninspectedCount;
  const percent = percentProp ?? calcPercent(inspectedCount, total);
  const autoDerived =
    percent >= target ? "good" : percent >= target - 15 ? "warning" : "danger";
  const resolvedStatus = status ?? (autoStatus ? autoDerived : "good");

  const footer = showStats
    ? `已巡检 ${inspectedCount} 家 · 未巡检 ${uninspectedCount} 家`
    : undefined;

  return (
    <BusinessProgressShell
      title="巡检覆盖率"
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
