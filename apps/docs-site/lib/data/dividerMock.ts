export const DIVIDER_INTRO =
  "分割线用于区隔内容、分组模块，统一页面节奏与信息层级，适用于 Card、Form、Descriptions 与 Dashboard 场景。";

export const DIVIDER_WHEN_TO_USE = [
  "Card / DashboardSection 内 KPI 与图表区域分组",
  "Form 内一级字段区块划分（基础信息、联系信息等）",
  "Descriptions 详情页多段信息分组",
  "行内垂直分割（按钮组、面包屑操作区）",
] as const;

export const DIVIDER_CODE_EXAMPLE = `import { Divider } from "@yd-ds/ui/divider";

<Divider />
<Divider orientation="left">基本信息</Divider>
<Divider type="vertical" />
<Divider dashed plain>辅助说明</Divider>`;

export const DIVIDER_SECTION_CODE = `import { SectionDivider } from "@yd-ds/ui/business-patterns/layout";

<SectionDivider>基础信息</SectionDivider>`;

export const DIVIDER_DEMO_CODES = {
  basic: `import { Divider } from "@yd-ds/ui/divider";

<p>上方内容</p>
<Divider />
<p>下方内容</p>`,
  leftText: `import { Divider } from "@yd-ds/ui/divider";

<Divider orientation="left">基本信息</Divider>`,
  centerText: `import { Divider } from "@yd-ds/ui/divider";

<Divider orientation="center">基本信息</Divider>`,
  rightText: `import { Divider } from "@yd-ds/ui/divider";

<Divider orientation="right">基本信息</Divider>`,
  vertical: `import { Divider } from "@yd-ds/ui/divider";

<span>巡检任务</span>
<Divider type="vertical" />
<span>整改记录</span>`,
  dashed: `import { Divider } from "@yd-ds/ui/divider";

<Divider dashed />
<Divider dashed orientation="center">虚线分组</Divider>`,
  plain: `import { Divider } from "@yd-ds/ui/divider";

<Divider plain orientation="left">辅助说明</Divider>`,
  formLayout: `import { Form } from "@yd-ds/ui/form";
import { SectionDivider, SubSectionDivider } from "@yd-ds/ui/business-patterns/layout";

<Form layout="vertical">
  <SectionDivider>基础信息</SectionDivider>
  {/* 表单项 */}
  <SectionDivider>联系信息</SectionDivider>
  <SubSectionDivider>附加信息</SubSectionDivider>
</Form>`,
  descriptionsLayout: `import { Divider } from "@yd-ds/ui/divider";
import { Descriptions } from "@yd-ds/ui/descriptions";

<Descriptions title="巡检详情" items={items} />
<Divider />
<Descriptions title="整改信息" items={rectificationItems} />`,
  dashboardLayout: `import { DashboardDivider } from "@yd-ds/ui/business-patterns/layout";
import { DashboardSection } from "@yd-ds/ui/dashboard-section";

<DashboardSection title="华东大区巡检驾驶舱">
  {/* KPI */}
  <DashboardDivider />
  {/* 图表 */}
</DashboardSection>`,
  cardLayout: `import { Divider } from "@yd-ds/ui/divider";
import { Card, CardContent, CardHeader, CardTitle } from "@yd-ds/ui/card";

<Card>
  <CardHeader><CardTitle>门店巡检概览</CardTitle></CardHeader>
  <CardContent>
    {/* KPI */}
    <Divider />
    {/* 图表 */}
  </CardContent>
</Card>`,
} as const;

export const DIVIDER_API_ROWS = [
  { prop: "type", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "分割线方向" },
  {
    prop: "orientation",
    type: '"left" | "center" | "right"',
    default: '"center"',
    description: "带标题时的对齐方式",
  },
  { prop: "dashed", type: "boolean", default: "false", description: "虚线样式" },
  { prop: "plain", type: "boolean", default: "false", description: "弱化标题字重，适用于辅助说明" },
  { prop: "margin", type: "number | string", default: "-", description: "自定义间距（水平：上下；垂直：左右）" },
  { prop: "children", type: "ReactNode", default: "-", description: "标题内容" },
  { prop: "className", type: "string", default: "-", description: "自定义类名" },
  { prop: "style", type: "CSSProperties", default: "-", description: "自定义样式" },
  { prop: "aria-label", type: "string", default: "-", description: "无障碍标签" },
] as const;

export const DIVIDER_TOKEN_ROWS = [
  { token: "divider-color", cssVar: "--divider-color", description: "分割线颜色，复用 color-border" },
  { token: "divider-margin", cssVar: "--divider-margin", description: "水平上下间距 (24px)" },
  { token: "divider-text-gap", cssVar: "--divider-text-gap", description: "标题与线条间距 (16px)" },
  { token: "divider-vertical-height", cssVar: "--divider-vertical-height", description: "垂直分割线高度 (16px)" },
  { token: "divider-dashed-gap", cssVar: "--divider-dashed-gap", description: "虚线间隔" },
] as const;
