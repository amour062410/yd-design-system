import { cascaderSizeSpecs, cascaderUsageTokenNames } from "@yd-ds/tokens";
import type { CascaderShowcaseState } from "@yd-ds/ui/cascader";
import { DEFAULT_CASCADER_OPTIONS } from "@yd-ds/ui/cascader";

export const CASCADER_INTRO =
  "Cascader（级联选择）用于从具有层级关系的数据中进行选择，例如省市区、组织架构、商品分类。交互对齐 Ant Design Cascader：多列面板、键盘导航、displayRender、multiple 多选、搜索高亮与 popupMatchSelectWidth；视觉遵循 YD Token，与 Select 触发器规格一致。";

export const CASCADER_STATE_LABELS: {
  state: CascaderShowcaseState;
  label: string;
  open?: boolean;
}[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "focus", label: "Focus", open: true },
  { state: "disabled", label: "Disabled" },
  { state: "error", label: "Error" },
];

export const CASCADER_TYPE_LABELS = [
  { key: "basic", label: "Basic", description: "默认单选，仅叶子节点可选中" },
  { key: "changeOnSelect", label: "Change On Select", description: "选中任意层级即回填（Ant changeOnSelect）" },
  { key: "search", label: "Searchable", description: "搜索叶子路径，关键词高亮" },
  { key: "clearable", label: "Clearable", description: "已选时可一键清空" },
  { key: "multiple", label: "Multiple", description: "多选叶子路径，标签展示（Ant multiple）" },
  { key: "displayRender", label: "Display Render", description: "自定义选中项展示（Ant displayRender）" },
] as const;

export const CASCADER_SIZE_LABELS = [
  { size: "sm" as const, label: "Small", height: cascaderSizeSpecs.sm.height },
  { size: "md" as const, label: "Medium", height: cascaderSizeSpecs.md.height },
  { size: "lg" as const, label: "Large", height: cascaderSizeSpecs.lg.height },
];

export const CASCADER_DEMO_OPTIONS = DEFAULT_CASCADER_OPTIONS;

export const CASCADER_STORE_OPTIONS = [
  {
    label: "华东大区",
    value: "east",
    children: [
      {
        label: "浙江省",
        value: "zj",
        children: [
          {
            label: "杭州市",
            value: "hz",
            children: [
              { label: "西湖银泰店", value: "store-xh" },
              { label: "滨江龙湖店", value: "store-bj" },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "华南大区",
    value: "south",
    children: [
      {
        label: "广东省",
        value: "gd",
        children: [
          {
            label: "深圳市",
            value: "sz",
            children: [{ label: "南山海岸城店", value: "store-ns" }],
          },
        ],
      },
    ],
  },
];

export const CASCADER_CODE_EXAMPLE = `import { Cascader } from "@yd-ds/ui/cascader";

<Cascader
  options={options}
  placeholder="请选择地区"
  displayRender={(labels) => labels.join(" > ")}
/>

<Cascader showSearch allowClear popupMatchSelectWidth options={options} />

<Cascader multiple maxTagCount={3} options={options} />

<Cascader
  changeOnSelect
  expandTrigger="hover"
  expandDelay={150}
  options={options}
/>`;

export { cascaderUsageTokenNames as CASCADER_USAGE_TOKEN_NAMES };
