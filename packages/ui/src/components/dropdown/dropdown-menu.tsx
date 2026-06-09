"use client";

import { useMemo } from "react";
import { cn } from "../../lib/utils";
import { DropdownItem } from "./dropdown-item";
import { dropdownDividerClass } from "./dropdown.styles";
import {
  isDropdownDivider,
  type DropdownMenuItemConfig,
  type DropdownMenuProps,
} from "./dropdown.types";

export function DropdownMenu({
  items,
  activeIndex,
  onActiveIndexChange,
  onSelect,
  className,
  id,
}: DropdownMenuProps) {
  const selectableEntries = useMemo(
    () =>
      items
        .map((item, index) => ({ item, index }))
        .filter(
          (entry): entry is { item: DropdownMenuItemConfig; index: number } =>
            !isDropdownDivider(entry.item)
        ),
    [items]
  );

  const enabledEntries = selectableEntries.filter(({ item }) => !item.disabled);
  const focusableItemIndex =
    enabledEntries[Math.min(activeIndex, Math.max(enabledEntries.length - 1, 0))]?.index;

  return (
    <ul
      id={id}
      role="menu"
      aria-orientation="vertical"
      className={cn("m-0 min-w-[var(--dropdown-min-width,140px)] list-none p-0", className)}
      onKeyDown={(event) => {
        if (!enabledEntries.length) return;

        const current = Math.min(activeIndex, enabledEntries.length - 1);
        if (event.key === "ArrowDown") {
          event.preventDefault();
          onActiveIndexChange((current + 1) % enabledEntries.length);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          onActiveIndexChange((current - 1 + enabledEntries.length) % enabledEntries.length);
        } else if (event.key === "Home") {
          event.preventDefault();
          onActiveIndexChange(0);
        } else if (event.key === "End") {
          event.preventDefault();
          onActiveIndexChange(enabledEntries.length - 1);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const entry = enabledEntries[current];
          if (entry) onSelect(entry.item);
        }
      }}
    >
      {items.map((item, index) => {
        if (isDropdownDivider(item)) {
          return (
            <li
              key={item.key ?? `divider-${index}`}
              role="separator"
              className={dropdownDividerClass()}
              aria-hidden
            />
          );
        }

        const selectablePos = selectableEntries.findIndex((entry) => entry.index === index);

        return (
          <DropdownItem
            key={item.key}
            item={item}
            index={selectablePos}
            active={focusableItemIndex === index}
            id={focusableItemIndex === index ? `${id}-item-${item.key}` : undefined}
            onSelect={onSelect}
            onHover={(next) => {
              const enabledPos = enabledEntries.findIndex(
                (entry) => entry.index === selectableEntries[next]?.index
              );
              if (enabledPos >= 0) onActiveIndexChange(enabledPos);
            }}
          />
        );
      })}
    </ul>
  );
}
