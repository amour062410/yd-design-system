"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Drawer, DrawerFooter } from "../drawer/drawer";
import type { ColumnSettingItem, TableColumnSettingProps } from "./table.types";

const STORAGE_PREFIX = "yd-table-columns:";

export function loadColumnVisibility(storageKey: string, fallback: string[]) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${storageKey}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveColumnVisibility(storageKey: string, keys: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORAGE_PREFIX}${storageKey}`, JSON.stringify(keys));
}

export function useColumnVisibility(
  storageKey: string,
  items: ColumnSettingItem[]
) {
  const defaultKeys = useMemo(
    () =>
      items
        .filter((item) => item.defaultVisible !== false || item.locked)
        .map((item) => item.key),
    [items]
  );

  const [visibleKeys, setVisibleKeys] = useState<string[]>(defaultKeys);

  useEffect(() => {
    setVisibleKeys(loadColumnVisibility(storageKey, defaultKeys));
  }, [storageKey, defaultKeys]);

  const persist = (keys: string[]) => {
    const withLocked = [
      ...keys,
      ...items.filter((i) => i.locked).map((i) => i.key),
    ].filter((k, idx, arr) => arr.indexOf(k) === idx);
    setVisibleKeys(withLocked);
    saveColumnVisibility(storageKey, withLocked);
  };

  return { visibleKeys, setVisibleKeys: persist, defaultKeys };
}

export function TableColumnSetting({
  open,
  onClose,
  items,
  visibleKeys,
  defaultVisibleKeys,
  onChange,
  onSave,
  storageKey,
}: TableColumnSettingProps) {
  const [draft, setDraft] = useState<string[]>(visibleKeys);
  const toggleable = items.filter((item) => !item.locked);

  useEffect(() => {
    if (open) setDraft(visibleKeys);
  }, [open, visibleKeys]);

  const allSelected = toggleable.every((item) => draft.includes(item.key));
  const someSelected = toggleable.some((item) => draft.includes(item.key)) && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setDraft(items.filter((i) => i.locked).map((i) => i.key));
    } else {
      setDraft(items.map((i) => i.key));
    }
  };

  const toggleKey = (key: string) => {
    setDraft((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    const locked = items.filter((i) => i.locked).map((i) => i.key);
    const next = [...new Set([...draft, ...locked])];
    onChange(next);
    if (storageKey) saveColumnVisibility(storageKey, next);
    onSave?.(next);
    onClose();
  };

  const handleReset = () => setDraft(defaultVisibleKeys);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="sm"
      title="列设置"
      description="配置表格显示列，设置将保存到本地"
      footer={<DrawerFooter onCancel={onClose} onOk={handleSave} okText="保存" />}
    >
      <div className="space-y-4 px-1">
        <div className="flex items-center gap-2 border-b border-[color:var(--table-border-color)] pb-3">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={toggleAll}
            aria-label="全选列"
          />
          <span className="text-sm text-[color:var(--color-text-secondary)]">全选</span>
          <button
            type="button"
            className="ml-auto text-sm text-[color:var(--table-action-color)] hover:underline"
            onClick={handleReset}
          >
            恢复默认
          </button>
        </div>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex items-center gap-3 rounded-[var(--table-radius)] px-2 py-2 hover:bg-[color:var(--table-row-hover-bg)]"
            >
              <Checkbox
                checked={draft.includes(item.key)}
                disabled={item.locked}
                onChange={() => toggleKey(item.key)}
                aria-label={String(item.title)}
              />
              <span className="text-sm text-[color:var(--color-text-primary)]">
                {item.title}
                {item.locked ? (
                  <span className="ml-2 text-xs text-[color:var(--color-text-tertiary)]">
                    固定
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
}
