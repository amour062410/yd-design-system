"use client";

import { useState } from "react";
import { Ellipsis, MoreHorizontal, Pencil, Settings } from "lucide-react";
import {
  AlertCard,
  Card,
  CardAction,
  CardActions,
  CardCover,
  CardSection,
  CardTextButton,
  DashboardCard,
  OverviewCard,
  StatisticsCard,
  StoreInspectionCard,
  StoreStatusCard,
} from "@yd-ds/ui/card";
import { TabPanel, Tabs } from "@yd-ds/ui/tabs";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { CARD_DEMO_CODES } from "@/lib/data/cardMock";

const TAB_ITEMS = [
  { key: "1", label: "标签 1" },
  { key: "2", label: "标签 2" },
  { key: "3", label: "标签 3" },
];

const CARD_ACTIONS = (
  <CardActions>
    <CardAction icon={<Pencil />} aria-label="编辑" type="button" />
    <CardAction icon={<Settings />} aria-label="设置" type="button" />
    <CardAction icon={<MoreHorizontal />} aria-label="更多" type="button" />
  </CardActions>
);

const COVER_PLACEHOLDER = (
  <CardCover>
    <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#165DFF]/15 via-[#69A1FF]/10 to-[#00B42A]/15 text-[13px] text-[color:var(--color-text-tertiary,#86909c)]">
      封面图片
    </div>
  </CardCover>
);

function CardTabsDemo({ type }: { type: "line" | "card" }) {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <Card
      className="w-[360px] shrink-0"
      title="这是一个卡片大标题"
      extra={<CardTextButton type="button">更多操作</CardTextButton>}
    >
      <Tabs items={TAB_ITEMS} type={type} activeKey={activeKey} onChange={setActiveKey} size="sm" />
      <div className="mt-3 h-[66px] overflow-hidden text-[13px] leading-[22px] text-[color:var(--color-text-secondary,#4e5969)]">
        <TabPanel tabKey="1" activeKey={activeKey} className="pt-0">
          标签 1 内容：展示门店基础信息与巡检摘要。
        </TabPanel>
        <TabPanel tabKey="2" activeKey={activeKey} className="pt-0">
          标签 2 内容：展示整改项与处理进度。
        </TabPanel>
        <TabPanel tabKey="3" activeKey={activeKey} className="pt-0">
          标签 3 内容：展示告警与设备状态。
        </TabPanel>
      </div>
    </Card>
  );
}

