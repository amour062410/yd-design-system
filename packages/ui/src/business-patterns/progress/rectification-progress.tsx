"use client";

import {
  calcPercent,
  resolveStatus,
} from "./business-progress-utils";
import { BusinessProgressShell } from "./business-progress-layout";
import type { BusinessProgressBaseProps } from "../../components/progress/progress.types";

export interface RectificationProgressProps extends BusinessProgressBaseProps {
  rectifiedCount?: number;
  pendingCount?: number;
  showStats?: boolean;
  unit?: string;
}

export function RectificationProgress({
  rectifiedCount = 0,
  pendingCount = 0,
  percent: percentProp,
  status,
  autoStatus = false,
  trend,
  variant = "default",
  size = "small",
  showStats = true,
  unit = "项",
  className,
}: RectificationProgressProps) {
  const total = rectifiedCount + pendingCount;
  const percent =
    percentProp ?? (total > 0 ? calcPercent(rectifiedCount, total) : 0);
  const resolvedStatus = resolveStatus(percent, status, autoStatus);

  const footer =
    showStats && total > 0
      ? `已整改 ${rectifiedCount} ${unit} · 待整改 ${pendingCount} ${unit}`
      : undefined;

  return (
    <BusinessProgressShell
      title="整改完成率"
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
