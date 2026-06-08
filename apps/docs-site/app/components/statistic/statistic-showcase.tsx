"use client";

import {
  AlertTriangle,
  ClipboardCheck,
  Store,
  Wrench,
} from "lucide-react";
import {
  InspectionStatistic,
  RectificationStatistic,
  RiskStatistic,
  Statistic,
  StatisticCard,
  StatisticCardGroup,
  StatisticGroup,
  StoreStatistic,
} from "@yd-ds/ui/statistic";

function ShowcasePanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md border bg-card px-6 py-8 md:px-10 md:py-10 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function StatisticBasicShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap gap-12">
        <Statistic title="待整改门店" value={128} />
        <Statistic title="门店总数" value={256} />
      </div>
    </ShowcasePanel>
  );
}

export function StatisticPercentShowcase() {
  return (
    <ShowcasePanel>
      <InspectionStatistic value={98} trend="up" trendValue={2.1} />
    </ShowcasePanel>
  );
}

export function StatisticCurrencyShowcase() {
  return (
    <ShowcasePanel>
      <Statistic title="本月整改费用" value={12800} prefix="¥" precision={0} />
    </ShowcasePanel>
  );
}

export function StatisticTrendShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap gap-12">
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
    </ShowcasePanel>
  );
}

export function StatisticKpiCardShowcase() {
  return (
    <ShowcasePanel className="!p-0 overflow-hidden">
      <StatisticCardGroup columns={4} className="p-6 md:p-8">
        <StatisticCard
          title="门店总数"
          value={256}
          trend="up"
          trendValue={12.5}
          description="较上月新增28家"
          status="primary"
          icon={<Store size={14} strokeWidth={2} />}
        />
        <StatisticCard
          title="巡检数"
          value={186}
          trend="up"
          trendValue={9}
          description="覆盖率72.7%"
          status="success"
          icon={<ClipboardCheck size={14} strokeWidth={2} />}
        />
        <StatisticCard
          title="风险数"
          value={42}
          trend="down"
          trendValue={8}
          description="较上周减少4项"
          status="warning"
          icon={<AlertTriangle size={14} strokeWidth={2} />}
        />
        <StatisticCard
          title="整改数"
          value={8}
          trend="down"
          trendValue={15}
          description="待闭环跟进"
          status="danger"
          icon={<Wrench size={14} strokeWidth={2} />}
        />
      </StatisticCardGroup>
    </ShowcasePanel>
  );
}

export function StatisticLoadingShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap gap-12">
        <Statistic title="门店总数" value={256} />
        <Statistic title="加载中" loading />
      </div>
    </ShowcasePanel>
  );
}

export function StatisticGroupShowcase() {
  return (
    <ShowcasePanel>
      <StatisticGroup columns={4}>
        <StoreStatistic value={256} />
        <InspectionStatistic value={98} />
        <RectificationStatistic value={12} />
        <RiskStatistic value={8} />
      </StatisticGroup>
    </ShowcasePanel>
  );
}

export function StatisticCockpitShowcase() {
  return (
    <ShowcasePanel className="!p-0 overflow-hidden">
      <div className="border-b bg-muted/30 px-6 py-4">
        <p className="text-base font-semibold text-foreground">云盯巡检驾驶舱</p>
        <p className="mt-1 text-sm text-muted-foreground">
          首页 KPI 区域 · 门店运营概览
        </p>
      </div>
      <div className="bg-[color:var(--color-surface-page)] px-6 py-8 md:px-8">
        <StatisticCardGroup columns={4}>
          <StatisticCard
            title="门店总数"
            value={256}
            trend="up"
            trendValue={12.5}
            description="较上月新增28家"
            status="primary"
            icon={<Store size={14} strokeWidth={2} />}
          />
          <StatisticCard
            title="已巡检门店"
            value={186}
            trend="up"
            trendValue={9}
            description="本月完成186家"
            status="success"
            icon={<ClipboardCheck size={14} strokeWidth={2} />}
          />
          <StatisticCard
            title="待整改问题"
            value={42}
            trend="down"
            trendValue={8}
            description="较上周减少4项"
            status="warning"
            icon={<Wrench size={14} strokeWidth={2} />}
          />
          <StatisticCard
            title="高风险门店"
            value={8}
            trend="down"
            trendValue={15}
            description="需优先跟进处理"
            status="danger"
            icon={<AlertTriangle size={14} strokeWidth={2} />}
          />
        </StatisticCardGroup>
      </div>
    </ShowcasePanel>
  );
}
