import { cn } from "../../lib/utils";

export const dropdownPanelClass = (className?: string) =>
  cn(
    "origin-top overflow-hidden rounded-[var(--dropdown-panel-radius,8px)] border border-[color:var(--dropdown-border,#e5e6eb)] bg-[color:var(--dropdown-bg,#ffffff)] p-1 shadow-[var(--dropdown-panel-shadow)] outline-none",
    className
  );

export const dropdownItemClass = ({
  active,
  danger,
  disabled,
}: {
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
}) =>
  cn(
    "flex h-[var(--dropdown-item-height,36px)] w-full cursor-pointer items-center gap-2 rounded-[var(--dropdown-item-radius,6px)] border-0 px-3 text-[13px] outline-none ring-0 transition-colors focus-visible:outline-none",
    disabled
      ? "cursor-not-allowed opacity-50"
      : danger
        ? "text-[color:var(--dropdown-danger,#f53f3f)] hover:bg-[color:var(--dropdown-option-hover,#e8f3ff)] active:bg-[color:var(--dropdown-option-active,#e8f0ff)]"
        : "text-[color:var(--dropdown-text-primary,#1d2129)] hover:bg-[color:var(--dropdown-option-hover,#e8f3ff)] active:bg-[color:var(--dropdown-option-active,#e8f0ff)]",
    active &&
      !disabled &&
      "bg-[color:var(--dropdown-option-hover,#e8f3ff)]",
    disabled && "pointer-events-none"
  );

export const dropdownDividerClass = () =>
  "my-1 h-px border-0 bg-[color:var(--dropdown-border,#e5e6eb)]";

export const dropdownMenuMotionClass = (open: boolean) =>
  cn(
    "transition-[opacity,transform] duration-[var(--dropdown-motion-duration,150ms)] ease-[var(--dropdown-motion-easing,ease-out)]",
    open
      ? "pointer-events-auto scale-y-100 opacity-100"
      : "pointer-events-none scale-y-95 opacity-0"
  );
