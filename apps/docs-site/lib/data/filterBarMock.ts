import type { ApiTableRow } from "@/components/docs/api-table";

export const FILTERBAR_INTRO =
  "云盯业务后台筛选区：关键词独占首行，次级条件横向排列，查询/重置固定右侧，贴合实时巡店等列表页习惯。";

export const FILTERBAR_WHEN_TO_USE = [
  "实时巡店、任务列表等高频关键词检索场景",
  "关键词 + 多条件下拉/日期的两行紧凑布局",
  "查询按钮需固定右侧、次级条件横向排列",
  "需要 variant=\"business\" 与 priority 字段优先级机制",
  "与 Table、Pagination 组合构成 B 端标准列表页",
] as const;

export const FILTERBAR_DEMO_CODES = {
  business: `import { RealtimeStoreInspectionFilter } from "@yd-ds/ui/business/filter-bar";

<RealtimeStoreInspectionFilter onSearch={handleSearch} onReset={handleReset} />`,
  basic: `import { FilterBar, FilterField } from "@yd-ds/ui/business/filter-bar";
import { Input } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";

<FilterBar variant="business" onSearch={handleSearch} onReset={handleReset}>
  <FilterField label="关键词" priority="primary">
    <Input placeholder="输入关键词" allowClear className="max-w-none" />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select size="md" value="all" options={statusOptions} />
  </FilterField>
</FilterBar>`,
  responsive: `import { FilterBar, FilterField } from "@yd-ds/ui/business/filter-bar";
import { Input } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";
import { DatePicker } from "@yd-ds/ui/date-picker";

<FilterBar variant="business" title="业务筛选栏" onSearch={handleSearch} onReset={handleReset}>
  <FilterField label="关键词" priority="primary">
    <Input placeholder="输入关键词" allowClear className="max-w-none" />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select size="md" options={statusOptions} />
  </FilterField>
  <FilterField label="负责人" priority="secondary">
    <Select size="md" options={ownerOptions} />
  </FilterField>
  <FilterField label="创建时间" priority="secondary" controlClassName="!w-[240px]">
    <DatePicker range size="md" placeholder={["开始日期", "结束日期"]} />
  </FilterField>
</FilterBar>`,
  expandable: `import { FilterBar, FilterField } from "@yd-ds/ui/business/filter-bar";

<FilterBar
  variant="business"
  title="业务筛选栏"
  expandable
  maxVisibleFields={3}
  onSearch={handleSearch}
  onReset={handleReset}
>
  <FilterField label="关键词" priority="primary">
    <Input placeholder="输入关键词" className="max-w-none" />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select size="md" options={statusOptions} />
  </FilterField>
  {/* 更多 priority="secondary" 字段… */}
  {/* 右下角：[展开] [重置] [查询] */}
</FilterBar>`,
  dynamic: `import { FilterBar, FilterField, FilterExtra, FilterTextButton } from "@yd-ds/ui/business/filter-bar";

<FilterBar variant="business" title="业务筛选栏" onSearch={handleSearch} onReset={handleReset}>
  <FilterExtra>
    <FilterTextButton onClick={addField}>添加条件</FilterTextButton>
  </FilterExtra>
  <FilterField label="关键词" priority="primary">
    <Input className="max-w-none" />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select size="md" options={statusOptions} />
  </FilterField>
</FilterBar>`,
  presets: `import { FilterBar, FilterField } from "@yd-ds/ui/business/filter-bar";

<FilterBar variant="business" title="业务筛选栏" onSearch={handleSearch} onReset={handleReset}>
  <FilterField label="关键词" priority="primary">
    <Input value={keyword} onChange={setKeyword} className="max-w-none" />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select value={status} onChange={setStatus} options={statusOptions} />
  </FilterField>
  <FilterField label="筛选方案" priority="secondary">
    <Select placeholder="筛选方案" options={presetOptions} onChange={applyPreset} />
  </FilterField>
</FilterBar>`,
  extra: `import { FilterBar, FilterField, FilterExtra, FilterTextButton } from "@yd-ds/ui/business/filter-bar";

<FilterBar variant="business" title="业务筛选栏" onSearch={handleSearch} onReset={handleReset}>
  <FilterExtra>
    <FilterTextButton>批量操作</FilterTextButton>
    <FilterTextButton>导出</FilterTextButton>
  </FilterExtra>
  <FilterField label="关键词" priority="primary">
    <Input className="max-w-none" />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select size="md" options={statusOptions} />
  </FilterField>
</FilterBar>`,
  controlled: `import { FilterBar, FilterField } from "@yd-ds/ui/business/filter-bar";

const [values, setValues] = useState({ keyword: "云盯", status: "active" });

<FilterBar
  variant="business"
  onSearch={handleSearch}
  onReset={() => setValues({ keyword: "", status: "all" })}
>
  <FilterField label="关键词" priority="primary">
    <Input
      value={values.keyword}
      onChange={(e) => setValues((v) => ({ ...v, keyword: e.target.value }))}
      className="max-w-none"
    />
  </FilterField>
  <FilterField label="状态" priority="secondary">
    <Select
      value={values.status}
      onChange={(v) => setValues((prev) => ({ ...prev, status: String(v) }))}
      options={statusOptions}
    />
  </FilterField>
</FilterBar>`,
} as const;

