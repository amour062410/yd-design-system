"use client";

import { Plus } from "lucide-react";
import {
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";
import { Checkbox } from "../../components/checkbox";
import { TableActionGroup, TableActionLink } from "../../components/table-actions";
import { TablePagination, type TablePaginationConfig } from "../../components/table-pagination";

export type RiskLevel = "expired" | "warning" | "normal";

export type StatusTabTone = "default" | "danger" | "warning";

export interface StatusTabItem {
  key: string;
  label: string;
  count?: number;
  tone?: StatusTabTone;
}

export interface StatusTabsProps {
  items: StatusTabItem[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
}

const RISK_COLORS: Record<RiskLevel, string> = {
  expired: "var(--table-risk-expired)",
  warning: "var(--table-risk-warning)",
  normal: "var(--table-risk-normal)",
};

const RISK_LABELS: Record<RiskLevel, string> = {
  expired: "已过期",
  warning: "即将到期",
  normal: "正常",
};

export function RiskColorBar({
  level,
  className,
}: {
  level: RiskLevel;
  className?: string;
}) {
  return (
    <span
      className={cn("absolute bottom-0 left-0 top-0 shrink-0", className)}
      style={{
        width: "var(--table-risk-bar-width)",
        backgroundColor: RISK_COLORS[level],
      }}
      aria-hidden
    />
  );
}

export function RiskLevelTag({
  level,
  className,
}: {
  level: RiskLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--table-radius)] px-2 py-0.5 text-[13px]",
        className
      )}
      style={{
        backgroundColor:
          level === "expired"
            ? "rgba(235, 87, 87, 0.1)"
            : level === "warning"
              ? "rgba(242, 153, 74, 0.12)"
              : "rgba(111, 207, 151, 0.12)",
        color: RISK_COLORS[level],
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: RISK_COLORS[level] }}
      />
      {RISK_LABELS[level]}
    </span>
  );
}

export function StatusTabs({ items, value, onChange, className }: StatusTabsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const active = item.key === value;
        const toneColor =
          item.tone === "danger"
            ? "#EB5757"
            : item.tone === "warning"
              ? "#F2994A"
              : undefined;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={cn(
              "rounded-[var(--table-radius)] px-3 py-1.5 text-[13px] transition-colors",
              active
                ? "bg-[color:var(--table-row-selected-bg)] font-medium text-[color:var(--table-action-color)]"
                : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--table-row-hover-bg)]"
            )}
            style={!active && toneColor ? { color: toneColor } : undefined}
          >
            {item.label}
            {item.count != null ? ` (${item.count})` : ""}
          </button>
        );
      })}
    </div>
  );
}

export type DetailKnowledgePoint = {
  title: string;
  content: string;
  description: string;
};

export type DetailCourse = {
  name: string;
  lessonCount: number;
};

export type DetailMaterial = {
  name: string;
  type: "pdf" | "video" | "file";
};

export type DetailPanelProps = {
  knowledgePoints?: DetailKnowledgePoint[];
  course?: DetailCourse;
  materials?: DetailMaterial[];
  standardImages?: string[];
  className?: string;
};

function MaterialIcon({ type }: { type: DetailMaterial["type"] }) {
  const label = type === "pdf" ? "PDF" : type === "video" ? "视频" : "附件";
  return (
    <span className="rounded bg-[color:var(--table-row-selected-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[color:var(--table-action-color)]">
      {label}
    </span>
  );
}

