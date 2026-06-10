"use client";

import { useMemo, type CSSProperties } from "react";
import { cn } from "../../lib/utils";
import {
  RiskColorBar,
  StatusTabs,
  type RiskLevel,
} from "./table-business-patterns";
import { TableActionGroup, TableActionLink } from "../../components/table-actions";
import { TablePagination } from "../../components/table-pagination";
import { InspectionScore } from "./inspection-score";
import type {
  InspectionRiskRecord,
  InspectionRiskTableProps,
  StoreRiskLevel,
} from "./inspection-risk.types";
import { RectificationProgress } from "../progress/rectification-progress";
import { resolveRateStatus } from "../progress/business-progress-utils";
import { RectificationStatusTag } from "./rectification-status-tag";
import { StoreRiskLevelTag } from "./store-risk-level-tag";

const RISK_BAR_MAP: Record<StoreRiskLevel, RiskLevel> = {
  high: "expired",
  medium: "warning",
  low: "normal",
};

const RISK_SORT_ORDER: Record<StoreRiskLevel, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const ACTION_STICKY: CSSProperties = {
  position: "sticky",
  right: 0,
  zIndex: 2,
  backgroundColor: "var(--table-bg)",
  boxShadow: "-4px 0 8px rgba(15, 20, 25, 0.06)",
};

const ACTION_STICKY_HEADER: CSSProperties = {
  ...ACTION_STICKY,
  zIndex: 3,
  backgroundColor: "var(--table-header-bg)",
};

/** 巡检风险表格 — 风险优先字段，StatusTabs 状态切换 */
export function InspectionRiskTable({
  dataSource,
  statusTabItems,
  statusFilter,
  onStatusFilterChange,
  loading = false,
  pagination,
  className,
  onView,
}: InspectionRiskTableProps) {
  const filtered = useMemo(() => {
    const list = dataSource.filter(
      (row) => statusFilter === "all" || row.rectificationStatus === statusFilter
    );
    return [...list].sort(
      (a, b) => RISK_SORT_ORDER[a.riskLevel] - RISK_SORT_ORDER[b.riskLevel]
    );
  }, [dataSource, statusFilter]);

  const cellPad = "var(--table-cell-padding-md)";

  return (
    <div className={cn("w-full", className)}>
      <StatusTabs
        items={statusTabItems}
        value={statusFilter}
        onChange={onStatusFilterChange}
        className="mb-4"
      />
      <div className="relative overflow-x-auto rounded-[var(--table-radius)] border border-[color:var(--table-border-color)]">
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[color:var(--table-bg)]/60 text-sm text-[color:var(--color-text-tertiary)]">
            加载中…
          </div>
        ) : null}
        <table className="w-full min-w-[1040px] border-collapse text-left text-[14px]">
          <thead>
            <tr
              style={{
                height: "var(--table-header-height)",
                backgroundColor: "var(--table-header-bg)",
              }}
            >
              {[
                { key: "risk", title: "", w: 12 },
                { key: "store", title: "门店名称" },
                { key: "score", title: "巡检得分", w: 100 },
                { key: "abnormal", title: "异常项", w: 88 },
                { key: "level", title: "风险等级", w: 110 },
                { key: "time", title: "最近巡检时间", w: 130 },
                { key: "status", title: "整改状态", w: 100 },
                { key: "rate", title: "整改完成率", w: 110 },
                { key: "action", title: "操作", fixed: true, w: onView ? 200 : 120 },
              ].map((col) => (
                <th
                  key={col.key}
                  className="border-b border-[color:var(--table-header-border-color)] font-medium text-[color:var(--color-text-secondary)]"
                  style={{
                    padding: cellPad,
                    paddingLeft: col.key === "risk" ? 8 : cellPad,
                    width: col.w,
                    ...(col.fixed ? ACTION_STICKY_HEADER : {}),
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-sm text-[color:var(--color-text-tertiary)]"
                >
                  暂无数据
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr
                  key={row.key}
                  className="relative border-b border-[color:var(--table-border-color)] transition-colors last:border-b-0 hover:bg-[color:var(--table-row-hover-bg)]"
                  style={{
                    height: "var(--table-row-height-md)",
                    backgroundColor: "var(--table-bg)",
                  }}
                >
                  <td className="relative w-3 p-0">
                    <RiskColorBar level={RISK_BAR_MAP[row.riskLevel]} />
                  </td>
                  <td style={{ padding: cellPad }}>
                    <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
                      <span className="truncate font-medium text-[color:var(--color-text-primary)]">
                        {row.storeName}
                      </span>
                      {row.storeType ? (
                        <span
                          className="inline-flex shrink-0 rounded-[var(--table-radius)] px-1.5 py-0.5 text-[11px]"
                          style={{
                            backgroundColor: "var(--table-row-selected-bg)",
                            color: "var(--table-action-color)",
                          }}
                        >
                          {row.storeType}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td style={{ padding: cellPad }}>
                    <InspectionScore score={row.score} />
                  </td>
                  <td
                    style={{ padding: cellPad }}
                    className={cn(
                      "tabular-nums font-medium",
                      row.abnormalCount > 0
                        ? "text-[color:var(--modal-error-color)]"
                        : "text-[color:var(--color-text-secondary)]"
                    )}
                  >
                    {row.abnormalCount}
                  </td>
                  <td style={{ padding: cellPad }}>
                    <StoreRiskLevelTag level={row.riskLevel} />
                  </td>
                  <td
                    style={{ padding: cellPad }}
                    className="text-[color:var(--color-text-secondary)]"
                  >
                    {row.lastInspectionAt}
                  </td>
                  <td style={{ padding: cellPad }} className="whitespace-nowrap">
                    <RectificationStatusTag status={row.rectificationStatus} />
                  </td>
                  <td style={{ padding: cellPad }}>
                    <RectificationProgress
                      percent={row.rectificationRate}
                      status={resolveRateStatus(row.rectificationRate)}
                      size="small"
                      showStats={false}
                    />
                  </td>
                  <td style={{ padding: cellPad, ...ACTION_STICKY }}>
                    <TableActionGroup>
                      {onView ? (
                        <>
                          <TableActionLink onClick={() => onView(row)}>查看</TableActionLink>
                          <TableActionLink>发起整改</TableActionLink>
                          <TableActionLink>更多</TableActionLink>
                        </>
                      ) : (
                        <>
                          <TableActionLink>查看</TableActionLink>
                          <TableActionLink>整改</TableActionLink>
                        </>
                      )}
                    </TableActionGroup>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination !== false ? (
        <TablePagination
          className="mt-4"
          total={pagination?.total ?? filtered.length}
          defaultCurrent={pagination?.defaultCurrent}
          defaultPageSize={pagination?.defaultPageSize ?? 10}
          showTotal={pagination?.showTotal}
          showSizeChanger={pagination?.showSizeChanger}
          showQuickJumper={pagination?.showQuickJumper}
        />
      ) : null}
    </div>
  );
}
