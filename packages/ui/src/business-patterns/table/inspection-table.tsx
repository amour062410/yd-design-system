"use client";

import { useMemo, useState } from "react";
import { TableActionGroup, TableActionLink } from "../../components/table-actions";
import type { TableColumn } from "../../components/table/table.types";
import {
  InspectionAdvancedFilter,
  isAdvancedFilterActive,
  type InspectionAdvancedFilterValues,
} from "./inspection-advanced-filter";
import {
  InspectionQuickFilter,
  buildQuickFilterItems,
  type QuickFilterValue,
} from "./inspection-quick-filter";
import { InspectionStatusTag } from "./inspection-status-tag";
import type {
  ColumnSettingItem,
  InspectionRecord,
  InspectionTableProps,
  TableBatchAction,
  TableToolbarFilterOption,
} from "./inspection.types";
import { Table } from "../../components/table/table";
import { TableBatchActions } from "../../components/table/table-batch-actions";
import { TableColumnSetting, useColumnVisibility } from "../../components/table/table-column-setting";
import { TableToolbar } from "../../components/table/table-toolbar";

export const INSPECTION_COLUMN_SETTING_ITEMS: ColumnSettingItem[] = [
  { key: "storeName", title: "门店名称", defaultVisible: true },
  { key: "owner", title: "巡检负责人", defaultVisible: true },
  { key: "cycle", title: "执行周期", defaultVisible: true },
  { key: "method", title: "巡检方式", defaultVisible: true },
  { key: "status", title: "状态", defaultVisible: true },
  { key: "lastInspectionAt", title: "最近巡检时间", defaultVisible: true },
  { key: "updatedAt", title: "更新时间", defaultVisible: false },
  { key: "createdAt", title: "创建时间", defaultVisible: false },
  { key: "storeCode", title: "门店编码", defaultVisible: false },
  { key: "action", title: "操作", locked: true, defaultVisible: true },
];

const METHOD_FILTER_MAP: Record<string, string> = {
  onsite: "现场巡检",
  video: "视频巡检",
  hybrid: "混合巡检",
};

const DEFAULT_ADVANCED: InspectionAdvancedFilterValues = {
  dateFrom: "",
  dateTo: "",
  owner: "all",
  region: "all",
  storeLevel: "all",
};

function buildColumns(
  visibleKeys: string[],
  renderActions?: InspectionTableProps["renderActions"]
): TableColumn<InspectionRecord>[] {
  const all: TableColumn<InspectionRecord>[] = [
    { key: "storeName", title: "门店名称", dataIndex: "storeName", width: 200 },
    { key: "owner", title: "巡检负责人", dataIndex: "owner", width: 120 },
    { key: "cycle", title: "执行周期", dataIndex: "cycle", width: 160 },
    { key: "method", title: "巡检方式", dataIndex: "method", width: 120 },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      width: 110,
      render: (value) => (
        <InspectionStatusTag status={value as InspectionRecord["status"]} />
      ),
    },
    {
      key: "lastInspectionAt",
      title: "最近巡检时间",
      dataIndex: "lastInspectionAt",
      width: 160,
    },
    { key: "updatedAt", title: "更新时间", dataIndex: "updatedAt", width: 160 },
    { key: "createdAt", title: "创建时间", dataIndex: "createdAt", width: 160 },
    { key: "storeCode", title: "门店编码", dataIndex: "storeCode", width: 140 },
    {
      key: "action",
      title: "操作",
      width: 140,
      fixed: "right",
      render: (_, record) =>
        renderActions?.(record) ?? (
          <TableActionGroup>
            <TableActionLink>查看</TableActionLink>
            <TableActionLink>指派</TableActionLink>
          </TableActionGroup>
        ),
    },
  ];

  return all.filter((col) => visibleKeys.includes(col.key));
}

