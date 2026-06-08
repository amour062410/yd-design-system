"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  RADIO_API_PROPS,
  RADIO_CODE_EXAMPLE,
  RADIO_DO_ITEMS,
  RADIO_DONT_ITEMS,
  RADIO_SIZE_SPECS,
  RADIO_USAGE_TOKEN_NAMES,
} from "@/lib/data/radioMock";
import {
  RadioButtonStylesShowcase,
  RadioGroupShowcaseSection,
  RadioInteractiveShowcase,
  RadioSizesShowcase,
  RadioStatesShowcase,
} from "./radio-showcase";

export default function RadioPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Radio"
        description="单选框组件：支持圆形单选、描边/填充/分段按钮组，横向与纵向布局，Small / Medium / Large 尺寸及禁用态。颜色与圆角均来自 Design Token。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Radio States</h2>
        <RadioStatesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Radio Group</h2>
        <RadioGroupShowcaseSection />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Radio Sizes</h2>
        <RadioSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Button Style Group</h2>
        <RadioButtonStylesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <RadioInteractiveShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">尺寸规格</h2>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold text-foreground">Size</th>
                <th className="px-4 py-3 font-semibold text-foreground">Control</th>
                <th className="px-4 py-3 font-semibold text-foreground">Font</th>
                <th className="px-4 py-3 font-semibold text-foreground">Gap</th>
                <th className="px-4 py-3 font-semibold text-foreground">Button H</th>
                <th className="px-4 py-3 font-semibold text-foreground">Radius</th>
              </tr>
            </thead>
            <tbody>
              {RADIO_SIZE_SPECS.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-primary/[0.04]"
                >
                  <td className="px-4 py-3 font-medium capitalize text-foreground">
                    {row.size}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.control}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.fontSize}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.gap}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.buttonHeight}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.buttonRadius}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold text-foreground">属性</th>
                <th className="px-4 py-3 font-semibold text-foreground">类型</th>
                <th className="px-4 py-3 font-semibold text-foreground">默认值</th>
                <th className="px-4 py-3 font-semibold text-foreground">说明</th>
              </tr>
            </thead>
            <tbody>
              {RADIO_API_PROPS.map((prop) => (
                <tr
                  key={prop.name}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-primary/[0.04]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-primary">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {prop.type}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {prop.default}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Best Practices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">推荐做法</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {RADIO_DO_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">避免做法</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {RADIO_DONT_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击复制 Token 名称。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {RADIO_USAGE_TOKEN_NAMES.map((token) => (
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={RADIO_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/radio</code> 引入；分组使用{" "}
          <code className="rounded bg-muted px-1">RadioGroup</code> 或{" "}
          <code className="rounded bg-muted px-1">Radio.Group</code>。
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
