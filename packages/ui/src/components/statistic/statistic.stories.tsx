import { AlertTriangle, ClipboardCheck, Store, Wrench } from "lucide-react";
import {
  InspectionStatistic,
  RectificationStatistic,
  RiskStatistic,
  StoreStatistic,
} from "../../business-patterns/statistic";
import {
  Statistic,
  StatisticCard,
  StatisticCardGroup,
  StatisticGroup,
} from "./index";

export default {
  title: "YD Design System/Statistic",
  parameters: { layout: "padded" },
};

export const Basic = {
  render: () => (
    <Statistic title="待整改门店" value={128} />
  ),
};

export const Percent = {
  render: () => (
    <Statistic title="巡检完成率" value={98} suffix="%" />
  ),
};

export const Currency = {
  render: () => (
    <Statistic title="本月营收" value={12800} prefix="¥" precision={0} />
  ),
};

export const Trend = {
  render: () => (
    <div className="flex gap-12">
      <Statistic
        title="已巡检门店"
        value={186}
        trend="up"
        trendValue={12.5}
      />
      <Statistic
        title="待整改问题"
        value={42}
        trend="down"
        trendValue={8.3}
      />
    </div>
  ),
};

export const Loading = {
  render: () => <Statistic title="加载中" loading />,
};

export const Group = {
  render: () => (
    <StatisticGroup columns={4}>
      <StoreStatistic value={256} />
      <InspectionStatistic value={98} trend="up" trendValue={2.1} />
      <RectificationStatistic value={12} />
      <RiskStatistic value={8} />
    </StatisticGroup>
  ),
};

export const KpiCard = {
  name: "KPI 指标卡",
  render: () => (
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
        title="巡检数"
        value={186}
        trend="up"
        trendValue={9}
        description="覆盖率72.7%"
        status="success"
        icon={<ClipboardCheck size={14} />}
      />
      <StatisticCard
        title="风险数"
        value={42}
        trend="down"
        trendValue={8}
        status="warning"
        icon={<AlertTriangle size={14} />}
      />
      <StatisticCard
        title="整改数"
        value={8}
        trend="down"
        trendValue={15}
        status="danger"
        icon={<Wrench size={14} />}
      />
    </StatisticCardGroup>
  ),
};

export const CockpitKpi = {
  name: "云盯驾驶舱",
  render: () => (
    <div className="rounded-lg border bg-[#F7F8FA] p-6">
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
          description="本月完成186家"
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
          description="需优先跟进处理"
          status="danger"
          icon={<AlertTriangle size={14} />}
        />
      </StatisticCardGroup>
    </div>
  ),
};
