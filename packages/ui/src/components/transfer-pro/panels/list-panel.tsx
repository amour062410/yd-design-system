"use client";

import type { MouseEvent } from "react";
import { Checkbox } from "../../checkbox";
import { filterRecordsByKeyword } from "../core/transfer-engine";
import { SearchBar } from "../components/search-bar";
import { TransferFooter } from "../components/transfer-footer";
import {
  getTransferProModeBadgeStyle,
  transferProItemClass,
  transferProModeBadgeClass,
  transferProPanelBodyClass,
  transferProPanelClass,
  transferProPanelHeaderClass,
} from "../transfer-pro.tokens";
import type { TransferProListPanelProps } from "../transfer-pro.types";

export function ListPanel({
  direction,
  title,
  items,
  selectedKeys,
  onSelectChange,
  searchValue,
  onSearchChange,
  showSearch,
  disabled,
  disabledKeys = [],
  diffKeys,
  onItemDoubleClick,
  panelWidth,
}: TransferProListPanelProps) {
  const filtered = filterRecordsByKeyword(items, searchValue);
  const selectableKeys = filtered
    .filter((item) => !disabled && !disabledKeys.includes(item.key) && !item.disabled)
    .map((item) => item.key);
  const allSelected = selectableKeys.length > 0 && selectableKeys.every((key) => selectedKeys.includes(key));
  const indeterminate = selectedKeys.length > 0 && !allSelected;

  const toggleAll = (checked: boolean) => {
    onSelectChange(checked ? selectableKeys : []);
  };

  const handleItemClick = (key: string, event: MouseEvent) => {
    if (disabled || disabledKeys.includes(key)) return;
    const append = event.metaKey || event.ctrlKey;
    if (selectedKeys.includes(key)) {
      onSelectChange(
        selectedKeys.filter((item) => item !== key),
        { append }
      );
      return;
    }
    onSelectChange(append ? [...selectedKeys, key] : [key], { append });
  };

  return (
    <div className={transferProPanelClass()} style={{ width: panelWidth }}>
      <div className={transferProPanelHeaderClass()}>
        <div className="flex min-w-0 items-center gap-2">
          <Checkbox
            size="sm"
            checked={allSelected}
            indeterminate={indeterminate}
            disabled={disabled || selectableKeys.length === 0}
            onChange={toggleAll}
          />
          <span className="truncate">{title}</span>
          <span className={transferProModeBadgeClass()} style={getTransferProModeBadgeStyle("list")}>
            List
          </span>
        </div>
        <span className="text-[12px] font-normal text-[color:var(--transfer-pro-color-text-secondary,#86909c)]">
          {selectedKeys.length}/{items.length}
        </span>
      </div>

      {showSearch ? (
        <SearchBar value={searchValue} onChange={onSearchChange} disabled={disabled} />
      ) : null}

      <div className={transferProPanelBodyClass()}>
        {filtered.map((item) => {
          const itemDisabled = disabled || disabledKeys.includes(item.key) || item.disabled;
          const diffType = diffKeys?.added.has(item.key)
            ? "add"
            : diffKeys?.removed.has(item.key)
              ? "remove"
              : undefined;
          return (
            <div
              key={item.key}
              className={transferProItemClass({
                selected: selectedKeys.includes(item.key),
                disabled: itemDisabled,
                diffType,
              })}
              onClick={(event) => handleItemClick(item.key, event)}
              onDoubleClick={() => !itemDisabled && onItemDoubleClick?.(item.key)}
            >
              <Checkbox
                size="sm"
                checked={selectedKeys.includes(item.key)}
                disabled={itemDisabled}
                onChange={(checked) => {
                  if (checked) onSelectChange([...selectedKeys, item.key]);
                  else onSelectChange(selectedKeys.filter((key) => key !== item.key));
                }}
              />
              <span className="min-w-0 flex-1 truncate">{item.title}</span>
              {diffType === "add" ? <span className="text-[11px] text-[color:var(--transfer-pro-diff-add,#00b42a)]">新增</span> : null}
              {diffType === "remove" ? <span className="text-[11px] text-[color:var(--transfer-pro-diff-remove,#f53f3f)]">移除</span> : null}
            </div>
          );
        })}
      </div>

      <TransferFooter selectedCount={selectedKeys.length} totalCount={items.length} />
    </div>
  );
}
