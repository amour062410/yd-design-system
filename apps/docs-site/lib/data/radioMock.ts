import type { RadioSizeKey } from "@yd-ds/tokens";
import type { RadioButtonStyle, RadioShowcaseState } from "@yd-ds/ui/radio";

export const RADIO_USAGE_TEXT =
  "Radio（单选框）组件允许用户从一组选项中选择一个选项。它用于只允许单选的场景，支持分组、按钮样式和禁用状态，实现受控的交互体验。";

export const RADIO_STATE_LABELS: { state: RadioShowcaseState; label: string }[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "selected", label: "Selected" },
  { state: "disabled", label: "Disabled" },
  { state: "disabled-selected", label: "Disabled Selected" },
];

export const RADIO_SIZE_LABELS: { size: RadioSizeKey; label: string }[] = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
];

export const RADIO_BUTTON_STYLES: { style: RadioButtonStyle; label: string }[] = [
  { style: "outline", label: "描边按钮组" },
  { style: "solid", label: "填充按钮组" },
  { style: "segmented", label: "背景切换" },
];

export const RADIO_SIZE_SPECS = [
  {
    size: "small",
    control: "14px",
    fontSize: "12px",
    gap: "6px",
    buttonHeight: "32px",
    buttonRadius: "6px（组两端）",
  },
  {
    size: "medium",
    control: "16px",
    fontSize: "14px",
    gap: "8px",
    buttonHeight: "32px",
    buttonRadius: "6px（组两端）",
  },
  {
    size: "large",
    control: "18px",
    fontSize: "16px",
    gap: "10px",
    buttonHeight: "32px",
    buttonRadius: "6px（组两端）",
  },
];

export const RADIO_API_PROPS = [
  {
    name: "value",
    type: "string",
    default: "—",
    desc: "Radio.Group 当前选中值（受控）",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "—",
    desc: "Radio.Group 默认选中值",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "—",
    desc: "选中项变化回调",
  },
  {
    name: "direction",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    desc: "圆形单选排列方向",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    desc: "圆形单选控件与文字尺寸",
  },
  {
    name: "optionType",
    type: "'default' | 'button'",
    default: "'default'",
    desc: "圆形单选或按钮样式",
  },
  {
    name: "buttonStyle",
    type: "'outline' | 'solid' | 'segmented'",
    default: "'outline'",
    desc: "按钮组视觉：描边 / 填充 / 分段背景",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    desc: "禁用整组或单项",
  },
  {
    name: "options",
    type: "RadioOption[]",
    default: "—",
    desc: "数据驱动配置项 label / value / disabled",
  },
];

export const RADIO_DO_ITEMS = [
  "互斥选项使用 Radio.Group 统一管理选中态",
  "选项 2～5 个时优先横向排列，超出可换行或改为纵向",
  "语义相近的筛选条件使用按钮样式组，提升可点区域",
  "禁用项需同时弱化控件与文案，并保持选中态可识别",
];

export const RADIO_DONT_ITEMS = [
  "不要用多个独立 checkbox 模拟单选",
  "不要在同一组内允许零选中或多选中",
  "不要混用不同 buttonStyle 于同一业务场景",
  "不要在仅两个选项时仍使用超过一屏宽的分段组",
];

export const RADIO_CODE_EXAMPLE = `import { Radio, RadioGroup } from "@yd-ds/ui/radio";

<Radio value="a">Option</Radio>

<RadioGroup defaultValue="a">
  <Radio value="a">Selected</Radio>
</RadioGroup>

<RadioGroup defaultValue="1">
  <Radio value="1">Option 1</Radio>
  <Radio value="2">Option 2</Radio>
</RadioGroup>`;

export const RADIO_USAGE_TOKEN_NAMES = [
  "radio-border-default",
  "radio-border-selected",
  "radio-bg-selected",
  "radio-disabled",
  "radio-size-sm",
  "radio-size-md",
  "radio-size-lg",
] as const;
