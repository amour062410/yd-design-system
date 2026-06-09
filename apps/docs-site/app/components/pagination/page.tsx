import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  COMPACT_PAGINATION_CODE,
  MOBILE_PAGINATION_CODE,
  PAGINATION_CODE_EXAMPLE,
  PAGINATION_INTRO,
  PAGINATION_USAGE_TOKEN_NAMES,
  STANDARD_TABLE_PAGINATION_CODE,
  TABLE_PAGINATION_CODE,
} from "@/lib/data/paginationMock";
import {
  PaginationBusinessShowcase,
  PaginationStateShowcase,
  PaginationTableShowcase,
  PaginationTypesShowcase,
} from "./pagination-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const PAGINATION_API_ROWS: ApiTableRow[] = [
  { prop: "current", type: "number", description: "当前页（受控）" },
  { prop: "defaultCurrent", type: "number", default: "1", description: "默认当前页" },
  { prop: "pageSize", type: "number", description: "每页条数（受控）" },
  { prop: "defaultPageSize", type: "number", default: "10", description: "默认每页条数" },
  { prop: "total", type: "number", default: "0", description: "数据总数" },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用" },
  { prop: "size", type: '"small" | "default"', default: '"default"', description: "尺寸" },
  { prop: "simple", type: "boolean", default: "false", description: "简洁模式 `< 1 / 50 >`" },
  { prop: "showTotal", type: "boolean", default: "false", description: "展示共 N 条" },
  { prop: "showQuickJumper", type: "boolean", default: "false", description: "快速跳转" },
  { prop: "showSizeChanger", type: "boolean", default: "false", description: "页容量切换" },
  { prop: "hideOnSinglePage", type: "boolean", default: "false", description: "仅一页时隐藏" },
  {
    prop: "pageSizeOptions",
    type: "number[]",
    default: "[10, 20, 50, 100]",
    description: "页容量选项",
  },
  { prop: "onChange", type: "(page, pageSize) => void", description: "页码或页容量变化" },
  { prop: "onShowSizeChange", type: "(current, size) => void", description: "页容量变化" },
];

export default function PaginationPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Pagination 分页
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {PAGINATION_INTRO}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Pagination Types</h2>
        <PaginationTypesShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Table Integration</h2>
        <PaginationTableShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">States & Modes</h2>
        <PaginationStateShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Business Pattern</h2>
        <PaginationBusinessShowcase />
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Usage</h2>
        <CopyCodeBlock code={PAGINATION_CODE_EXAMPLE} />
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Table pagination</h3>
            <CopyCodeBlock code={TABLE_PAGINATION_CODE} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">StandardTablePagination</h3>
            <CopyCodeBlock code={STANDARD_TABLE_PAGINATION_CODE} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">CompactPagination</h3>
            <CopyCodeBlock code={COMPACT_PAGINATION_CODE} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">MobilePagination</h3>
            <CopyCodeBlock code={MOBILE_PAGINATION_CODE} />
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">API</h2>
        <div className={API_TABLE_CLASS}>
          <ApiTable rows={PAGINATION_API_ROWS} />
        </div>
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4 pb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Design Tokens</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PAGINATION_USAGE_TOKEN_NAMES.map((token) => (
            <li
              key={token}
              className="rounded-md border bg-card px-3 py-2 font-mono text-xs text-muted-foreground"
            >
              --{token}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
