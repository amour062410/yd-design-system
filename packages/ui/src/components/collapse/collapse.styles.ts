import type { CSSProperties } from "react";
import { collapseSizeSpecs, type CollapseSizeKey } from "./collapse-tokens";
import type { CollapseExpandIconPosition } from "./collapse.types";

export function normalizeActiveKeys(
  value?: string | string[] | null
): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

export function getCollapseRootStyle(
  bordered: boolean,
  ghost: boolean
): CSSProperties {
  if (ghost || !bordered) {
    return {
      backgroundColor: "var(--collapse-color-bg)",
    };
  }

  return {
    backgroundColor: "var(--collapse-color-bg)",
    borderWidth: "var(--collapse-divider-width)",
    borderStyle: "solid",
    borderColor: "var(--collapse-color-border)",
    borderRadius: "var(--collapse-radius)",
    overflow: "hidden",
  };
}

export function getCollapseItemDividerStyle(
  isLast: boolean,
  bordered: boolean,
  ghost: boolean
): CSSProperties | undefined {
  if (isLast || ghost) return undefined;

  return {
    borderBottomWidth: "var(--collapse-divider-width)",
    borderBottomStyle: "solid",
    borderBottomColor: "var(--collapse-color-border)",
  };
}

export function getHeaderStyle(size: CollapseSizeKey): CSSProperties {
  const spec = collapseSizeSpecs[size];

  return {
    height: spec.headerHeight,
    minHeight: spec.headerHeight,
    paddingLeft: spec.paddingX,
    paddingRight: spec.paddingX,
    paddingTop: spec.paddingY,
    paddingBottom: spec.paddingY,
    gap: "var(--collapse-header-gap)",
  };
}

export function getTitleStyle(
  size: CollapseSizeKey,
  nested?: boolean
): CSSProperties {
  const spec = collapseSizeSpecs[size];

  return {
    fontSize: nested
      ? "var(--collapse-nested-title-font-size, 13px)"
      : spec.titleFontSize,
    lineHeight: "22px",
    fontWeight: 500,
    color: "var(--collapse-color-title)",
  };
}

export function getSubtitleStyle(size: CollapseSizeKey): CSSProperties {
  const spec = collapseSizeSpecs[size];

  return {
    fontSize: spec.subtitleFontSize,
    lineHeight: "20px",
    color: "var(--collapse-color-subtitle)",
  };
}

export function getContentStyle(size: CollapseSizeKey): CSSProperties {
  const spec = collapseSizeSpecs[size];

  return {
    paddingLeft: spec.contentPaddingX,
    paddingRight: spec.contentPaddingX,
    paddingTop: spec.contentPaddingTop,
    paddingBottom: spec.contentPaddingBottom,
    fontSize: spec.contentFontSize,
    lineHeight: "22px",
    color: "var(--collapse-color-content)",
    backgroundColor: "var(--collapse-color-content-bg)",
  };
}

export function getExpandIconStyle(
  isActive: boolean,
  size: CollapseSizeKey,
  disabled?: boolean
): CSSProperties {
  const spec = collapseSizeSpecs[size];

  return {
    width: spec.iconSize,
    height: spec.iconSize,
    color: disabled ? "var(--collapse-color-disabled)" : "var(--collapse-color-icon)",
    transform: isActive ? "rotate(0deg)" : "rotate(-90deg)",
    transition: `transform var(--collapse-motion-duration) var(--collapse-motion-easing)`,
    flexShrink: 0,
  };
}

export function getContentWrapperStyle(isActive: boolean): CSSProperties {
  return {
    display: "grid",
    gridTemplateRows: isActive ? "1fr" : "0fr",
    transition: `grid-template-rows var(--collapse-motion-duration) var(--collapse-motion-easing)`,
  };
}

export function getContentInnerStyle(): CSSProperties {
  return {
    overflow: "hidden",
    minHeight: 0,
  };
}

export function resolveHeaderWrapperClassName(options: {
  isActive: boolean;
  disabled: boolean;
}) {
  const { isActive, disabled } = options;

  return [
    "yd-collapse-header",
    "flex w-full items-center transition-colors",
    disabled
      ? "cursor-not-allowed"
      : "hover:bg-[color:var(--collapse-color-bg-hover)]",
    isActive && !disabled ? "bg-[color:var(--collapse-color-bg-active)]" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function resolveHeaderToggleClassName(options: {
  disabled: boolean;
}) {
  const { disabled } = options;

  return [
    "yd-collapse-header-toggle",
    "flex min-w-0 flex-1 items-center border-0 bg-transparent p-0 text-left outline-none transition-colors",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-[color:var(--collapse-color-focus-ring)] focus-visible:ring-offset-1",
  ]
    .filter(Boolean)
    .join(" ");
}

export function resolveHeaderIconButtonClassName(options: {
  disabled: boolean;
}) {
  const { disabled } = options;

  return [
    "yd-collapse-header-icon",
    "inline-flex shrink-0 items-center border-0 bg-transparent p-0 outline-none transition-colors",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-[color:var(--collapse-color-focus-ring)] focus-visible:ring-offset-1",
  ]
    .filter(Boolean)
    .join(" ");
}

export function toggleActiveKeys(
  current: string[],
  key: string,
  accordion: boolean
): string[] {
  const isOpen = current.includes(key);

  if (accordion) {
    return isOpen ? [] : [key];
  }

  if (isOpen) {
    return current.filter((item) => item !== key);
  }

  return [...current, key];
}
