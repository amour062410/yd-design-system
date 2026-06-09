import type { ApiTableRow } from "@/components/docs/api-table";

export const CARD_INTRO =
  "云盯业务卡片：不仅是容器，更是信息展示单元、业务数据单元与统计分析单元，服务于工作台、实时巡店、门店详情、告警中心与数据驾驶舱。";

export const CARD_WHEN_TO_USE = [
  "基础信息展示：title + body（Card）",
  "封面图文卡片 + 底部图标操作栏（cover + CardActions）",
  "卡片内 Tabs 切换、嵌套子项分组（CardSection）",
  "工作台 KPI 与快捷入口（StatisticsCard）",
  "门店 / 人员 / 设备详情概览（OverviewCard）",
  "驾驶舱图表与指标组合（DashboardCard）",
  "巡店记录、工单、设备列表等高密度信息（variant=\"compact\"）",
  "巡店结果、门店状态、告警等业务 Pattern 卡片",
] as const;

export const CARD_CODE_EXAMPLE = `import { StatisticsCard, OverviewCard } from "@yd-ds/ui/card";

<StatisticsCard title="巡检门店" value="128" unit="家" trend="+12%" trendDirection="up" />
<OverviewCard
  title="成都万象城店"
  status="正常"
  items={[
    { label: "最近巡检", value: "2026-06-08" },
    { label: "负责人", value: "张三" },
  ]}
/>`;

export const CARD_DEMO_CODES = {
  basic: `import { Card } from "@yd-ds/ui/card";

<Card title="这是一个卡片大标题">
  卡片可承载文字、列表、图片、段落。
</Card>`,
  actions: `import { Card, CardActions, CardAction, CardCover } from "@yd-ds/ui/card";
import { MoreHorizontal, Pencil, Settings } from "lucide-react";

<Card
  title="这是一个卡片大标题"
  cover={<CardCover src="/cover.jpg" alt="封面" />}
  actions={
    <CardActions>
      <CardAction icon={<Pencil />} aria-label="编辑" />
      <CardAction icon={<Settings />} aria-label="设置" />
      <CardAction icon={<MoreHorizontal />} aria-label="更多" />
    </CardActions>
  }
>
  卡片正文内容。
</Card>`,
  cover: `import { Card, CardCover } from "@yd-ds/ui/card";

<Card title="门店巡检报告" cover={<CardCover src="/cover.jpg" alt="封面" />}>
  封面下方展示摘要说明。
</Card>`,
  tabs: `import { Card, CardTextButton } from "@yd-ds/ui/card";
import { TabPanel, Tabs } from "@yd-ds/ui/tabs";

<Card title="这是一个卡片大标题" extra={<CardTextButton>更多操作</CardTextButton>}>
  <Tabs items={[{ key: "1", label: "标签 1" }]} type="line" />
  <TabPanel tabKey="1" activeKey="1">标签内容</TabPanel>
</Card>`,
  section: `import { Card, CardSection } from "@yd-ds/ui/card";

<Card title="这是一个卡片大标题">
  <CardSection title="子项标题">子项内容区域。</CardSection>
  <CardSection title="子项标题">多个子项纵向排列。</CardSection>
</Card>`,
  compactActions: `import { Card, CardActions, CardAction } from "@yd-ds/ui/card";
import { Ellipsis, Pencil } from "lucide-react";

<Card
  variant="compact"
  title="巡店记录 #1026"
  subTitle="2026-06-06 · 王五"
  actions={
    <CardActions>
      <CardAction icon={<Pencil />} aria-label="编辑" />
      <CardAction icon={<Ellipsis />} aria-label="更多" />
    </CardActions>
  }
>
  得分 95 · 整改 0
</Card>`,
  compact: `import { Card } from "@yd-ds/ui/card";

<Card variant="compact" title="巡店记录 #1024" subTitle="2026-06-08 · 张三">
  得分 92 · 整改 0
</Card>`,
  extra: `import { Card, CardTextButton } from "@yd-ds/ui/card";

<Card title="巡检任务" extra={<CardTextButton type="button">更多操作</CardTextButton>}>
  今日待巡检 12 家门店。
</Card>`,
  footer: `import { Card, CardTextButton } from "@yd-ds/ui/card";

<Card title="告警中心" footer={<CardTextButton type="button">查看全部告警</CardTextButton>}>
  当前有 3 条高优先级告警。
</Card>`,
  hoverable: `import { Card } from "@yd-ds/ui/card";

<Card title="工作台入口" hoverable>
  Hover 时阴影 0 3px 6px rgba(0,0,0,0.1)。
</Card>`,
  loading: `import { Card } from "@yd-ds/ui/card";

<Card title="数据加载中" loading />`,
  clickable: `import { Card } from "@yd-ds/ui/card";

<Card title="进入实时巡店" clickable onClick={handleNavigate}>
  点击卡片作为跳转入口。
</Card>`,
  statistics: `import { StatisticsCard } from "@yd-ds/ui/card";

<StatisticsCard title="巡检门店" value="128" unit="家" trend="+12%" trendDirection="up" />`,
  overview: `import { OverviewCard } from "@yd-ds/ui/card";

<OverviewCard
  title="成都万象城店"
  status="正常"
  items={[
    { label: "最近巡检", value: "2026-06-08" },
    { label: "负责人", value: "张三" },
  ]}
/>`,
  dashboard: `import { DashboardCard } from "@yd-ds/ui/card";

<DashboardCard
  title="巡检趋势"
  content={<div>128 家</div>}
  chart={<YourChart />}
  footer="近 7 日数据"
/>`,
  storeInspection: `import { StoreInspectionCard } from "@yd-ds/ui/card";

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <StoreInspectionCard
    storeName="成都万象城店"
    score={92}
    inspector="张三"
    inspectionTime="2026-06-08"
  />
  <StoreInspectionCard
    storeName="春熙路店"
    score={88}
    inspector="李四"
    inspectionTime="2026-06-07"
  />
</div>`,
  storeStatus: `import { StoreStatusCard } from "@yd-ds/ui/card";

<StoreStatusCard storeName="春熙路店" status="open" />`,
  alert: `import { AlertCard } from "@yd-ds/ui/card";

<AlertCard
  alertName="收银设备离线"
  level="high"
  occurredAt="2026-06-08 10:20"
  processStatus="待处理"
/>`,
} as const;

