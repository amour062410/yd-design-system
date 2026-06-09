import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCard,
  Card,
  DashboardCard,
  OverviewCard,
  StatisticsCard,
  StoreInspectionCard,
  StoreStatusCard,
} from "./index";

const meta: Meta<typeof Card> = {
  title: "YD Design System/Card",
  component: Card,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card title="门店信息" subTitle="实时巡店业务卡片">
      展示门店基础信息与巡检摘要，强调业务数据而非纯容器。
    </Card>
  ),
};

export const WithExtra: Story = {
  render: () => (
    <Card title="巡检任务" extra="更多操作">
      今日待巡检 12 家门店，已完成 8 家。
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card title="告警中心" footer="查看全部告警">
      当前有 3 条高优先级告警待处理。
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card title="工作台入口" hoverable>
      Hover 时阴影 0 3px 6px rgba(0,0,0,0.1)。
    </Card>
  ),
};

export const Loading: Story = {
  render: () => <Card title="数据加载中" loading />,
};

export const Clickable: Story = {
  render: () => (
    <Card title="进入实时巡店" clickable onClick={() => undefined}>
      点击卡片作为跳转入口。
    </Card>
  ),
};

export const StatisticsCardStory = {
  render: () => (
    <div className="grid max-w-[720px] grid-cols-3 gap-4">
      <StatisticsCard title="巡检门店" value="128" unit="家" trend="+12%" trendDirection="up" />
      <StatisticsCard title="平均得分" value="92" unit="%" trend="-3%" trendDirection="down" />
      <StatisticsCard title="待处理工单" value="35" unit="单" trend="0" trendDirection="flat" />
    </div>
  ),
};

export const OverviewCardStory = {
  render: () => (
    <OverviewCard
      title="成都万象城店"
      status="正常"
      items={[
        { label: "最近巡检", value: "2026-06-08" },
        { label: "负责人", value: "张三" },
      ]}
    />
  ),
};

export const DashboardCardStory = {
  render: () => (
    <DashboardCard
      title="巡检趋势"
      content={
        <div className="text-[24px] font-semibold tabular-nums text-[#1D2129]">128 家</div>
      }
      chart={
        <div className="flex h-[120px] items-end gap-2">
          {[40, 68, 52, 88, 72, 96, 80].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-[#165DFF]/20"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      }
      footer="近 7 日巡检门店数"
    />
  ),
};

export const StoreInspectionCardStory = {
  render: () => (
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
    </div>
  ),
};

export const StoreStatusCardStory = {
  render: () => (
    <div className="grid max-w-[720px] grid-cols-2 gap-4">
      <StoreStatusCard storeName="春熙路店" status="open" />
      <StoreStatusCard storeName="太古里店" status="rectifying" description="整改项 2 条" />
      <StoreStatusCard storeName="IFS 店" status="pending" />
      <StoreStatusCard storeName="天府广场店" status="closed" />
    </div>
  ),
};

export const AlertCardStory = {
  render: () => (
    <AlertCard
      alertName="收银设备离线"
      level="high"
      occurredAt="2026-06-08 10:20"
      processStatus="待处理"
    />
  ),
};

export const CompactVariant: Story = {
  render: () => (
    <Card variant="compact" title="巡店记录 #1024" subTitle="2026-06-08 · 张三">
      得分 92 · 整改 0
    </Card>
  ),
};
