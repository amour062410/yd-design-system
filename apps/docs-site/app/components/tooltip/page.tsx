import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { TooltipShowcase } from "./tooltip-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const TOOLTIP_INTRO =
  "Tooltip（文字提示）在用户悬停、聚焦或点击某个元素时展示简短的上下文信息，用于阐明功能或提供额外详情，且不会让界面显得杂乱。组件采用深色默认底 + 白色 14px 文字 + 居中箭头，支持 12 个弹出方向、语义色与任意自定义色，定位与翻转逻辑参考 Arco / Ant 且不引入第三方依赖。";

const TOOLTIP_OVERVIEW_POINTS = [
  "12 个弹出方向：top/bottom/left/right × start/center/end，空间不足时自动翻转到反向并夹在视口内。",
  "三种触发：hover（默认含 focus 以支持键盘）、focus、click（click 支持外部点击 / Esc 关闭）。",
  "颜色体系：default 深色底，外加 primary / success / warning / danger / info 语义色，color 还可直接传任意 hex 对齐设计稿全色板。",
  "受控与非受控：open / defaultOpen / onOpenChange，配合 mouseEnterDelay / mouseLeaveDelay 控制延迟。",
  "通过 Portal 渲染到 body，fixed 定位跟随滚动 / 缩放，SSR 友好（仅客户端挂载），role=tooltip 可访问。",
];

const TOOLTIP_API_ROWS: ApiTableRow[] = [
  { prop: "content", type: "ReactNode", description: "浮层内容，为空时不展示" },
  { prop: "children", type: "ReactNode", description: "触发节点（被包裹在 inline-flex span 中）" },
  {
    prop: "placement",
    type: '"top" | "bottom" | "left" | "right" (含 -start / -end)',
    default: '"top"',
    description: "弹出方向，共 12 个",
  },
  {
    prop: "trigger",
    type: '"hover" | "focus" | "click" | 数组',
    default: '["hover","focus"]',
    description: "触发方式",
  },
  {
    prop: "color",
    type: '"default" | "primary" | "success" | "warning" | "danger" | "info" | string',
    default: '"default"',
    description: "背景色：预设语义色或任意自定义颜色",
  },
  { prop: "open", type: "boolean", description: "受控显隐" },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "非受控默认显隐" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "显隐变化回调" },
  { prop: "mouseEnterDelay", type: "number", default: "100", description: "hover 进入延迟（ms）" },
  { prop: "mouseLeaveDelay", type: "number", default: "100", description: "hover 离开延迟（ms）" },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用浮层" },
  { prop: "arrow", type: "boolean", default: "true", description: "是否显示箭头" },
  { prop: "maxWidth", type: "number | string", default: '"280px"', description: "浮层最大宽度" },
  { prop: "zIndex", type: "number", default: "1070", description: "层级（高于 Modal / Drawer）" },
];

const TOOLTIP_CODE_EXAMPLE = `import { Tooltip } from "@yd-ds/ui/tooltip";
import { Button } from "@yd-ds/ui/button";

export function Demo() {
  return (
    <div className="flex gap-3">
      <Tooltip content="文字提示">
        <Button variant="secondary">悬停查看</Button>
      </Tooltip>

      <Tooltip content="点击切换" trigger="click" placement="bottom" color="primary">
        <Button>点击触发</Button>
      </Tooltip>

      <Tooltip content="自定义色" color="#722ED1" arrow={false}>
        <Button variant="secondary">紫色</Button>
      </Tooltip>
    </div>
  );
}`;

export default function TooltipPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Tooltip 文字提示
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {TOOLTIP_INTRO}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Overview
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {TOOLTIP_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <TooltipShowcase />

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-[18px] font-semibold text-[#1d2129]">API</h2>
        <h3 className="mb-3 text-base font-medium text-[#1d2129]">Tooltip</h3>
        <ApiTable rows={TOOLTIP_API_ROWS} className={API_TABLE_CLASS} />
      </section>

      <section className="mt-12 space-y-4 pb-12">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Development Usage
        </h2>
        <CopyCodeBlock
          code={TOOLTIP_CODE_EXAMPLE}
          className="rounded-[6px] border-[#e5e6eb] bg-[#f7f8fa]"
        />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/tooltip</code> 引入。
          组件自身通过 Portal 渲染到 body，无需额外容器；如需在弹层（Modal /
          Drawer）中使用，默认 zIndex=1070 已高于其遮罩。
        </p>
      </section>
    </div>
  );
}
