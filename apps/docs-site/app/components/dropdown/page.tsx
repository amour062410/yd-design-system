import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  DROPDOWN_CODE_EXAMPLE,
  DROPDOWN_INTRO,
  DROPDOWN_USAGE_TOKEN_NAMES,
  ROW_ACTION_CODE_EXAMPLE,
} from "@/lib/data/dropdownMock";
import {
  DropdownLongMenuShowcase,
  DropdownPlacementShowcase,
  DropdownTableRowShowcase,
  DropdownTypesShowcase,
} from "./dropdown-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const DROPDOWN_API_ROWS: ApiTableRow[] = [
  {
    prop: "DropdownLink",
    type: "component",
    description: "Ant 基本用法：children 为链接文案 + 箭头，默认 triggerEvent=hover",
  },
  { prop: "trigger", type: "ReactNode", description: "Dropdown 触发节点；Link 场景可用 DropdownLinkTrigger" },
  { prop: "menu", type: "DropdownMenuItem[]", description: "菜单项；支持 divider / icon / danger" },
  {
    prop: "placement",
    type: '"bottomLeft" | "bottomRight" | "topLeft" | "topRight"',
    default: '"bottomLeft"',
    description: "弹出位置",
  },
  {
    prop: "triggerEvent",
    type: '"click" | "hover"',
    default: '"click"',
    description: "触发方式",
  },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用" },
  { prop: "open", type: "boolean", description: "受控显隐" },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "非受控默认显隐" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "显隐变化" },
  { prop: "onMenuClick", type: "(key, item) => void", description: "菜单项点击" },
  { prop: "mouseEnterDelay", type: "number", default: "100", description: "hover 进入延迟" },
  { prop: "mouseLeaveDelay", type: "number", default: "100", description: "hover 离开延迟" },
];

export default function DropdownPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Dropdown 下拉菜单
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {DROPDOWN_INTRO}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Dropdown Types</h2>
        <DropdownTypesShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Placement</h2>
        <DropdownPlacementShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Long Menu</h2>
        <DropdownLongMenuShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Business Pattern</h2>
        <DropdownTableRowShowcase />
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Usage</h2>
        <CopyCodeBlock code={DROPDOWN_CODE_EXAMPLE} />
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold">RowActionDropdown</h3>
          <CopyCodeBlock code={ROW_ACTION_CODE_EXAMPLE} />
        </div>
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">API</h2>
        <div className={API_TABLE_CLASS}>
          <ApiTable rows={DROPDOWN_API_ROWS} />
        </div>
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4 pb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Design Tokens</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {DROPDOWN_USAGE_TOKEN_NAMES.map((token) => (
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
