export const INSPECTION_REMARK =
  "门店整体陈列规范，收银区存在杂物堆放；试衣间镜面有污渍需清洁；消防通道标识遮挡，需在 3 个工作日内完成整改并上传佐证照片。";

export const DESCRIPTIONS_INTRO =
  "展示只读字段组合，适合店铺巡检详情、整改回显与门店档案等信息密集型场景。";

export const DESCRIPTIONS_WHEN_TO_USE = [
  "店铺巡检详情页基础信息展示（门店、任务、得分、整改状态）",
  "整改任务只读回显与审批记录查看",
  "Dashboard 分区内的巡检摘要（可与 Card 组合）",
  "需要 bordered 表格化呈现的巡检报告只读态",
] as const;

/** 响应式列数演示 —— 巡检评分六宫格（对齐无边框科技感排版） */
export const DESCRIPTIONS_RESPONSIVE_ITEMS = [
  { label: "巡检项目", value: "店面卫生" },
  { label: "巡检状态", value: "已合格" },
  { label: "巡检时间", value: "2024-03-15 10:00:00" },
  { label: "标准分值", value: "100.00" },
  { label: "扣分分值", value: "5.00" },
  { label: "最终得分", value: "95.00" },
] as const;

export const DESCRIPTIONS_DEMO_ITEMS = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
  { label: "巡检员", value: "张明" },
  { label: "巡检时间", value: "2024-03-15 14:30" },
  { label: "巡检得分", value: "92 分" },
  { label: "问题项数", value: "3 项" },
  { label: "所属区域", value: "华东大区" },
  { label: "门店地址", value: "浙江省杭州市西湖区文三路 478 号华星科技大厦 1 层" },
  { label: "巡检备注", value: INSPECTION_REMARK },
] as const;

export const DESCRIPTIONS_RECOMMENDED_CODE = `import { Descriptions } from "@yd-ds/ui/descriptions";

const items = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
  { label: "巡检员", value: "张明" },
  { label: "巡检时间", value: "2024-03-15 14:30" },
  { label: "巡检得分", value: "92 分" },
];

<Descriptions title="巡检详情" items={items} />`;

export const DESCRIPTIONS_NOT_RECOMMENDED_CODE = `import { Descriptions } from "@yd-ds/ui/descriptions";

// 不推荐：children 写法仅用于兼容旧代码，新页面请使用 items
<Descriptions title="巡检详情">
  <Descriptions.Item label="门店名称">云盯杭州西湖旗舰店</Descriptions.Item>
  <Descriptions.Item label="巡检员">张明</Descriptions.Item>
</Descriptions>`;

