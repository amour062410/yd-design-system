import { cn } from "../../lib/utils";
import type { CardPriority, CardStatus, CardVariant, TrendDirection } from "./card.types";

export const cardCssVars = {
  radius: "--card-radius",
  bg: "--card-bg",
  border: "--card-border",
  padding: "--card-padding",
  paddingCompact: "--card-padding-compact",
  shadow: "--card-shadow",
  hoverShadow: "--card-hover-shadow",
  headerFontSize: "--card-header-font-size",
  bodyFontSize: "--card-body-font-size",
  valueFontSize: "--card-value-font-size",
} as const;

const STATUS_LABEL: Record<CardStatus, string> = {
  success: "正常",
  warning: "预警",
  danger: "异常",
  processing: "处理中",
  offline: "离线",
};

const PRIORITY_LABEL: Record<CardPriority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

const STORE_STATUS_LABEL = {
  open: "营业中",
  closed: "闭店",
  rectifying: "整改中",
  pending: "待巡检",
} as const;

const STORE_STATUS_COLOR = {
  open: "var(--card-status-success, #00B42A)",
  closed: "var(--card-status-offline, #86909C)",
  rectifying: "var(--card-status-warning, #FF7D00)",
  pending: "var(--card-status-processing, #165DFF)",
} as const;

export function cardRootClass({
  variant = "default",
  hoverable,
  clickable,
  loading,
  className,
}: {
  variant?: CardVariant;
  hoverable?: boolean;
  clickable?: boolean;
  loading?: boolean;
  className?: string;
}) {
  return cn(
    "relative flex flex-col overflow-hidden border bg-[color:var(--card-bg,#ffffff)] text-[color:var(--color-text-primary,#1d2129)]",
    "rounded-[var(--card-radius,8px)] border-[color:var(--card-border,#f0f0f0)]",
    "shadow-[var(--card-shadow,0_1px_2px_rgba(0,0,0,0.04))]",
    "transition-[box-shadow,transform] duration-200 ease-out",
    variant === "compact" && "min-h-0",
    variant === "statistics" && "min-h-[112px]",
    variant === "overview" && "min-h-[140px]",
    variant === "dashboard" && "min-h-[180px]",
    hoverable &&
      "hover:shadow-[var(--card-hover-shadow,0_3px_6px_rgba(0,0,0,0.1))]",
    clickable && "cursor-pointer",
    loading && "pointer-events-none",
    className
  );
}

export function cardPaddingClass(variant: CardVariant = "default") {
  return variant === "compact"
    ? "p-[var(--card-padding-compact,12px)]"
    : "p-[var(--card-padding,16px)]";
}

export function cardHeaderClass() {
  return cn(
    "flex items-start justify-between gap-3",
    "pb-[var(--card-header-gap,4px)]"
  );
}

export function cardTitleClass() {
  return cn(
    "min-w-0 text-[length:var(--card-header-font-size,15px)] font-[number:var(--card-header-font-weight,500)]",
    "leading-[22px] text-[color:var(--color-text-primary,#1d2129)]"
  );
}

export function cardSubTitleClass() {
  return cn(
    "mt-1 text-[length:var(--card-subtitle-font-size,12px)] leading-5",
    "text-[color:var(--color-text-secondary,#86909c)]"
  );
}

export function cardBodyClass(variant: CardVariant = "default") {
  return cn(
    "flex-1 text-[length:var(--card-body-font-size,13px)] leading-[22px]",
    "text-[color:var(--color-text-secondary,#4e5969)]",
    variant === "compact" && "text-[12px] leading-5"
  );
}

export function cardFooterClass() {
  return cn(
    "mt-[var(--card-footer-gap,12px)] border-t border-[color:var(--card-border,#f0f0f0)] pt-3",
    "text-[length:var(--card-body-font-size,13px)]"
  );
}

export function cardValueClass() {
  return cn(
    "tabular-nums text-[length:var(--card-value-font-size,28px)] font-[number:var(--card-value-font-weight,600)]",
    "leading-[36px] text-[color:var(--color-text-primary,#1d2129)]"
  );
}

export type CardScoreTone = "excellent" | "good" | "fair" | "poor";

export function resolveCardScoreTone(score: number | string): CardScoreTone {
  const num = typeof score === "number" ? score : Number(score);
  if (Number.isNaN(num)) return "good";
  if (num >= 90) return "excellent";
  if (num >= 80) return "good";
  if (num >= 60) return "fair";
  return "poor";
}

const CARD_SCORE_CSS_COLOR: Record<CardScoreTone, string> = {
  excellent: "var(--card-status-success, #00b42a)",
  good: "var(--color-brand, #165dff)",
  fair: "var(--card-status-warning, #ff7d00)",
  poor: "var(--card-status-danger, #f53f3f)",
};

export function getCardScoreColor(score: number | string) {
  return CARD_SCORE_CSS_COLOR[resolveCardScoreTone(score)];
}

/** 巡店得分数字样式（颜色通过 getCardScoreColor + style 注入，避免 Tailwind 扫描遗漏） */
export function cardScoreValueClass() {
  return cn(
    "tabular-nums text-[length:var(--card-value-font-size,28px)] font-[number:var(--card-value-font-weight,600)]",
    "leading-[36px]"
  );
}

/** 巡店得分单位样式 */
export function cardScoreUnitClass() {
  return cn("ml-1 text-[length:var(--card-unit-font-size,14px)] font-normal opacity-80");
}

export function cardUnitClass() {
  return cn(
    "ml-1 text-[length:var(--card-unit-font-size,14px)] font-normal",
    "text-[color:var(--color-text-secondary,#86909c)]"
  );
}

