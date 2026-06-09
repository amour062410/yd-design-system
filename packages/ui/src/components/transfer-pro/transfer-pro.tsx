"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { BatchToolbar } from "./components/batch-toolbar";
import { buildDiffKeySets, computeTransferDiff } from "./core/diff-engine";
import { applyTransferRule, fullTransferKeys, recommendTransferKeys } from "./core/rule-engine";
import {
  buildTransferProTreeIndex,
  getTransferProAllLeafKeys,
  moveTransferKeys,
  resolveTransferableMoveKeys,
} from "./core/transfer-engine";
import { ListPanel } from "./panels/list-panel";
import { TablePanel } from "./panels/table-panel";
import { TreePanel } from "./panels/tree-panel";
import {
  TRANSFER_PRO_INSPECTORS,
  TRANSFER_PRO_LIST_DATA,
  TRANSFER_PRO_STORE_TREE,
  flattenTreeToRecords,
  resolvePanelMode,
} from "./transfer-pro-data";
import {
  transferProCssVars,
  transferProOperationButtonClass,
  transferProOperationsClass,
  transferProRootClass,
} from "./transfer-pro.tokens";
import type {
  TransferProChangeInfo,
  TransferProDirection,
  TransferProProps,
  TransferProRecord,
  TransferProTableColumn,
} from "./transfer-pro.types";

const DEFAULT_TABLE_COLUMNS: TransferProTableColumn[] = [
  { key: "title", title: "门店名称", dataIndex: "title", width: 140 },
  { key: "region", title: "所属区域", dataIndex: "region", width: 96 },
  { key: "inspectionStatus", title: "巡检状态", dataIndex: "inspectionStatus", width: 96 },
  { key: "lastInspection", title: "最近巡检", dataIndex: "lastInspection", width: 112 },
  { key: "inspector", title: "人员归属", dataIndex: "inspector", width: 96 },
];

const DEFAULT_TABLE_PANEL_WIDTH = 560;

