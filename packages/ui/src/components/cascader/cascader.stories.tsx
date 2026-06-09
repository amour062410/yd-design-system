import { Cascader, DEFAULT_CASCADER_OPTIONS } from "./index";

export default {
  title: "YD Design System/Cascader",
  component: Cascader,
  parameters: { layout: "padded" },
};

export const Basic = {
  render: () => (
    <Cascader options={DEFAULT_CASCADER_OPTIONS} placeholder="请选择地区" />
  ),
};

export const ChangeOnSelect = {
  render: () => (
    <Cascader
      options={DEFAULT_CASCADER_OPTIONS}
      changeOnSelect
      placeholder="可选任意层级"
    />
  ),
};

export const Searchable = {
  render: () => (
    <Cascader
      options={DEFAULT_CASCADER_OPTIONS}
      showSearch
      allowClear
      placeholder="搜索并选择"
    />
  ),
};

export const HoverExpand = {
  render: () => (
    <Cascader
      options={DEFAULT_CASCADER_OPTIONS}
      expandTrigger="hover"
      expandDelay={150}
      placeholder="悬停展开子级"
    />
  ),
};

export const Multiple = {
  render: () => (
    <Cascader
      multiple
      options={DEFAULT_CASCADER_OPTIONS}
      placeholder="可多选"
      className="w-[360px]"
    />
  ),
};

export const DisplayRender = {
  render: () => (
    <Cascader
      options={DEFAULT_CASCADER_OPTIONS}
      defaultValue={["zhejiang", "hangzhou", "xihu"]}
      displayRender={(labels) => labels.join(" > ")}
    />
  ),
};
