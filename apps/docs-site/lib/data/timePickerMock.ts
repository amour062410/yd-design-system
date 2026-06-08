import type { TimePickerShowcaseState } from "@yd-ds/ui/time-picker";
import {
  timePickerSizeSpecs,
  timePickerUsageTokenNames,
  type TimePickerSizeKey,
} from "@yd-ds/tokens";

export const TIME_PICKER_INTRO =
  "TimePicker 用于在表单、筛选栏、排班配置等场景中选择时间点或时间范围。支持时/分/秒精度、范围选择与清空；输入框规格与 DatePicker 对齐（圆角 6px），适用于企业级中后台场景。";

export const TIME_PICKER_STATE_LABELS: {
  state: TimePickerShowcaseState;
  label: string;
}[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "focus", label: "Focus" },
  { state: "selected", label: "Selected" },
  { state: "disabled", label: "Disabled" },
];

export const TIME_PICKER_TYPE_LABELS = [
  { key: "single", label: "Single Time", description: "单时间点选择，HH:mm" },
  {
    key: "single-second",
    label: "With Seconds",
    description: "精确到秒，HH:mm:ss",
  },
  { key: "range", label: "Time Range", description: "开始 → 结束时间范围" },
  {
    key: "range-second",
    label: "Range + Seconds",
    description: "范围选择，含秒级精度",
  },
] as const;

export const TIME_PICKER_SIZE_LABELS: {
  size: TimePickerSizeKey;
  label: string;
  height: string;
}[] = [
  { size: "sm", label: "Small", height: timePickerSizeSpecs.sm.height },
  { size: "md", label: "Medium", height: timePickerSizeSpecs.md.height },
  { size: "lg", label: "Large", height: timePickerSizeSpecs.lg.height },
];

export const TIME_PICKER_SIZE_SPECS_TABLE = [
  {
    size: "sm",
    height: "24px",
    fontSize: "12px",
    padding: "0 10px",
    icon: "14px",
    radius: "6px",
  },
  {
    size: "md",
    height: "32px",
    fontSize: "14px",
    padding: "0 12px",
    icon: "16px",
    radius: "6px",
  },
  {
    size: "lg",
    height: "40px",
    fontSize: "14px",
    padding: "0 14px",
    icon: "16px",
    radius: "6px",
  },
];

export const TIME_PICKER_CODE_EXAMPLE = `import { TimePicker } from "@yd-ds/ui/time-picker";

<TimePicker placeholder="请选择时间" allowClear />

<TimePicker showSecond placeholder="请选择时间" />

<TimePicker
  range
  placeholder={["开始时间", "结束时间"]}
/>`;

export { timePickerUsageTokenNames as TIME_PICKER_USAGE_TOKEN_NAMES };
