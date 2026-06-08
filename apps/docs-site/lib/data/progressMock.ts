export const PROGRESS_INTRO =
  "用于展示任务进度、完成比例与流程状态。支持线性、环形、分段三种形态，以及良好 / 警告 / 危险三种语义色。";

export const PROGRESS_CODE_EXAMPLE = `import { ProgressLine, ProgressCircle, ProgressSegmented } from "@yd-ds/ui/progress";

<ProgressLine percent={40} status="good" size="regular" showInfo />
<ProgressCircle percent={75} status="warning" size="regular" showInfo />
<ProgressSegmented
  steps={[
    { label: "创建", status: "finish" },
    { label: "执行", status: "process" },
    { label: "完成", status: "wait" },
  ]}
/>`;
