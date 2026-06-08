import type { CheckboxShowcaseState } from "@yd-ds/ui/checkbox";
import type { CheckboxSizeKey } from "@yd-ds/tokens";

export const CHECKBOX_INTRO =
  "Checkbox（复选框）组件允许用户独立选择一个或多个选项。它适用于多选列表、启用与禁用设置、筛选条件等场景。";

export const CHECKBOX_STATE_LABELS: {
  state: CheckboxShowcaseState;
  label: string;
}[] = [
  { state: "default", label: "未选中" },
  { state: "hover", label: "Hover" },
  { state: "checked", label: "已选中" },
  { state: "indeterminate", label: "半选中" },
  { state: "disabled", label: "禁用未选中" },
  { state: "disabled-checked", label: "禁用已选中" },
];

export const CHECKBOX_SIZE_LABELS: { size: CheckboxSizeKey; label: string }[] = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
];

export const CHECKBOX_CODE_EXAMPLE = `import { Checkbox } from "@yd-ds/ui/checkbox";

<Checkbox>选项一</Checkbox>

<Checkbox defaultChecked>已选中</Checkbox>

<Checkbox.Group defaultValue={["2"]}>
  <Checkbox value="1">选项一</Checkbox>
  <Checkbox value="2">选项二</Checkbox>
  <Checkbox value="3">选项三</Checkbox>
</Checkbox.Group>`;
