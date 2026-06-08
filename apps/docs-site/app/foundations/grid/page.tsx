"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@yd-ds/ui";
import { Check, X } from "lucide-react";
import { GridCodeBlock } from "@/components/grid/grid-code-block";
import { GridHeroIllustration } from "@/components/grid/grid-hero-illustration";
import {
  GRID_COLUMNS,
  GridCol,
  GridColumnCell,
  GridRow,
} from "@/components/grid/grid-layout";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.3 },
};

const layoutExamples = [
  { title: "24", spans: [24] },
  { title: "16 + 8", spans: [16, 8] },
  { title: "12 + 12", spans: [12, 12] },
  { title: "8 + 8 + 8", spans: [8, 8, 8] },
  { title: "6 + 6 + 6 + 6", spans: [6, 6, 6, 6] },
] as const;

const breakpoints = [
  { name: "xs", width: "<576px" },
  { name: "sm", width: "≥576px" },
  { name: "md", width: "≥768px" },
  { name: "lg", width: "≥992px" },
  { name: "xl", width: "≥1200px" },
  { name: "xxl", width: "≥1600px" },
] as const;

const playgroundSteps = [4, 8, 12, 16, 24] as const;
const gutterSizes = [8, 16, 24, 32] as const;

function GutterDemoCard({
  gutter,
  fullWidth = false,
}: {
  gutter: number;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-card p-4 md:p-5",
        fullWidth && "w-full"
      )}
    >
      <p className="mb-3 text-sm font-medium">
        Gutter <span className="font-mono text-primary">{gutter}px</span>
      </p>
      <GridRow gutter={gutter}>
        <GridCol span={12} label="Block" interactive={false} />
        <GridCol span={12} label="Block" interactive={false} />
      </GridRow>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export default function GridPage() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [playgroundCols, setPlaygroundCols] = useState<number>(12);
  const [toast, setToast] = useState<string | null>(null);

  const playgroundSpan = useMemo(() => {
    if (playgroundCols >= GRID_COLUMNS) return 1;
    return Math.floor(GRID_COLUMNS / playgroundCols);
  }, [playgroundCols]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1200);
  };

  return (
    <div className="space-y-14">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b pb-10"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-sm font-medium text-primary">Foundation</p>
            <h1 className="text-3xl font-bold tracking-tight">Grid</h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              网格组件提供响应式 24 栏布局系统，用于搭建规整的界面结构。通过 Row 与 Col
              实现灵活布局，可适配各类屏幕尺寸，同时保持统一的对齐方式与间距规范。
            </p>
          </div>
          <GridHeroIllustration />
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader
          title="24 Column Grid"
          description="完整 24 栅格结构，悬停可高亮单列并查看编号。"
        />
        <div className="rounded-md border bg-card p-4 md:p-6">
          <GridRow gutter={8}>
            {Array.from({ length: GRID_COLUMNS }, (_, i) => (
              <div key={i} style={{ gridColumn: "span 1 / span 1" }}>
                <GridColumnCell
                  index={i}
                  hoveredIndex={hoveredCol}
                  onHover={setHoveredCol}
                />
              </div>
            ))}
          </GridRow>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader
          title="Layout Examples"
          description="常见布局组合，悬停布局块可查看 span 值。"
        />
        <div className="space-y-4">
          {layoutExamples.map((example) => (
            <div key={example.title} className="rounded-md border bg-card p-4 md:p-5">
              <p className="mb-3 text-sm font-medium text-foreground">{example.title}</p>
              <GridRow gutter={16}>
                {example.spans.map((span, idx) => (
                  <GridCol
                    key={`${example.title}-${idx}`}
                    span={span}
                    showSpanOnHover
                    label={String(span)}
                  />
                ))}
              </GridRow>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader
          title="Responsive Breakpoints"
          description="断点规范与容器宽度对应关系。"
        />
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold text-foreground">Breakpoint</th>
                <th className="px-4 py-3 font-semibold text-foreground">Width</th>
              </tr>
            </thead>
            <tbody>
              {breakpoints.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-primary/[0.04]"
                >
                  <td className="px-4 py-3 font-mono text-primary">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.width}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader
          title="Interactive Playground"
          description="拖动滑块实时预览不同列数下的栅格分布。"
        />
        <div className="rounded-md border border-primary/20 bg-gradient-to-br from-primary/[0.03] to-card p-5 md:p-6">
          <div className="mb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <label htmlFor="grid-playground" className="text-sm font-medium">
                列数
              </label>
              <input
                id="grid-playground"
                type="range"
                min={0}
                max={playgroundSteps.length - 1}
                step={1}
                value={playgroundSteps.indexOf(
                  playgroundCols as (typeof playgroundSteps)[number]
                )}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setPlaygroundCols(playgroundSteps[idx] ?? 12);
                }}
                className="h-2 w-full max-w-xs flex-1 cursor-pointer accent-primary"
              />
              <span className="min-w-[3rem] rounded-md border bg-background px-2 py-1 text-center font-mono text-sm text-primary">
                {playgroundCols}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {playgroundSteps.map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setPlaygroundCols(step)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 font-mono text-xs transition-colors duration-300",
                    playgroundCols === step
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={playgroundCols}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GridRow gutter={16}>
              {Array.from({ length: playgroundCols }, (_, i) => (
                <GridCol
                  key={i}
                  span={playgroundSpan}
                  label={`${playgroundSpan}`}
                  showSpanOnHover
                />
              ))}
            </GridRow>
          </motion.div>
          <p className="mt-3 text-xs text-muted-foreground">
            每列 span = {playgroundSpan}（24 栏体系，共 {playgroundCols} 列）
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader
          title="Spacing System"
          description="Grid 间距（Gutter）规范，数值越大列间距越宽。"
        />
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {gutterSizes
              .filter((g) => g <= 16)
              .map((gutter) => (
                <GutterDemoCard key={gutter} gutter={gutter} />
              ))}
          </div>
          {gutterSizes
            .filter((g) => g >= 24)
            .map((gutter) => (
              <GutterDemoCard key={gutter} gutter={gutter} fullWidth />
            ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader title="Code Example" description="Row / Col 基础用法。" />
        <GridCodeBlock
          onCopySuccess={() => showToast("代码已复制")}
        />
      </motion.section>

      <motion.section {...fadeUp} className="space-y-4">
        <SectionHeader title="Best Practices" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">推荐做法</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                "使用 24 栅格体系",
                "保持统一 Gutter",
                "遵循响应式规范",
                "优先使用标准布局",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">避免做法</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                "栅格嵌套过深",
                "不统一间距",
                "随意修改断点",
                "忽略移动端适配",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200",
          toast ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="status"
      >
        {toast}
      </div>
    </div>
  );
}
