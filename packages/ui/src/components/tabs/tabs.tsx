"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { resolveFontSize } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { tabsSizeSpecs, type TabsSizeKey } from "./tabs-tokens";
import type {
  TabPanelProps,
  TabShowcaseProps,
  TabsItem,
  TabsProps,
  TabsShowcaseState,
  TabsType,
} from "./tabs.types";

export type {
  TabPanelProps,
  TabShowcaseProps,
  TabsItem,
  TabsProps,
  TabsShowcaseState,
  TabsType,
} from "./tabs.types";

function getTabTextClass(
  state: TabsShowcaseState,
  active: boolean,
  disabled: boolean
) {
  if (disabled || state === "disabled") {
    return "text-[color:var(--tabs-color-disabled)] cursor-not-allowed";
  }
  if (active || state === "active") {
    return "text-[color:var(--tabs-color-active)] font-medium";
  }
  if (state === "hover") {
    return "text-[color:var(--tabs-color-hover)]";
  }
  return "text-[color:var(--tabs-text-default)]";
}

function TabButton({
  item,
  active,
  disabled,
  size,
  type,
  showcaseState,
  closable,
  onSelect,
  onClose,
  className,
}: {
  item: TabsItem;
  active: boolean;
  disabled: boolean;
  size: TabsSizeKey;
  type: TabsType;
  showcaseState?: TabsShowcaseState;
  closable?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  className?: string;
}) {
  const spec = tabsSizeSpecs[size];
  const isDisabled = disabled || item.disabled || showcaseState === "disabled";
  const isActive = active || showcaseState === "active";
  const isShowcase = showcaseState !== undefined;
  const showClose = closable && !isShowcase && onClose;

  const baseClass = cn(
    "relative inline-flex shrink-0 items-center justify-center gap-1.5 border-0 bg-transparent transition-colors duration-150",
    getTabTextClass(showcaseState ?? "default", isActive, isDisabled),
    !isShowcase &&
      !isDisabled &&
      "cursor-pointer hover:text-[color:var(--tabs-color-hover)]",
    type === "card" && "border px-3",
    type === "card" &&
      (isActive
        ? "border-[color:var(--tabs-border-color)] bg-background shadow-sm"
        : "border-transparent bg-transparent"),
    type === "segment" && "rounded-sm px-3",
    type === "segment" && isActive && "bg-background shadow-sm",
    className
  );

  const style = {
    height: spec.height,
    paddingLeft: type === "line" ? spec.paddingX : undefined,
    paddingRight: type === "line" ? spec.paddingX : undefined,
    fontSize: resolveFontSize(spec.fontSizeKey).fontSize,
    borderRadius: type === "card" ? "var(--tabs-card-radius)" : undefined,
  };

  const content = (
    <>
      {item.icon ? (
        <span className="inline-flex shrink-0 [&_svg]:size-4">{item.icon}</span>
      ) : null}
      <span>{item.label}</span>
      {showClose ? (
        <span
          role="button"
          tabIndex={0}
          className="ml-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }
          }}
          aria-label="关闭标签"
        >
          <X size={12} />
        </span>
      ) : null}
      {type === "line" && isActive ? (
        <span
          className="absolute bottom-0 left-2 right-2 rounded-full bg-[color:var(--tabs-indicator-color)]"
          style={{ height: spec.indicator }}
        />
      ) : null}
    </>
  );

  if (isShowcase) {
    return (
      <span className={baseClass} style={style} data-showcase>
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={isDisabled}
      className={cn(
        baseClass,
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      )}
      style={style}
      onClick={() => {
        if (!isDisabled) onSelect?.();
      }}
    >
      {content}
    </button>
  );
}

export function TabShowcase({
  label,
  icon,
  state,
  size = "md",
  type = "line",
  className,
}: TabShowcaseProps) {
  return (
    <TabButton
      item={{ key: "showcase", label, icon }}
      active={state === "active"}
      disabled={state === "disabled"}
      size={size}
      type={type}
      showcaseState={state}
      className={className}
    />
  );
}

