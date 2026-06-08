"use client";

import { RectificationProgress } from "@yd-ds/ui/business-progress";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  BUSINESS_PROGRESS_INTRO,
  RECTIFICATION_CODE,
} from "@/lib/data/businessProgressMock";

export default function RectificationProgressPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="整改完成率"
        description="RectificationProgress — 展示整改闭环进度、已整改与待整改数量，支持 trend 与 status 业务指定。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">默认展示</h2>
        <div className="rounded-md border bg-card px-8 py-10">
          <RectificationProgress
            rectifiedCount={41}
            pendingCount={9}
            status="warning"
            trend={{ label: "较上周", value: 12, direction: "up" }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">驾驶舱卡片</h2>
        <div className="max-w-sm">
          <RectificationProgress
            rectifiedCount={41}
            pendingCount={9}
            status="warning"
            trend={{ label: "较上周", value: 12, direction: "up" }}
            variant="card"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={RECTIFICATION_CODE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/business-progress</code> 引入。
        </p>
      </section>

      <p className="text-sm text-muted-foreground">{BUSINESS_PROGRESS_INTRO}</p>
    </div>
  );
}
