import { statisticTokens, statisticUsageTokenNames } from "@yd-ds/tokens";

export const STATISTIC_INTRO =
  "用于展示关键指标数值与 KPI 指标卡。对标 Ant Design Pro / Arco Pro 驾驶舱布局，结合云盯巡检场景，支持趋势、前缀后缀、统计组与卡片化 KPI 展示。";

export const STATISTIC_CODE_EXAMPLE = `import {
  Statistic,
  StatisticGroup,
  StatisticCard,
  StatisticCardGroup,
  StoreStatistic,
  InspectionStatistic,
  RectificationStatistic,
  RiskStatistic,
} from "@yd-ds/ui/statistic";
import { Store, ClipboardCheck, AlertTriangle, Wrench } from "lucide-react";

<Statistic title="待整改门店" value={128} />

<StatisticCard
  title="门店总数"
  value={256}
  trend="up"
  trendValue={12.5}
  description="较上月新增28家"
  status="primary"
  icon={<Store size={14} />}
/>

<StatisticCardGroup columns={4}>
  <StatisticCard
    title="门店总数"
    value={256}
    trend="up"
    trendValue={12.5}
    description="较上月新增28家"
    status="primary"
    icon={<Store size={14} />}
  />
  <StatisticCard
    title="已巡检门店"
    value={186}
    trend="up"
    trendValue={9}
    description="覆盖率72.7%"
    status="success"
    icon={<ClipboardCheck size={14} />}
  />
  <StatisticCard
    title="待整改问题"
    value={42}
    trend="down"
    trendValue={8}
    description="较上周减少4项"
    status="warning"
    icon={<Wrench size={14} />}
  />
  <StatisticCard
    title="高风险门店"
    value={8}
    trend="down"
    trendValue={15}
    description="需优先跟进"
    status="danger"
    icon={<AlertTriangle size={14} />}
  />
</StatisticCardGroup>`;

export const STATISTIC_DESIGN_TOKENS = [
  {
    name: "statistic-title-color",
    value: statisticTokens["statistic-title-color"],
    description: "标题文字色，浅色 rgba(0,0,0,0.45)。",
  },
  {
    name: "statistic-value-color",
    value: statisticTokens["statistic-value-color"],
    description: "数值主色 rgba(0,0,0,0.88)。",
  },
  {
    name: "statistic-value-font-size",
    value: statisticTokens["statistic-value-font-size"],
    description: "数值字号 24px。",
  },
  {
    name: "statistic-trend-up",
    value: statisticTokens["statistic-trend-up"],
    description: "上升趋势色 #00B42A。",
  },
  {
    name: "statistic-trend-down",
    value: statisticTokens["statistic-trend-down"],
    description: "下降趋势色 #F53F3F。",
  },
  {
    name: "statistic-group-gap",
    value: statisticTokens["statistic-group-gap"],
    description: "统计组栅格间距 24px。",
  },
  {
    name: "statistic-card-bg",
    value: statisticTokens["statistic-card-bg"],
    description: "KPI 指标卡背景色，暗色模式 #161618。",
  },
  {
    name: "statistic-card-padding",
    value: statisticTokens["statistic-card-padding"],
    description: "KPI 指标卡内边距 20px。",
  },
  {
    name: "statistic-card-radius",
    value: statisticTokens["statistic-card-radius"],
    description: "KPI 指标卡圆角 12px。",
  },
  {
    name: "statistic-card-shadow",
    value: statisticTokens["statistic-card-shadow"],
    description: "默认无阴影，hover 时启用 hover-shadow。",
  },
  {
    name: "statistic-card-hover-shadow",
    value: statisticTokens["statistic-card-hover-shadow"],
    description: "悬停轻微阴影，提升可交互感知。",
  },
];

export { statisticUsageTokenNames as STATISTIC_USAGE_TOKEN_NAMES };