export const DESCRIPTIONS_DEMO_CODES = {
  basic: `import { Descriptions } from "@yd-ds/ui/descriptions";

const items = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
  { label: "巡检员", value: "张明" },
  { label: "巡检时间", value: "2024-03-15 14:30" },
  { label: "巡检得分", value: "92 分" },
  { label: "问题项数", value: "3 项" },
  { label: "所属区域", value: "华东大区" },
  { label: "门店地址", value: "浙江省杭州市西湖区文三路 478 号" },
  { label: "巡检备注", value: "收银区杂物待清理，试衣间镜面需擦拭。" },
];

<Descriptions title="巡检详情" items={items} />`,
  bordered: `import { Descriptions } from "@yd-ds/ui/descriptions";
import { Tag } from "@yd-ds/ui/tag";

<Descriptions
  title="巡检详情"
  bordered
  column={3}
  items={[
    { label: "门店名称", value: "云盯杭州西湖旗舰店" },
    { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
    { label: "巡检员", value: "张明" },
    { label: "巡检时间", value: "2024-03-15 14:30" },
    { label: "巡检得分", value: "92 分" },
    {
      label: "整改状态",
      value: <Tag variant="light" status="warning">待整改</Tag>,
    },
    { label: "问题项数", value: "3 项" },
    { label: "所属区域", value: "华东大区", span: 2 },
    { label: "门店地址", value: "浙江省杭州市西湖区文三路 478 号", span: 3 },
    { label: "巡检备注", value: "收银区杂物待清理…", span: "filled" },
  ]}
/>`,
  size: `import { Descriptions } from "@yd-ds/ui/descriptions";

const items = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检员", value: "张明" },
  { label: "巡检得分", value: "92 分" },
];

<Descriptions size="default" title="默认尺寸" items={items} />
<Descriptions size="middle" title="中等尺寸" items={items} />
<Descriptions size="small" title="紧凑尺寸" items={items} />`,
  responsive: `import { Descriptions } from "@yd-ds/ui/descriptions";

const scoreItems = [
  { label: "巡检项目", value: "店面卫生" },
  { label: "巡检状态", value: "已合格" },
  { label: "巡检时间", value: "2024-03-15 10:00:00" },
  { label: "标准分值", value: "100.00" },
  { label: "扣分分值", value: "5.00" },
  { label: "最终得分", value: "95.00" },
];

// 水平：标签与内容同行，宽屏三列
<Descriptions
  layout="horizontal"
  column={{ xs: 1, sm: 2, md: 3 }}
  items={scoreItems}
/>

// 垂直：标签在上、内容在下，同样响应式列数
<Descriptions
  layout="vertical"
  column={{ xs: 1, sm: 2, md: 3 }}
  items={scoreItems}
/>`,
  vertical: `import { Descriptions } from "@yd-ds/ui/descriptions";

<Descriptions layout="vertical" title="垂直布局" items={items} />`,
  verticalBordered: `import { Descriptions } from "@yd-ds/ui/descriptions";

<Descriptions
  layout="vertical"
  bordered
  title="垂直带边框"
  column={2}
  items={items}
/>`,
  spanFilled: `import { Descriptions } from "@yd-ds/ui/descriptions";

<Descriptions bordered column={3} title="巡检详情">
  <Descriptions.Item label="门店名称">云盯杭州西湖旗舰店</Descriptions.Item>
  <Descriptions.Item label="巡检任务">XJ-20240315-008</Descriptions.Item>
  <Descriptions.Item label="巡检员">张明</Descriptions.Item>
  <Descriptions.Item label="巡检备注" span="filled">
    收银区杂物待清理，试衣间镜面需擦拭，消防通道标识需复位。
  </Descriptions.Item>
</Descriptions>`,
  customStyles: `import { Descriptions } from "@yd-ds/ui/descriptions";

<Descriptions
  title="自定义样式"
  bordered
  classNames={{
    label: "text-brand",
    content: "font-medium",
  }}
  styles={{
    title: { color: "var(--descriptions-text-primary)" },
  }}
  items={items}
/>`,
} as const;

export const DESCRIPTIONS_API_ROWS = [
  {
    prop: "bordered",
    description: "是否展示边框",
    type: "boolean",
    default: "false",
    version: "-",
  },
  {
    prop: "column",
    description: "一行 DescriptionsItem 数量，支持响应式对象",
    type: "number | Record<Breakpoint, number>",
    default: "3",
    version: "-",
  },
  {
    prop: "layout",
    description: "布局方向",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    version: "-",
  },
  {
    prop: "size",
    description: "尺寸",
    type: "'default' | 'middle' | 'small'",
    default: "'default'",
    version: "-",
  },
  {
    prop: "title",
    description: "标题",
    type: "ReactNode",
    default: "-",
    version: "-",
  },
  {
    prop: "extra",
    description: "右上角操作区",
    type: "ReactNode",
    default: "-",
    version: "-",
  },
  {
    prop: "items",
    description: "数据配置项（推荐）",
    type: "DescriptionsItemProps[]",
    default: "-",
    version: "5.8.0",
  },
  {
    prop: "colon",
    description: "是否显示冒号",
    type: "boolean",
    default: "true",
    version: "-",
  },
  {
    prop: "classNames",
    description: "语义化 className",
    type: "Record<SemanticDOM, string>",
    default: "-",
    version: "5.8.0",
  },
  {
    prop: "styles",
    description: "语义化 style",
    type: "Record<SemanticDOM, CSSProperties>",
    default: "-",
    version: "5.8.0",
  },
  {
    prop: "children",
    description: "子节点写法，请改用 items",
    type: "ReactNode",
    default: "-",
    version: "-",
    deprecated: true,
  },
  {
    prop: "labelWidth",
    description: "请通过 styles / classNames 控制 label 宽度",
    type: "number | string",
    default: "120px",
    version: "-",
    deprecated: true,
  },
] as const;

