"use client";

import { Bell } from "lucide-react";
import {
  Badge,
  InspectionBadge,
  NotificationBadge,
  RectificationBadge,
  RiskBadge,
} from "@yd-ds/ui/badge";
import { BADGE_SIZE_LABELS, BADGE_STATUS_LABELS } from "@/lib/data/badgeMock";

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

export function BadgeCountShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Badge count={12} status="warning" />
          <span className="text-xs text-muted-foreground">待整改 12</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Badge count={128} maxCount={99} status="primary" />
          <span className="text-xs text-muted-foreground">溢出 99+</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Badge count={0} showZero status="default" />
          <span className="text-xs text-muted-foreground">showZero</span>
        </div>
      </div>
    </ShowcasePanel>
  );
}

export function BadgeDotShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <Badge dot status="danger">
            <Bell className="size-6 text-foreground" />
          </Badge>
          <span className="text-xs text-muted-foreground">红点提醒</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Badge dot pulse status="danger">
            <Bell className="size-6 text-foreground" />
          </Badge>
          <span className="text-xs text-muted-foreground">呼吸动画（新告警）</span>
        </div>
      </div>
    </ShowcasePanel>
  );
}

export function BadgeStatusShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap items-center gap-4">
        <Badge type="status" status="danger" text="逾" />
        <Badge type="status" status="warning" text="热" />
        <Badge type="status" status="primary" text="新" />
        <Badge type="status" status="success" text="荐" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        状态徽标用于 1–2 字紧凑标记，完整状态文案请使用 Tag。
      </p>
    </ShowcasePanel>
  );
}

const RIBBON_CARD_DEMOS = [
  {
    status: "primary" as const,
    text: "推荐",
    title: "标杆门店",
    desc: "巡检得分连续三月位列第一",
  },
  {
    status: "danger" as const,
    text: "高风险",
    title: "华东区门店",
    desc: "风险指数超出预警阈值",
  },
  {
    status: "warning" as const,
    text: "待整改",
    title: "朝阳路店",
    desc: "上次巡检发现 3 项待整改问题",
  },
  {
    status: "success" as const,
    text: "新品",
    title: "智能巡检包",
    desc: "覆盖门店管理与风险预警能力",
  },
] as const;

function RibbonCard({
  status,
  text,
  title,
  desc,
}: (typeof RIBBON_CARD_DEMOS)[number]) {
  return (
    <Badge
      type="ribbon"
      status={status}
      text={text}
      className="w-full max-w-sm"
    >
      <div className="relative overflow-visible rounded-lg border bg-card shadow-sm">
        <div className="px-6 pb-5 pt-10">
          <p className="text-base font-semibold text-foreground">{title}</p>
          <hr className="my-3 border-border" />
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </Badge>
  );
}

export function BadgeRibbonShowcase() {
  return (
    <ShowcasePanel>
      <p className="mb-6 text-sm text-muted-foreground">
        Arco / Ant Ribbon：22px · 右下 clip 切角 · 左下折线 · 阴影悬浮；悬挂 top: -1px、right:
        -6px；推荐 / 高风险 / 待整改 / 新品。
      </p>
      <div className="flex flex-col gap-6">
        {RIBBON_CARD_DEMOS.map((item) => (
          <RibbonCard key={item.text} {...item} />
        ))}
      </div>
    </ShowcasePanel>
  );
}

export function BadgeSizesShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap items-end gap-12 md:gap-16">
        {BADGE_SIZE_LABELS.map(({ size, label, height, dot }) => (
          <div key={size} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Badge count={8} size={size} status="primary" />
              <Badge dot size={size} status="danger" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">
                数字 {height} · 圆点 {dot}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ShowcasePanel>
  );
}

export function BadgePaletteShowcase() {
  return (
    <ShowcasePanel className="!py-10">
      <div className="flex flex-wrap items-center gap-4">
        {BADGE_STATUS_LABELS.map(({ status, label }) => (
          <div key={status} className="flex flex-col items-center gap-2">
            <Badge count={9} status={status} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </ShowcasePanel>
  );
}

export function BadgeBusinessShowcase() {
  return (
    <ShowcasePanel>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-between rounded-md border px-4 py-3">
          <span className="text-sm">待整改</span>
          <RectificationBadge count={12} />
        </div>
        <div className="flex items-center justify-between rounded-md border px-4 py-3">
          <span className="text-sm">高风险门店</span>
          <RiskBadge count={8} level="high" />
        </div>
        <div className="flex items-center justify-between rounded-md border px-4 py-3">
          <span className="text-sm">已逾期</span>
          <InspectionBadge count={3} variant="overdue" />
        </div>
        <div className="flex items-center justify-between rounded-md border px-4 py-3">
          <span className="text-sm">待巡检</span>
          <InspectionBadge count={36} variant="pending" />
        </div>
        <div className="flex items-center justify-between rounded-md border px-4 py-3">
          <span className="text-sm">新告警</span>
          <NotificationBadge unread={120} />
        </div>
        <div className="flex items-center justify-center rounded-md border px-4 py-3">
          <NotificationBadge unread={5} pulse>
            <Bell className="size-5 text-foreground" />
          </NotificationBadge>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        云盯巡检场景：数量用 Badge，状态文案用 Tag，完成率用 Progress / 巡检业务组件。
      </p>
    </ShowcasePanel>
  );
}
