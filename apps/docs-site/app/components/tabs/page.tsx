"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  TABS_CODE_EXAMPLE,
  TABS_INTRO,
  TABS_USAGE_TOKEN_NAMES,
} from "@/lib/data/tabsMock";
import {
  TabsBasicShowcase,
  TabsCardShowcase,
  TabsClosableShowcase,
  TabsDisabledShowcase,
  TabsEditableShowcase,
  TabsIconShowcase,
  TabsOverflowShowcase,
} from "./tabs-showcase";

export default function TabsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Tabs" description={TABS_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Basic</h2>
        <p className="text-sm text-muted-foreground">
          Line Tabs，与 Button / Input / Select 共用 Token 与品牌色。
        </p>
        <TabsBasicShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Card</h2>
        <TabsCardShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Disabled</h2>
        <TabsDisabledShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Icon</h2>
        <TabsIconShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Closable</h2>
        <TabsClosableShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Editable</h2>
        <TabsEditableShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Overflow</h2>
        <TabsOverflowShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={TABS_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/tabs</code> 引入。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TABS_USAGE_TOKEN_NAMES.map((token) => (
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
