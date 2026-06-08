export const INPUT_USAGE_TEXT =
  "Input（输入框）组件用于在表单和搜索中输入或编辑文本。变体包括 Password（密码输入，支持可见性切换）、TextArea（多行文本，可选字数统计）、Search（集成搜索操作）以及 Addon（前后缀与按钮组合）。";

export const INPUT_SIZE_SPECS = [
  {
    size: "regular",
    height: "32px",
    fontSize: "14px",
    padding: "0 12px",
    radius: "6px",
  },
  {
    size: "large",
    height: "40px",
    fontSize: "14px",
    padding: "0 12px",
    radius: "6px",
  },
  {
    size: "small",
    height: "24px",
    fontSize: "12px",
    padding: "0 8px",
    radius: "6px",
  },
];

export const INPUT_STATE_LABELS = [
  { key: "default" as const, label: "默认" },
  { key: "hover" as const, label: "Hover" },
  { key: "focus" as const, label: "聚焦" },
  { key: "active" as const, label: "输入中" },
  { key: "disabled" as const, label: "禁用" },
];

export const INPUT_BASIC_EXTRA = [{ key: "clear" as const, label: "可清空" }];

export const INPUT_API_PROPS = [
  {
    name: "placeholder",
    type: "string",
    default: "-",
    desc: "占位提示文案",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    desc: "禁用态，灰底且不可交互",
  },
  {
    name: "allowClear",
    type: "boolean",
    default: "false",
    desc: "显示清空按钮",
  },
  {
    name: "maxLength",
    type: "number",
    default: "-",
    desc: "TextArea 最大字数",
  },
  {
    name: "showCount",
    type: "boolean",
    default: "true",
    desc: "TextArea 右下角字数统计",
  },
  {
    name: "variant",
    type: "'icon' | 'button-icon' | 'button-text'",
    default: "'icon'",
    desc: "Search 搜索框按钮形态",
  },
  {
    name: "filled",
    type: "boolean",
    default: "false",
    desc: "Search 浅灰填充背景样式",
  },
];

export const INPUT_DO_ITEMS = [
  "单行输入高度 Regular 32px，全局圆角 6px，与 DatePicker / Select 对齐。",
  "聚焦使用品牌色描边 + 轻量外发光（focus-ring），Hover 仅加深边框。",
  "密码框提供可见性切换；TextArea 字数统计置于右下角外侧视觉区。",
  "Search 支持图标、图标按钮、文字按钮三种操作区组合。",
];

export const INPUT_DONT_ITEMS = [
  "不要在禁用态仍保留可点击的清空或搜索按钮。",
  "避免在单行 Input 内放置过多 Addon 导致高度不一致。",
  "Search 填充样式与描边样式不要混用同一字段。",
  "TextArea 不要将字数统计叠在输入文字上方。",
];

export const INPUT_CODE_PREVIEW = `import { Input, PasswordInput, TextArea, SearchInput } from "@yd-ds/ui";

<Input placeholder="请输入" allowClear />
<PasswordInput placeholder="密码" />
<TextArea placeholder="文字请输入" maxLength={500} showCount />
<SearchInput variant="button-text" placeholder="请输入" />`;
