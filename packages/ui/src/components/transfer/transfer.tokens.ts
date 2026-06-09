import { transferTokens } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";

export { transferTokens, transferTokenRows, transferUsageTokenNames } from "@yd-ds/tokens";
export type { TransferTokenKey } from "@yd-ds/tokens";

export const transferCssVars: Record<string, string> = Object.fromEntries(
  Object.entries(transferTokens)
    .filter(([key]) => !key.startsWith("transfer-color-"))
    .map(([key, value]) => [`--${key}`, value])
);

export function transferRootClass(className?: string) {
  return cn("flex items-stretch gap-[var(--transfer-gap,16px)]", className);
}

export function transferPanelClass(className?: string) {
  return cn(
    "flex w-[var(--transfer-panel-width,240px)] flex-col overflow-hidden rounded-[var(--transfer-border-radius,8px)] border border-[color:var(--transfer-color-border,#f0f0f0)] bg-[var(--transfer-color-bg,#fff)]",
    className
  );
}

export function transferPanelHeaderClass() {
  return cn(
    "flex h-[var(--transfer-header-height,40px)] shrink-0 items-center justify-between border-b border-[color:var(--transfer-color-border,#f0f0f0)] bg-[var(--transfer-color-bg,#fff)] px-3",
    "text-[length:var(--transfer-title-font-size,14px)] font-[var(--transfer-title-font-weight,500)] text-[color:var(--transfer-color-title,#1d2129)]"
  );
}

export function transferPanelBodyClass(className?: string) {
  return cn("min-h-0 flex-1 overflow-y-auto", className);
}

export function transferPanelFooterClass() {
  return cn(
    "shrink-0 border-t border-[color:var(--transfer-color-border,#f0f0f0)] bg-[var(--transfer-color-footer-bg,#f7f8fa)] px-3 py-2",
    "text-[12px] text-[color:var(--transfer-color-text-secondary,#86909c)]"
  );
}

export function transferOperationColumnClass() {
  return cn("flex flex-col items-center justify-center gap-2 self-center");
}

export function transferOperationButtonClass(disabled?: boolean) {
  return cn(
    "inline-flex h-8 w-8 items-center justify-center rounded-[var(--transfer-border-radius,8px)] border border-[color:var(--transfer-color-border,#f0f0f0)] transition-colors",
    disabled
      ? "cursor-not-allowed border-transparent bg-[var(--transfer-color-operation-disabled-bg,#f2f3f5)] text-[color:var(--transfer-color-operation-disabled-text,#c9cdd4)]"
      : "bg-[var(--transfer-color-operation-bg,#165dff)] text-white hover:opacity-90 active:opacity-80"
  );
}

export function transferItemClass({
  selected,
  disabled,
  className,
}: {
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return cn(
    "flex h-[var(--transfer-item-height,32px)] cursor-pointer items-center gap-2 px-3 text-[13px] text-[color:var(--transfer-color-text,#1d2129)] transition-colors",
    disabled
      ? "cursor-not-allowed opacity-[var(--transfer-color-disabled-opacity,0.45)]"
      : selected
        ? "bg-[var(--transfer-color-item-selected-bg,rgba(22,93,255,0.08))]"
        : "hover:bg-[var(--transfer-color-item-hover-bg,#e8f0ff)]",
    className
  );
}

export function transferSearchWrapClass() {
  return cn(
    "border-b border-[color:var(--transfer-color-border,#f0f0f0)] bg-[var(--transfer-color-bg,#fff)] px-3 py-2"
  );
}