export const CARD_API_ROWS: ApiTableRow[] = [
  { prop: "title", description: "卡片标题", type: "ReactNode", default: "-" },
  { prop: "subTitle", description: "副标题", type: "ReactNode", default: "-" },
  { prop: "extra", description: "右上角操作区", type: "ReactNode", default: "-" },
  { prop: "footer", description: "底部文字操作区", type: "ReactNode", default: "-" },
  { prop: "cover", description: "通栏封面区（图片 / 自定义内容）", type: "ReactNode", default: "-" },
  { prop: "actions", description: "底部图标操作栏（CardActions）", type: "ReactNode", default: "-" },
  {
    prop: "variant",
    description: "卡片变体",
    type: "'default' | 'statistics' | 'overview' | 'dashboard' | 'compact'",
    default: "'default'",
  },
  { prop: "hoverable", description: "Hover 阴影（0 3px 6px rgba(0,0,0,0.1)）", type: "boolean", default: "false" },
  { prop: "loading", description: "Skeleton 加载态", type: "boolean", default: "false" },
  { prop: "clickable", description: "可点击跳转", type: "boolean", default: "false" },
  {
    prop: "status",
    description: "业务状态角标",
    type: "'success' | 'warning' | 'danger' | 'processing' | 'offline'",
    default: "-",
  },
  {
    prop: "priority",
    description: "优先级角标",
    type: "'high' | 'medium' | 'low'",
    default: "-",
  },
];

export const CARD_ACTIONS_API_ROWS: ApiTableRow[] = [
  { prop: "icon", description: "操作图标", type: "ReactNode", default: "-" },
  { prop: "aria-label", description: "无障碍标签（必填）", type: "string", default: "-" },
  { prop: "onClick", description: "点击回调", type: "() => void", default: "-" },
  { prop: "disabled", description: "禁用态", type: "boolean", default: "false" },
];

export const CARD_COMPOUND_API_ROWS: ApiTableRow[] = [
  { prop: "CardCover.src", description: "封面图片地址", type: "string", default: "-" },
  { prop: "CardCover.children", description: "自定义封面内容", type: "ReactNode", default: "-" },
  { prop: "CardSection.title", description: "子项标题", type: "ReactNode", default: "-" },
  { prop: "CardActions.children", description: "CardAction 按钮列表", type: "ReactNode", default: "-" },
];

export const STATISTICS_CARD_API_ROWS: ApiTableRow[] = [
  { prop: "title", description: "指标名称", type: "ReactNode", default: "-" },
  { prop: "value", description: "指标数值", type: "ReactNode", default: "-" },
  { prop: "unit", description: "单位（家 / % / 单）", type: "ReactNode", default: "-" },
  { prop: "trend", description: "趋势文案", type: "ReactNode", default: "-" },
  {
    prop: "trendDirection",
    description: "趋势方向",
    type: "'up' | 'down' | 'flat'",
    default: "-",
  },
];

export const CARD_TOKEN_ROWS = [
  { token: "cardRadius", cssVar: "--card-radius", description: "卡片圆角 (8px)" },
  { token: "cardBg", cssVar: "--card-bg", description: "卡片背景 (#FFFFFF)" },
  { token: "cardBorder", cssVar: "--card-border", description: "卡片描边 (#F0F0F0)" },
  { token: "cardPadding", cssVar: "--card-padding", description: "默认内边距 (16px)" },
  { token: "cardHoverShadow", cssVar: "--card-hover-shadow", description: "Hover 阴影 (0 3px 6px rgba(0,0,0,0.1))" },
  { token: "cardValueFontSize", cssVar: "--card-value-font-size", description: "数据数字字号 (28px)" },
] as const;