export function cardTrendClass(direction: TrendDirection = "up") {
  return cn(
    "inline-flex items-center gap-0.5 text-[12px] font-medium leading-5",
    direction === "up" && "text-[color:var(--card-trend-up,#00b42a)]",
    direction === "down" && "text-[color:var(--card-trend-down,#f53f3f)]",
    direction === "flat" && "text-[color:var(--color-text-secondary,#86909c)]"
  );
}

export function cardStatusBadgeClass(status: CardStatus) {
  const colors: Record<CardStatus, string> = {
    success: "bg-[color:var(--card-status-success,#00b42a)]/10 text-[color:var(--card-status-success,#00b42a)]",
    warning: "bg-[color:var(--card-status-warning,#ff7d00)]/10 text-[color:var(--card-status-warning,#ff7d00)]",
    danger: "bg-[color:var(--card-status-danger,#f53f3f)]/10 text-[color:var(--card-status-danger,#f53f3f)]",
    processing: "bg-[color:var(--card-status-processing,#165dff)]/10 text-[color:var(--card-status-processing,#165dff)]",
    offline: "bg-[color:var(--color-text-disabled,#f2f3f5)] text-[color:var(--card-status-offline,#86909c)]",
  };
  return cn(
    "inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[11px] font-medium leading-4",
    colors[status]
  );
}

export function cardPriorityBadgeClass(priority: CardPriority) {
  const colors: Record<CardPriority, string> = {
    high: "border-[color:var(--card-priority-high,#f53f3f)] text-[color:var(--card-priority-high,#f53f3f)]",
    medium: "border-[color:var(--card-priority-medium,#ff7d00)] text-[color:var(--card-priority-medium,#ff7d00)]",
    low: "border-[color:var(--card-priority-low,#165dff)] text-[color:var(--card-priority-low,#165dff)]",
  };
  return cn(
    "inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[11px] font-medium leading-4",
    colors[priority]
  );
}

export function cardMetaRowClass(inline = false) {
  return inline
    ? cn("flex items-center gap-2 py-1 text-[13px] leading-[22px]")
    : cn("flex items-start justify-between gap-3 py-1.5 text-[13px] leading-[22px]");
}

export function cardMetaLabelClass() {
  return cn("shrink-0 text-[color:var(--color-text-secondary,#86909c)]");
}

export function cardMetaValueClass(inline = false) {
  return cn(
    "min-w-0 text-[color:var(--color-text-primary,#1d2129)]",
    !inline && "text-right"
  );
}

export function cardSmallClass(size: "small" | "medium" = "small") {
  return size === "small" ? "w-full max-w-[280px]" : "w-full max-w-[360px]";
}

export function cardExtraClass() {
  return cn("shrink-0");
}

export function cardTextButtonClass() {
  return cn("h-8 px-[7px] text-[13px] font-normal leading-[22px]");
}

export function cardFooterActionsClass() {
  return cn("flex items-center justify-end");
}

export function cardActionsBarClass() {
  return cn(
    "flex items-stretch border-t border-[color:var(--card-border,#f0f0f0)]",
    "text-[color:var(--color-text-secondary,#86909c)]"
  );
}

export function cardActionItemWrapClass() {
  return "flex min-w-0 flex-1 items-center justify-center";
}

export function cardActionButtonClass() {
  return cn(
    "flex h-11 w-full items-center justify-center transition-colors duration-150",
    "text-[color:var(--color-text-secondary,#86909c)]",
    "hover:bg-[color:var(--color-brand-hover,rgba(22,93,255,0.06))] hover:text-[color:var(--color-brand,#165dff)]",
    "active:bg-[color:var(--color-brand-active,rgba(22,93,255,0.1))] active:text-[color:var(--color-brand-button-active,#0e42d2)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4"
  );
}

export function cardActionDividerClass() {
  return "w-px shrink-0 self-stretch bg-[color:var(--card-border,#f0f0f0)]";
}

export function cardCoverClass() {
  return cn(
    "relative aspect-[16/9] w-full overflow-hidden",
    "bg-[color:var(--color-surface-card-soft,#f7f8fa)]"
  );
}

export function cardContentPaddingClass(variant: CardVariant = "default") {
  return variant === "compact"
    ? "px-[var(--card-padding-compact,12px)] pt-[var(--card-padding-compact,12px)] pb-2"
    : cn("px-[var(--card-padding,16px)] pt-[var(--card-padding,16px)]", "pb-3");
}

export function cardSectionClass() {
  return cn(
    "rounded-[6px] bg-[color:var(--color-surface-card-soft,#f7f8fa)] p-3",
    "[&+&]:mt-3"
  );
}

export function cardSectionTitleClass() {
  return cn(
    "text-[13px] font-medium leading-[22px]",
    "text-[color:var(--color-text-primary,#1d2129)]"
  );
}

export function cardSectionBodyClass() {
  return cn(
    "mt-1 text-[12px] leading-5",
    "text-[color:var(--color-text-secondary,#86909c)]"
  );
}

export function getStatusLabel(status: CardStatus) {
  return STATUS_LABEL[status];
}

export function getPriorityLabel(priority: CardPriority) {
  return PRIORITY_LABEL[priority];
}

export function getStoreStatusLabel(status: keyof typeof STORE_STATUS_LABEL) {
  return STORE_STATUS_LABEL[status];
}

export function getStoreStatusColor(status: keyof typeof STORE_STATUS_COLOR) {
  return STORE_STATUS_COLOR[status];
}

export function inferTrendDirection(trend?: string | number | boolean | null): TrendDirection {
  if (trend == null) return "flat";
  const text = String(trend);
  if (text.startsWith("+") || text.startsWith("↑")) return "up";
  if (text.startsWith("-") || text.startsWith("↓")) return "down";
  return "flat";
}
