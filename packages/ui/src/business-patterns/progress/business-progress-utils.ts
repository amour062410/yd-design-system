import type {
  InspectionStage,
  ProgressStatus,
  SegmentedStepStatus,
  StoreHealthGrade,
} from "../../components/progress/progress.types";

export function calcPercent(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

/** 仅 autoStatus 回退使用 */
export function resolveRateStatus(percent: number): ProgressStatus {
  if (percent >= 90) return "good";
  if (percent >= 60) return "warning";
  return "danger";
}

export function resolveHealthGrade(score: number): StoreHealthGrade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 60) return "C";
  return "D";
}

export function resolveGradeStatus(grade: StoreHealthGrade): ProgressStatus {
  if (grade === "A" || grade === "B") return "good";
  if (grade === "C") return "warning";
  return "danger";
}

export function resolveStatus(
  percent: number,
  status?: ProgressStatus,
  autoStatus?: boolean
): ProgressStatus {
  if (status) return status;
  if (autoStatus) return resolveRateStatus(percent);
  return "good";
}

const STAGE_ORDER: InspectionStage[] = [
  "created",
  "dispatched",
  "executing",
  "rectifying",
  "completed",
];

const STAGE_LABELS: Record<InspectionStage, string> = {
  created: "创建",
  dispatched: "派发",
  executing: "执行",
  rectifying: "整改",
  completed: "完成",
};

export function deriveStageSteps(currentStage: InspectionStage) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return STAGE_ORDER.map((stage, index) => {
    let status: SegmentedStepStatus = "wait";
    if (index < currentIndex) status = "finish";
    else if (index === currentIndex) status = "process";

    return { label: STAGE_LABELS[stage], status };
  });
}
