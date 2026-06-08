"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  MESSAGE_CODE_EXAMPLE,
  MESSAGE_INTRO,
  MESSAGE_USAGE,
  MESSAGE_USAGE_TOKEN_NAMES,
} from "@/lib/data/messageMock";
import { MessagePageNav } from "./message-page-nav";
import {
  MessageDesignTokenShowcase,
  MessageInteractiveDemo,
  MessageLoadingShowcase,
  MessageLongContentShowcase,
  MessageOverviewShowcase,
  MessagePositionShowcase,
  MessageTypesShowcase,
} from "./message-showcase";

const MESSAGE_API: ApiTableRow[] = [
  {
    prop: "type",
    type: `"default" | "success" | "info" | "warning" | "error" | "loading"`,
    default: "default",
    description: "消息类型，决定默认图标与强调色。",
  },
  {
    prop: "content",
    type: "ReactNode",
    required: true,
    description: "主文案；可与 title / description 组合为长内容。",
  },
  {
    prop: "duration",
    type: "number",
    default: "3000",
    description: "自动关闭毫秒数；0 表示不自动关闭。loading 默认为 0。",
  },
  {
    prop: "closable",
    type: "boolean",
    default: "false",
    description: "是否显示关闭按钮。",
  },
  {
    prop: "icon",
    type: "ReactNode | false",
    description: "自定义图标；false 隐藏图标。",
  },
  {
    prop: "position",
    type: `"top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight"`,
    default: "top",
    description: "浮层出现位置。",
  },
  { prop: "onClose", type: "() => void", description: "关闭后回调（含自动与手动）。" },
  { prop: "title", type: "ReactNode", description: "长内容标题。" },
  { prop: "description", type: "ReactNode", description: "长内容说明。" },
  { prop: "action", type: "ReactNode", description: "底部操作区，如「查看详情」链接。" },
];

const MESSAGE_METHOD_API: ApiTableRow[] = [
  { prop: "message.open", type: "(config) => string", description: "打开消息，返回 id。" },
  { prop: "message.success", type: "(content, config?) => string", description: "成功提示。" },
  { prop: "message.info", type: "(content, config?) => string", description: "信息提示。" },
  { prop: "message.warning", type: "(content, config?) => string", description: "警告提示。" },
  { prop: "message.error", type: "(content, config?) => string", description: "错误提示。" },
  { prop: "message.loading", type: "(content, config?) => string", description: "加载中，默认不自动关闭。" },
  { prop: "message.close", type: "(id: string) => void", description: "关闭指定消息。" },
  { prop: "message.destroy", type: "() => void", description: "销毁全部消息。" },
];

export default function MessagePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Message 消息提示" description={MESSAGE_INTRO} />
      <MessagePageNav />

      <section id="message-overview" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{MESSAGE_USAGE}</p>
        <MessageOverviewShowcase />
      </section>

      <section id="message-types" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Message Types</h2>
        <p className="text-sm text-muted-foreground">
          Success / Info / Warning / Error 及默认、Loading 形态，符合企业后台反馈语义。
        </p>
        <MessageTypesShowcase />
      </section>

      <section id="message-position" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Message Position</h2>
        <MessagePositionShowcase />
      </section>

      <section id="message-long-content" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Long Content</h2>
        <p className="text-sm text-muted-foreground">
          支持标题、说明与底部操作链接，适用于同步结果、批量任务等需要补充信息的场景。
        </p>
        <MessageLongContentShowcase />
      </section>

      <section id="message-loading" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Loading Message</h2>
        <p className="text-sm text-muted-foreground">
          带旋转图标，不自动关闭；任务结束后请调用 message.close(id)。
        </p>
        <MessageLoadingShowcase />
      </section>

      <section id="message-interactive" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Interactive Demo</h2>
        <MessageInteractiveDemo />
      </section>

      <section id="message-api" className="scroll-mt-24 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">MessageConfig</h3>
          <ApiTable rows={MESSAGE_API} />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">message 方法</h3>
          <ApiTable rows={MESSAGE_METHOD_API} />
        </div>
      </section>

      <section id="message-tokens" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Design Token</h2>
        <MessageDesignTokenShowcase />
        <ul className="flex flex-wrap gap-2">
          {MESSAGE_USAGE_TOKEN_NAMES.map((token) => (
            <li key={token}>
              <button
                type="button"
                onClick={() => copyToken(token)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors",
                  copied === token
                    ? "border-[color:var(--message-success-color)] text-[color:var(--message-success-color)]"
                    : "text-muted-foreground hover:border-[color:var(--message-info-color)] hover:text-[color:var(--message-info-color)]"
                )}
              >
                --{token}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development</h2>
        <CopyCodeBlock code={MESSAGE_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          在应用根节点使用 <code className="rounded bg-muted px-1">MessageProvider</code> 挂载全局
          MessageHost。
        </p>
      </section>
    </div>
  );
}
