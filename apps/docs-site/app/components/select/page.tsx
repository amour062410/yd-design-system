"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  SELECT_CODE_EXAMPLE,
  SELECT_INTRO,
  SELECT_USAGE_TOKEN_NAMES,
} from "@/lib/data/selectMock";
import {
  SelectLegacyRowShowcase,
  SelectSizesShowcase,
  SelectStatesShowcase,
  SelectTypesShowcase,
} from "./select-showcase";

export default function SelectPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Select" description={SELECT_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Select States</h2>
        <p className="text-sm text-muted-foreground">
          Default、Hover、Focus、Disabled、Error。
        </p>
        <SelectStatesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Select Types</h2>
        <p className="text-sm text-muted-foreground">
          Single、Multiple、Searchable、Clearable。
        </p>
        <SelectTypesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Select Sizes</h2>
        <p className="text-sm text-muted-foreground">Small、Medium、Large。</p>
        <SelectSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">原页面布局演示</h2>
        <p className="text-sm text-muted-foreground">
          保留原 Select 单选状态栏：交互、禁用、搜索下拉。
        </p>
        <SelectLegacyRowShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={SELECT_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/select</code>{" "}
          引入（monorepo 包名；对外文档亦可写作{" "}
          <code className="rounded bg-muted px-1">@yd-design/ui</code>）。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SELECT_USAGE_TOKEN_NAMES.map((token) => (
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
