"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { TransferPanel } from "./transfer-panel";
import {
  transferCssVars,
  transferOperationButtonClass,
  transferOperationColumnClass,
  transferRootClass,
} from "./transfer.tokens";
import type {
  TransferDirection,
  TransferItem,
  TransferProps,
  TransferSearchConfig,
  TransferSearchPlaceholder,
} from "./transfer.types";

function resolveShowSearch(config: TransferSearchConfig | undefined, side: TransferDirection) {
  if (!config) return false;
  if (typeof config === "boolean") return config;
  if (side === "left") return config.left !== false;
  return config.right !== false;
}

function resolveSearchPlaceholder(
  placeholder: TransferSearchPlaceholder | undefined,
  side: TransferDirection
) {
  if (!placeholder) return "请搜索";
  if (typeof placeholder === "string") return placeholder;
  return side === "left" ? placeholder[0] : placeholder[1];
}

export function Transfer({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  onChange,
  render,
  titles = ["源列表", "目标列表"],
  showSearch = false,
  searchPlaceholder,
  oneWay = false,
  disabledKeys = [],
  disabled = false,
  footer,
  listStyle,
  className,
  style,
}: TransferProps) {
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([]);
  const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([]);
  const [sourceSearch, setSourceSearch] = useState("");
  const [targetSearch, setTargetSearch] = useState("");

  const targetKeys = controlledTargetKeys ?? internalTargetKeys;

  const sourceItems = useMemo(
    () => dataSource.filter((item) => !targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  );
  const targetItems = useMemo(
    () => dataSource.filter((item) => targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  );

  const isItemDisabled = useCallback(
    (key: string) => {
      const item = dataSource.find((entry) => entry.key === key);
      return disabled || disabledKeys.includes(key) || item?.disabled === true;
    },
    [dataSource, disabled, disabledKeys]
  );

  const setTargetKeys = useCallback(
    (next: string[], direction: TransferDirection, moveKeys: string[]) => {
      if (controlledTargetKeys === undefined) setInternalTargetKeys(next);
      onChange?.(next, direction, moveKeys);
    },
    [controlledTargetKeys, onChange]
  );

  const moveKeys = useCallback(
    (keys: string[], direction: TransferDirection) => {
      const validKeys = keys.filter((key) => !isItemDisabled(key));
      if (validKeys.length === 0) return;

      const next =
        direction === "right"
          ? Array.from(new Set([...targetKeys, ...validKeys]))
          : targetKeys.filter((key) => !validKeys.includes(key));

      setTargetKeys(next, direction, validKeys);
      setSourceSelectedKeys((prev) => prev.filter((key) => !validKeys.includes(key)));
      setTargetSelectedKeys((prev) => prev.filter((key) => !validKeys.includes(key)));
    },
    [isItemDisabled, setTargetKeys, targetKeys]
  );

  const moveSelectedToTarget = () => moveKeys(sourceSelectedKeys, "right");
  const moveSelectedToSource = () => moveKeys(targetSelectedKeys, "left");

  const moveItemByDoubleClick = (item: TransferItem, direction: TransferDirection) => {
    if (isItemDisabled(item.key)) return;
    moveKeys([item.key], direction);
  };

  const leftListStyle = Array.isArray(listStyle) ? listStyle[0] : listStyle;
  const rightListStyle = Array.isArray(listStyle) ? listStyle[1] : listStyle;

  const canMoveRight = !disabled && sourceSelectedKeys.some((key) => !isItemDisabled(key));
  const canMoveLeft =
    !oneWay && !disabled && targetSelectedKeys.some((key) => !isItemDisabled(key));

  return (
    <div className={transferRootClass(className)} style={{ ...transferCssVars, ...style }}>
      <TransferPanel
        direction="left"
        title={titles[0]}
        items={sourceItems}
        selectedKeys={sourceSelectedKeys}
        onSelectChange={setSourceSelectedKeys}
        showSearch={resolveShowSearch(showSearch, "left")}
        searchValue={sourceSearch}
        onSearchChange={setSourceSearch}
        searchPlaceholder={resolveSearchPlaceholder(searchPlaceholder, "left")}
        disabledKeys={disabledKeys}
        disabled={disabled}
        render={render}
        footer={footer}
        listStyle={leftListStyle}
        onItemDoubleClick={(item) => moveItemByDoubleClick(item, "right")}
      />

      <div className={transferOperationColumnClass()}>
        <button
          type="button"
          aria-label="移动到右侧"
          disabled={!canMoveRight}
          className={transferOperationButtonClass(!canMoveRight)}
          onClick={moveSelectedToTarget}
        >
          <ChevronRight className="size-4" strokeWidth={2.5} />
        </button>
        {!oneWay ? (
          <button
            type="button"
            aria-label="移动到左侧"
            disabled={!canMoveLeft}
            className={transferOperationButtonClass(!canMoveLeft)}
            onClick={moveSelectedToSource}
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </button>
        ) : null}
      </div>

      <TransferPanel
        direction="right"
        title={titles[1]}
        items={targetItems}
        selectedKeys={targetSelectedKeys}
        onSelectChange={setTargetSelectedKeys}
        showSearch={resolveShowSearch(showSearch, "right")}
        searchValue={targetSearch}
        onSearchChange={setTargetSearch}
        searchPlaceholder={resolveSearchPlaceholder(searchPlaceholder, "right")}
        disabledKeys={disabledKeys}
        disabled={disabled}
        render={render}
        footer={footer}
        listStyle={rightListStyle}
        onItemDoubleClick={(item) => !oneWay && moveItemByDoubleClick(item, "left")}
      />
    </div>
  );
}
