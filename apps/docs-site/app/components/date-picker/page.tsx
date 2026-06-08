"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  DATE_PICKER_CODE_EXAMPLE,
  DATE_PICKER_INTRO,
  DATE_PICKER_USAGE_TOKEN_NAMES,
} from "@/lib/data/datePickerMock";
import {
  DatePickerDarkModeShowcase,
  DatePickerSizesShowcase,
  DatePickerStatesShowcase,
  DatePickerTypesShowcase,
  DatePickerUsageShowcase,
} from "./date-picker-showcase";

export default function DatePickerPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Date Picker" description={DATE_PICKER_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">DatePicker States</h2>
        <p className="text-sm text-muted-foreground">
          Default、Hover、Focus、Selected、Disabled；单选与范围矩阵。
        </p>
        <DatePickerStatesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">DatePicker Types</h2>
        <p className="text-sm text-muted-foreground">
          日、范围、快捷范围、月、年、季度、日期时间。
        </p>
        <DatePickerTypesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">DatePicker Sizes</h2>
        <p className="text-sm text-muted-foreground">
          Small 24px · Regular 32px · Large 40px · 输入框圆角 6px。
        </p>
        <DatePickerSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <p className="text-sm text-muted-foreground">基础用法与受控模式。</p>
        <DatePickerUsageShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Dark Mode Preview</h2>
        <DatePickerDarkModeShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={DATE_PICKER_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/date-picker</code> 引入。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {DATE_PICKER_USAGE_TOKEN_NAMES.map((token) => (
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
