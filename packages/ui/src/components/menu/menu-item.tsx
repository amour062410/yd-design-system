"use client";

import { Tooltip } from "../tooltip/tooltip";
import { useMenuContext } from "./menu-context";
import {
  menuHorizontalIndicatorClass,
  menuIconClass,
  menuItemClass,
  menuLabelClass,
  menuVerticalIndicatorClass,
} from "./menu.tokens";
import type { MenuItemProps } from "./menu.types";

export function MenuItem({
  itemKey,
  label,
  icon,
  disabled,
  level = 0,
  keyPath,
  className,
}: MenuItemProps) {
  const {
    mode,
    collapsed,
    isSelected,
    onSelectItem,
  } = useMenuContext();

  const selected = isSelected(itemKey);
  const resolvedKeyPath = keyPath ?? [itemKey];

  const handleClick = () => {
    if (disabled) return;
    onSelectItem({ key: itemKey, label, icon, disabled }, resolvedKeyPath);
  };

  const itemButton = (
    <button
      type="button"
      role="menuitem"
      aria-current={selected ? "page" : undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={menuItemClass({
        mode,
        selected,
        disabled,
        collapsed: mode === "vertical" && collapsed,
        className,
      })}
      style={
        mode === "vertical" && level > 0 && !collapsed
          ? { paddingLeft: `calc(var(--menu-item-padding-inline, 16px) + ${level} * var(--menu-sub-menu-inline-indent, 24px))` }
          : undefined
      }
      onClick={handleClick}
    >
      {mode === "vertical" ? (
        <span className={menuVerticalIndicatorClass(selected)} aria-hidden />
      ) : null}
      {icon ? <span className={menuIconClass(mode === "vertical" && collapsed)}>{icon}</span> : null}
      <span className={menuLabelClass(mode === "vertical" && collapsed)}>{label}</span>
      {mode === "horizontal" ? (
        <span className={menuHorizontalIndicatorClass(selected)} aria-hidden />
      ) : null}
    </button>
  );

  if (mode === "vertical" && collapsed && label) {
    return (
      <li role="none">
        <Tooltip content={label} placement="right" trigger={["hover", "focus"]}>
          {itemButton}
        </Tooltip>
      </li>
    );
  }

  return <li role="none">{itemButton}</li>;
}
