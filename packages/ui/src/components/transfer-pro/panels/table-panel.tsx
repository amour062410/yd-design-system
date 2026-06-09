"use client";

import { useMemo } from "react";
import { Table } from "../../table";
import { filterRecordsByKeyword } from "../core/transfer-engine";
import { SearchBar } from "../components/search-bar";
import { TransferFooter } from "../components/transfer-footer";
import {
  getTransferProModeBadgeStyle,
  transferProModeBadgeClass,
  transferProPanelHeaderClass,
  transferProPanelTableBodyClass,
  transferProPanelTableClass,
} from "../transfer-pro.tokens";
import type { TransferProRecord, TransferProTablePanelProps } from "../transfer-pro.types";

function resolveTableScrollWidth(columns: TransferProTablePanelProps["columns"]) {
  const checkboxWidth = 48;
  const columnsWidth = columns.reduce((sum, column) => {
    if (typeof column.width === "number") return sum + column.width;
    if (typeof column.width === "string" && column.width.endsWith("px")) {
      return sum + Number.parseInt(column.width, 10);
    }
    return sum + 96;
  }, 0);
  return checkboxWidth + columnsWidth;
}

export function TablePanel({
  title,
  items,
  columns,
  selectedKeys,
  onSelectChange,
  searchValue,
  onSearchChange,
  showSearch,
  disabled,
  panelWidth,
}: TransferProTablePanelProps) {
  const filtered = useMemo(
    () => filterRecordsByKeyword(items, searchValue),
    [items, searchValue]
  );

  const tableColumns = columns.map((column) => ({
    key: column.key,
    title: column.title,
    dataIndex: column.dataIndex as keyof TransferProRecord,
    width: column.width,
    render: column.render
      ? (_: unknown, record: TransferProRecord) =>
          column.render?.(record[column.dataIndex as keyof TransferProRecord], record)
      : undefined,
  }));

  const scrollX = resolveTableScrollWidth(columns);

  return (
    <div
      className={transferProPanelTableClass()}
      style={{
        width: "100%",
        minWidth: panelWidth ?? "var(--transfer-pro-table-panel-min-width, 520px)",
      }}
    >
      <div className={transferProPanelHeaderClass()}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate">{title}</span>
          <span className={transferProModeBadgeClass()} style={getTransferProModeBadgeStyle("table")}>
            Table
          </span>
        </div>
        <span className="text-[12px] font-normal text-[color:var(--transfer-pro-color-text-secondary,#86909c)]">
          {selectedKeys.length}/{items.length}
        </span>
      </div>

      {showSearch ? <SearchBar value={searchValue} onChange={onSearchChange} disabled={disabled} /> : null}

      <div className={transferProPanelTableBodyClass()}>
        <Table<TransferProRecord & Record<string, unknown>>
          size="sm"
          rowKey="key"
          bordered
          columns={tableColumns}
          dataSource={filtered as (TransferProRecord & Record<string, unknown>)[]}
          scroll={{ x: scrollX }}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => onSelectChange(keys),
          }}
        />
      </div>

      <TransferFooter selectedCount={selectedKeys.length} totalCount={items.length} />
    </div>
  );
}
