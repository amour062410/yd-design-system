import type { SwitchShowcaseState, SwitchVariant } from "@yd-ds/ui/switch";
import { switchSizeSpecs, type SwitchSizeKey } from "@yd-ds/tokens";

export const SWITCH_INTRO =
  "Switch（开关）用于在两种状态之间进行切换。适用于设置项、功能开关、权限控制等场景。";

export const SWITCH_STATE_LABELS: {
  state: SwitchShowcaseState;
  label: string;
}[] = [
  { state: "off", label: "Off" },
  { state: "hover-off", label: "Hover Off" },
  { state: "on", label: "On" },
  { state: "hover-on", label: "Hover On" },
  { state: "disabled-off", label: "Disabled Off" },
  { state: "disabled-on", label: "Disabled On" },
];

export const SWITCH_SIZE_LABELS: {
  size: SwitchSizeKey;
  label: string;
  height: string;
}[] = [
  { size: "sm", label: "Small", height: switchSizeSpecs.sm.height },
  { size: "md", label: "Medium", height: switchSizeSpecs.md.height },
  { size: "lg", label: "Large", height: switchSizeSpecs.lg.height },
];

export const SWITCH_LABEL_EXAMPLES = [
  { label: "开启通知", checked: true },
  { label: "关闭通知", checked: false },
  { label: "开启自动保存", checked: true },
  { label: "关闭自动保存", checked: false },
] as const;

export const SWITCH_VARIANT_ROWS: {
  state: SwitchShowcaseState;
  label: string;
}[] = [
  { state: "off", label: "Off" },
  { state: "hover-off", label: "Hover Off" },
  { state: "on", label: "On" },
];

export const SWITCH_VARIANT_COLUMNS: {
  variant: SwitchVariant;
  label: string;
}[] = [
  { variant: "icon", label: "图标型" },
  { variant: "text", label: "文字型" },
  { variant: "compact", label: "紧凑型" },
  { variant: "block", label: "块型" },
];

export const SWITCH_CODE_EXAMPLE = `import { Switch } from "@yd-ds/ui/switch";

<Switch />

<Switch defaultChecked />

<Switch disabled />

<Switch variant="icon" defaultChecked />

<Switch variant="text">功能开关</Switch>`;
