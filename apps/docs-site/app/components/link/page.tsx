"use client";

import { useState } from "react";
import { linkColorTokens } from "@yd-ds/tokens";
import { Link } from "@yd-ds/ui/link";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { LINK_CODE_EXAMPLE } from "@/lib/data/linkMock";
import { LinkMatrix } from "./link-matrix";

const linkUsageTokenNames = Object.keys(linkColorTokens) as (keyof typeof linkColorTokens)[];

export default function LinkPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Link"
        description="文本型操作入口，支持基础文字链、icon + 文字链与多语义色状态（品牌蓝 / 警告橙 / 危险红 / 成功绿）。字号与颜色均来自 Design Token。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Link</h2>
        <p className="text-sm text-muted-foreground">
          展示 Default、Hover、Active、Disabled 等状态，以及带图标的前置 / 后置布局。
        </p>
        <LinkMatrix />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Interactive</h2>
        <p className="text-sm text-muted-foreground">可交互的真实链接示例。</p>
        <div className="flex flex-wrap items-center gap-6 rounded-md border bg-card px-6 py-8">
          <Link href="#">Primary Link</Link>
          <Link href="#" status="warning">
            Warning Link
          </Link>
          <Link href="#" status="danger">
            Danger Link
          </Link>
          <Link href="#" showIcon>
            Link with Icon
          </Link>
          <Link href="#" aria-disabled showcaseState="disabled">
            Disabled Link
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击复制 Token 名称。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {linkUsageTokenNames.map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => copyToken(token)}
              className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-left transition-colors hover:border-primary/30"
            >
              <span className="font-mono text-sm text-primary">{token}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={LINK_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/link</code> 引入，避免与 Next.js{" "}
          <code className="rounded bg-muted px-1">next/link</code> 命名冲突时可使用别名导入。
        </p>
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
