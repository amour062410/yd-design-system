import type { ApiTableRow } from "@/components/docs/api-table";

export const INPUT_NUMBER_INTRO =
  "InputNumber（数字输入框） 组件用于在表单中输入数值，支持步进按钮、精度控制、范围限制、格式化显示等能力。常用于巡检评分、整改时限、设备数量等业务场景。";

export const INPUT_NUMBER_WHEN_TO_USE = [
  "巡检评分、告警阈值等需要 min/max 约束的配置项",
  "整改时限、设备数量、营业时长等带单位的数值录入",
  "需要步进按钮或键盘 ↑/↓ 快速调整的表单字段",
  "与 Form 组合构建巡检规则、门店参数等后台配置页",
];

export const INPUT_NUMBER_CODE_EXAMPLE = `import { InspectionScoreInput, AlertThresholdInput } from "@yd-ds/ui/input-number";

<InspectionScoreInput value={score} onChange={setScore} />
<AlertThresholdInput value={threshold} onChange={setThreshold} />`;

export const INPUT_NUMBER_DEMO_CODES = {
  basic: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber defaultValue={92} />`,
  sizes: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber size="small" defaultValue={92} />
<InputNumber size="default" defaultValue={92} />
<InputNumber size="large" defaultValue={92} />`,
  disabled: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber defaultValue={92} disabled />`,
  status: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber defaultValue={92} status="error" />
<InputNumber defaultValue={92} status="warning" />`,
  minMax: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber defaultValue={7} min={1} max={30} step={1} unit="天" />`,
  precision: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber defaultValue={85.5} min={0} max={100} step={0.1} precision={1} />`,
  formatter: `import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber
  defaultValue={12800}
  formatter={(v) => \`\${v}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}
  parser={(v) => Number(String(v).replace(/,/g, ""))}
/>`,
  withUnit: `import {
  InspectionScoreInput,
  RectificationDeadlineInput,
  DeviceCountInput,
  BusinessHoursInput,
} from "@yd-ds/ui/input-number";

<InspectionScoreInput defaultValue={92} />
<RectificationDeadlineInput defaultValue={7} />
<DeviceCountInput defaultValue={35} />
<BusinessHoursInput defaultValue={24} />`,
};

export const INPUT_NUMBER_SIZE_SPECS = [
  { size: "small", height: "28px", fontSize: "13px", control: "24 × 28px" },
  { size: "default", height: "32px", fontSize: "14px", control: "28 × 32px" },
  { size: "large", height: "36px", fontSize: "16px", control: "32 × 36px" },
];

export const INPUT_NUMBER_API_ROWS: ApiTableRow[] = [
  { prop: "value", description: "受控值", type: "number | null", default: "-" },
  { prop: "defaultValue", description: "非受控默认值", type: "number", default: "-" },
  { prop: "min / max", description: "最小/最大值", type: "number", default: "-" },
  { prop: "step", description: "步长", type: "number", default: "1" },
  { prop: "precision", description: "小数精度", type: "number", default: "-" },
  { prop: "disabled / readOnly", description: "禁用/只读", type: "boolean", default: "false" },
  { prop: "status", description: "校验态", type: "'error' | 'warning'", default: "-" },
  { prop: "size", description: "尺寸", type: "'small' | 'default' | 'large'", default: "'default'" },
  { prop: "prefix / suffix", description: "前缀/后缀", type: "ReactNode", default: "-" },
  { prop: "unit", description: "单位文字", type: "string", default: "-" },
  { prop: "controls", description: "步进按钮", type: "boolean", default: "true" },
  { prop: "formatter / parser", description: "格式化/解析", type: "function", default: "-" },
  { prop: "onChange", description: "值变化回调", type: "(value: number | null) => void", default: "-" },
];

export const INPUT_NUMBER_BUSINESS_API_ROWS: ApiTableRow[] = [
  { prop: "InspectionScoreInput", description: "巡检评分 0–100，单位「分」", type: "Component", default: "-" },
  { prop: "RectificationDeadlineInput", description: "整改时限 1–30 天", type: "Component", default: "-" },
  { prop: "AlertThresholdInput", description: "告警阈值 0–100，precision=1", type: "Component", default: "-" },
  { prop: "DeviceCountInput", description: "设备数量，min=0，单位「台」", type: "Component", default: "-" },
  { prop: "BusinessHoursInput", description: "营业时长 0–24，步长 0.5", type: "Component", default: "-" },
];

export const INPUT_NUMBER_TOKEN_ROWS = [
  { token: "inputNumberBorderDefault", cssVar: "--input-number-border-default", description: "默认边框 (#D9D9D9)" },
  { token: "inputNumberBorderFocus", cssVar: "--input-number-border-focus", description: "聚焦边框 (#165DFF)" },
  { token: "inputNumberBorderError", cssVar: "--input-number-border-error", description: "错误边框 (#FF4D4F)" },
  { token: "inputNumberRadius", cssVar: "--input-number-radius", description: "圆角 8px" },
  { token: "inputNumberHeightMd", cssVar: "--input-number-height-md", description: "默认高度 32px" },
  { token: "inputNumberControlBgHover", cssVar: "--input-number-control-bg-hover", description: "步进按钮 Hover (#F5F5F5)" },
];

export const INSPECTION_RULE_PRESETS = [
  { label: "标准巡店", value: "standard", passScore: 85, threshold: 80, deadline: 7 },
  { label: "重点门店", value: "key", passScore: 90, threshold: 85, deadline: 5 },
  { label: "新开店", value: "new", passScore: 80, threshold: 75, deadline: 10 },
];

export const INSPECTION_LEVEL_OPTIONS = [
  { label: "全部等级", value: "all" },
  { label: "A 级", value: "A" },
  { label: "B 级", value: "B" },
  { label: "C 级", value: "C" },
];
