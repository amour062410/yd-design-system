import { collapseTokens, collapseUsageTokenNames } from "@yd-ds/tokens";

export const COLLAPSE_INTRO =
  "折叠面板用于收纳与展开分组信息，适用于详情页、配置项与移动端列表。对标 Ant Design Collapse，支持手风琴、嵌套、副标题与扩展区。";

export const COLLAPSE_OVERVIEW_POINTS = [
  "布局：bordered 外框与 ghost 无边框两种视觉，图标支持 left / right",
  "交互：支持多开与 accordion 手风琴；高度动画 200ms ease-out",
  "增强：title + subtitle + extra 插槽，可嵌套 Collapse",
  "业务场景：风险隐患详情、整改记录、门店巡检结果、课程目录、项目配置",
];

export const COLLAPSE_CODE_EXAMPLE = `import { Collapse, CollapseItem } from "@yd-ds/ui/collapse";
import { Tag } from "@yd-ds/ui/tag";

<Collapse defaultActiveKey="task">
  <CollapseItem
    key="task"
    title="巡检任务"
    subtitle="已完成 12 项检查"
    extra={<Tag status="primary">进行中</Tag>}
  >
    执行人：张明；计划完成时间：2025-06-05 18:00。
  </CollapseItem>
  <CollapseItem key="risk" title="风险隐患">
    待整改 14 项，高风险 3 项。
  </CollapseItem>
</Collapse>`;

export const COLLAPSE_USAGE_TOKEN_NAMES = [...collapseUsageTokenNames];

export const COLLAPSE_DESIGN_TOKENS = Object.entries(collapseTokens).map(
  ([key, value]) => ({
    token: key,
    value: String(value),
  })
);

export const COLLAPSE_PANEL_CONTENT =
  "通过折叠面板收纳次要信息，保持页面信息层级清晰。适用于详情页、配置页与移动端列表场景。";