export const FILTERBAR_API_ROWS: ApiTableRow[] = [
  {
    prop: "variant",
    description: "布局变体：default 栅格 / business 云盯业务两行布局",
    type: "'default' | 'business'",
    default: "'default'",
    version: "1.1.0",
  },
  {
    prop: "size",
    description: "尺寸",
    type: "'default' | 'middle' | 'small'",
    default: "'default'",
    version: "-",
  },
  {
    prop: "column",
    description: "一行显示的筛选项数量，支持响应式",
    type: "number | Record<Breakpoint, number>",
    default: "3",
    version: "-",
  },
  {
    prop: "defaultExpanded",
    description: "默认是否展开",
    type: "boolean",
    default: "false",
    version: "-",
  },
  {
    prop: "expanded",
    description: "受控展开状态",
    type: "boolean",
    default: "-",
    version: "-",
  },
  {
    prop: "onExpandChange",
    description: "展开状态变化回调",
    type: "(expanded: boolean) => void",
    default: "-",
    version: "-",
  },
  {
    prop: "submitText",
    description: "查询按钮文案",
    type: "string",
    default: "'查询'",
    version: "-",
  },
  {
    prop: "resetText",
    description: "重置按钮文案",
    type: "string",
    default: "'重置'",
    version: "-",
  },
  {
    prop: "title",
    description: "筛选栏标题，与 extra 同排展示",
    type: "ReactNode",
    default: "-",
    version: "1.2.0",
  },
  {
    prop: "extra",
    description: "顶部右侧业务功能区（导出、批量操作等 link 按钮）",
    type: "ReactNode",
    default: "-",
    version: "1.2.0",
  },
  {
    prop: "onSubmit",
    description: "查询回调",
    type: "(values: Record<string, any>) => void",
    default: "-",
    version: "-",
  },
  {
    prop: "onReset",
    description: "重置回调",
    type: "() => void",
    default: "-",
    version: "-",
  },
  {
    prop: "value",
    description: "受控值",
    type: "Record<string, any>",
    default: "-",
    version: "-",
  },
  {
    prop: "onChange",
    description: "值变化回调",
    type: "(values: Record<string, any>) => void",
    default: "-",
    version: "-",
  },
  {
    prop: "classNames",
    description: "语义化 className",
    type: "Record<SemanticDOM, string>",
    default: "-",
    version: "-",
  },
  {
    prop: "styles",
    description: "语义化 style",
    type: "Record<SemanticDOM, CSSProperties>",
    default: "-",
    version: "-",
  },
];

