export const BUSINESS_PROGRESS_INTRO =
  "巡检业务进度组件（Business Progress Pack）基于 YD 基础 Progress 组合，面向云盯驾驶舱与风险管理场景。支持 trend 趋势、status 业务指定、variant=card 标准卡片。";

export const RECTIFICATION_CODE = `import { RectificationProgress } from "@yd-ds/ui/business-progress";

<RectificationProgress
  rectifiedCount={41}
  pendingCount={9}
  status="warning"
  trend={{ label: "较上周", value: 12, direction: "up" }}
  variant="card"
/>`;

export const STORE_HEALTH_CODE = `import { StoreHealthProgress } from "@yd-ds/ui/business-progress";

<StoreHealthProgress
  score={75}
  status="warning"
  grade="C"
  trend={{ label: "较昨日", value: 3, direction: "down" }}
  variant="card"
/>`;

export const COVERAGE_CODE = `import { InspectionCoverageProgress } from "@yd-ds/ui/business-progress";

<InspectionCoverageProgress
  inspectedCount={43}
  uninspectedCount={7}
  trend={{ label: "同比", value: 8, direction: "up" }}
  variant="card"
/>`;

export const RISK_CODE = `import { RiskHandlingProgress } from "@yd-ds/ui/business-progress";

<RiskHandlingProgress
  highRiskCount={12}
  inProgressCount={5}
  pendingCount={7}
  percent={40}
  status="danger"
  variant="card"
/>`;

export const STAGE_CODE = `import { InspectionStageProgress } from "@yd-ds/ui/business-progress";

<InspectionStageProgress currentStage="rectifying" variant="card" />`;
