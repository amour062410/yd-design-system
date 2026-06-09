"use client";

import { ChevronDown } from "lucide-react";
import { Tooltip } from "../tooltip/tooltip";
import { useMenuContext } from "./menu-context";
import {
  menuExpandIconClass,
  menuIconClass,
  menuLabelClass,
  menuSubMenuListClass,
  menuSubMenuTitleClass,
  menuVerticalIndicatorClass,
} from "./menu.tokens";
import type { MenuSubMenuProps } from "./menu.types";

export function MenuSubMenu({
  itemKey,
  label,
  icon,
  disabled,
  children,
  level = 0,
  className,
}: MenuSubMenuProps) {
  const {
    collapsed,
    expandIcon,
    isOpen,
    onToggleSubMenu,
  } = useMenuContext();

  const open = isOpen(itemKey);

  const handleToggle = () => {
    if (disabled || collapsed) return;
    onToggleSubMenu(itemKey);
  };

  const renderExpandIcon = () => {
    if (typeof expandIcon === "function") {
      return expandIcon({ isOpen: open, disabled });
    }
    if (expandIcon) return expandIcon;
    return <ChevronDown strokeWidth={2} />;
  };

  const titleButton = (
    <button
      type="button"
      role="menuitem"
      aria-expanded={open}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={menuSubMenuTitleClass({
        open,
        disabled,
        collapsed,
        className,
      })}
      style={
        level > 0 && !collapsed
          ? { paddingLeft: `calc(var(--menu-item-padding-inline, 16px) + ${level} * var(--menu-sub-menu-inline-indent, 24px))` }
          : undefined
      }
      onClick={handleToggle}
    >
      <span className={menuVerticalIndicatorClass(false)} aria-hidden />
      {icon ? <span className={menuIconClass(collapsed)}>{icon}</span> : null}
      <span className={menuLabelClass(collapsed)}>{label}</span>
      {!collapsed ? (
        <span className={menuExpandIconClass(open)} aria-hidden>
          {renderExpandIcon()}
        </span>
      ) : null}
    </button>
  );

  return (
    <li role="none">
      {collapsed ? (
        <Tooltip content={label} placement="right" trigger={["hover", "focus"]}>
          {titleButton}
        </Tooltip>
      ) : (
        titleButton
      )}
      {!collapsed && open ? (
        <ul role="group" className={menuSubMenuListClass(level + 1)}>
          {children}
        </ul>
      ) : null}
    </li>
  );
}
