import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  DASHBOARD_SECTION_CODE_EXAMPLE,
  DASHBOARD_SECTION_INTRO,
  DASHBOARD_SECTION_OVERVIEW_POINTS,
} from "@/lib/data/dashboardSectionMock";
import { DashboardSectionShowcase } from "./dashboard-section-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const DASHBOARD_SECTION_API_ROWS: ApiTableRow[] = [
  { prop: "title", type: "ReactNode", description: "顶部标题栏主标题" },
  {
    prop: "subtitle",
    type: "ReactNode",
    description: "标题旁的副标题，与 title 同排展示",
  },
  { prop: "description", type: "ReactNode", description: "标题下方的辅助描述" },
  {
    prop: "filters",
    type: "ReactNode",
    description: "标题栏右侧筛选区（时间范围、下拉、分段控件等）",
  },
  {
    prop: "extra",
    type: "ReactNode",
    description: "标题栏右侧扩展区（链接、补充信息、次要控件等）",
  },
  {
    prop: "actions",
    type: "ReactNode",
    description: "操作区（按钮组等），位置由 actionsPlacement 决定",
  },
  {
    prop: "actionsPlacement",
    type: '"header" | "footer"',
    default: '"footer"',
    description: "actions 渲染位置：footer 底部操作区 / header 并入标题栏右侧",
  },
  {
    prop: "variant",
    type: '"card" | "plain"',
    default: '"card"',
    description: "外观：card 带容器边框背景，plain 仅提供结构与间距",
  },
  {
    prop: "padding",
    type: '"small" | "middle" | "large"',
    default: '"middle"',
    description: "内边距档位，影响标题栏 / 内容区 / 操作区",
  },
  { prop: "children", type: "ReactNode", description: "内容区" },
  {
    prop: "className",
    type: "string",
    description: "透传至根 section 元素，其余原生属性同样透传",
  },
];

export default function DashboardSectionPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          DashboardSection
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {DASHBOARD_SECTION_INTRO}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Overview
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {DASHBOARD_SECTION_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <DashboardSectionShowcase />

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-[18px] font-semibold text-[#1d2129]">API</h2>
        <h3 className="mb-3 text-base font-medium text-[#1d2129]">
          DashboardSection
        </h3>
        <ApiTable
          rows={DASHBOARD_SECTION_API_ROWS}
          className={API_TABLE_CLASS}
        />
      </section>

      <section className="mt-12 space-y-4 pb-12">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Development Usage
        </h2>
        <CopyCodeBlock
          code={DASHBOARD_SECTION_CODE_EXAMPLE}
          className="rounded-[6px] border-[#e5e6eb] bg-[#f7f8fa]"
        />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/dashboard-section</code>{" "}
          引入；组件为纯布局，业务内容通过插槽传入。
        </p>
      </section>
    </div>
  );
}
