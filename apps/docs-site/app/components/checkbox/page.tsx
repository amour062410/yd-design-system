"use client";

import { useState } from "react";
import { checkboxTokenRows } from "@yd-ds/tokens";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  CHECKBOX_CODE_EXAMPLE,
  CHECKBOX_INTRO,
} from "@/lib/data/checkboxMock";
import {
  CheckboxDisabledInteractiveShowcase,
  CheckboxGroupShowcaseSection,
  CheckboxSizesShowcase,
  CheckboxStatesShowcase,
} from "./checkbox-showcase";

export default function CheckboxPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Checkbox"
        description={CHECKBOX_INTRO}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">基础状态</h2>
        <p className="text-sm text-muted-foreground">
          未选中、Hover、已选中、半选中、禁用未选中、禁用已选中。
        </p>
        <CheckboxStatesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">禁用态</h2>
        <CheckboxDisabledInteractiveShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Checkbox Group</h2>
        <CheckboxGroupShowcaseSection />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Sizes</h2>
        <CheckboxSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={CHECKBOX_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/checkbox</code> 引入；分组使用{" "}
          <code className="rounded bg-muted px-1">Checkbox.Group</code>。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold text-foreground">Token</th>
                <th className="px-4 py-3 font-semibold text-foreground">Value</th>
                <th className="px-4 py-3 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {checkboxTokenRows.map((row) => (
                <tr
                  key={row.token}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-primary/[0.04]"
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => copyToken(row.token)}
                      className="font-mono text-xs text-primary hover:opacity-80"
                    >
                      {row.token}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.value}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