export function CardDemosShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock title="基础用法" description="title + body 基础信息展示。" code={CARD_DEMO_CODES.basic}>
        <Card className="max-w-[360px]" title="这是一个卡片大标题">
          卡片可承载文字、列表、图片、段落，常用于模块划分与信息分组。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="底部操作栏"
        description="封面下方等分操作栏，竖线分隔，图标按钮带 hover/active。"
        code={CARD_DEMO_CODES.actions}
      >
        <Card
          className="max-w-[360px]"
          title="这是一个卡片大标题"
          cover={COVER_PLACEHOLDER}
          actions={CARD_ACTIONS}
        >
          卡片可承载文字、列表、图片、段落，常用于模块划分。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="带封面" description="cover 通栏展示图片或自定义内容。" code={CARD_DEMO_CODES.cover}>
        <Card className="max-w-[360px]" title="门店巡检报告" cover={COVER_PLACEHOLDER}>
          封面下方展示摘要说明，适合图文组合卡片。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Extra 操作" description="右上角 extra 放置更多操作。" code={CARD_DEMO_CODES.extra}>
        <Card
          className="max-w-[360px]"
          title="巡检任务"
          extra={<CardTextButton type="button">更多操作</CardTextButton>}
        >
          今日待巡检 12 家门店，已完成 8 家。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="带 Tabs" description="卡片内嵌 Tabs，支持 line / card 两种样式；卡片固定 360×内容区高度，切换 Tab 不改变尺寸。" code={CARD_DEMO_CODES.tabs}>
        <div className="flex flex-wrap items-start gap-6">
          <CardTabsDemo type="line" />
          <CardTabsDemo type="card" />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="嵌套子项" description="CardSection 灰色底区块，用于卡片内分组。" code={CARD_DEMO_CODES.section}>
        <Card className="max-w-[360px]" title="这是一个卡片大标题">
          <CardSection title="子项标题">
            子项内容区域，可放置字段、说明或列表摘要。
          </CardSection>
          <CardSection title="子项标题">
            多个子项纵向排列，间距统一。
          </CardSection>
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="小卡片 + 操作栏"
        description="信息量少时使用小卡片，底部可挂载操作栏。"
        code={CARD_DEMO_CODES.compactActions}
      >
        <div className="flex max-w-[280px] flex-col gap-3">
          <Card variant="compact" title="巡店记录 #1024" subTitle="2026-06-08 · 张三">
            得分 92 · 整改 0
          </Card>
          <Card variant="compact" title="巡店记录 #1025" subTitle="2026-06-07 · 李四">
            得分 88 · 整改 1
          </Card>
          <Card
            className="max-w-[280px] p-0"
            variant="compact"
            title="巡店记录 #1026"
            subTitle="2026-06-06 · 王五"
            actions={
              <CardActions>
                <CardAction icon={<Pencil />} aria-label="编辑" type="button" />
                <CardAction icon={<Ellipsis />} aria-label="更多" type="button" />
              </CardActions>
            }
          >
            <div className="px-3 pb-3 text-[12px] leading-5 text-[color:var(--color-text-secondary,#86909c)]">
              得分 95 · 整改 0
            </div>
          </Card>
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Footer" description="底部 footer 放置文字链操作或说明。" code={CARD_DEMO_CODES.footer}>
        <Card
          className="max-w-[360px]"
          title="告警中心"
          footer={<CardTextButton type="button">查看全部告警</CardTextButton>}
        >
          当前有 3 条高优先级告警待处理。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Hoverable" description="Hover 时阴影 0 3px 6px rgba(0,0,0,0.1)。" code={CARD_DEMO_CODES.hoverable}>
        <Card className="max-w-[360px]" title="工作台入口" hoverable>
          将鼠标移入查看 Hover 效果。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Loading" description="Skeleton 加载态。" code={CARD_DEMO_CODES.loading}>
        <Card className="max-w-[360px]" title="数据加载中" loading />
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Clickable" description="作为页面跳转入口。" code={CARD_DEMO_CODES.clickable}>
        <Card className="max-w-[360px]" title="进入实时巡店" clickable onClick={() => undefined}>
          点击卡片触发 onClick。
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="StatisticsCard"
        description="云盯最高频 KPI 卡片：指标 + 数值 + 趋势。"
        code={CARD_DEMO_CODES.statistics}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <StatisticsCard title="巡检门店" value="128" unit="家" trend="+12%" trendDirection="up" />
          <StatisticsCard title="平均得分" value="92" unit="%" trend="-3%" trendDirection="down" />
          <StatisticsCard title="待处理工单" value="35" unit="单" trend="0" trendDirection="flat" />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="OverviewCard" description="门店 / 人员 / 设备详情概览，紧凑小卡片可并排。" code={CARD_DEMO_CODES.overview}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewCard
            title="成都万象城店"
            status="正常"
            extra={<CardTextButton type="button">详情</CardTextButton>}
            items={[
              { label: "最近巡检", value: "2026-06-08" },
              { label: "负责人", value: "张三" },
            ]}
          />
          <OverviewCard
            title="春熙路店"
            status="整改中"
            items={[
              { label: "最近巡检", value: "2026-06-07" },
              { label: "负责人", value: "李四" },
            ]}
          />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="DashboardCard" description="驾驶舱：标题 + 指标 + 图表 + 说明。" code={CARD_DEMO_CODES.dashboard}>
        <DashboardCard
          title="巡检趋势"
          content={<div className="text-[24px] font-semibold tabular-nums">128 家</div>}
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
          footer={<CardTextButton type="button">近 7 日巡检门店数</CardTextButton>}
        />
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Compact" description="列表场景高密度卡片。" code={CARD_DEMO_CODES.compact}>
        <Card className="max-w-[280px]" variant="compact" title="巡店记录 #1024" subTitle="2026-06-08 · 张三">
          得分 92 · 整改 0
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="StoreInspectionCard" description="巡店结果业务 Pattern，信息少时使用小卡片并排。" code={CARD_DEMO_CODES.storeInspection}>
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
          <StoreInspectionCard
            storeName="太古里店"
            score={95}
            inspector="王五"
            inspectionTime="2026-06-06"
          />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="StoreStatusCard" description="门店营业状态 Pattern。" code={CARD_DEMO_CODES.storeStatus}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StoreStatusCard storeName="春熙路店" status="open" />
          <StoreStatusCard storeName="太古里店" status="rectifying" description="整改项 2 条" />
          <StoreStatusCard storeName="IFS 店" status="pending" />
          <StoreStatusCard storeName="天府广场店" status="closed" />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="AlertCard" description="告警业务 Pattern，紧凑小卡片可并排。" code={CARD_DEMO_CODES.alert}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AlertCard
            alertName="收银设备离线"
            level="high"
            occurredAt="2026-06-08 10:20"
            processStatus="待处理"
          />
          <AlertCard
            alertName="温度异常"
            level="medium"
            occurredAt="2026-06-08 09:15"
            processStatus="处理中"
          />
        </div>
      </ComponentDemoBlock>
    </div>
  );
}
