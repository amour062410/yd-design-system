"use client";

import { useState } from "react";
import {
  CertificateStatusTable,
  ExpandableDetailTable,
  InteractiveExpandableDetailTable,
  RiskColorBar,
  RiskLevelTag,
  StatusTabs,
} from "@yd-ds/ui/table";
import { tableBusinessSpecRows } from "@yd-ds/tokens";
import {
  BUSINESS_PATTERN_BEST_PRACTICES,
  CERTIFICATE_STATUS_ROWS,
  CERTIFICATE_STATUS_TABS,
  EXPANDABLE_DETAIL_ROWS,
} from "@/lib/data/tableBusinessMock";

function ShowcaseCard({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      {title ? (
        <p className="mb-1 text-sm font-medium text-foreground">{title}</p>
      ) : null}
      {description ? (
        <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

function SpecTable({
  rows,
}: {
  rows: readonly { token: string; value: string; desc: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-[color:var(--table-border-color)]">
      <table className="w-full min-w-[520px] text-left text-[13px]">
        <thead>
          <tr
            className="border-b border-[color:var(--table-header-border-color)]"
            style={{ backgroundColor: "var(--table-header-bg)" }}
          >
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              Token
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              Value
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              说明
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.token}
              className="border-b border-[color:var(--table-border-color)] last:border-0"
            >
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--table-action-color)]">
                {row.token}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--color-text-secondary)]">
                {row.value}
              </td>
              <td className="px-4 py-3 text-[color:var(--color-text-secondary)]">
                {row.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ExpandableDetailTableShowcase() {
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <div className="space-y-8">
      <ShowcaseCard
        title="交互演示"
        description="适用于课程管理、知识库、风控、审核等场景。"
      >
        <div className="space-y-10">
          <div>
            <h4 className="mb-4 text-[13px] font-semibold text-foreground">
              完整表格
            </h4>
            <p className="mb-4 text-xs text-muted-foreground">
              默认收起；点击「参考标准」列 + 展开详情；右侧操作列固定。
            </p>
            <ExpandableDetailTable
              dataSource={EXPANDABLE_DETAIL_ROWS}
              expandedRowKeys={expanded}
              onExpandedRowsChange={setExpanded}
            />
          </div>

          <div className="border-t border-border/50 pt-10">
            <h4 className="mb-2 text-[13px] font-semibold text-foreground">
              行状态 · Default / Hover / Expanded
            </h4>
            <p className="mb-6 text-xs text-muted-foreground">
              与 Input 基础输入一致：合并为可交互演示，悬停看 Hover，点击参考标准 + 看 Expanded。
            </p>
            <InteractiveExpandableDetailTable dataSource={EXPANDABLE_DETAIL_ROWS} />
          </div>
        </div>
      </ShowcaseCard>
    </div>
  );
}

export function CertificateStatusTableShowcase() {
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="space-y-8">
      <ShowcaseCard
        title="状态筛选 + 风险色条"
        description="顶部 Tab 筛选；行左侧 4px 风险色条；全部视图下按 紧急 → 预警 → 安全 排序；门店名与标签同行。"
      >
        <CertificateStatusTable
          dataSource={CERTIFICATE_STATUS_ROWS}
          statusTabItems={CERTIFICATE_STATUS_TABS}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          pagination={{
            total: CERTIFICATE_STATUS_ROWS.length,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showTotal: true,
            showQuickJumper: true,
          }}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          当前筛选：
          <span className="font-mono text-primary">{statusFilter}</span>
        </p>
      </ShowcaseCard>

      <ShowcaseCard title="状态标签 · 风险色条组件">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <RiskLevelTag level="expired" />
            <RiskLevelTag level="warning" />
            <RiskLevelTag level="normal" />
          </div>
          <div className="relative h-10 w-24 rounded border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)]">
            <RiskColorBar level="expired" />
            <span className="pl-4 text-xs text-muted-foreground">色条示例</span>
          </div>
          <StatusTabs
            items={CERTIFICATE_STATUS_TABS}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </ShowcaseCard>
    </div>
  );
}

export function BusinessPatternSpecShowcase() {
  return (
    <div className="space-y-8">
      <SpecTable rows={tableBusinessSpecRows} />
      <div className="rounded-md border bg-muted/20 px-5 py-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          企业后台最佳实践
        </h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {BUSINESS_PATTERN_BEST_PRACTICES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
