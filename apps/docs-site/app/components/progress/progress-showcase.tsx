"use client";

import {
  ProgressCircle,
  ProgressLine,
  ProgressSegmented,
  type ProgressStatus,
} from "@yd-ds/ui/progress";

const STATUSES: { status: ProgressStatus; label: string }[] = [
  { status: "good", label: "良好" },
  { status: "warning", label: "警告" },
  { status: "danger", label: "危险" },
];

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border bg-card px-8 py-10 md:px-10">{children}</div>
  );
}

export function ProgressLineShowcase() {
  return (
    <Panel>
      <div className="space-y-8">
        {STATUSES.map(({ status, label }) => (
          <div key={status} className="flex items-center gap-6">
            <span className="w-12 shrink-0 text-sm text-muted-foreground">{label}</span>
            <div className="min-w-0 flex-1">
              <ProgressLine percent={40} status={status} size="regular" showInfo />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ProgressCircleShowcase() {
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-10">
        {STATUSES.map(({ status, label }) => (
          <div key={status} className="flex flex-col items-center gap-2">
            <ProgressCircle percent={75} status={status} size="regular" showInfo />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ProgressSegmentedShowcase() {
  return (
    <Panel>
      <ProgressSegmented
        size="regular"
        steps={[
          { label: "创建", status: "finish" },
          { label: "派发", status: "finish" },
          { label: "执行", status: "process" },
          { label: "整改", status: "wait" },
          { label: "完成", status: "wait" },
        ]}
      />
    </Panel>
  );
}

export function ProgressSizesShowcase() {
  return (
    <Panel>
      <div className="space-y-6">
        {(
          [
            { size: "small" as const, label: "小尺寸" },
            { size: "regular" as const, label: "中尺寸" },
            { size: "large" as const, label: "大尺寸" },
          ] as const
        ).map(({ size, label }) => (
          <div key={size} className="flex items-center gap-6">
            <span className="w-16 shrink-0 text-sm text-muted-foreground">{label}</span>
            <div className="min-w-0 flex-1">
              <ProgressLine percent={60} status="good" size={size} showInfo />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
