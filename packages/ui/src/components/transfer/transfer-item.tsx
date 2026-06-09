"use client";

import type { ReactNode } from "react";
import { Checkbox } from "../checkbox";
import { transferItemClass } from "./transfer.tokens";
import type { TransferItem } from "./transfer.types";

export function TransferItemRow({
  item,
  selected,
  disabled,
  render,
  onToggle,
  onDoubleClick,
}: {
  item: TransferItem;
  selected: boolean;
  disabled?: boolean;
  render?: (item: TransferItem) => ReactNode;
  onToggle: (checked: boolean) => void;
  onDoubleClick?: () => void;
}) {
  return (
    <div
      className={transferItemClass({ selected, disabled })}
      onDoubleClick={() => {
        if (!disabled) onDoubleClick?.();
      }}
    >
      <span
        className="flex shrink-0 items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <Checkbox
          size="sm"
          checked={selected}
          disabled={disabled}
          onChange={onToggle}
          aria-label={typeof item.title === "string" ? item.title : item.key}
        />
      </span>
      <span className="min-w-0 flex-1 truncate">
        {render ? render(item) : item.title}
      </span>
    </div>
  );
}
