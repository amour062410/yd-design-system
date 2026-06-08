"use client";

import { cn } from "../../lib/utils";

export type InspectionScoreTone = "excellent" | "good" | "fair" | "poor";

function resolveScoreTone(score: number): InspectionScoreTone {
  if (score >= 90) return "excellent";
  if (score >= 80) return "good";
  if (score >= 60) return "fair";
  return "poor";
}

const TONE_STYLES: Record<InspectionScoreTone, { color: string; bg: string }> = {
  excellent: { color: "#00B42A", bg: "rgba(0, 180, 42, 0.1)" },
  good: { color: "#165DFF", bg: "rgba(22, 93, 255, 0.08)" },
  fair: { color: "#FF7D00", bg: "rgba(255, 125, 0, 0.1)" },
  poor: { color: "#F53F3F", bg: "rgba(245, 63, 63, 0.1)" },
};

/** 巡检得分展示 — 自动颜色映射（90+ / 80+ / 60+ / 60以下） */
export function InspectionScore({
  score,
  className,
  showUnit = true,
}: {
  score: number;
  className?: string;
  showUnit?: boolean;
}) {
  const tone = resolveScoreTone(score);
  const styles = TONE_STYLES[tone];

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-0.5 rounded-[var(--table-radius)] px-2 py-0.5 text-[13px] font-semibold tabular-nums",
        className
      )}
      style={{ backgroundColor: styles.bg, color: styles.color }}
    >
      {score}
      {showUnit ? (
        <span className="text-[11px] font-normal opacity-80">分</span>
      ) : null}
    </span>
  );
}

export { resolveScoreTone };
