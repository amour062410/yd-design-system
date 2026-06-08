"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  COLLAPSE_CODE_EXAMPLE,
  COLLAPSE_INTRO,
  COLLAPSE_OVERVIEW_POINTS,
  COLLAPSE_USAGE_TOKEN_NAMES,
} from "@/lib/data/collapseMock";
import { CollapseShowcaseGrid } from "./collapse-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const COLLAPSE_API_ROWS: ApiTableRow[] = [
  { prop: "activeKey", type: "string | string[]", description: "受控展开的面板 key" },
  {
    prop: "defaultActiveKey",
    type: "string | string[]",
    description: "默认展开的面板 key",
  },
  {
    prop: "accordion",
    type: "boolean",
    default: "false",
    description: "手风琴模式，每次最多展开一个面板",
  },
  {
    prop: "onChange",
    type: "(activeKey: string | string[]) => void",
    description: "展开面板变化时回调",
  },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用整个折叠面板" },
  {
    prop: "bordered",
    type: "boolean",
    default: "true",
    description: "是否展示外边框",
  },
  {
    prop: "ghost",
    type: "boolean",
    default: "false",
    description: "幽灵模式，无外边框与分隔线",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "尺寸，影响 header 高度、内边距与字号",
  },
  {
    prop: "expandIcon",
    type: "(props: { isActive, disabled? }) => ReactNode",
    description: "自定义展开图标",
  },
  {
    prop: "expandIconPosition",
    type: '"left" | "right"',
    default: '"left"',
    description: "展开图标位置",
  },
  {
    prop: "destroyInactivePanel",
    type: "boolean",
    default: "false",
    description: "收起时卸载面板内容",
  },
  {
    prop: "nested",
    type: "boolean",
    default: "false",
    description: "嵌套折叠样式：左侧缩进与较小标题",
  },
];

const COLLAPSE_ITEM_API_ROWS: ApiTableRow[] = [
  { prop: "panelKey", type: "string", description: "面板唯一标识，或使用 React key" },
  { prop: "title", type: "ReactNode", description: "标题" },
  { prop: "subtitle", type: "ReactNode", description: "副标题" },
  { prop: "extra", type: "ReactNode", description: "标题右侧扩展区，如 Tag / Button" },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用单个面板" },
  { prop: "children", type: "ReactNode", description: "面板内容" },
];

export default function CollapsePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Collapse
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {COLLAPSE_INTRO}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Overview
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {COLLAPSE_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <CollapseShowcaseGrid />

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-[18px] font-semibold text-[#1d2129]">API</h2>
        <h3 className="mb-3 text-base font-medium text-[#1d2129]">Collapse</h3>
        <ApiTable rows={COLLAPSE_API_ROWS} className={cn(API_TABLE_CLASS, "mb-8")} />
        <h3 className="mb-3 text-base font-medium text-[#1d2129]">CollapseItem</h3>
        <ApiTable rows={COLLAPSE_ITEM_API_ROWS} className={API_TABLE_CLASS} />
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Development Usage
        </h2>
        <CopyCodeBlock
          code={COLLAPSE_CODE_EXAMPLE}
          className="rounded-[6px] border-[#e5e6eb] bg-[#f7f8fa]"
        />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/collapse</code> 引入。
        </p>
      </section>

      <section className="space-y-4 pb-12 pt-8">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Token Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          点击 Token 名称可复制，深浅主题见 showcase-tokens.css。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {COLLAPSE_USAGE_TOKEN_NAMES.map((token) => (
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
      >
        已复制 {copied}
      </div>
    </div>
  );
}
