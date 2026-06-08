"use client";

import { InspectionStageProgress } from "@yd-ds/ui/business-progress";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { STAGE_CODE } from "@/lib/data/businessProgressMock";

export default function InspectionStageProgressPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="巡检流程进度"
        description="InspectionStageProgress — 创建、派发、执行、整改、完成五段流程，基于 Segmented Progress。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">默认展示</h2>
        <div className="rounded-md border bg-card px-8 py-10">
          <InspectionStageProgress currentStage="rectifying" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">驾驶舱卡片</h2>
        <div className="max-w-lg">
          <InspectionStageProgress currentStage="executing" variant="card" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={STAGE_CODE} />
      </section>
    </div>
  );
}