export function TabPanel({
  activeKey,
  tabKey,
  children,
  className,
}: TabPanelProps) {
  if (activeKey !== tabKey) return null;
  return (
    <div role="tabpanel" className={cn("pt-4 text-sm text-foreground", className)}>
      {children}
    </div>
  );
}

export function Tabs({
  items,
  activeKey: controlledKey,
  defaultActiveKey,
  disabled: groupDisabled,
  size = "md",
  type = "line",
  className,
  onChange,
  closable = false,
  editable = false,
  onTabClose,
  onTabAdd,
  overflow = false,
}: TabsProps) {
  const firstKey = items[0]?.key ?? "";
  const [innerKey, setInnerKey] = useState(defaultActiveKey ?? firstKey);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isControlled = controlledKey !== undefined;
  const activeKey = isControlled ? controlledKey : innerKey;

  const handleSelect = (key: string) => {
    if (!isControlled) setInnerKey(key);
    onChange?.(key);
  };

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !overflow) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, [overflow]);

  useEffect(() => {
    updateScrollHints();
    if (!overflow) return;
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateScrollHints);
    window.addEventListener("resize", updateScrollHints);
    return () => {
      el?.removeEventListener("scroll", updateScrollHints);
      window.removeEventListener("resize", updateScrollHints);
    };
  }, [items, overflow, updateScrollHints]);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const listClass = cn(
    "inline-flex min-w-0 items-center",
    type === "line" && "gap-1 border-b border-[color:var(--tabs-border-color)]",
    type === "card" &&
      "gap-2 rounded-[var(--tabs-card-radius)] border border-[color:var(--tabs-border-color)] bg-muted/30 p-1",
    type === "segment" &&
      "gap-1 rounded-[var(--tabs-card-radius)] bg-[color:var(--tabs-segment-track)] p-1",
    overflow && "flex-nowrap",
    !overflow && "flex-wrap"
  );

  const canCloseTab = (item: TabsItem) => {
    if (items.length <= 1) return false;
    return closable || item.closable;
  };

  const nav = (
    <div
      ref={overflow ? scrollRef : undefined}
      className={cn(listClass, overflow && "overflow-x-auto scrollbar-none")}
      role="tablist"
    >
      {items.map((item) => (
        <TabButton
          key={item.key}
          item={item}
          active={activeKey === item.key}
          disabled={Boolean(groupDisabled)}
          size={size}
          type={type}
          closable={canCloseTab(item)}
          onSelect={() => handleSelect(item.key)}
          onClose={() => onTabClose?.(item.key)}
        />
      ))}
      {editable ? (
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-[var(--tabs-card-radius)] border border-dashed border-[color:var(--tabs-border-color)] px-2 text-[color:var(--tabs-color-active)] transition-colors hover:border-[color:var(--tabs-color-hover)] hover:bg-primary/5"
          style={{ height: tabsSizeSpecs[size].height }}
          onClick={onTabAdd}
          aria-label="新增标签"
        >
          <Plus size={16} />
        </button>
      ) : null}
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {overflow ? (
        <div className="relative flex items-center gap-1">
          {canScrollLeft ? (
            <button
              type="button"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--tabs-card-radius)] border border-[color:var(--tabs-border-color)] bg-background text-muted-foreground hover:text-[color:var(--tabs-color-active)]"
              onClick={() => scrollBy(-160)}
              aria-label="向左滚动"
            >
              <ChevronLeft size={16} />
            </button>
          ) : null}
          <div className="min-w-0 flex-1">{nav}</div>
          {canScrollRight ? (
            <button
              type="button"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--tabs-card-radius)] border border-[color:var(--tabs-border-color)] bg-background text-muted-foreground hover:text-[color:var(--tabs-color-active)]"
              onClick={() => scrollBy(160)}
              aria-label="向右滚动"
            >
              <ChevronRight size={16} />
            </button>
          ) : null}
        </div>
      ) : (
        nav
      )}
    </div>
  );
}

export const DEFAULT_TABS_ITEMS: TabsItem[] = [
  { key: "1", label: "Tab 1" },
  { key: "2", label: "Tab 2" },
  { key: "3", label: "Tab 3" },
  { key: "4", label: "Tab 4" },
];
