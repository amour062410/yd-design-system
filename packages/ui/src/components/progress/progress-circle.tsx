"use client";

import { progressSizeSpecs } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { clampPercent, PROGRESS_STATUS_FILL, PROGRESS_STATUS_TEXT } from "./progress-styles";
import type { ProgressCircleProps } from "./progress.types";

export function ProgressCircle({
  percent,
  status = "good",
  size = "regular",
  showInfo = true,
  className,
}: ProgressCircleProps) {
  const spec = progressSizeSpecs[size];
  const value = clampPercent(percent);
  const dim = parseInt(spec.circleSize, 10);
  const stroke = parseInt(spec.strokeWidth, 10);
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: spec.circleSize, height: spec.circleSize }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="var(--progress-track, #F2F3F5)"
          strokeWidth={stroke}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke={PROGRESS_STATUS_FILL[status]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-200 ease-out"
        />
      </svg>
      {showInfo ? (
        <span
          className="absolute inset-0 flex items-center justify-center tabular-nums font-semibold"
          style={{
            fontSize: spec.fontSize,
            color: PROGRESS_STATUS_TEXT[status],
          }}
        >
          {value}%
        </span>
      ) : null}
    </div>
  );
}
