"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  TABLE_CODE_EXAMPLE,
  TABLE_INTRO,
  TABLE_USAGE_TOKEN_NAMES,
} from "@/lib/data/tableMock";
import {
  BusinessPatternSpecShowcase,
  CertificateStatusTableShowcase,
  ExpandableDetailTableShowcase,
} from "./business-table-showcase";
import { TablePageNav } from "./table-page-nav";
import {
  TableBasicShowcase,
  InspectionStatusTagShowcase,
  InspectionTableShowcase,
  StoreInspectionDemoShowcase,
  TableCandidateDemoShowcase,
  TableDesignSpecShowcase,
  TableEditableAddShowcase,
  TableEmptyShowcase,
  TableExpandableShowcase,
  TableFilterShowcase,
  TableFixedColumnsShowcase,
  TableFixedHeaderShowcase,
  TableLoadingShowcase,
  TablePaginationShowcase,
  TableSelectionShowcase,
  TableSizesShowcase,
  TableSortShowcase,
  TableStatesShowcase,
} from "./table-showcase";

const TABLE_FILTER_SORT_API: ApiTableRow[] = [
  {
    prop: "columns[].filters",
    type: "{ text, value }[]",
    description: "列筛选菜单选项。",
  },
  {
    prop: "columns[].onFilter",
    type: "(value, record) => boolean",
    description: "筛选逻辑，value 为选中项。",
  },
  {
    prop: "columns[].filterMultiple",
    type: "boolean",
    default: "true",
    description: "多选 / 单选。",
  },
  {
    prop: "columns[].defaultFilteredValue",
    type: "(string | number | boolean)[]",
    description: "列默认筛选项。",
  },
  {
    prop: "columns[].filteredValue",
    type: "(string | number | boolean)[] | null",
    description: "受控筛选项。",
  },
  {
    prop: "filterOnClose",
    type: "boolean",
    default: "false",
    description: "筛选菜单关闭时是否触发筛选。",
  },
  {
    prop: "columns[].sorter",
    type: "boolean | (rowA, rowB, sortOrder?) => number",
    description: "排序函数；第三参为 ascend / descend 时可用。",
  },
  {
    prop: "columns[].defaultSortOrder",
    type: `"ascend" | "descend"`,
    description: "列默认排序。",
  },
  {
    prop: "sortDirections",
    type: `("ascend" | "descend" | null)[]`,
    default: "['ascend','descend',null]",
    description: "表级排序切换顺序；可设 ['ascend','descend','ascend'] 禁止恢复默认。",
  },
  {
    prop: "columns[].sortDirections",
    type: `("ascend" | "descend" | null)[]`,
    description: "列级排序切换，覆盖表级配置。",
  },
  {
    prop: "onChange",
    type: "(pagination, filters, sorter) => void",
    description: "筛选、排序、分页变化回调。",
  },
];

const TABLE_BUSINESS_API: ApiTableRow[] = [
  { prop: "ExpandableDetailTable", type: "component", description: "可展开详情业务表格。" },
  { prop: "DetailPanel", type: "component", description: "展开区：知识点 / 课程 / 素材 / 标准图。" },
  { prop: "CertificateStatusTable", type: "component", description: "证照状态 + Tab 筛选表格。" },
  { prop: "StatusTabs", type: "component", description: "顶部状态 Tab（支持 count / tone）。" },
  { prop: "RiskLevelTag", type: "component", description: "已过期 / 即将到期 / 正常 标签。" },
  { prop: "RiskColorBar", type: "component", description: "行左侧 4px 风险色条。" },
];

