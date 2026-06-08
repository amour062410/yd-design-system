/**
 * Storybook CSF — install Storybook in monorepo to preview.
 * Scenes mirror docs/component-migration select showcase sections.
 */
import { useState } from "react";
import { Select, type SelectProps } from "./select";

export default {
  title: "YD Design System/Select",
  component: Select,
  parameters: { layout: "centered" },
};

const basicOptions = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
];

function ControlledSelect(props: Partial<SelectProps>) {
  const [value, setValue] = useState<string | string[]>(
    props.mode === "multiple" ? [] : ""
  );
  return (
    <Select
      options={basicOptions}
      placeholder="请选择"
      className="w-[280px]"
      {...props}
      value={value}
      onChange={setValue}
    />
  );
}

export const Basic = {
  render: () => <ControlledSelect />,
};

export const Multiple = {
  render: () => (
    <ControlledSelect
      mode="multiple"
      allowClear
      options={[
        { label: "北京", value: "bj" },
        { label: "上海", value: "sh" },
        { label: "广州", value: "gz" },
      ]}
    />
  ),
};

export const Searchable = {
  render: () => <ControlledSelect showSearch />,
};

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: "1",
    options: basicOptions,
  },
};

export const Clearable = {
  render: () => <ControlledSelect allowClear defaultValue="2" />,
};

export const GroupedOptions = {
  render: () => (
    <ControlledSelect
      showSearch
      allowClear
      options={[
        {
          label: "华东",
          options: [
            { label: "上海", value: "sh" },
            { label: "杭州", value: "hz" },
          ],
        },
        {
          label: "华南",
          options: [{ label: "深圳", value: "sz" }],
        },
      ]}
    />
  ),
};
