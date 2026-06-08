"use client";

import { InspectionCoverageProgress } from "@yd-ds/ui/business-progress";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { COVERAGE_CODE } from "@/lib/data/businessProgressMock";

export default function InspectionCoverageProgressPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="巡检覆盖率"
        description="InspectionCoverageProgress — 周期内门店巡检覆盖比例，展示已巡与未巡门店数。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">默认展示</h2>
        <div className="rounded-md border bg-card px-8 py-10">
          <InspectionCoverageProgress
            inspectedCount={43}
            uninspectedCount={7}
            status="good"
            trend={{ label: "同比", value: 8, direction: "up" }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">驾驶舱卡片</h2>
        <div className="max-w-sm">
          <InspectionCoverageProgress
            inspectedCount={43}
            uninspectedCount={7}
            status="good"
            trend={{ label: "同比", value: 8, direction: "up" }}
            variant="card"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={COVERAGE_CODE} />
      </section>
    </div>
  );
}
