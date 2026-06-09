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
import { PopconfirmContent } from "./popconfirm-content";
import { computePopconfirmPosition } from "./popconfirm-position";
import { popconfirmMotionClass, popconfirmPanelClass } from "./popconfirm.styles";
import type { PopconfirmProps } from "./popconfirm.types";

export function Popconfirm({
  title,
  description,
  children,
  onConfirm,
  onCancel,
  confirmText = "确认",
  cancelText = "取消",
  placement = "top",
  trigger = "click",
  disabled = false,
  loading: loadingProp = false,
  danger = false,
  icon,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  overlayClassName,
  zIndex = 1060,
}: PopconfirmProps) {
  const isControlled = controlledOpen !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? controlledOpen : innerOpen;
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [asyncLoading, setAsyncLoading] = useState(false);

  const triggerRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const popconfirmId = useId();

  const loading = loadingProp || asyncLoading;
  const canOpen = !disabled && Boolean(title);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!actualOpen || !canOpen) return;
    const update = () => {
      const triggerEl = triggerRef.current;
      const panelEl = panelRef.current;
      if (!triggerEl || !panelEl) return;
      const rect = triggerEl.getBoundingClientRect();
      const next = computePopconfirmPosition(rect, {
        width: panelEl.offsetWidth,
        height: panelEl.offsetHeight,
      }, placement);
      setPos({ x: next.x, y: next.y });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [actualOpen, canOpen, placement, title, description]);

  useEffect(() => {
    if (!actualOpen) return;
    cancelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel?.();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
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
  }, [actualOpen, onCancel, setOpen]);

  const handleCancel = () => {
    if (loading) return;
    onCancel?.();
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleConfirm = async () => {
    if (loading || !onConfirm) {
      if (!onConfirm) setOpen(false);
      return;
    }
    try {
      const result = onConfirm();
      if (result instanceof Promise) {
        setAsyncLoading(true);
        await result;
      }
      setOpen(false);
      triggerRef.current?.focus();
    } finally {
      setAsyncLoading(false);
    }
  };

  const triggerProps = {
    "aria-haspopup": "dialog" as const,
    "aria-expanded": actualOpen,
    "aria-controls": actualOpen ? popconfirmId : undefined,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : 0,
    onClick: (event: ReactMouseEvent<HTMLSpanElement>) => {
      if (disabled || trigger !== "click") return;
      event.preventDefault();
      setOpen(!actualOpen);
    },
    onKeyDown: (event: ReactKeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
    },
  };

  const panel =
    mounted && canOpen && actualOpen ? (
      <div
        ref={panelRef}
        className={cn(
          popconfirmPanelClass(overlayClassName),
          popconfirmMotionClass(true)
        )}
        style={{
          position: "fixed",
          left: pos?.x ?? -9999,
          top: pos?.y ?? -9999,
          zIndex,
          visibility: pos ? "visible" : "hidden",
        }}
      >
        <PopconfirmContent
          id={popconfirmId}
          title={title}
          description={description}
          icon={icon}
          danger={danger}
          confirmText={confirmText}
          cancelText={cancelText}
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          cancelButtonRef={cancelRef}
        />
      </div>
    ) : null;

  if (!children) {
    return panel && createPortal(panel, document.body);
  }

  return (
    <>
      <span
        ref={triggerRef}
        className={cn("inline-flex outline-none", className)}
        {...triggerProps}
      >
        {children as ReactNode}
      </span>
      {panel && createPortal(panel, document.body)}
    </>
  );
}
