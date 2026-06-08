"use client";

import { cn } from "../../lib/utils";
import { ProgressSegmented } from "../../components/progress/progress-segmented";
import { deriveStageSteps } from "./business-progress-utils";
import type { BusinessProgressVariant, InspectionStage, ProgressSize } from "../../components/progress/progress.types";

export interface InspectionStageProgressProps {
  currentStage: InspectionStage;
  variant?: BusinessProgressVariant;
  size?: ProgressSize;
  className?: string;
}

export function InspectionStageProgress({
  currentStage,
  variant = "default",
  size = "regular",
  className,
}: InspectionStageProgressProps) {
  const steps = deriveStageSteps(currentStage);

  const content = (
    <>
      <p className="mb-3 text-sm font-medium text-[color:var(--color-text-secondary,rgba(0,0,0,0.65))]">
        巡检流程进度
      </p>
      <ProgressSegmented steps={steps} size={size} />
    </>
  );

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-[8px] border border-[rgba(22,93,255,0.2)] bg-[rgba(22,93,255,0.04)] p-4 shadow-sm",
          className
        )}
      >
        {content}
      </div>
    );
  }

  return <div className={cn("min-w-[280px]", className)}>{content}</div>;
}
