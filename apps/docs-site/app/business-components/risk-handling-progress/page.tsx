"use client";

import { RiskHandlingProgress } from "@yd-ds/ui/business-progress";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { RISK_CODE } from "@/lib/data/businessProgressMock";

export default function RiskHandlingProgressPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="风险处理率"
        description="RiskHandlingProgress — 高风险项处理闭环进度，支持业务指定 danger 状态。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">默认展示</h2>
        <div className="rounded-md border bg-card px-8 py-10">
          <RiskHandlingProgress
            highRiskCount={12}
            inProgressCount={5}
            pendingCount={7}
            percent={40}
            status="danger"
            trend={{ label: "较上周", value: 3, direction: "down" }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">驾驶舱卡片</h2>
        <div className="max-w-sm">
          <RiskHandlingProgress
            highRiskCount={12}
            inProgressCount={5}
            pendingCount={7}
            percent={40}
            status="danger"
            variant="card"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={RISK_CODE} />
      </section>
    </div>
  );
}