export const FILTERBAR_ITEM_API_ROWS: ApiTableRow[] = [
  { prop: "priority", description: "字段优先级：primary 独占首行 / secondary 第二行", type: "'primary' | 'secondary'", default: "-", version: "1.1.0" },
  { prop: "fieldKey", description: "字段标识", type: "string", default: "-", version: "1.1.0" },
  { prop: "controlClassName", description: "控件区宽度覆盖（business 模式）", type: "string", default: "-", version: "1.1.0" },
  { prop: "label", description: "标签文案", type: "ReactNode", default: "-", version: "-" },
  {
    prop: "component",
    description: "渲染的表单组件（Input、Select、DatePicker 等）",
    type: "ReactNode",
    default: "-",
    version: "-",
  },
  { prop: "span", description: "占据列数", type: "number", default: "1", version: "-" },
  { prop: "rules", description: "校验规则", type: "Rule[]", default: "-", version: "-" },
  { prop: "initialValue", description: "初始值", type: "any", default: "-", version: "-" },
];

export const FILTERBAR_SEMANTIC_DOM = [
  { node: "root", description: "筛选栏根容器", version: "1.1.0" },
  { node: "toolbar", description: "标题行容器（标题 + 业务功能区）", version: "1.2.0" },
  { node: "title", description: "筛选栏标题", version: "1.2.0" },
  { node: "extra", description: "顶部右侧业务功能区（导出、批量操作等）", version: "1.2.0" },
  { node: "primary", description: "主字段行（关键词等 priority=primary）", version: "1.1.0" },
  { node: "secondary", description: "次级条件横向排列区", version: "1.1.0" },
  { node: "secondary-row", description: "第二行容器（字段 + 操作区）", version: "1.1.0" },
  { node: "item", description: "单个筛选项容器", version: "-" },
  { node: "label", description: "字段标签（72px 右对齐）", version: "-" },
  { node: "component", description: "表单控件包裹层", version: "-" },
  { node: "actions", description: "右下角筛选操作区（展开/重置/查询）", version: "1.2.0" },
] as const;

export const FILTERBAR_COMPONENT_TOKENS = [
  {
    token: "filterBarGap",
    cssVar: "--filterbar-gap",
    description: "筛选项之间间距",
  },
  {
    token: "filterBarItemLabelWidth",
    cssVar: "--filterbar-label-width",
    description: "标签宽度",
  },
  {
    token: "filterBarItemLabelColor",
    cssVar: "--color-text-secondary",
    description: "标签颜色",
  },
  {
    token: "filterBarActionGap",
    cssVar: "--filterbar-action-gap",
    description: "操作按钮间距",
  },
  {
    token: "filterBarBackground",
    cssVar: "--card",
    description: "背景色",
  },
  {
    token: "filterBarBorderRadius",
    cssVar: "--radius-lg",
    description: "圆角",
  },
  {
    token: "filterBarPadding",
    cssVar: "--filterbar-padding",
    description: "内边距",
  },
] as const;

export const FILTERBAR_GLOBAL_TOKENS = [
  {
    token: "colorTextSecondary",
    cssVar: "--color-text-secondary",
    description: "标签文本颜色",
  },
  {
    token: "colorBgContainer",
    cssVar: "--card",
    description: "容器背景色",
  },
  {
    token: "colorBorder",
    cssVar: "--color-border",
    description: "边框颜色",
  },
  {
    token: "padding / paddingSM / paddingLG",
    cssVar: "--filterbar-padding / --spacing-sm / --spacing-lg",
    description: "各尺寸内边距",
  },
  {
    token: "fontSize / fontSizeSM",
    cssVar: "--filterbar-label-font-size / --font-size-sm",
    description: "字体大小",
  },
  {
    token: "borderRadius / borderRadiusLG",
    cssVar: "--radius-lg",
    description: "圆角",
  },
] as const;
