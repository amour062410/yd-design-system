import { cn } from "../../lib/utils";

export const popconfirmPanelClass = (className?: string) =>
  cn(
    "origin-top overflow-hidden rounded-[var(--popconfirm-panel-radius,8px)] border border-[color:var(--popconfirm-border,#e5e6eb)] bg-[color:var(--popconfirm-bg,#ffffff)] p-4 shadow-[var(--popconfirm-panel-shadow)] outline-none",
    className
  );

export const popconfirmMotionClass = (open: boolean) =>
  cn(
    "transition-[opacity,transform] duration-[var(--popconfirm-motion-duration,150ms)] ease-[var(--popconfirm-motion-easing,ease-out)]",
    open
      ? "pointer-events-auto scale-100 opacity-100"
      : "pointer-events-none scale-95 opacity-0"
  );

export const popconfirmFooterClass = () =>
  "mt-4 flex justify-end gap-[var(--popconfirm-footer-gap,8px)]";
