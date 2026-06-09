import { menuTokens } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";

export {
  menuTokens,
  menuTokenRows,
  menuUsageTokenNames,
  type MenuTokenKey,
} from "@yd-ds/tokens";

const MENU_THEME_TOKEN_PREFIXES = [
  "menu-highlight-",
  "menu-hover-bg",
  "menu-color-",
  "menu-group-color",
] as const;

function isMenuThemeToken(key: string) {
  return MENU_THEME_TOKEN_PREFIXES.some(
    (prefix) => key === prefix || key.startsWith(prefix)
  );
}

export const menuCssVars: Record<string, string> = Object.fromEntries(
  Object.entries(menuTokens)
    .filter(([key]) => !isMenuThemeToken(key))
    .map(([key, value]) => [`--${key}`, value])
);

export function menuRootClass({
  mode,
  theme,
  collapsed,
  className,
}: {
  mode: "horizontal" | "vertical";
  theme: "light" | "dark";
  collapsed?: boolean;
  className?: string;
}) {
  return cn(
    "relative m-0 list-none p-0 outline-none",
    mode === "horizontal"
      ? "flex min-w-0 items-stretch border-b border-[color:var(--menu-color-border,#f0f0f0)] bg-[var(--menu-color-bg,#fff)]"
      : cn(
          "inline-flex w-full flex-col bg-[var(--menu-color-bg,#fff)]",
          collapsed && "items-center"
        ),
    theme === "dark" && "menu-theme-dark",
    className
  );
}

export function menuItemClass({
  mode,
  selected,
  disabled,
  collapsed,
  className,
}: {
  mode: "horizontal" | "vertical";
  selected?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  className?: string;
}) {
  return cn(
    "relative flex cursor-pointer select-none items-center border-0 bg-transparent text-left outline-none transition-colors duration-[var(--menu-motion-duration,200ms)]",
    "h-[var(--menu-item-height,40px)] text-[length:var(--menu-font-size,14px)]",
    collapsed
      ? "w-[var(--menu-collapsed-width,48px)] justify-center px-0"
      : "px-[var(--menu-item-padding-inline,16px)]",
    disabled
      ? "cursor-not-allowed text-[color:var(--menu-color-text-secondary,#86909c)] opacity-50"
      : selected
        ? mode === "horizontal"
          ? "font-medium text-[color:var(--menu-highlight-color,#165dff)]"
          : "bg-[var(--menu-highlight-bg,rgba(22,93,255,0.06))] font-medium text-[color:var(--menu-highlight-color,#165dff)]"
        : "text-[color:var(--menu-color-text,#1d2129)] hover:text-[color:var(--menu-highlight-color,#165dff)]",
    !disabled &&
      !selected &&
      mode === "vertical" &&
      "hover:bg-[var(--menu-hover-bg,rgba(0,0,0,0.04))]",
    !disabled &&
      !selected &&
      mode === "horizontal" &&
      "hover:text-[color:var(--menu-highlight-color,#165dff)]",
    className
  );
}

export function menuHorizontalIndicatorClass(selected?: boolean) {
  return cn(
    "pointer-events-none absolute inset-x-[var(--menu-item-padding-inline,16px)] bottom-0 h-[var(--menu-active-bar-width-horizontal,2px)] rounded-full bg-[var(--menu-highlight-color,#165dff)] transition-opacity duration-[var(--menu-motion-duration,200ms)]",
    selected ? "opacity-100" : "opacity-0"
  );
}

export function menuVerticalIndicatorClass(selected?: boolean) {
  return cn(
    "pointer-events-none absolute bottom-1 left-0 top-1 w-[var(--menu-active-bar-width-vertical,3px)] rounded-full bg-[var(--menu-highlight-color,#165dff)] transition-opacity duration-[var(--menu-motion-duration,200ms)]",
    selected ? "opacity-100" : "opacity-0"
  );
}

export function menuIconClass(collapsed?: boolean) {
  return cn(
    "inline-flex shrink-0 items-center justify-center [&_svg]:size-[var(--menu-icon-size,16px)]",
    !collapsed && "mr-[var(--menu-icon-margin-inline-end,8px)]"
  );
}

export function menuLabelClass(collapsed?: boolean) {
  return cn(
    "min-w-0 flex-1 truncate",
    collapsed && "sr-only"
  );
}

export function menuSubMenuTitleClass({
  open,
  disabled,
  collapsed,
  className,
}: {
  open?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  className?: string;
}) {
  return cn(
    menuItemClass({ mode: "vertical", disabled, collapsed, className }),
    open && !disabled && "text-[color:var(--menu-highlight-color,#165dff)]"
  );
}

export function menuExpandIconClass(open?: boolean) {
  return cn(
    "ml-auto inline-flex shrink-0 transition-transform duration-[var(--menu-motion-duration,200ms)] [&_svg]:size-[var(--menu-icon-size,16px)]",
    open && "rotate-180",
    "text-[color:var(--menu-color-text-secondary,#86909c)]"
  );
}

export function menuGroupTitleClass(collapsed?: boolean) {
  return cn(
    "px-[var(--menu-item-padding-inline,16px)] py-2 text-[12px] font-medium uppercase tracking-wide text-[color:var(--menu-group-color,#86909c)]",
    collapsed && "sr-only"
  );
}

export function menuSubMenuListClass(level: number) {
  return cn(
    "m-0 list-none overflow-hidden p-0 transition-[height] duration-[var(--menu-motion-duration,200ms)]",
    level > 0 && "pl-[var(--menu-sub-menu-inline-indent,24px)]"
  );
}

export function menuOverflowTriggerClass() {
  return cn(
    menuItemClass({ mode: "horizontal" }),
    "shrink-0 justify-center px-[var(--menu-item-padding-inline,16px)]"
  );
}

export function menuOverflowPanelClass() {
  return cn(
    "absolute right-0 top-full z-[var(--dropdown-z-index,1050)] mt-1 min-w-[var(--dropdown-min-width,140px)] rounded-[var(--dropdown-panel-radius,8px)] border border-[color:var(--menu-color-border,#f0f0f0)] bg-[var(--menu-color-bg,#fff)] py-1 shadow-[var(--dropdown-panel-shadow,0_20px_25px_-5px_rgb(0_0_0_/_0.1))]"
  );
}

export function menuOverflowItemClass(selected?: boolean) {
  return cn(
    "flex w-full cursor-pointer items-center border-0 bg-transparent px-4 py-2 text-left text-[length:var(--menu-font-size,14px)] outline-none transition-colors",
    selected
      ? "bg-[var(--menu-highlight-bg,rgba(22,93,255,0.06))] font-medium text-[color:var(--menu-highlight-color,#165dff)]"
      : "text-[color:var(--menu-color-text,#1d2129)] hover:bg-[var(--menu-hover-bg,rgba(0,0,0,0.04))]"
  );
}
