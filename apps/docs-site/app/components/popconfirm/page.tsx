import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  BATCH_ACTION_CODE,
  DELETE_CONFIRM_CODE,
  POPCONFIRM_CODE_EXAMPLE,
  POPCONFIRM_INTRO,
  POPCONFIRM_USAGE_TOKEN_NAMES,
  STATUS_SWITCH_CODE,
} from "@/lib/data/popconfirmMock";
import {
  PopconfirmAsyncShowcase,
  PopconfirmBusinessShowcase,
  PopconfirmPlacementShowcase,
  PopconfirmTypesShowcase,
} from "./popconfirm-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const POPCONFIRM_API_ROWS: ApiTableRow[] = [
  { prop: "title", type: "ReactNode", description: "确认标题" },
  { prop: "description", type: "ReactNode", description: "补充说明" },
  { prop: "children", type: "ReactNode", description: "触发节点（Button / Link 等）" },
  { prop: "onConfirm", type: "() => void | Promise<void>", description: "确认回调，Promise 时自动 loading" },
  { prop: "onCancel", type: "() => void", description: "取消回调" },
  { prop: "confirmText", type: "string", default: '"确认"', description: "确认按钮文案" },
  { prop: "cancelText", type: "string", default: '"取消"', description: "取消按钮文案" },
  {
    prop: "placement",
    type: "top | bottom | left | right | topLeft | topRight | bottomLeft | bottomRight",
    default: '"top"',
    description: "弹出位置",
  },
  { prop: "trigger", type: '"click"', default: '"click"', description: "触发方式" },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用" },
  { prop: "loading", type: "boolean", default: "false", description: "确认按钮 loading" },
  { prop: "danger", type: "boolean", default: "false", description: "危险确认样式" },
  { prop: "icon", type: "ReactNode", description: "自定义图标，默认 warning / danger" },
  { prop: "open", type: "boolean", description: "受控显隐" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "显隐变化" },
];

export default function PopconfirmPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Popconfirm 气泡确认
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {POPCONFIRM_INTRO}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Popconfirm Types</h2>
        <PopconfirmTypesShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Placement</h2>
        <PopconfirmPlacementShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Async Confirm</h2>
        <PopconfirmAsyncShowcase />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Business Pattern</h2>
        <PopconfirmBusinessShowcase />
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Usage</h2>
        <CopyCodeBlock code={POPCONFIRM_CODE_EXAMPLE} />
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold">DeleteConfirm</h3>
            <CopyCodeBlock code={DELETE_CONFIRM_CODE} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">StatusSwitchConfirm</h3>
            <CopyCodeBlock code={STATUS_SWITCH_CODE} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">BatchActionConfirm</h3>
            <CopyCodeBlock code={BATCH_ACTION_CODE} />
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">API</h2>
        <div className={API_TABLE_CLASS}>
          <ApiTable rows={POPCONFIRM_API_ROWS} />
        </div>
      </section>

      <section className="mt-12 border-t border-[#e5e6eb] pt-4 pb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Design Tokens</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {POPCONFIRM_USAGE_TOKEN_NAMES.map((token) => (
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
