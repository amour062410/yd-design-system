import type { DatePickerShowcaseState } from "@yd-ds/ui/date-picker";
import {
  datePickerSizeSpecs,
  datePickerUsageTokenNames,
  type DatePickerSizeKey,
} from "@yd-ds/tokens";

export const DATE_PICKER_INTRO =
  "DatePicker 用于在表单、筛选栏、配置面板中选择日期或日期范围。支持日、月、年、季度及日期时间模式，可配置快捷筛选、清空与键盘导航；线框输入框统一圆角 6px，适用于企业级中后台高密度信息场景。";

export const DATE_PICKER_STATE_LABELS: {
  state: DatePickerShowcaseState;
  label: string;
}[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "focus", label: "Focus" },
  { state: "selected", label: "Selected" },
  { state: "disabled", label: "Disabled" },
];

export const DATE_PICKER_TYPE_LABELS = [
  { key: "date", label: "选择日", description: "单日历面板，支持「今天」快捷操作" },
  { key: "range", label: "日期范围", description: "双月历范围选择" },
  {
    key: "range-shortcuts",
    label: "范围 + 快捷筛选",
    description: "左侧快捷项：昨天、上周、过去7天等",
  },
  { key: "month", label: "选择月", description: "12 个月份网格" },
  { key: "year", label: "选择年", description: "年份分页选择" },
  { key: "quarter", label: "选择季度", description: "Q1–Q4 季度选择" },
  { key: "datetime", label: "日期时间", description: "日期 + 时分秒" },
] as const;

export const DATE_PICKER_SIZE_LABELS: {
  size: DatePickerSizeKey;
  label: string;
  height: string;
}[] = [
  { size: "sm", label: "Small", height: datePickerSizeSpecs.sm.height },
  { size: "md", label: "Medium", height: datePickerSizeSpecs.md.height },
  { size: "lg", label: "Large", height: datePickerSizeSpecs.lg.height },
];

export const DATE_PICKER_SIZE_SPECS_TABLE = [
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

export const DATE_PICKER_CODE_EXAMPLE = `import { DatePicker } from "@yd-ds/ui/date-picker";

<DatePicker placeholder="请选择日期" allowClear />

<DatePicker
  range
  shortcuts
  placeholder={["开始日期", "结束日期"]}
/>

<DatePicker mode="month" placeholder="请选择月份" />`;

export { datePickerUsageTokenNames as DATE_PICKER_USAGE_TOKEN_NAMES };
