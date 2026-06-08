"use client";

import { ExternalLink, type LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { linkColorTokens, linkStatusColors, resolveFontSize } from "@yd-ds/tokens";
import { cn } from "../lib/utils";

export type LinkStatus = "default" | "warning" | "danger" | "success";
export type LinkState = "default" | "hover" | "active" | "disabled";
export type LinkIconPosition = "left" | "right";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  status?: LinkStatus;
  icon?: LucideIcon;
  iconPosition?: LinkIconPosition;
  showIcon?: boolean;
  children?: ReactNode;
  /** Force a visual state for documentation matrices */
  showcaseState?: LinkState;
}

function getStatusColor(status: LinkStatus, state: LinkState): string {
  if (state === "disabled") {
    return linkColorTokens["link-color-disabled"];
  }

  if (status === "default") {
    if (state === "default") return linkColorTokens["link-color-default"];
    if (state === "hover") return linkColorTokens["link-color-hover"];
    return linkColorTokens["link-color-active"];
  }

  const palette = linkStatusColors[status];
  if (state === "default") return palette.default;
  if (state === "hover") return palette.hover;
  return palette.active;
}

const STATUS_INTERACTIVE_CLASS: Record<
  LinkStatus,
  { base: string; hover: string; active: string }
> = {
  default: {
    base: "text-[color:var(--link-color-default)]",
    hover: "hover:text-[color:var(--link-color-hover)]",
    active: "active:text-[color:var(--link-color-active)]",
  },
  warning: {
    base: "text-warning",
    hover: "hover:text-warning-hover",
    active: "active:text-warning-active",
  },
  danger: {
    base: "text-danger",
    hover: "hover:text-danger-hover",
    active: "active:text-danger-active",
  },
  success: {
    base: "text-[color:var(--color-success)]",
    hover: "hover:text-[color:var(--color-success-hover)]",
    active: "active:text-[color:var(--color-success-active)]",
  },
};

export function Link({
  status = "default",
  icon: Icon = ExternalLink,
  iconPosition = "right",
  showIcon = false,
  showcaseState,
  children = "LINK",
  className,
  href = "#",
  onClick,
  style,
  ...rest
}: LinkProps) {
  const disabled = showcaseState === "disabled" || rest["aria-disabled"] === true;

  const showcaseStyle: CSSProperties | undefined = showcaseState
    ? { color: getStatusColor(status, showcaseState) }
    : undefined;

  const colorClass = showcaseState
    ? undefined
    : cn(
        STATUS_INTERACTIVE_CLASS[status].base,
        STATUS_INTERACTIVE_CLASS[status].hover,
        STATUS_INTERACTIVE_CLASS[status].active
      );

  return (
    <a
      href={disabled ? undefined : href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center gap-1 font-medium transition-colors duration-150",
        colorClass,
        disabled
          ? "cursor-not-allowed no-underline text-[color:var(--link-color-disabled)]"
          : "cursor-pointer hover:underline",
        className
      )}
      style={{
        fontSize: resolveFontSize("xs").fontSize,
        ...showcaseStyle,
        ...style,
      }}
      aria-disabled={disabled}
      {...rest}
    >
      {showIcon && iconPosition === "left" && <Icon size={12} strokeWidth={2} />}
      <span>{children}</span>
      {showIcon && iconPosition === "right" && <Icon size={12} strokeWidth={2} />}
    </a>
  );
}
