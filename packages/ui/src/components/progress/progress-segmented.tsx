"use client";

import { Check, X } from "lucide-react";
import { progressSizeSpecs } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { PROGRESS_STATUS_FILL } from "./progress-styles";
import type { ProgressSegmentedProps, SegmentedStepStatus } from "./progress.types";

const SEGMENT_COLORS: Record<SegmentedStepStatus, string> = {
  wait: "var(--progress-track, #F2F3F5)",
  process: PROGRESS_STATUS_FILL.good,
  finish: "var(--progress-fill-success, #00B42A)",
  error: PROGRESS_STATUS_FILL.danger,
};

export function ProgressSegmented({
  steps,
  size = "regular",
  className,
}: ProgressSegmentedProps) {
  const spec = progressSizeSpecs[size];
  const blockHeight =
    size === "small" ? "6px" : size === "large" ? "10px" : "8px";

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex min-w-0 flex-1 items-center gap-1">
            <div
              className={cn(
                "flex-1 rounded-sm transition-colors",
                step.status === "process" && "animate-pulse"
              )}
              style={{
                height: blockHeight,
                backgroundColor: SEGMENT_COLORS[step.status],
              }}
            />
            {i < steps.length - 1 ? (
              <span
                className="shrink-0 text-muted-foreground/40"
                style={{ fontSize: spec.fontSize }}
              >
                ›
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-1">
        {steps.map((step) => (
          <span
            key={`label-${step.label}`}
            className={cn(
              "min-w-0 flex-1 text-center",
              step.status === "process"
                ? "font-medium text-[color:var(--progress-fill-good,#165DFF)]"
                : "text-[color:var(--progress-text-default,rgba(0,0,0,0.45))]"
            )}
            style={{ fontSize: `calc(${spec.fontSize} - 1px)` }}
          >
            {step.label}
            {step.status === "finish" ? (
              <Check className="ml-0.5 inline size-3 text-[#00B42A]" />
            ) : null}
            {step.status === "error" ? (
              <X className="ml-0.5 inline size-3 text-[#F53F3F]" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
