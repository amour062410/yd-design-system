"use client";

import { dropdownItemClass } from "./dropdown.styles";
import type { DropdownItemProps } from "./dropdown.types";

export function DropdownItem({
  item,
  active,
  index,
  onSelect,
  onHover,
  id,
}: DropdownItemProps) {
  return (
    <li role="none">
      <button
        type="button"
        id={id}
        role="menuitem"
        tabIndex={active ? 0 : -1}
        disabled={item.disabled}
        aria-disabled={item.disabled}
        className={dropdownItemClass({
          active,
          danger: item.danger,
          disabled: item.disabled,
        })}
        onClick={() => {
          if (item.disabled) return;
          onSelect(item);
        }}
        onMouseEnter={() => onHover(index)}
        onFocus={() => onHover(index)}
      >
        {item.icon ? (
          <span className="inline-flex shrink-0 [&_svg]:size-4" aria-hidden>
            {item.icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
      </button>
    </li>
  );
}
