"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { tooltipPresetColors } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { computeTooltipPosition } from "./tooltip-position";
import type {
  TooltipPosition,
  TooltipProps,
  TooltipSide,
  TooltipTrigger,
} from "./tooltip.types";

const GAP = 8;
const ARROW = 8;
const HALF = ARROW / 2;

function resolveColor(color: string): string {
  return (
    (tooltipPresetColors as Record<string, string>)[color] ?? color
  );
}

function arrowStyleFor(
  side: TooltipSide,
  offset: number,
  bg: string
): CSSProperties {
  const base: CSSProperties = {
    position: "absolute",
    width: ARROW,
    height: ARROW,
    background: bg,
    transform: "rotate(45deg)",
  };
  if (side === "top") return { ...base, bottom: -HALF, left: offset, marginLeft: -HALF };
  if (side === "bottom") return { ...base, top: -HALF, left: offset, marginLeft: -HALF };
  if (side === "left") return { ...base, right: -HALF, top: offset, marginTop: -HALF };
  return { ...base, left: -HALF, top: offset, marginTop: -HALF };
}

export function Tooltip({
  content,
  children,
  placement = "top",
  trigger = ["hover", "focus"],
  color = "default",
  open,
  defaultOpen = false,
  onOpenChange,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  disabled = false,
  arrow = true,
  maxWidth,
  className,
  zIndex = 1070,
}: TooltipProps) {
  const isControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? open : innerOpen;

  const triggerRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<number | undefined>(undefined);
  const leaveTimer = useRef<number | undefined>(undefined);

  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<TooltipPosition | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      window.clearTimeout(enterTimer.current);
      window.clearTimeout(leaveTimer.current);
    };
  }, []);

  const triggers: TooltipTrigger[] = Array.isArray(trigger) ? trigger : [trigger];
  const hasContent = content != null && content !== "";
  const canOpen = !disabled && hasContent;
  const bg = resolveColor(color);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const scheduleOpen = useCallback(() => {
    window.clearTimeout(leaveTimer.current);
    enterTimer.current = window.setTimeout(() => setOpen(true), mouseEnterDelay);
  }, [mouseEnterDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(enterTimer.current);
    leaveTimer.current = window.setTimeout(() => setOpen(false), mouseLeaveDelay);
  }, [mouseLeaveDelay, setOpen]);

  useLayoutEffect(() => {
    if (!actualOpen || !canOpen) return;
    const update = () => {
      const triggerEl = triggerRef.current;
      const tipEl = tipRef.current;
      if (!triggerEl || !tipEl) return;
      const t = triggerEl.getBoundingClientRect();
      const tip = { width: tipEl.offsetWidth, height: tipEl.offsetHeight };
      setPos(
        computeTooltipPosition(t, tip, placement, GAP, {
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [actualOpen, canOpen, placement, content, maxWidth]);

  // Esc 关闭 + click 触发时的外部点击关闭
  useEffect(() => {
    if (!actualOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!triggers.includes("click")) return;
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        tipRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualOpen, setOpen]);

  const wrapperHandlers: React.HTMLAttributes<HTMLSpanElement> = {};
  if (canOpen) {
    if (triggers.includes("hover")) {
      wrapperHandlers.onMouseEnter = scheduleOpen;
      wrapperHandlers.onMouseLeave = scheduleClose;
    }
    if (triggers.includes("focus")) {
      wrapperHandlers.onFocus = () => setOpen(true);
      wrapperHandlers.onBlur = () => setOpen(false);
    }
    if (triggers.includes("click")) {
      wrapperHandlers.onClick = () => setOpen(!actualOpen);
    }
  }

  const showLayer = mounted && actualOpen && canOpen;

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex max-w-full"
        {...wrapperHandlers}
      >
        {children}
      </span>
      {showLayer
        ? createPortal(
            <div
              ref={tipRef}
              role="tooltip"
              onMouseEnter={
                triggers.includes("hover")
                  ? () => window.clearTimeout(leaveTimer.current)
                  : undefined
              }
              onMouseLeave={
                triggers.includes("hover") ? scheduleClose : undefined
              }
              className={cn(
                "pointer-events-auto fixed left-0 top-0 w-max rounded-[4px] px-2 py-1.5 text-[14px] font-normal leading-[22px] shadow-md transition-opacity duration-150",
                className
              )}
              style={{
                transform: pos
                  ? `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)`
                  : undefined,
                zIndex,
                maxWidth: maxWidth ?? "280px",
                background: bg,
                color: "#fff",
                opacity: pos ? 1 : 0,
              }}
            >
              {content}
              {arrow && pos ? (
                <span
                  aria-hidden
                  style={arrowStyleFor(pos.side, pos.arrowOffset, bg)}
                />
              ) : null}
            </div>,
            document.body
          )
        : null}
    </>
  );
}
