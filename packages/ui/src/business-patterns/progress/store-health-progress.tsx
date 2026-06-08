"use client";

import { cn } from "../../lib/utils";
import {
  resolveGradeStatus,
  resolveHealthGrade,
  resolveStatus,
} from "./business-progress-utils";
import { BusinessProgressShell } from "./business-progress-layout";
import type {
  BusinessProgressBaseProps,
  StoreHealthGrade,
} from "../../components/progress/progress.types";

const GRADE_STYLES: Record<StoreHealthGrade, { color: string; bg: string }> = {
  A: { color: "#00B42A", bg: "rgba(0, 180, 42, 0.1)" },
  B: { color: "#165DFF", bg: "rgba(22, 93, 255, 0.08)" },
  C: { color: "#FF7D00", bg: "rgba(255, 125, 0, 0.1)" },
  D: { color: "#F53F3F", bg: "rgba(245, 63, 63, 0.1)" },
};

export interface StoreHealthProgressProps extends Omit<BusinessProgressBaseProps, "percent"> {
  score: number;
  grade?: StoreHealthGrade;
  showGrade?: boolean;
  progressType?: "line" | "circle";
}

export function StoreHealthProgress({
  score,
  grade: gradeProp,
  status,
  autoStatus = false,
  trend,
  variant = "default",
  size = "regular",
  showGrade = true,
  progressType = "circle",
  className,
}: StoreHealthProgressProps) {
  const grade = gradeProp ?? resolveHealthGrade(score);
  const percent = Math.min(100, Math.max(0, score));
  const resolvedStatus = status ?? (autoStatus ? resolveGradeStatus(grade) : resolveGradeStatus(grade));
  const gradeStyle = GRADE_STYLES[grade];

  const extra = showGrade ? (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-[6px] px-2 py-0.5 text-xs font-semibold"
      )}
      style={{ backgroundColor: gradeStyle.bg, color: gradeStyle.color }}
    >
      {grade}
    </span>
  ) : null;

  return (
    <BusinessProgressShell
      title="门店健康度"
      percent={percent}
      status={resolvedStatus}
      trend={trend}
      variant={variant}
      size={size}
      progressType={progressType}
      extra={extra}
      footer={`综合评级 ${grade} · 基于巡检得分与整改闭环`}
      className={className}
    />
  );
}
