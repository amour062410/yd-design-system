import { cn } from "../../lib/utils";

export const treeCssVars = {
  bg: "--tree-color-bg",
  border: "--tree-color-border",
  title: "--tree-color-title",
  titleSelected: "--tree-color-title-selected",
  nodeHoverBg: "--tree-color-node-hover-bg",
  nodeSelectedBg: "--tree-color-node-selected-bg",
  searchHighlight: "--tree-color-search-highlight",
  indent: "--tree-indent-size",
  nodeHeight: "--tree-node-height",
  radius: "--tree-radius",
} as const;

export function treeRootClass(className?: string) {
  return cn(
    "rounded-[var(--tree-radius,8px)] border border-[color:var(--tree-color-border,#f0f0f0)]",
    "bg-[color:var(--tree-color-bg,#ffffff)] text-[length:var(--tree-font-size,13px)]",
    className
  );
}

export function treeSearchClass() {
  return cn("border-b border-[color:var(--tree-color-border,#f0f0f0)] p-3");
}

export function treeListClass() {
  return cn("max-h-[480px] overflow-auto p-1");
}

export function treeNodeRowClass({
  selected,
  disabled,
  blockNode,
}: {
  selected?: boolean;
  disabled?: boolean;
  blockNode?: boolean;
}) {
  return cn(
    "group flex min-h-[var(--tree-node-height,32px)] items-center rounded-[4px] pr-2 transition-colors duration-150",
    blockNode && "w-full",
    disabled
      ? "cursor-not-allowed text-[color:var(--tree-color-title-disabled,#c9cdd4)]"
      : "cursor-pointer",
    !disabled && !selected && "hover:bg-[color:var(--tree-color-node-hover-bg,rgba(22,93,255,0.04))]",
    selected && "bg-[color:var(--tree-color-node-selected-bg,rgba(22,93,255,0.08))]"
  );
}

export function treeNodeTitleClass({ selected, disabled }: { selected?: boolean; disabled?: boolean }) {
  return cn(
    "min-w-0 flex-1 truncate leading-[22px]",
    selected && !disabled && "font-medium text-[color:var(--tree-color-title-selected,#165dff)]",
    !selected && !disabled && "text-[color:var(--tree-color-title,#1d2129)]"
  );
}

export function treeSwitcherClass({ disabled, leaf }: { disabled?: boolean; leaf?: boolean }) {
  return cn(
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm",
    leaf && "pointer-events-none opacity-0",
    !leaf && !disabled && "text-[color:var(--tree-color-switcher,#86909c)] hover:text-[color:var(--tree-color-title-selected,#165dff)]"
  );
}

export function treeIconClass() {
  return cn("mr-1.5 inline-flex shrink-0 text-[color:var(--tree-color-icon,#86909c)] [&_svg]:size-4");
}

export function treeCheckboxWrapClass() {
  return cn("mr-1.5 inline-flex shrink-0 items-center");
}

export function treeEmptyClass() {
  return cn("px-3 py-6 text-center text-[13px] text-[color:var(--color-text-tertiary,#86909c)]");
}

export function treeLoadingClass() {
  return cn("ml-1 inline-block size-3 animate-spin rounded-full border-2 border-[color:var(--color-brand,#165dff)] border-t-transparent");
}
