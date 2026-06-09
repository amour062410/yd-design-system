"use client";

import type { ReactNode } from "react";
import { Button } from "@yd-ds/ui/button";
import { DashboardSection } from "@yd-ds/ui/dashboard-section";
import { Tag } from "@yd-ds/ui/tag";

function DemoBlock({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[14px] font-medium text-[#1d2129] dark:text-[#f4f4f5]">
          {label}
        </p>
        {description ? (
          <p className="mt-0.5 text-[13px] text-[#86909c]">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      {hint ? (
        <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
      ) : null}
    </div>
  );
}

function ListRow({
  title,
  meta,
  status,
}: {
  title: string;
  meta: string;
  status?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{meta}</div>
      </div>
      {status}
    </div>
  );
}

export function DashboardSectionShowcase() {
  return (
    <section className="mb-10 flex flex-col gap-8">
      <DemoBlock
        label="运营驾驶舱"
        description="title + subtitle · 右侧 filters（时间范围）+ header 内 actions（导出）"
      >
        <DashboardSection
          title="运营驾驶舱"
          subtitle="华东一区"
          description="实时经营概览 · 最近更新 2 分钟前"
          filters={
            <>
              <Button size="sm" variant="outline">
                今日
              </Button>
              <Button size="sm" variant="ghost">
                本周
              </Button>
              <Button size="sm" variant="ghost">
                本月
              </Button>
            </>
          }
          actions={<Button size="sm">导出</Button>}
          actionsPlacement="header"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="今日营业额" value="¥128,640" hint="环比 +12.4%" />
            <Metric label="订单数" value="3,182" hint="环比 +6.1%" />
            <Metric label="活跃门店" value="96 / 128" hint="覆盖率 75%" />
            <Metric label="客单价" value="¥40.4" hint="环比 -1.2%" />
          </div>
        </DashboardSection>
      </DemoBlock>

      <DemoBlock
        label="数据分析"
        description="filters（时间 / 维度）+ extra（实时标记）+ header actions（导出报表）"
      >
        <DashboardSection
          title="经营数据分析"
          subtitle="2025 Q2"
          description="按维度对比关键经营指标"
          filters={
            <>
              <Button size="sm" variant="outline">
                时间：本季度
              </Button>
              <Button size="sm" variant="outline">
                维度：门店
              </Button>
              <Button size="sm" variant="ghost">
                更多筛选
              </Button>
            </>
          }
          extra={<Tag status="primary">实时</Tag>}
          actions={<Button size="sm">导出报表</Button>}
          actionsPlacement="header"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="GMV" value="¥3.28M" hint="同比 +18.2%" />
            <Metric label="转化率" value="4.6%" hint="环比 +0.4pt" />
            <Metric label="复购率" value="32.1%" hint="环比 -1.1pt" />
          </div>
        </DashboardSection>
      </DemoBlock>

      <div className="grid gap-8 lg:grid-cols-2">
        <DemoBlock
          label="项目中心"
          description="列表内容区 + 底部操作区 actions"
        >
          <DashboardSection
            title="项目中心"
            description="共 18 个进行中项目"
            extra={<Button size="sm">新建项目</Button>}
            actions={
              <Button size="sm" variant="ghost" className="ml-auto">
                查看全部项目
              </Button>
            }
          >
            <div className="flex flex-col">
              <ListRow
                title="华东区门店升级"
                meta="负责人 张明 · 截止 2025-07-12"
                status={<Tag status="primary">进行中</Tag>}
              />
              <ListRow
                title="供应链系统对接"
                meta="负责人 李雷 · 截止 2025-06-30"
                status={<Tag status="warning">待评审</Tag>}
              />
              <ListRow
                title="会员体系重构"
                meta="负责人 韩梅 · 截止 2025-08-01"
                status={<Tag status="success">已上线</Tag>}
              />
            </div>
          </DashboardSection>
        </DemoBlock>

        <DemoBlock
          label="工作台"
          description="快捷入口宫格 + 标题栏自定义入口"
        >
          <DashboardSection
            title="工作台"
            description="常用入口与待办"
            extra={
              <Button size="sm" variant="ghost">
                自定义
              </Button>
            }
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "发起巡检",
                "提交整改",
                "查看报告",
                "审批中心",
                "数据看板",
                "门店管理",
                "消息通知",
                "更多",
              ].map((entry) => (
                <button
                  key={entry}
                  type="button"
                  className="rounded-md border border-border bg-background p-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {entry}
                </button>
              ))}
            </div>
          </DashboardSection>
        </DemoBlock>
      </div>

      <DemoBlock
        label="风险监控"
        description="高风险标记 extra + 底部批量操作 actions"
      >
        <DashboardSection
          title="风险监控"
          description="近 7 天新增风险 14 项"
          extra={<Tag status="danger">高风险 3</Tag>}
          actions={
            <>
              <Button size="sm" variant="outline">
                批量指派
              </Button>
              <Button size="sm" variant="ghost" className="ml-auto">
                进入风险中心
              </Button>
            </>
          }
        >
          <div className="flex flex-col">
            <ListRow
              title="消防通道堆放杂物"
              meta="杭州西湖银泰店 · 2025-06-04 14:32"
              status={<Tag status="danger">高风险</Tag>}
            />
            <ListRow
              title="冷链温度异常"
              meta="上海静安寺店 · 2025-06-04 09:10"
              status={<Tag status="warning">中风险</Tag>}
            />
            <ListRow
              title="员工健康证缺失"
              meta="南京新街口店 · 2025-06-03 17:48"
              status={<Tag status="warning">中风险</Tag>}
            />
          </div>
        </DashboardSection>
      </DemoBlock>

      <DemoBlock
        label="变体：plain"
        description="去除卡片外观，仅保留标题栏 / 内容区 / 操作区结构，适合嵌入已有容器"
      >
        <div className="rounded-lg border border-dashed border-border bg-muted/30 px-5">
          <DashboardSection
            variant="plain"
            title="本月概览"
            description="plain 变体无边框背景"
            extra={
              <Button size="sm" variant="ghost">
                查看更多
              </Button>
            }
            actions={
              <Button size="sm" variant="outline">
                导出报表
              </Button>
            }
          >
            <p className="text-sm text-muted-foreground">
              内容区由调用方填充，组件仅提供结构与分隔。
            </p>
          </DashboardSection>
        </div>
      </DemoBlock>

      <DemoBlock label="间距：small / middle / large">
        <div className="grid gap-4 lg:grid-cols-3">
          {(["small", "middle", "large"] as const).map((padding) => (
            <DashboardSection
              key={padding}
              padding={padding}
              title={`padding = ${padding}`}
              extra={<Tag>{padding}</Tag>}
              actions={
                <Button size="sm" variant="outline">
                  操作
                </Button>
              }
            >
              <p className="text-sm text-muted-foreground">
                标题栏、内容区、操作区使用统一间距档位。
              </p>
            </DashboardSection>
          ))}
        </div>
      </DemoBlock>
    </section>
  );
}
