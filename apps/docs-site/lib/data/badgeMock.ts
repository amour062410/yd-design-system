import {
  badgeSizeSpecs,
  badgeTokens,
  badgeUsageTokenNames,
  type BadgeSizeKey,
} from "@yd-ds/tokens";
import type { BadgeStatus } from "@yd-ds/ui/badge";

export const BADGE_INTRO =
  "用于数量提醒、未读标记与角标展示。与 Tag（状态文案）和 Progress（完成比例）分工明确：Badge 专注整数计数、红点与溢出提醒。";

export const BADGE_STATUS_LABELS: { status: BadgeStatus; label: string }[] = [
  { status: "default", label: "默认" },
  { status: "primary", label: "主要" },
  { status: "success", label: "成功" },
  { status: "warning", label: "警告" },
  { status: "danger", label: "危险" },
  { status: "info", label: "信息" },
];

export const BADGE_SIZE_LABELS: {
  size: BadgeSizeKey;
  label: string;
  height: string;
  dot: string;
}[] = [
  {
    size: "sm",
    label: "小",
    height: badgeSizeSpecs.sm.height,
    dot: badgeSizeSpecs.sm.dotSize,
  },
  {
    size: "md",
    label: "中",
    height: badgeSizeSpecs.md.height,
    dot: badgeSizeSpecs.md.dotSize,
  },
  {
    size: "lg",
    label: "大",
    height: badgeSizeSpecs.lg.height,
    dot: badgeSizeSpecs.lg.dotSize,
  },
];

export const BADGE_CODE_EXAMPLE = `import {
  Badge,
  RectificationBadge,
  RiskBadge,
  InspectionBadge,
  NotificationBadge,
} from "@yd-ds/ui/badge";

<Badge count={12} status="warning" />
<Badge count={120} maxCount={99} status="danger" />

<Badge dot pulse status="danger">
  <IconButton icon={Bell} />
</Badge>

<Badge type="status" status="danger" text="逾" />

<Badge type="ribbon" status="danger" text="高风险" className="w-full max-w-sm">
  <div className="relative overflow-visible rounded-lg border bg-card">
    <div className="px-6 pb-5 pt-10">
      <p className="font-semibold">华东区门店</p>
      <hr className="my-3" />
      <p className="text-sm text-muted-foreground">风险指数超出预警阈值</p>
    </div>
  </div>
</Badge>

<RectificationBadge count={12} showLabel />
<RiskBadge count={8} level="high" />
<InspectionBadge count={36} variant="pending" />
<NotificationBadge unread={120} pulse />`;

export const BADGE_DESIGN_TOKENS = [
  {
    name: "badge-height-md",
    value: badgeTokens["badge-height-md"],
    description: "数字徽标默认高度 18px，显著低于 Tag。",
  },
  {
    name: "badge-primary",
    value: badgeTokens["badge-primary"],
    description: "主要语义色，待巡检等提醒。",
  },
  {
    name: "badge-danger",
    value: badgeTokens["badge-danger"],
    description: "危险语义色，高风险与新告警。",
  },
  {
    name: "badge-dot-md",
    value: badgeTokens["badge-dot-md"],
    description: "默认红点直径 8px。",
  },
  {
    name: "badge-ribbon-height",
    value: badgeTokens["badge-ribbon-height"],
    description: "丝带胶囊主体高度 22px，Figma 规格。",
  },
  {
    name: "badge-ribbon-font-size",
    value: badgeTokens["badge-ribbon-font-size"],
    description: "丝带字号 12px，区别于数字徽标 11px。",
  },
  {
    name: "badge-ribbon-fold-primary",
    value: badgeTokens["badge-ribbon-fold-primary"],
    description: "折角层 #0E42D2，主体 #165DFF 加深约 12%。",
  },
  {
    name: "badge-ribbon-fold-danger",
    value: badgeTokens["badge-ribbon-fold-danger"],
    description: "高风险折角 #C73636，主体 #F53F3F 加深。",
  },
  {
    name: "badge-ribbon-fold-success",
    value: badgeTokens["badge-ribbon-fold-success"],
    description: "新品折角 #008F21，主体 #00B42A 加深。",
  },
  {
    name: "badge-offset-x",
    value: badgeTokens["badge-offset-x"],
    description: "附着模式右上角水平偏移。",
  },
];

export { badgeUsageTokenNames as BADGE_USAGE_TOKEN_NAMES };
