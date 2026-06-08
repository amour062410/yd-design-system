import type { CSSProperties } from "react";
import type { BadgeStatus } from "./badge.types";

type StatusPalette = {
  bg: string;
  text: string;
};

const PALETTE: Record<BadgeStatus, StatusPalette> = {
  default: {
    bg: "var(--badge-default-bg, #E5E6EB)",
    text: "var(--badge-default-text, rgba(0,0,0,0.65))",
  },
  primary: {
    bg: "var(--badge-primary, #165DFF)",
    text: "var(--badge-on-solid, #FFFFFF)",
  },
  success: {
    bg: "var(--badge-success, #00B42A)",
    text: "var(--badge-on-solid, #FFFFFF)",
  },
  warning: {
    bg: "var(--badge-warning, #FF7D00)",
    text: "var(--badge-on-solid, #FFFFFF)",
  },
  danger: {
    bg: "var(--badge-danger, #F53F3F)",
    text: "var(--badge-on-solid, #FFFFFF)",
  },
  info: {
    bg: "var(--badge-info, #3491FA)",
    text: "var(--badge-on-solid, #FFFFFF)",
  },
};

export function getBadgeFillStyle(status: BadgeStatus): CSSProperties {
  const p = PALETTE[status];
  return {
    backgroundColor: p.bg,
    color: p.text,
    border: `1px solid var(--badge-border-color, #FFFFFF)`,
  };
}

/** Ribbon 主体色（Arco / Ant 规格） */
const RIBBON_BODY: Record<BadgeStatus, string> = {
  default: "var(--badge-default-bg, #E5E6EB)",
  primary: "var(--badge-ribbon-primary, #1677ff)",
  success: "var(--badge-ribbon-success, #00B42A)",
  warning: "var(--badge-ribbon-warning, #FF7D00)",
  danger: "var(--badge-ribbon-danger, #F53F3F)",
  info: "var(--badge-info, #3491FA)",
};

const RIBBON_FOLD: Record<BadgeStatus, string> = {
  default: "var(--badge-ribbon-fold-default, #86909C)",
  primary: "var(--badge-ribbon-fold-primary, #0958d9)",
  success: "var(--badge-ribbon-fold-success, #008F21)",
  warning: "var(--badge-ribbon-fold-warning, #D25F00)",
  danger: "var(--badge-ribbon-fold-danger, #C73636)",
  info: "var(--badge-ribbon-fold-info, #206CCF)",
};

export type RibbonStyle = {
  bg: string;
  text: string;
  fold: string;
};

export function getRibbonStyle(status: BadgeStatus): RibbonStyle {
  const fill = PALETTE[status];
  return {
    bg: RIBBON_BODY[status],
    text: fill.text,
    fold: RIBBON_FOLD[status],
  };
}

export function formatBadgeCount(
  count: number,
  maxCount: number,
  overflowCount: string
) {
  if (count > maxCount) return overflowCount;
  return String(count);
}

export function shouldShowBadge(
  count: number | undefined,
  showZero: boolean,
  dot: boolean,
  type: string
) {
  if (dot || type === "dot") return true;
  if (type === "status" || type === "ribbon") return true;
  if (count == null) return false;
  if (count === 0 && !showZero) return false;
  return true;
}
