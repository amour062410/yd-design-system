"use client";

import { progressSizeSpecs } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { clampPercent, PROGRESS_STATUS_FILL } from "./progress-styles";
import type { ProgressLineProps } from "./progress.types";

/** 基础线性进度条 — 供 Business Progress 组合，不对文档页暴露重构 */
export function ProgressLine({
  percent,
  status = "good",
  size = "regular",
  showInfo = false,
  showTrack = true,
  className,
}: ProgressLineProps) {
  const spec = progressSizeSpecs[size];
  const value = clampPercent(percent);

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <div
        className="min-w-0 flex-1 overflow-hidden rounded-full"
        style={{
          height: spec.lineHeight,
          backgroundColor: showTrack
            ? "var(--progress-track, #F2F3F5)"
            : "transparent",
        }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-200 ease-out"
          style={{
            width: `${value}%`,
            backgroundColor: PROGRESS_STATUS_FILL[status],
          }}
        />
      </div>
      {showInfo ? (
        <span
          className="shrink-0 tabular-nums font-medium"
          style={{ fontSize: spec.fontSize, color: PROGRESS_STATUS_FILL[status] }}
        >
          {value}%
        </span>
      ) : null}
    </div>
  );
}