export function TransferPro({
  mode = "list",
  dataSource = TRANSFER_PRO_LIST_DATA,
  treeData = TRANSFER_PRO_STORE_TREE,
  targetKeys: controlledTargetKeys,
  baselineKeys,
  defaultTargetKeys = [],
  onChange,
  titles = ["待分配", "已分配"],
  showSearch = true,
  showDiff = false,
  showBatchToolbar = true,
  batchStrategy: controlledBatchStrategy,
  onBatchStrategyChange,
  activeRule,
  onRuleApply,
  disabledKeys = [],
  disabled = false,
  checkStrictly = false,
  tableColumns = DEFAULT_TABLE_COLUMNS,
  oneWay = false,
  panelWidth: controlledPanelWidth,
  tablePanelWidth: controlledTablePanelWidth,
  resizable = true,
  className,
  style,
}: TransferProProps) {
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([]);
  const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([]);
  const [sourceSearch, setSourceSearch] = useState("");
  const [targetSearch, setTargetSearch] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>(["region-east", "region-south"]);
  const [internalBatchStrategy, setInternalBatchStrategy] = useState<"manual" | "recommend" | "full">("manual");
  const [internalActiveRule, setInternalActiveRule] = useState<TransferProProps["activeRule"]>(undefined);
  const [internalPanelWidth, setInternalPanelWidth] = useState(320);
  const [internalTablePanelWidth, setInternalTablePanelWidth] = useState(DEFAULT_TABLE_PANEL_WIDTH);

  const targetKeys = controlledTargetKeys ?? internalTargetKeys;
  const batchStrategy = controlledBatchStrategy ?? internalBatchStrategy;
  const resolvedActiveRule = activeRule ?? internalActiveRule;
  const leftMode = resolvePanelMode(mode, "left");
  const rightMode = resolvePanelMode(mode, "right");

  const leftPanelWidth = controlledPanelWidth ?? internalPanelWidth;
  const rightPanelWidth =
    controlledTablePanelWidth ??
    internalTablePanelWidth ??
    (rightMode === "table" ? DEFAULT_TABLE_PANEL_WIDTH : leftPanelWidth);

  const allRecords = useMemo(() => {
    if (dataSource.length) return dataSource;
    return flattenTreeToRecords(treeData);
  }, [dataSource, treeData]);

  const treeIndex = useMemo(() => buildTransferProTreeIndex(treeData), [treeData]);
  const allLeafKeys = useMemo(() => getTransferProAllLeafKeys(treeData), [treeData]);
  const transferableKeySet = useMemo(
    () => new Set(allLeafKeys.length ? allLeafKeys : allRecords.map((item) => item.key)),
    [allLeafKeys, allRecords]
  );

  const sourceRecords = useMemo(
    () => allRecords.filter((item) => !targetKeys.includes(item.key)),
    [allRecords, targetKeys]
  );
  const targetRecords = useMemo(
    () => allRecords.filter((item) => targetKeys.includes(item.key)),
    [allRecords, targetKeys]
  );

  const diff = useMemo(
    () => computeTransferDiff(baselineKeys ?? defaultTargetKeys, targetKeys),
    [baselineKeys, defaultTargetKeys, targetKeys]
  );
  const diffKeys = showDiff ? buildDiffKeySets(diff) : undefined;

  const isDisabled = useCallback(
    (key: string) => {
      const record = allRecords.find((item) => item.key === key);
      return disabled || disabledKeys.includes(key) || record?.disabled === true;
    },
    [allRecords, disabled, disabledKeys]
  );

  const commitTargetKeys = useCallback(
    (next: string[], direction: TransferProDirection, moveKeys: string[], info?: Partial<TransferProChangeInfo>) => {
      if (controlledTargetKeys === undefined) setInternalTargetKeys(next);
      onChange?.(next, { direction, moveKeys, batchStrategy, rule: resolvedActiveRule, ...info });
      setSourceSelectedKeys((prev) => prev.filter((key) => !moveKeys.includes(key)));
      setTargetSelectedKeys((prev) => prev.filter((key) => !moveKeys.includes(key)));
    },
    [batchStrategy, controlledTargetKeys, onChange, resolvedActiveRule]
  );

  const resolveMoveKeys = useCallback(
    (selectedKeys: string[]) => {
      if (leftMode === "tree" || rightMode === "tree") {
        return resolveTransferableMoveKeys(
          selectedKeys,
          treeIndex,
          checkStrictly,
          transferableKeySet
        ).filter((key) => !isDisabled(key));
      }
      return selectedKeys.filter((key) => transferableKeySet.has(key) && !isDisabled(key));
    },
    [checkStrictly, isDisabled, leftMode, rightMode, transferableKeySet, treeIndex]
  );

  const move = useCallback(
    (keys: string[], direction: TransferProDirection) => {
      const moveKeysList = resolveMoveKeys(keys);
      if (!moveKeysList.length) return;
      commitTargetKeys(moveTransferKeys(targetKeys, moveKeysList, direction), direction, moveKeysList);
    },
    [commitTargetKeys, resolveMoveKeys, targetKeys]
  );

  const handleBatchStrategy = (strategy: typeof batchStrategy) => {
    if (controlledBatchStrategy === undefined) setInternalBatchStrategy(strategy);
    onBatchStrategyChange?.(strategy);
    if (strategy === "recommend") {
      const keys = recommendTransferKeys(sourceRecords, 3);
      commitTargetKeys(moveTransferKeys(targetKeys, keys, "right"), "right", keys, { batchStrategy: strategy });
    }
    if (strategy === "full") {
      const keys = fullTransferKeys(sourceRecords);
      commitTargetKeys(moveTransferKeys(targetKeys, keys, "right"), "right", keys, { batchStrategy: strategy });
    }
  };

  const handleRuleApply = (rule: NonNullable<typeof activeRule>) => {
    if (activeRule === undefined) setInternalActiveRule(rule);
    const keys = applyTransferRule(rule, sourceRecords, {
      inspectors: TRANSFER_PRO_INSPECTORS,
      region: sourceRecords[0]?.region,
      maxCount: 4,
    });
    onRuleApply?.(rule, keys);
    commitTargetKeys(moveTransferKeys(targetKeys, keys, "right"), "right", keys, { rule });
  };

  const canMoveRight = !disabled && resolveMoveKeys(sourceSelectedKeys).length > 0;
  const canMoveLeft = !oneWay && !disabled && resolveMoveKeys(targetSelectedKeys).length > 0;

  const renderPanel = (
    side: TransferProDirection,
    panelMode: typeof leftMode,
    records: TransferProRecord[],
    selectedKeys: string[],
    onSelectChange: (keys: string[], event?: { append?: boolean }) => void,
    searchValue: string,
    onSearchChange: (value: string) => void,
    title: ReactNode
  ) => {
    const sideDiff = side === "right" && diffKeys ? diffKeys : undefined;
    const resolvedPanelWidth =
      side === "right" && panelMode === "table" ? rightPanelWidth : leftPanelWidth;
    const common = {
      direction: side,
      title,
      selectedKeys,
      onSelectChange,
      searchValue,
      onSearchChange,
      showSearch,
      disabled,
      disabledKeys,
      diffKeys: sideDiff,
      panelWidth: resolvedPanelWidth,
      onItemDoubleClick: (key: string) => {
        if (isDisabled(key)) return;
        move([key], side === "left" ? "right" : "left");
      },
    };

    if (panelMode === "tree") {
      const keysOnSide = side === "left" ? sourceRecords.map((item) => item.key) : targetRecords.map((item) => item.key);
      const sideTransferable = new Set(keysOnSide.filter((key) => transferableKeySet.has(key)));
      return (
        <TreePanel
          {...common}
          treeData={treeData}
          expandedKeys={expandedKeys}
          onExpandChange={setExpandedKeys}
          checkStrictly={checkStrictly}
          transferableKeys={sideTransferable}
        />
      );
    }

    if (panelMode === "table") {
      return <TablePanel {...common} items={records} columns={tableColumns} />;
    }

    return <ListPanel {...common} items={records} />;
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {showBatchToolbar ? (
        <BatchToolbar
          strategy={batchStrategy}
          onStrategyChange={handleBatchStrategy}
          activeRule={resolvedActiveRule}
          onRuleApply={onRuleApply ? handleRuleApply : undefined}
          disabled={disabled}
        />
      ) : null}

      <div className={transferProRootClass(className)} style={{ ...transferProCssVars, ...style }}>
        {renderPanel(
          "left",
          leftMode,
          sourceRecords,
          sourceSelectedKeys,
          (keys) => setSourceSelectedKeys(keys),
          sourceSearch,
          setSourceSearch,
          titles[0]
        )}

        <div className={transferProOperationsClass()}>
          <button
            type="button"
            aria-label="分配到右侧"
            disabled={!canMoveRight}
            className={transferProOperationButtonClass(!canMoveRight)}
            onClick={() => move(sourceSelectedKeys, "right")}
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </button>
          {!oneWay ? (
            <button
              type="button"
              aria-label="移回左侧"
              disabled={!canMoveLeft}
              className={transferProOperationButtonClass(!canMoveLeft)}
              onClick={() => move(targetSelectedKeys, "left")}
            >
              <ChevronLeft className="size-4" strokeWidth={2.5} />
            </button>
          ) : null}
        </div>

        {resizable && rightMode === "table" ? (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="调整表格面板宽度"
            className="hidden w-1 shrink-0 cursor-col-resize self-stretch bg-transparent hover:bg-[var(--transfer-pro-color-item-hover-bg,#e8f0ff)] lg:block"
            onMouseDown={(event) => {
              event.preventDefault();
              const startX = event.clientX;
              const startWidth = rightPanelWidth;
              const onMove = (moveEvent: MouseEvent) => {
                const minWidth = 520;
                const next = Math.max(minWidth, startWidth + moveEvent.clientX - startX);
                if (controlledTablePanelWidth === undefined) setInternalTablePanelWidth(next);
              };
              const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          />
        ) : null}

        <div
          className={
            rightMode === "table"
              ? "flex min-w-0 flex-1 flex-col self-stretch"
              : "flex shrink-0 self-stretch"
          }
        >
          {renderPanel(
            "right",
            rightMode,
            targetRecords,
            targetSelectedKeys,
            (keys) => setTargetSelectedKeys(keys),
            targetSearch,
            setTargetSearch,
            titles[1]
          )}
        </div>
      </div>

      {showDiff ? (
        <div className="rounded-[var(--transfer-pro-border-radius,8px)] border border-[color:var(--transfer-pro-color-border,#f0f0f0)] px-3 py-2 text-[12px]">
          <div className="mb-1 font-medium text-[color:var(--transfer-pro-color-title,#1d2129)]">变更对比</div>
          <div className="flex flex-wrap gap-3 text-[color:var(--transfer-pro-color-text-secondary,#86909c)]">
            <span className="text-[color:var(--transfer-pro-diff-add,#00b42a)]">新增 {diff.added.length}</span>
            <span className="text-[color:var(--transfer-pro-diff-remove,#f53f3f)]">移除 {diff.removed.length}</span>
            <span>不变 {diff.unchanged.length}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function StoreTransferPro(props: Omit<TransferProProps, "treeData" | "dataSource" | "titles"> & { titles?: TransferProProps["titles"] }) {
  return (
    <TransferPro
      mode="tree"
      treeData={TRANSFER_PRO_STORE_TREE}
      dataSource={flattenTreeToRecords(TRANSFER_PRO_STORE_TREE)}
      titles={props.titles ?? ["待分配门店", "已分配门店"]}
      {...props}
    />
  );
}

export function InspectorTransferPro(
  props: Omit<TransferProProps, "dataSource" | "titles"> & { titles?: TransferProProps["titles"] }
) {
  return (
    <TransferPro
      mode="list"
      dataSource={TRANSFER_PRO_INSPECTORS.map((item) => ({
        key: item.key,
        title: item.name,
        region: item.region,
        inspector: item.name,
        disabled: item.disabled,
      }))}
      titles={props.titles ?? ["待调度巡检员", "已分配巡检员"]}
      {...props}
    />
  );
}

export function PermissionTransferPro(
  props: Omit<TransferProProps, "dataSource" | "titles"> & { titles?: TransferProProps["titles"] }
) {
  return (
    <TransferPro
      mode="list"
      dataSource={[
        { key: "perm-inspection", title: "巡检管理", region: "总部" },
        { key: "perm-workorder", title: "工单管理", region: "总部" },
        { key: "perm-report", title: "报表查看", region: "总部" },
        { key: "perm-store", title: "门店管理", region: "区域" },
        { key: "perm-schedule", title: "调度中心", region: "区域" },
      ]}
      titles={props.titles ?? ["可选权限", "已授权权限"]}
      oneWay
      {...props}
    />
  );
}
