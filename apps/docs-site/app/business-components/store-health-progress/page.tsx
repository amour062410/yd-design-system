"use client";

import { StoreHealthProgress } from "@yd-ds/ui/business-progress";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { STORE_HEALTH_CODE } from "@/lib/data/businessProgressMock";

export default function StoreHealthProgressPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="门店健康度"
        description="StoreHealthProgress — 综合健康指数与 A/B/C/D 评级，支持业务主动指定 status。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">默认展示</h2>
        <div className="rounded-md border bg-card px-8 py-10">
          <StoreHealthProgress
            score={75}
            status="warning"
            grade="C"
            trend={{ label: "较昨日", value: 3, direction: "down" }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">驾驶舱卡片</h2>
        <div className="max-w-sm">
          <StoreHealthProgress
            score={91}
            status="good"
            trend={{ label: "较上周", value: 5, direction: "up" }}
            variant="card"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={STORE_HEALTH_CODE} />
      </section>
    </div>
  );
}
