import type { SelectShowcaseState } from "@yd-ds/ui/select";
import { selectSizeSpecs, selectUsageTokenNames, type SelectSizeKey } from "@yd-ds/tokens";

export const SELECT_INTRO =
  "Select（下拉选择）组件允许用户从下拉列表中选择单个或多个选项。它支持搜索、标签和自定义渲染，广泛适用于表单、筛选器和数据驱动的选择场景，提供清晰一致的交互体验。";

export const SELECT_STATE_LABELS: {
  state: SelectShowcaseState;
  label: string;
  open?: boolean;
}[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "focus", label: "Focus", open: true },
  { state: "disabled", label: "Disabled" },
  { state: "error", label: "Error" },
];

export const SELECT_TYPE_LABELS = [
  { key: "single", label: "Single Select", description: "单选，点击展开选项列表" },
  { key: "multiple", label: "Multiple Select", description: "多选标签，支持删除" },
  { key: "searchable", label: "Searchable Select", description: "面板内搜索过滤选项" },
  { key: "clearable", label: "Clearable Select", description: "已选时可一键清空" },
  { key: "grouped", label: "Grouped Options", description: "Option Group 分组展示" },
] as const;

export const SELECT_GROUPED_DEMO_OPTIONS = [
  {
    label: "华东",
    options: [
      { label: "上海", value: "sh" },
      { label: "杭州", value: "hz" },
      { label: "南京", value: "nj" },
    ],
  },
  {
    label: "华南",
    options: [
      { label: "广州", value: "gz" },
      { label: "深圳", value: "sz" },
    ],
  },
];

export const SELECT_SIZE_LABELS: {
  size: SelectSizeKey;
  label: string;
  height: string;
}[] = [
  { size: "sm", label: "Small", height: selectSizeSpecs.sm.height },
  { size: "md", label: "Medium", height: selectSizeSpecs.md.height },
  { size: "lg", label: "Large", height: selectSizeSpecs.lg.height },
];

export const SELECT_MULTI_DEMO_OPTIONS = [
  "四个字符",
  "三个字符",
  "请选择1",
  "请选择2",
  "请选择3",
];

export const SELECT_CODE_EXAMPLE = `import { Select } from "@yd-ds/ui/select";

<Select
  options={[
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ]}
  placeholder="请选择"
/>

<Select mode="multiple" options={["A", "B", "C"]} />

<Select showSearch allowClear />

<Select
  showSearch
  allowClear
  options={[
    { label: "华东", options: [{ label: "上海", value: "sh" }] },
    { label: "华南", options: [{ label: "深圳", value: "sz" }] },
  ]}
/>`;

export { selectUsageTokenNames as SELECT_USAGE_TOKEN_NAMES };