export default function TablePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Table" description={TABLE_INTRO} />
      <TablePageNav />

      <section id="table-basic" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Basic</h2>
        <TableBasicShowcase />
      </section>

      <section id="table-sort" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Sorting</h2>
        <TableSortShowcase />
      </section>

      <section id="table-filter" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Filtering</h2>
        <TableFilterShowcase />
      </section>

      <section id="table-selection" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Selection</h2>
        <TableSelectionShowcase />
      </section>

      <section id="table-expandable" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Expandable</h2>
        <TableExpandableShowcase />
      </section>

      <section id="table-editable" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Editable</h2>
        <TableEditableAddShowcase />
      </section>

      <section id="table-fixed-header" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Fixed Header</h2>
        <TableFixedHeaderShowcase />
      </section>

      <section id="table-fixed-column" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Fixed Column</h2>
        <TableFixedColumnsShowcase />
      </section>

      <section id="table-empty" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Empty</h2>
        <TableEmptyShowcase />
      </section>

      <section id="table-loading" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Loading</h2>
        <TableLoadingShowcase />
      </section>

      <section id="table-inspection" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">InspectionTable · 云盯业务</h2>
        <p className="text-sm text-muted-foreground">
          TableToolbar、ColumnSetting（Drawer + localStorage）、TableBatchActions、InspectionStatusTag。
        </p>
        <InspectionStatusTagShowcase />
        <InspectionTableShowcase />
      </section>

      <section id="table-store-inspection-demo" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">StoreInspectionDemo V3</h2>
        <p className="text-sm text-muted-foreground">
          风险管理驾驶舱：异常门店 / 待整改项 / 高风险门店 / 完成率；证照管理式业务筛选；整改状态 Tab；风险优先表格字段。
        </p>
        <StoreInspectionDemoShowcase />
      </section>

      <section id="table-candidate-demo" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">CandidateTableDemo（兼容）</h2>
        <TableCandidateDemoShowcase />
      </section>

      <section id="table-states" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">States</h2>
        <p className="text-sm text-muted-foreground">
          Default、Hover Row、Selected Row。
        </p>
        <TableStatesShowcase />
      </section>

      <section id="table-sizes" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Sizes</h2>
        <p className="text-sm text-muted-foreground">
          Medium 60px · Small 38px 行高。
        </p>
        <TableSizesShowcase />
      </section>

      <section id="table-pagination" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Pagination</h2>
        <p className="text-sm text-muted-foreground">
          总数、页码、每页条数、跳转页 — 企业后台标准分页。
        </p>
        <TablePaginationShowcase />
      </section>

      <section id="table-design-spec" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Design Spec</h2>
        <p className="text-sm text-muted-foreground">
          Header Height、Row Height、Border、Hover、Selected、Empty、Loading。
        </p>
        <TableDesignSpecShowcase />
      </section>

      <section id="table-business-patterns" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Business Table Patterns
        </h2>
        <p className="text-sm text-muted-foreground">
          业务表格模式：主数据展开详情、证照状态与风险预警。组件可从{" "}
          <code className="rounded bg-muted px-1">@yd-ds/ui/table</code> 引入复用。
        </p>
      </section>

      <section id="table-pattern-expandable" className="scroll-mt-24 space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">
          Pattern 01 · Expandable Detail Table
        </h3>
        <p className="text-sm text-muted-foreground">
          主数据 + 展开详情：课程 / 知识库 / 风控 / 审核管理。
        </p>
        <ExpandableDetailTableShowcase />
      </section>

      <section id="table-pattern-certificate" className="scroll-mt-24 space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">
          Pattern 02 · Certificate Status Table
        </h3>
        <p className="text-sm text-muted-foreground">
          证照 / 资质 / 有效期管理；顶部 Tab 筛选 + 行内风险色条。
        </p>
        <CertificateStatusTableShowcase />
      </section>

      <section id="table-business-spec" className="scroll-mt-24 space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">
          Business Pattern Spec
        </h3>
        <p className="text-sm text-muted-foreground">
          展开区域、状态标签、风险色条、证照状态 Token 与企业后台最佳实践。
        </p>
        <BusinessPatternSpecShowcase />
      </section>

      <section id="table-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API · 筛选与排序</h2>
        <ApiTable rows={TABLE_FILTER_SORT_API} />
        <h3 className="pt-4 text-lg font-semibold">API · 业务表格组件</h3>
        <ApiTable rows={TABLE_BUSINESS_API} />
      </section>

      <section id="table-dev" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={TABLE_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/table</code> 引入 Table
          与业务组件（ExpandableDetailTable、CertificateStatusTable 等）。
        </p>
      </section>

      <section id="table-tokens" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TABLE_USAGE_TOKEN_NAMES.map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => copyToken(token)}
              className="rounded-md border bg-card px-4 py-3 text-left transition-colors hover:border-primary/30"
            >
              <span className="font-mono text-sm text-primary">{token}</span>
            </button>
          ))}
        </div>
      </section>

      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200",
          copied ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="status"
      >
        已复制 Token：{copied}
      </div>
    </div>
  );
}
