"use client";

import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { badgeSizeSpecs } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import {
  formatBadgeCount,
  getBadgeFillStyle,
  shouldShowBadge,
} from "./badge-styles";
import { RibbonIndicator } from "./ribbon-indicator";
import type { BadgeProps } from "./badge.types";

export type {
  BadgeProps,
  BadgeSize,
  BadgeStatus,
  BadgeType,
} from "./badge.types";

function resolveDisplayType(
  type: BadgeProps["type"],
  dot: boolean,
  count: number | undefined,
  text: string | undefined
): NonNullable<BadgeProps["type"]> {
  if (dot) return "dot";
  if (type) return type;
  if (text) return "status";
  if (count != null) return "count";
  return "dot";
}

const BadgeIndicator = forwardRef<
  HTMLSpanElement,
  BadgeProps & { displayType: NonNullable<BadgeProps["type"]> }
>(function BadgeIndicator(
  {
    displayType,
    status = "danger",
    size = "md",
    count,
    maxCount = 99,
    overflowCount = "99+",
    showZero = false,
    dot = false,
    pulse = false,
    text,
    className,
  },
  ref
) {
  const spec = badgeSizeSpecs[size];
  const fill = getBadgeFillStyle(status);

  if (
    !shouldShowBadge(count, showZero, dot, displayType) &&
    displayType === "count"
  ) {
    return null;
  }

  if (displayType === "dot") {
    const dotStyle: CSSProperties = {
      width: spec.dotSize,
      height: spec.dotSize,
      backgroundColor: fill.backgroundColor,
      border: fill.border as string,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-label={count != null ? String(count) : "提醒"}
        className={cn(
          "inline-block shrink-0 rounded-full",
          pulse && "animate-pulse",
          className
        )}
        style={dotStyle}
      />
    );
  }

  if (displayType === "ribbon") {
    const ribbonLabel =
      text ??
      (count != null ? formatBadgeCount(count, maxCount, overflowCount) : null);

    if (!ribbonLabel) return null;

    return (
      <RibbonIndicator
        ref={ref}
        text={ribbonLabel}
        status={status}
        className={className}
      />
    );
  }

  const label =
    displayType === "status"
      ? text
      : count != null
        ? formatBadgeCount(count, maxCount, overflowCount)
        : null;

  if (!label && displayType !== "count") return null;

  const countStyle: CSSProperties = {
    minWidth: spec.minWidth,
    height: spec.height,
    paddingLeft: spec.paddingX,
    paddingRight: spec.paddingX,
    fontSize: spec.fontSize,
    fontWeight: 500,
    lineHeight: spec.height,
    borderRadius: "var(--badge-radius-pill, 9999px)",
    textAlign: "center",
    ...fill,
  };

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label ?? undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap tabular-nums",
        className
      )}
      style={countStyle}
    >
      {label}
    </span>
  );
});

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    type,
    status = "danger",
    size = "md",
    count,
    maxCount = 99,
    overflowCount = "99+",
    showZero = false,
    dot = false,
    pulse = false,
    text,
    children,
    className,
  },
  ref
) {
  const displayType = resolveDisplayType(type, dot, count, text);

  if (!shouldShowBadge(count, showZero, dot, displayType) && displayType === "count") {
    return children ? <>{children}</> : null;
  }

  const indicator = (
    <BadgeIndicator
      ref={children ? undefined : ref}
      displayType={displayType}
      status={status}
      size={size}
      count={count}
      maxCount={maxCount}
      overflowCount={overflowCount}
      showZero={showZero}
      dot={dot}
      pulse={pulse}
      text={text}
      className={!children ? className : undefined}
    />
  );

  if (!children) {
    return indicator;
  }

  if (displayType === "ribbon") {
    return (
      <span
        ref={ref}
        className={cn("relative block overflow-visible", className)}
      >
        <span className="relative z-[1] block overflow-visible">{children}</span>
        {indicator}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("relative inline-flex", className)}>
      {children}
      <span
        className="absolute z-10"
        style={{
          top: `calc(-1 * var(--badge-offset-y, 2px))`,
          right: `calc(-1 * var(--badge-offset-x, 2px))`,
          transform: "translate(50%, -50%)",
        }}
      >
        {indicator}
      </span>
    </span>
  );
});
