import type { CSSProperties } from "react";
import { transferProTokens } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";

export { transferProTokens, transferProTokenRows } from "@yd-ds/tokens";

const TRANSFER_PRO_THEME_TOKEN_PREFIXES = [
  "transfer-pro-color-",
  "transfer-pro-mode-",
  "transfer-pro-diff-",
  "transfer-pro-rule-tag-bg",
] as const;

function isTransferProThemeToken(key: string) {
  return TRANSFER_PRO_THEME_TOKEN_PREFIXES.some(
    (prefix) => key === prefix || key.startsWith(prefix)
  );
}

export const transferProCssVars: Record<string, string> = Object.fromEntries(
  Object.entries(transferProTokens)
    .filter(([key]) => !isTransferProThemeToken(key))
    .map(([key, value]) => [`--${key}`, value])
);

export function transferProRootClass(className?: string) {
  return cn("flex w-full items-stretch gap-[var(--transfer-pro-gap,16px)]", className);
}

export function transferProPanelClass(className?: string) {
  return cn(
    "flex min-h-[calc(var(--transfer-pro-list-height,360px)+var(--transfer-pro-header-height,40px)+56px)] min-w-[var(--transfer-pro-panel-min-width,280px)] flex-col self-stretch overflow-hidden rounded-[var(--transfer-pro-border-radius,8px)] border border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[var(--transfer-pro-color-bg,#fff)]",
    className
  );
}

export function transferProPanelTableClass(className?: string) {
  return cn(
    transferProPanelClass(),
    "h-full w-full min-w-[var(--transfer-pro-table-panel-min-width,520px)]",
    className
  );
}

export function transferProPanelSearchClass(className?: string) {
  return cn(
    "relative z-[1] shrink-0 border-b border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[var(--transfer-pro-color-bg,#fff)] px-3 py-2",
    className
  );
}

export function transferProPanelHeaderClass() {
  return cn(
    "relative z-[1] flex h-[var(--transfer-pro-header-height,40px)] shrink-0 items-center justify-between border-b border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[var(--transfer-pro-color-bg,#fff)] px-3",
    "text-[length:var(--transfer-pro-title-font-size,14px)] font-medium text-[color:var(--transfer-pro-color-title,#1d2129)]"
  );
}

export function transferProPanelBodyClass() {
  return cn("min-h-0 flex-1 overflow-y-auto overflow-x-auto");
}

export function transferProPanelTableBodyClass() {
  return cn("min-h-0 flex-1 overflow-auto");
}

export function transferProOperationsClass() {
  return cn(
    "sticky top-[var(--transfer-pro-operations-sticky-top,0px)] flex flex-col items-center justify-center gap-2 self-center"
  );
}

export function transferProOperationButtonClass(disabled?: boolean) {
  return cn(
    "inline-flex h-8 w-8 items-center justify-center rounded-[var(--transfer-pro-border-radius,8px)] border transition-colors",
    disabled
      ? "cursor-not-allowed border-transparent bg-[var(--transfer-pro-color-operation-disabled-bg,#f2f3f5)] text-[color:var(--transfer-pro-color-operation-disabled-text,#c9cdd4)]"
      : "border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[var(--transfer-pro-color-operation-bg,#165dff)] text-white hover:opacity-90 active:opacity-80"
  );
}

export function transferProItemClass({
  selected,
  disabled,
  diffType,
  className,
}: {
  selected?: boolean;
  disabled?: boolean;
  diffType?: "add" | "remove" | "unchanged";
  className?: string;
}) {
  return cn(
    "group flex h-[var(--transfer-pro-item-height,32px)] cursor-pointer items-center gap-2 px-3 text-[13px] transition-colors",
    disabled
      ? "cursor-not-allowed opacity-[var(--transfer-pro-color-disabled-opacity,0.45)]"
      : diffType === "add"
        ? "bg-[color:color-mix(in_srgb,var(--transfer-pro-diff-add,#00b42a)_12%,transparent)]"
        : diffType === "remove"
          ? "bg-[color:color-mix(in_srgb,var(--transfer-pro-diff-remove,#f53f3f)_12%,transparent)]"
          : selected
            ? "bg-[var(--transfer-pro-color-item-selected-bg,rgba(22,93,255,0.08))]"
            : "hover:bg-[var(--transfer-pro-color-item-hover-bg,#e8f0ff)]",
    className
  );
}

export function transferProDiffBadgeClass(type: "add" | "remove") {
  return cn(
    "rounded px-1.5 py-0.5 text-[11px] font-medium",
    type === "add"
      ? "bg-[color:color-mix(in_srgb,var(--transfer-pro-diff-add,#00b42a)_16%,transparent)] text-[color:var(--transfer-pro-diff-add,#00b42a)]"
      : "bg-[color:color-mix(in_srgb,var(--transfer-pro-diff-remove,#f53f3f)_16%,transparent)] text-[color:var(--transfer-pro-diff-remove,#f53f3f)]"
  );
}

export function transferProRuleTagClass() {
  return transferProToolbarButtonClass(true);
}

export function transferProToolbarButtonClass(active?: boolean) {
  return cn(
    "inline-flex items-center rounded px-2 py-0.5 text-[12px] font-medium leading-5 transition-colors",
    active
      ? "bg-[var(--transfer-pro-rule-tag-bg,#e8f0ff)] text-[color:var(--transfer-pro-mode-tree,#165dff)]"
      : "text-[color:var(--transfer-pro-color-text-secondary,#86909c)] hover:bg-[var(--transfer-pro-color-item-hover-bg,#e8f0ff)]"
  );
}

export function transferProModeBadgeClass() {
  return cn(
    "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
    "border border-[color:var(--transfer-pro-color-border,#f0f0f0)]"
  );
}

export function getTransferProModeBadgeStyle(mode: "tree" | "table" | "list"): CSSProperties {
  return {
    color:
      mode === "tree"
        ? "var(--transfer-pro-mode-tree,#165dff)"
        : mode === "table"
          ? "var(--transfer-pro-mode-table,#0e4ad9)"
          : "var(--transfer-pro-color-text-secondary,#86909c)",
  };
}