export function DetailPanel({
  knowledgePoints = [],
  course,
  materials = [],
  standardImages = [],
  className,
}: DetailPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--table-radius)] border border-solid text-[13px]",
        className
      )}
      style={{
        backgroundColor: "var(--table-detail-panel-bg)",
        borderColor: "var(--table-detail-panel-border)",
        padding: "var(--table-detail-panel-padding)",
      }}
    >
      {knowledgePoints.length > 0 ? (
        <section className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-[color:var(--color-text-primary)]">
            关联知识库知识点
          </h4>
          <ul className="space-y-4">
            {knowledgePoints.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="text-[color:var(--table-action-color)] hover:opacity-80"
                >
                  {item.title}
                </button>
                <p className="mt-1 text-[color:var(--color-text-primary)]">{item.content}</p>
                <p className="mt-0.5 text-[color:var(--color-text-tertiary)]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {course ? (
        <section className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-[color:var(--color-text-primary)]">
            课程
          </h4>
          <p>
            <button
              type="button"
              className="text-[color:var(--table-action-color)] hover:opacity-80"
            >
              {course.name}
            </button>
            <span className="ml-2 text-[color:var(--color-text-tertiary)]">
              共 {course.lessonCount} 节课
            </span>
          </p>
        </section>
      ) : null}

      {materials.length > 0 ? (
        <section className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-[color:var(--color-text-primary)]">
            素材
          </h4>
          <ul className="space-y-2">
            {materials.map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <MaterialIcon type={m.type} />
                <button
                  type="button"
                  className="text-[color:var(--table-action-color)] hover:opacity-80"
                >
                  {m.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {standardImages.length > 0 ? (
        <section>
          <h4 className="mb-3 text-sm font-semibold text-[color:var(--color-text-primary)]">
            标准图
          </h4>
          <div className="flex flex-wrap gap-2">
            {standardImages.map((src, i) => (
              <div
                key={i}
                className="size-16 overflow-hidden rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-skeleton-bg)] transition-shadow hover:shadow-[var(--select-panel-shadow)]"
              >
                <div
                  className="flex size-full items-center justify-center text-[10px] text-[color:var(--color-text-tertiary)]"
                  style={{
                    background: `linear-gradient(135deg, var(--table-row-hover-bg), var(--table-detail-panel-border))`,
                  }}
                >
                  图{i + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export type ImportanceLevel = "yellow" | "red" | "normal";

function ImportanceTag({ level }: { level: ImportanceLevel }) {
  const styles: Record<ImportanceLevel, { bg: string; color: string; label: string }> = {
    yellow: {
      bg: "var(--color-warning-muted)",
      color: "var(--table-risk-warning)",
      label: "黄线",
    },
    red: {
      bg: "var(--color-danger-muted)",
      color: "var(--table-risk-expired)",
      label: "红线",
    },
    normal: {
      bg: "var(--table-row-selected-bg)",
      color: "var(--table-action-color)",
      label: "普通",
    },
  };
  const s = styles[level];
  return (
    <span
      className="inline-flex rounded-[var(--table-radius)] px-2 py-0.5 text-[12px] font-medium"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

export type ExpandableDetailRow = {
  key: string;
  score: number;
  knowledgeLink: string;
  knowledgeCount: number;
  importance: ImportanceLevel;
  scoringItem: string;
  scoringRule: string;
  owner: string;
  standardCount: number;
  detail: DetailPanelProps;
};

export interface ExpandableDetailTableProps {
  dataSource: ExpandableDetailRow[];
  expandedRowKeys?: string[];
  defaultExpandedRowKeys?: string[];
  onExpandedRowsChange?: (keys: string[]) => void;
  selectedRowKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  showcaseRowState?: "default" | "hover" | "expanded";
  forceExpandedKey?: string;
  hoveredRowKey?: string;
  onRowMouseEnter?: (rowKey: string) => void;
  onRowMouseLeave?: (rowKey: string) => void;
  className?: string;
}

const EXPAND_HEADERS = [
  { key: "select", title: "", width: 48 },
  { key: "score", title: "分值" },
  { key: "knowledge", title: "关联知识" },
  { key: "importance", title: "重要等级" },
  { key: "item", title: "评分项" },
  { key: "rule", title: "计分规则" },
  { key: "owner", title: "关联责任人" },
  { key: "standard", title: "参考标准" },
  { key: "action", title: "操作", fixed: "right" as const, width: 120 },
] as const;

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

export function ExpandableDetailTable({
  dataSource,
  expandedRowKeys: controlledExpanded,
  defaultExpandedRowKeys = [],
  onExpandedRowsChange,
  selectedRowKeys: controlledSelected,
  onSelectionChange,
  showcaseRowState,
  forceExpandedKey,
  hoveredRowKey,
  onRowMouseEnter,
  onRowMouseLeave,
  className,
}: ExpandableDetailTableProps) {
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpandedRowKeys);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const expandedKeys = controlledExpanded ?? internalExpanded;
  const selectedKeys = controlledSelected ?? internalSelected;

  const setExpanded = (keys: string[]) => {
    if (controlledExpanded === undefined) setInternalExpanded(keys);
    onExpandedRowsChange?.(keys);
  };

  const setSelected = (keys: string[]) => {
    if (controlledSelected === undefined) setInternalSelected(keys);
    onSelectionChange?.(keys);
  };

  const toggleExpand = (key: string) => {
    setExpanded(
      expandedKeys.includes(key)
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key]
    );
  };

  const allKeys = dataSource.map((r) => r.key);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k));
  const someSelected = selectedKeys.length > 0 && !allSelected;

  const cellPad = "var(--table-cell-padding-md)";

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-[var(--table-radius)] border border-[color:var(--table-border-color)]",
        className
      )}
    >
      <table className="w-full min-w-[960px] border-collapse text-left text-[14px]">
        <thead>
          <tr
            style={{
              height: "var(--table-header-height)",
              backgroundColor: "var(--table-header-bg)",
            }}
          >
            {EXPAND_HEADERS.map((col) => (
              <th
                key={col.key}
                className="border-b border-[color:var(--table-header-border-color)] font-medium text-[color:var(--color-text-secondary)]"
                style={{
                  padding: cellPad,
                  width: "width" in col ? col.width : undefined,
                  ...("fixed" in col && col.fixed === "right" ? ACTION_STICKY_HEADER : {}),
                }}
              >
                {col.key === "select" ? (
                  <div className="flex justify-center">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => setSelected(allSelected ? [] : [...allKeys])}
                      aria-label="全选"
                    />
                  </div>
                ) : (
                  col.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row) => {
            const isExpanded =
              showcaseRowState === "expanded" ||
              forceExpandedKey === row.key ||
              expandedKeys.includes(row.key);
            const isSelected = selectedKeys.includes(row.key);
            const isHover =
              showcaseRowState === "hover" || hoveredRowKey === row.key;
            const rowBg = isHover
              ? "var(--table-row-hover-bg)"
              : isSelected
                ? "var(--table-row-selected-bg)"
                : "var(--table-bg)";

            return (
              <ExpandableRowGroup
                key={row.key}
                row={row}
                isExpanded={isExpanded}
                rowBg={rowBg}
                cellPad={cellPad}
                isSelected={isSelected}
                onToggleExpand={() => toggleExpand(row.key)}
                onToggleSelect={() =>
                  setSelected(
                    isSelected
                      ? selectedKeys.filter((k) => k !== row.key)
                      : [...selectedKeys, row.key]
                  )
                }
                showcaseAnimate={!showcaseRowState}
                actionSticky={ACTION_STICKY}
                onRowMouseEnter={() => onRowMouseEnter?.(row.key)}
                onRowMouseLeave={() => onRowMouseLeave?.(row.key)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ExpandableRowGroup({
  row,
  isExpanded,
  rowBg,
  cellPad,
  isSelected,
  onToggleExpand,
  onToggleSelect,
  showcaseAnimate,
  actionSticky,
  onRowMouseEnter,
  onRowMouseLeave,
}: {
  row: ExpandableDetailRow;
  isExpanded: boolean;
  rowBg: string;
  cellPad: string;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
  showcaseAnimate: boolean;
  actionSticky: CSSProperties;
  onRowMouseEnter?: () => void;
  onRowMouseLeave?: () => void;
}) {
  return (
    <>
      <tr
        style={{
          height: "var(--table-row-height-md)",
          backgroundColor: rowBg,
        }}
        className="border-b border-[color:var(--table-border-color)] transition-colors hover:bg-[color:var(--table-row-hover-bg)]"
        onMouseEnter={onRowMouseEnter}
        onMouseLeave={onRowMouseLeave}
      >
        <td style={{ padding: cellPad }} className="w-12 text-center">
          <div className="flex justify-center">
            <Checkbox checked={isSelected} onChange={onToggleSelect} />
          </div>
        </td>
        <td style={{ padding: cellPad }} className="text-[color:var(--color-text-primary)]">
          {row.score}
        </td>
        <td style={{ padding: cellPad }}>
          <button type="button" className="text-[color:var(--table-action-color)]">
            已关联 ({row.knowledgeCount})
          </button>
        </td>
        <td style={{ padding: cellPad }}>
          <ImportanceTag level={row.importance} />
        </td>
        <td
          style={{ padding: cellPad }}
          className="max-w-[140px] truncate text-[color:var(--color-text-primary)]"
        >
          {row.scoringItem}
        </td>
        <td
          style={{ padding: cellPad }}
          className="max-w-[160px] truncate text-[color:var(--color-text-secondary)]"
        >
          {row.scoringRule}
        </td>
        <td style={{ padding: cellPad }} className="text-[color:var(--color-text-secondary)]">
          {row.owner}
        </td>
        <td style={{ padding: cellPad }}>
          <button
            type="button"
            onClick={onToggleExpand}
            className="inline-flex items-center gap-1 font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--table-risk-normal)" }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "收起参考标准详情" : "展开参考标准详情"}
          >
            <Plus
              className={cn(
                "size-3.5 shrink-0 transition-transform duration-200",
                isExpanded && "rotate-45"
              )}
            />
            共{row.standardCount}项
          </button>
        </td>
        <td
          style={{
            padding: cellPad,
            ...actionSticky,
            backgroundColor: rowBg,
          }}
        >
          <TableActionGroup>
            <TableActionLink>编辑</TableActionLink>
            <TableActionLink>删除</TableActionLink>
          </TableActionGroup>
        </td>
      </tr>
      <tr className="border-b border-[color:var(--table-border-color)]">
        <td colSpan={EXPAND_HEADERS.length} className="p-0">
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-200 ease-out",
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              showcaseAnimate && "motion-reduce:transition-none"
            )}
          >
            <div className="overflow-hidden">
              <div
                className="px-4 pb-4 pt-1"
                style={{ paddingLeft: cellPad, paddingRight: cellPad }}
              >
                <DetailPanel {...row.detail} />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export type CertificateRecord = {
  key: string;
  storeName: string;
  storeType: string;
  certificateName: string;
  thumbnailLabel?: string;
  riskLevel: RiskLevel;
  remainingDaysText: string;
  category: string;
  statusFilterKey: string;
};

export interface CertificateStatusTableProps {
  dataSource: CertificateRecord[];
  statusTabItems: StatusTabItem[];
  statusFilter: string;
  onStatusFilterChange: (key: string) => void;
  pagination?: TablePaginationConfig | false;
  className?: string;
  /** 传入后启用「查看」：缩略图与操作列可点击，并展示完整业务操作项 */
  onView?: (record: CertificateRecord) => void;
}

function RemainingDaysText({
  level,
  children,
}: {
  level: RiskLevel;
  children: ReactNode;
}) {
  return (
    <span className="text-[13px] font-medium" style={{ color: RISK_COLORS[level] }}>
      {children}
    </span>
  );
}

const RISK_SORT_ORDER: Record<RiskLevel, number> = {
  expired: 0,
  warning: 1,
  normal: 2,
};

const CERT_ACTION_STICKY: CSSProperties = {
  position: "sticky",
  right: 0,
  zIndex: 2,
  backgroundColor: "var(--table-bg)",
  boxShadow: "-4px 0 8px rgba(15, 20, 25, 0.06)",
};

const CERT_ACTION_STICKY_HEADER: CSSProperties = {
  ...CERT_ACTION_STICKY,
  zIndex: 3,
  backgroundColor: "var(--table-header-bg)",
};

export function CertificateStatusTable({
  dataSource,
  statusTabItems,
  statusFilter,
  onStatusFilterChange,
  pagination,
  className,
  onView,
}: CertificateStatusTableProps) {
  const filtered = useMemo(() => {
    const list = dataSource.filter(
      (row) => row.statusFilterKey === statusFilter || statusFilter === "all"
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
      <div className="overflow-x-auto rounded-[var(--table-radius)] border border-[color:var(--table-border-color)]">
        <table className="w-full min-w-[880px] border-collapse text-left text-[14px]">
          <thead>
            <tr
              style={{
                height: "var(--table-header-height)",
                backgroundColor: "var(--table-header-bg)",
              }}
            >
              {[
                { key: "risk", title: "", w: 12 },
                { key: "store", title: "门店" },
                { key: "name", title: "证照名称" },
                { key: "thumb", title: "缩略图" },
                { key: "status", title: "状态" },
                { key: "days", title: "剩余天数" },
                { key: "cat", title: "分类" },
                {
                  key: "action",
                  title: "操作",
                  fixed: true,
                  w: onView ? 200 : 120,
                },
              ].map((col) => (
                <th
                  key={col.key}
                  className="border-b border-[color:var(--table-header-border-color)] font-medium text-[color:var(--color-text-secondary)]"
                  style={{
                    padding: cellPad,
                    paddingLeft: col.key === "risk" ? 8 : cellPad,
                    width: col.w,
                    ...(col.fixed ? CERT_ACTION_STICKY_HEADER : {}),
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.key}
                className="relative border-b border-[color:var(--table-border-color)] transition-colors last:border-b-0 hover:bg-[color:var(--table-row-hover-bg)]"
                style={{
                  height: "var(--table-row-height-md)",
                  backgroundColor: "var(--table-bg)",
                }}
              >
                <td className="relative w-3 p-0">
                  <RiskColorBar level={row.riskLevel} />
                </td>
                <td style={{ padding: cellPad }}>
                  <div className="flex flex-nowrap items-center gap-2">
                    <span className="font-medium text-[color:var(--color-text-primary)]">
                      {row.storeName}
                    </span>
                    <span
                      className="inline-flex shrink-0 rounded-[var(--table-radius)] px-1.5 py-0.5 text-[11px]"
                      style={{
                        backgroundColor: "var(--table-row-selected-bg)",
                        color: "var(--table-action-color)",
                      }}
                    >
                      {row.storeType}
                    </span>
                  </div>
                </td>
                <td
                  style={{ padding: cellPad }}
                  className="text-[color:var(--color-text-primary)]"
                >
                  {row.certificateName}
                </td>
                <td style={{ padding: cellPad }}>
                  <TableActionLink
                    onClick={onView ? () => onView(row) : undefined}
                  >
                    {row.thumbnailLabel ?? "查看"}
                  </TableActionLink>
                </td>
                <td style={{ padding: cellPad }}>
                  <RiskLevelTag level={row.riskLevel} />
                </td>
                <td style={{ padding: cellPad }}>
                  <RemainingDaysText level={row.riskLevel}>
                    {row.remainingDaysText}
                  </RemainingDaysText>
                </td>
                <td
                  style={{ padding: cellPad }}
                  className="text-[color:var(--color-text-secondary)]"
                >
                  {row.category}
                </td>
                <td style={{ padding: cellPad, ...CERT_ACTION_STICKY }}>
                  <TableActionGroup>
                    {onView ? (
                      <>
                        <TableActionLink onClick={() => onView(row)}>
                          查看
                        </TableActionLink>
                        <TableActionLink>编辑</TableActionLink>
                        <TableActionLink>续期</TableActionLink>
                        <TableActionLink>更多</TableActionLink>
                      </>
                    ) : (
                      <>
                        <TableActionLink>编辑</TableActionLink>
                        <TableActionLink>删除</TableActionLink>
                      </>
                    )}
                  </TableActionGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination !== false && pagination ? (
        <TablePagination {...pagination} total={pagination.total ?? filtered.length} />
      ) : null}
    </div>
  );
}

/** 可交互状态演示：Default / Hover / Expanded 合一 */
export function InteractiveExpandableDetailTable({
  dataSource,
  className,
}: {
  dataSource: ExpandableDetailRow[];
  className?: string;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const demoRow = dataSource[0];

  if (!demoRow) return null;

  const stateLabel = expanded.includes(demoRow.key)
    ? "Expanded"
    : hoveredKey === demoRow.key
      ? "Hover"
      : "Default";

  return (
    <div className={className}>
      <ExpandableDetailTable
        dataSource={[demoRow]}
        expandedRowKeys={expanded}
        onExpandedRowsChange={setExpanded}
        hoveredRowKey={hoveredKey ?? undefined}
        onRowMouseEnter={(key) => setHoveredKey(key)}
        onRowMouseLeave={(key) => {
          if (hoveredKey === key) setHoveredKey(null);
        }}
      />
      <div className="mt-3 space-y-2">
        <p className="text-[11px] leading-relaxed text-[color:var(--color-text-tertiary)]">
          鼠标移入行查看 Hover；点击「参考标准」列的 + 展开详情
        </p>
        <span className="inline-flex items-center rounded-full border border-[color:var(--table-action-color)]/25 bg-[color:var(--table-row-selected-bg)] px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--table-action-color)]">
          当前：{stateLabel}
        </span>
      </div>
    </div>
  );
}