function filterInspectionData(
  data: InspectionRecord[],
  {
    search,
    status,
    method,
    dateFrom,
    dateTo,
    owner,
    region,
    storeLevel,
  }: {
    search: string;
    status: QuickFilterValue;
    method: string;
    dateFrom: string;
    dateTo: string;
    owner: string;
    region: string;
    storeLevel: string;
  }
) {
  const kw = search.trim().toLowerCase();
  return data.filter((row) => {
    if (status !== "all" && row.status !== status) return false;
    if (method !== "all") {
      const label = METHOD_FILTER_MAP[method];
      if (label && row.method !== label) return false;
    }
    if (owner !== "all" && row.owner !== owner) return false;
    if (region !== "all" && row.region !== region) return false;
    if (storeLevel !== "all" && row.storeLevel !== storeLevel) return false;
    if (kw) {
      const hay = `${row.storeName} ${row.owner} ${row.storeCode ?? ""}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    if (dateFrom && row.lastInspectionAt < dateFrom) return false;
    if (dateTo && row.lastInspectionAt > `${dateTo}T23:59:59`) return false;
    return true;
  });
}

function buildSelectOptions(
  data: InspectionRecord[],
  field: keyof Pick<InspectionRecord, "owner" | "region" | "storeLevel">,
  allLabel: string
): TableToolbarFilterOption[] {
  const values = [...new Set(data.map((r) => r[field]).filter(Boolean))] as string[];
  return [
    { label: allLabel, value: "all" },
    ...values.sort().map((v) => ({ label: v, value: v })),
  ];
}

/** 云盯门店巡检业务表格（任务模式） */
export function InspectionTable({
  dataSource = [],
  loading = false,
  className,
  title = "门店巡检任务",
  quickFilterItems,
  storageKey = "inspection-table",
  pagination = {
    total: 0,
    defaultPageSize: 10,
    showTotal: true,
    showSizeChanger: true,
  },
  onRefresh,
  onExport,
  onBatchAssign,
  onBatchComplete,
  batchActions,
  renderActions,
}: InspectionTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuickFilterValue>("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [advanced, setAdvanced] = useState<InspectionAdvancedFilterValues>(DEFAULT_ADVANCED);
  const [selected, setSelected] = useState<string[]>([]);
  const [columnSettingOpen, setColumnSettingOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { visibleKeys, setVisibleKeys, defaultKeys } = useColumnVisibility(
    storageKey,
    INSPECTION_COLUMN_SETTING_ITEMS
  );

  const resolvedQuickItems = useMemo(
    () =>
      quickFilterItems ??
      buildQuickFilterItems(dataSource, { overdue: "已逾期" }),
    [quickFilterItems, dataSource]
  );

  const ownerOptions = useMemo(
    () => buildSelectOptions(dataSource, "owner", "全部负责人"),
    [dataSource]
  );
  const regionOptions = useMemo(
    () => buildSelectOptions(dataSource, "region", "全部区域"),
    [dataSource]
  );
  const storeLevelOptions = useMemo(
    () => buildSelectOptions(dataSource, "storeLevel", "全部门店等级"),
    [dataSource]
  );

  const filtered = useMemo(
    () =>
      filterInspectionData(dataSource, {
        search,
        status: statusFilter,
        method: methodFilter,
        dateFrom: advanced.dateFrom,
        dateTo: advanced.dateTo,
        owner: advanced.owner,
        region: advanced.region,
        storeLevel: advanced.storeLevel,
      }),
    [dataSource, search, statusFilter, methodFilter, advanced]
  );

  const columns = useMemo(
    () => buildColumns(visibleKeys, renderActions),
    [visibleKeys, renderActions]
  );

  const resolvedBatchActions: TableBatchAction[] =
    batchActions ??
    [
      {
        key: "assign",
        label: "批量指派",
        onClick: (keys) => onBatchAssign?.(keys),
      },
      {
        key: "complete",
        label: "批量完成",
        variant: "outline",
        onClick: (keys) => onBatchComplete?.(keys),
      },
      {
        key: "export",
        label: "批量导出",
        variant: "outline",
        onClick: (keys) => onExport?.(keys),
      },
    ];

  const handleReset = async () => {
    setSearch("");
    setMethodFilter("all");
    setStatusFilter("all");
    setAdvanced(DEFAULT_ADVANCED);
    setAdvancedExpanded(false);
    setRefreshing(true);
    try {
      await onRefresh?.();
    } finally {
      setRefreshing(false);
    }
  };

  const patchAdvanced = (patch: Partial<InspectionAdvancedFilterValues>) => {
    setAdvanced((prev) => ({ ...prev, ...patch }));
  };

  const advancedActive = isAdvancedFilterActive(advanced);

  return (
    <div className={className}>
      {title ? (
        <h3 className="mb-3 text-base font-semibold text-[color:var(--color-text-primary)]">
          {title}
        </h3>
      ) : null}

      <div className="mb-3 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-3">
        <TableToolbar
          variant="compact"
          searchable
          exportable
          resettable
          columnSetting
          advancedFilterable
          advancedFilterExpanded={advancedExpanded}
          advancedFilterActive={advancedActive}
          searchValue={search}
          onSearch={setSearch}
          methodValue={methodFilter}
          onMethodChange={setMethodFilter}
          onReset={handleReset}
          onToggleAdvancedFilter={() => setAdvancedExpanded((v) => !v)}
          onExport={() => onExport?.(selected)}
          onOpenColumnSetting={() => setColumnSettingOpen(true)}
        />
        <InspectionAdvancedFilter
          variant="panel"
          expanded={advancedExpanded}
          values={advanced}
          onChange={patchAdvanced}
          ownerOptions={ownerOptions}
          regionOptions={regionOptions}
          storeLevelOptions={storeLevelOptions}
        />
      </div>

      <TableBatchActions
        selectedCount={selected.length}
        selectedKeys={selected}
        actions={resolvedBatchActions}
        onClear={() => setSelected([])}
        className="mb-3"
      />

      <InspectionQuickFilter
        value={statusFilter}
        onChange={setStatusFilter}
        items={resolvedQuickItems}
        className="mb-3"
      />

      <Table<InspectionRecord>
        columns={columns}
        dataSource={filtered}
        loading={loading || refreshing}
        striped
        rowSelection={{
          selectedRowKeys: selected,
          onChange: setSelected,
        }}
        scroll={{ x: 1100 }}
        pagination={
          pagination === false
            ? false
            : {
                ...pagination,
                total: pagination.total ?? filtered.length,
              }
        }
      />
      <TableColumnSetting
        open={columnSettingOpen}
        onClose={() => setColumnSettingOpen(false)}
        items={INSPECTION_COLUMN_SETTING_ITEMS}
        visibleKeys={visibleKeys}
        defaultVisibleKeys={defaultKeys}
        onChange={setVisibleKeys}
        storageKey={storageKey}
      />
    </div>
  );
}
