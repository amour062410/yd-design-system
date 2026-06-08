import { Bell } from "lucide-react";
import { Badge } from "./badge";
import { InspectionBadge } from "../../business-patterns/badge/inspection-badge";
import { NotificationBadge } from "../../business-patterns/badge/notification-badge";
import { RectificationBadge } from "../../business-patterns/badge/rectification-badge";
import { RiskBadge } from "../../business-patterns/badge/risk-badge";

export default {
  title: "YD Design System/Badge",
  parameters: { layout: "padded" },
};

const RIBBON_VISUAL_SPEC = [
  { status: "primary" as const, text: "推荐", title: "标杆门店" },
  { status: "danger" as const, text: "高风险", title: "华东区门店" },
  { status: "warning" as const, text: "待整改", title: "朝阳路店" },
  { status: "success" as const, text: "新品", title: "智能巡检包" },
] as const;

function RibbonSpecCard({
  status,
  text,
  title,
}: (typeof RIBBON_VISUAL_SPEC)[number]) {
  return (
    <Badge type="ribbon" status={status} text={text} className="w-56">
      <div className="relative z-[1] overflow-visible rounded-lg border bg-white shadow-sm dark:bg-zinc-900">
        <div className="px-5 pb-4 pt-9">
          <p className="text-sm font-semibold">{title}</p>
          <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
          <p className="text-xs text-zinc-500">卡片内容区域</p>
        </div>
      </div>
    </Badge>
  );
}

export const Count = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge count={12} status="warning" />
      <Badge count={128} maxCount={99} status="primary" />
      <Badge count={0} showZero status="default" />
    </div>
  ),
};

export const Dot = {
  render: () => (
    <Badge dot pulse status="danger">
      <Bell className="size-5" />
    </Badge>
  ),
};

export const Status = {
  render: () => (
    <div className="flex gap-2">
      <Badge type="status" status="danger" text="逾" />
      <Badge type="status" status="primary" text="新" />
    </div>
  ),
};

/** Arco / Ant Ribbon 视觉对照 */
export const RibbonVisualSpec = {
  name: "Ribbon Visual Spec",
  render: () => (
    <div className="space-y-4">
      <div className="rounded border border-dashed border-zinc-300 bg-zinc-50 p-4 text-xs text-zinc-600 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
        <p className="font-medium">Arco / Ant Ribbon 验收</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>22px · 8px 内边距 · 12px 字 · flex 垂直居中</li>
          <li>右下 6px clip-path 切角 · 左下折线三角 · 阴影 0 2px 8px</li>
          <li>悬挂 top: -1px · right: -6px · 圆角 2px 0 0 2px</li>
        </ul>
      </div>
      <div className="flex flex-col gap-5">
        {RIBBON_VISUAL_SPEC.map((item) => (
          <RibbonSpecCard key={item.text} {...item} />
        ))}
      </div>
    </div>
  ),
};

export const Ribbon = {
  render: () => (
    <div className="flex flex-col gap-4">
      {RIBBON_VISUAL_SPEC.map((item) => (
        <RibbonSpecCard key={item.text} {...item} />
      ))}
    </div>
  ),
};

export const BusinessPresets = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <RectificationBadge count={12} showLabel />
      <RiskBadge count={8} level="high" />
      <InspectionBadge count={36} variant="pending" />
      <InspectionBadge count={3} variant="overdue" />
      <NotificationBadge unread={120} pulse>
        <Bell className="size-5" />
      </NotificationBadge>
    </div>
  ),
};
