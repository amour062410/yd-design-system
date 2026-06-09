"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { DropdownTriggerProvider } from "./dropdown-link-trigger";
import { computeDropdownPosition } from "./dropdown-position";
import { DropdownMenu } from "./dropdown-menu";
import { dropdownMenuMotionClass, dropdownPanelClass } from "./dropdown.styles";
import {
  isDropdownDivider,
  type DropdownMenuItemConfig,
  type DropdownProps,
} from "./dropdown.types";

export function Dropdown({
  trigger,
  menu,
  placement = "bottomLeft",
  triggerEvent = "click",
  disabled = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onMenuClick,
  className,
  menuClassName,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
}: DropdownProps) {
  const isControlled = controlledOpen !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? controlledOpen : innerOpen;
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const triggerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<number | undefined>(undefined);
  const leaveTimer = useRef<number | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);
  const resizeObsRef = useRef<ResizeObserver | null>(null);
  const menuId = useId();

  const canOpen = !disabled && menu.length > 0;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
      if (next) setActiveIndex(0);
    },
    [isControlled, onOpenChange]
  );

  const scheduleOpen = useCallback(() => {
    if (!canOpen) return;
    window.clearTimeout(leaveTimer.current);
    enterTimer.current = window.setTimeout(() => setOpen(true), mouseEnterDelay);
  }, [canOpen, mouseEnterDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(enterTimer.current);
    leaveTimer.current = window.setTimeout(() => setOpen(false), mouseLeaveDelay);
  }, [mouseLeaveDelay, setOpen]);

  useEffect(() => {
    setMounted(true);
    return () => {
      window.clearTimeout(enterTimer.current);
      window.clearTimeout(leaveTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (!actualOpen || !canOpen) {
      setPos(null);
      return;
    }

    const triggerEl = triggerRef.current;
    const menuEl = menuRef.current;
    if (!triggerEl || !menuEl) return;

    const compute = () => {
      const rect = triggerEl.getBoundingClientRect();
      const next = computeDropdownPosition(rect, {
        width: menuEl.offsetWidth,
        height: menuEl.offsetHeight,
      }, placement);
      setPos({ x: next.x, y: next.y });
    };

    // Delay first measurement until browser has laid out menu content
    const raf = requestAnimationFrame(() => {
      compute();
      // Double-check next frame in case content is still settling
      rafRef.current = requestAnimationFrame(compute);
    });

    // Recompute on scroll / resize
    const onScrollResize = () => compute();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);

    // Recompute when menu size changes (content, font load, etc.)
    const ro = new ResizeObserver(() => compute());
    ro.observe(menuEl);
    resizeObsRef.current = ro;

    return () => {
      cancelAnimationFrame(raf);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
      ro.disconnect();
      resizeObsRef.current = null;
    };
  }, [actualOpen, canOpen, placement, menu.length]);

  useEffect(() => {
    if (!actualOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [actualOpen, setOpen]);

  useEffect(() => {
    if (!actualOpen) return;
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  }, [actualOpen]);

  const handleSelect = (item: DropdownMenuItemConfig) => {
    item.onClick?.();
    onMenuClick?.(item.key, item);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const triggerProps = {
    "aria-haspopup": "menu" as const,
    "aria-expanded": actualOpen,
    "aria-controls": actualOpen ? menuId : undefined,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : 0,
    onClick: (event: ReactMouseEvent<HTMLSpanElement>) => {
      if (disabled) return;
      if (triggerEvent === "click") {
        event.preventDefault();
        setOpen(!actualOpen);
      }
    },
    onMouseEnter: () => {
      if (disabled || triggerEvent !== "hover") return;
      scheduleOpen();
    },
    onMouseLeave: () => {
      if (triggerEvent !== "hover") return;
      scheduleClose();
    },
    onKeyDown: (event: ReactKeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
    },
  };

  const selectableCount = menu.filter(
    (item) => !isDropdownDivider(item) && !item.disabled
  ).length;

  const panel =
    mounted && canOpen && actualOpen ? (
      <div
        ref={menuRef}
        role="presentation"
        className={cn(
          dropdownPanelClass(menuClassName),
          dropdownMenuMotionClass(true)
        )}
        style={{
          position: "fixed",
          left: pos?.x ?? -9999,
          top: pos?.y ?? -9999,
          zIndex: "var(--dropdown-z-index, 1050)",
          minWidth: "var(--dropdown-min-width, 140px)",
          visibility: pos ? "visible" : "hidden",
        }}
        onMouseEnter={() => {
          if (triggerEvent === "hover") scheduleOpen();
        }}
        onMouseLeave={() => {
          if (triggerEvent === "hover") scheduleClose();
        }}
      >
        <DropdownMenu
          id={menuId}
          items={menu}
          activeIndex={Math.min(activeIndex, Math.max(selectableCount - 1, 0))}
          onActiveIndexChange={setActiveIndex}
          onSelect={handleSelect}
        />
      </div>
    ) : null;

  return (
    <>
      <DropdownTriggerProvider open={actualOpen} disabled={disabled}>
        <span
          ref={triggerRef}
          className={cn("inline-flex outline-none", className)}
          {...triggerProps}
        >
          {trigger as ReactNode}
        </span>
      </DropdownTriggerProvider>
      {panel && createPortal(panel, document.body)}
    </>
  );
}
