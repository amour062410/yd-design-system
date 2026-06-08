"use client";

import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { PROGRESS_CODE_EXAMPLE, PROGRESS_INTRO } from "@/lib/data/progressMock";
import {
  ProgressCircleShowcase,
  ProgressLineShowcase,
  ProgressSegmentedShowcase,
  ProgressSizesShowcase,
} from "./progress-showcase";

export default function ProgressPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Progress" description={PROGRESS_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">线性进度条</h2>
        <ProgressLineShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">环形进度条</h2>
        <ProgressCircleShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">分段进度条</h2>
        <ProgressSegmentedShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">尺寸规格</h2>
        <ProgressSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={PROGRESS_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/progress</code> 引入。
          巡检业务进度组件见顶栏「巡检业务组件」菜单。
        </p>
      </section>
    </div>
  );
}
