"use client";

import { useMemo } from "react";
import { Checkbox } from "../checkbox";
import { TransferItemRow } from "./transfer-item";
import { TransferSearch, filterTransferItems } from "./transfer-search";
import {
  transferPanelBodyClass,
  transferPanelClass,
  transferPanelFooterClass,
  transferPanelHeaderClass,
} from "./transfer.tokens";
import type { TransferFooterRenderProps, TransferPanelProps } from "./transfer.types";

export function TransferPanel({
  direction,
  title,
  items,
  selectedKeys,
  onSelectChange,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "请搜索",
  disabledKeys = [],
  disabled = false,
  render,
  footer,
  listStyle,
  onItemDoubleClick,
}: TransferPanelProps) {
  const filteredItems = useMemo(
    () => filterTransferItems(items, searchValue),
    [items, searchValue]
  );

  const selectableKeys = filteredItems
    .filter((item) => !disabled && !disabledKeys.includes(item.key) && !item.disabled)
    .map((item) => item.key);

  const selectedSelectableCount = selectableKeys.filter((key) => selectedKeys.includes(key)).length;
  const allSelected = selectableKeys.length > 0 && selectedSelectableCount === selectableKeys.length;
  const indeterminate = selectedSelectableCount > 0 && !allSelected;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectChange(Array.from(new Set([...selectedKeys, ...selectableKeys])));
      return;
    }
    onSelectChange(selectedKeys.filter((key) => !selectableKeys.includes(key)));
  };

  const toggleItem = (key: string, checked: boolean) => {
    if (checked) {
      onSelectChange(Array.from(new Set([...selectedKeys, key])));
      return;
    }
    onSelectChange(selectedKeys.filter((itemKey) => itemKey !== key));
  };

  const footerProps: TransferFooterRenderProps = {
    direction,
    selectedCount: selectedKeys.length,
    totalCount: items.length,
  };

  const footerNode =
    typeof footer === "function" ? footer(footerProps) : footer ?? null;

  return (
    <div className={transferPanelClass()} style={listStyle}>
      <div className={transferPanelHeaderClass()}>
        <div className="flex min-w-0 items-center gap-2">
          <Checkbox
            size="sm"
            checked={allSelected}
            indeterminate={indeterminate}
            disabled={disabled || selectableKeys.length === 0}
            onChange={toggleSelectAll}
            aria-label="全选"
          />
          <span className="truncate">{title}</span>
        </div>
        <span className="shrink-0 text-[12px] font-normal text-[color:var(--transfer-color-text-secondary,#86909c)]">
          {selectedKeys.length}/{items.length}
        </span>
      </div>

      {showSearch ? (
        <TransferSearch
          value={searchValue}
          onChange={(value) => onSearchChange?.(value)}
          placeholder={searchPlaceholder}
          disabled={disabled}
        />
      ) : null}

      <div className={transferPanelBodyClass()} style={{ maxHeight: "var(--transfer-list-height, 320px)" }}>
        {filteredItems.length === 0 ? (
          <div className="flex h-[var(--transfer-item-height,32px)] items-center px-3 text-[13px] text-[color:var(--transfer-color-text-secondary,#86909c)]">
            暂无数据
          </div>
        ) : (
          filteredItems.map((item) => {
            const itemDisabled =
              disabled || disabledKeys.includes(item.key) || item.disabled === true;
            return (
              <TransferItemRow
                key={item.key}
                item={item}
                selected={selectedKeys.includes(item.key)}
                disabled={itemDisabled}
                render={render}
                onToggle={(checked) => toggleItem(item.key, checked)}
                onDoubleClick={() => onItemDoubleClick?.(item)}
              />
            );
          })
        )}
      </div>

      {footerNode ? <div className={transferPanelFooterClass()}>{footerNode}</div> : null}
    </div>
  );
}