export const DESCRIPTIONS_ITEM_API_ROWS = [
  {
    prop: "label",
    description: "标签内容",
    type: "ReactNode",
    default: "-",
    version: "-",
  },
  {
    prop: "span",
    description: "包含列的数量；filled 表示铺满当前行剩余空间",
    type: "number | 'filled'",
    default: "1",
    version: "'filled': 5.8.0",
  },
  {
    prop: "children",
    description: "内容",
    type: "ReactNode",
    default: "-",
    version: "-",
  },
  {
    prop: "tooltip",
    description: "标签旁说明 Tooltip",
    type: "ReactNode",
    default: "-",
    version: "-",
  },
  {
    prop: "copyable",
    description: "文本内容可复制",
    type: "boolean",
    default: "false",
    version: "-",
  },
] as const;

export const DESCRIPTIONS_SEMANTIC_DOM = [
  { node: "root", description: "根容器 section", version: "5.8.0" },
  { node: "header", description: "标题行容器", version: "5.8.0" },
  { node: "title", description: "标题文本", version: "5.8.0" },
  { node: "extra", description: "右上角扩展区", version: "5.8.0" },
  { node: "label", description: "字段标签", version: "5.8.0" },
  { node: "content", description: "字段内容", version: "5.8.0" },
] as const;

export const DESCRIPTIONS_COMPONENT_TOKENS = [
  {
    token: "descriptionsColonMarginLeft",
    cssVar: "--descriptions-colon-margin-left",
    description: "冒号左侧间距",
  },
  {
    token: "descriptionsColonMarginRight",
    cssVar: "--descriptions-colon-margin-right",
    description: "冒号右侧间距",
  },
  {
    token: "descriptionsItemPaddingBottom",
    cssVar: "--descriptions-item-padding-bottom",
    description: "项底部内边距",
  },
  {
    token: "descriptionsItemPaddingEnd",
    cssVar: "--descriptions-item-padding-end",
    description: "项右侧内边距",
  },
  {
    token: "descriptionsLabelBg",
    cssVar: "--descriptions-label-bg",
    description: "标签背景色（仅 bordered 模式）",
  },
  {
    token: "descriptionsTitleMarginBottom",
    cssVar: "--descriptions-title-margin-bottom",
    description: "标题下边距",
  },
  {
    token: "descriptionsExtraMarginStart",
    cssVar: "--descriptions-extra-margin-start",
    description: "额外区域起始边距",
  },
  {
    token: "descriptionsBorderRadius",
    cssVar: "--descriptions-border-radius",
    description: "边框圆角（仅 bordered 模式）",
  },
] as const;

export const DESCRIPTIONS_GLOBAL_TOKENS = [
  { token: "colorText", cssVar: "--descriptions-text-primary", description: "内容文本颜色" },
  {
    token: "colorTextSecondary",
    cssVar: "--descriptions-text-secondary",
    description: "标签文本颜色",
  },
  {
    token: "colorFillSecondary",
    cssVar: "--descriptions-label-bg",
    description: "bordered 标签背景色",
  },
  { token: "colorSplit", cssVar: "--descriptions-border", description: "边框颜色" },
  {
    token: "fontSize",
    cssVar: "--descriptions-content-size",
    description: "内容字体大小",
  },
  {
    token: "fontSizeLG",
    cssVar: "--descriptions-title-size",
    description: "标题字体大小",
  },
  {
    token: "padding / paddingLG / paddingSM",
    cssVar: "--descriptions-item-padding",
    description: "各尺寸内边距",
  },
  {
    token: "borderRadiusLG",
    cssVar: "--descriptions-border-radius",
    description: "bordered 圆角",
  },
] as const;
