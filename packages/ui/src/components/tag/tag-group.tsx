"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { tagSizeSpecs } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { Tag } from "./tag";
import type { TagGroupItem, TagGroupMode, TagGroupProps, TagStatus } from "./tag.types";

function TagCount({
  count,
  active,
  size,
}: {
  count: number;
  active: boolean;
  size: TagGroupProps["size"];
}) {
  const spec = tagSizeSpecs[size ?? "md"];
  return (
    <span
      className={cn(
        "inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 tabular-nums leading-none",
        active
          ? "bg-[color:var(--tag-primary,#165DFF)] text-white"
          : "bg-[color:var(--tag-border-default,#E5E6EB)] text-[color:var(--tag-text-default,rgba(0,0,0,0.45))]"
      )}
      style={{ fontSize: `calc(${spec.fontSize} - 1px)` }}
    >
      {count}
    </span>
  );
}

function SegmentedTagGroup({
  items,
  value,
  onChange,
  size = "lg",
  scrollable = false,
  className,
  ariaLabel,
}: {
  items: TagGroupItem[];
  value: string;
  onChange?: (value: string) => void;
  size?: TagGroupProps["size"];
  scrollable?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const spec = tagSizeSpecs[size];
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, height: 0 });

  const enabledItems = items.filter((i) => !i.disabled);
  const activeIndex = Math.max(
    0,
    enabledItems.findIndex((i) => i.value === value)
  );

  const updateIndicator = useCallback(() => {
    const el = itemRefs.current.get(value);
    const track = trackRef.current;
    if (!el || !track) return;
    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
    });
  }, [value]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator, items]);

  const focusItem = (index: number) => {
    const item = enabledItems[index];
    if (!item) return;
    itemRefs.current.get(item.value)?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const len = enabledItems.length;
    if (!len) return;

    let next = activeIndex;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        next = (activeIndex + 1) % len;
        onChange?.(enabledItems[next].value);
        focusItem(next);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        next = (activeIndex - 1 + len) % len;
        onChange?.(enabledItems[next].value);
        focusItem(next);
        break;
      case "Home":
        e.preventDefault();
        onChange?.(enabledItems[0].value);
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        onChange?.(enabledItems[len - 1].value);
        focusItem(len - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={trackRef}
      role="tablist"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex max-w-full items-center gap-0.5 rounded-[var(--tag-radius-md,6px)] bg-[color:var(--tag-segment-track,#F2F3F5)] p-1",
        scrollable && "flex-nowrap overflow-x-auto",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 rounded-[4px] bg-[color:var(--tag-segment-indicator,#FFFFFF)] shadow-sm transition-[left,width] duration-200 ease-out"
        style={{
          left: indicator.left,
          width: indicator.width,
          height: indicator.height || `calc(${spec.height} - 2px)`,
        }}
      />
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(node) => {
              if (node) itemRefs.current.set(item.value, node);
              else itemRefs.current.delete(item.value);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange?.(item.value)}
            className={cn(
              "relative z-[1] inline-flex shrink-0 items-center gap-1.5 rounded-[4px] border-0 bg-transparent px-3 font-medium outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-[color:var(--tag-primary,#165DFF)]/30",
              active
                ? "text-[color:var(--tag-primary,#165DFF)]"
                : "text-[color:var(--tag-text-default,rgba(0,0,0,0.65))] hover:text-[color:var(--tag-primary,#165DFF)]",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
            style={{
              height: spec.height,
              fontSize: spec.fontSize,
            }}
          >
            <span>{item.label}</span>
            {item.count != null ? (
              <TagCount count={item.count} active={active} size={size} />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function SelectableTagItem({
  item,
  active,
  size,
  onClick,
}: {
  item: TagGroupItem;
  active: boolean;
  size: TagGroupProps["size"];
  onClick: () => void;
}) {
  const status: TagStatus = active
    ? item.status ?? "primary"
    : "default";

  return (
    <button
      type="button"
      role={undefined}
      aria-pressed={active}
      disabled={item.disabled}
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1.5 border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
    >
      <Tag
        variant={active ? "light" : "outline"}
        status={status}
        size={size}
        className={cn(item.disabled && "opacity-50")}
      >
        {item.label}
      </Tag>
      {item.count != null ? (
        <TagCount count={item.count} active={active} size={size} />
      ) : null}
    </button>
  );
}

export function TagGroup({
  items,
  mode = "none",
  value: controlledValue,
  defaultValue,
  onChange,
  size = "md",
  scrollable = false,
  className,
  "aria-label": ariaLabel,
}: TagGroupProps) {
  const groupId = useId();
  const firstValue = items[0]?.value ?? "";
  const [innerValue, setInnerValue] = useState<string | string[]>(
    defaultValue ?? (mode === "multiple" ? [] : firstValue)
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : innerValue;

  const setValue = (next: string | string[]) => {
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
  };

  if (mode === "segmented") {
    const single = typeof value === "string" ? value : String(value[0] ?? firstValue);
    return (
      <SegmentedTagGroup
        items={items}
        value={single}
        onChange={(v) => setValue(v)}
        size={size}
        scrollable={scrollable}
        className={className}
        ariaLabel={ariaLabel ?? "标签组"}
      />
    );
  }

  if (mode === "single") {
    const single = typeof value === "string" ? value : String(value[0] ?? firstValue);
    return (
      <div
        role="tablist"
        aria-label={ariaLabel ?? "标签组"}
        className={cn(
          "flex items-center gap-2",
          scrollable ? "flex-nowrap overflow-x-auto" : "flex-wrap",
          className
        )}
      >
        {items.map((item) => (
          <SelectableTagItem
            key={item.value}
            item={item}
            active={item.value === single}
            size={size}
            onClick={() => setValue(item.value)}
          />
        ))}
      </div>
    );
  }

  if (mode === "multiple") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div
        role="group"
        aria-label={ariaLabel ?? "标签组"}
        className={cn(
          "flex items-center gap-2",
          scrollable ? "flex-nowrap overflow-x-auto" : "flex-wrap",
          className
        )}
      >
        {items.map((item) => {
          const active = selected.includes(item.value);
          return (
            <SelectableTagItem
              key={item.value}
              item={item}
              active={active}
              size={size}
              onClick={() => {
                const next = active
                  ? selected.filter((v) => v !== item.value)
                  : [...selected, item.value];
                setValue(next);
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-labelledby={groupId}
      className={cn(
        "flex items-center gap-2",
        scrollable ? "flex-nowrap overflow-x-auto" : "flex-wrap",
        className
      )}
    >
      <span id={groupId} className="sr-only">
        {ariaLabel ?? "标签列表"}
      </span>
      {items.map((item) => (
        <Tag
          key={item.value}
          variant="outline"
          status={item.status ?? "default"}
          size={size}
        >
          {item.label}
        </Tag>
      ))}
    </div>
  );
}
