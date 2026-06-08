import type { LucideIcon } from "lucide-react";
import { Box, Ruler, Search, Zap } from "lucide-react";
import { cn } from "@yd-ds/ui";

type FeatureAccent = "blue" | "emerald" | "amber" | "violet";

type DesignValue = {
  index: string;
  icon: LucideIcon;
  titleZh: string;
  titleEn: string;
  description: string;
  accent: FeatureAccent;
};

const accentStyles: Record<
  FeatureAccent,
  {
    icon: string;
    ring: string;
    glow: string;
    line: string;
    badge: string;
  }
> = {
  blue: {
    icon: "text-blue-600 dark:text-blue-400",
    ring: "from-blue-500/25 via-blue-400/10 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.55)]",
    line: "from-blue-500/80 to-blue-500/0",
    badge: "border-blue-500/20 bg-blue-500/[0.06] text-blue-600 dark:text-blue-400",
  },
  emerald: {
    icon: "text-emerald-600 dark:text-emerald-400",
    ring: "from-emerald-500/25 via-emerald-400/10 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.5)]",
    line: "from-emerald-500/80 to-emerald-500/0",
    badge: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    icon: "text-amber-600 dark:text-amber-400",
    ring: "from-amber-500/25 via-amber-400/10 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.5)]",
    line: "from-amber-500/80 to-amber-500/0",
    badge: "border-amber-500/20 bg-amber-500/[0.06] text-amber-600 dark:text-amber-400",
  },
  violet: {
    icon: "text-violet-600 dark:text-violet-400",
    ring: "from-violet-500/25 via-violet-400/10 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.5)]",
    line: "from-violet-500/80 to-violet-500/0",
    badge: "border-violet-500/20 bg-violet-500/[0.06] text-violet-600 dark:text-violet-400",
  },
};

const designValues: DesignValue[] = [
  {
    index: "01",
    icon: Search,
    titleZh: "清晰",
    titleEn: "Clarity",
    accent: "blue",
    description:
      "降低认知负担，让信息以最低成本被理解，提升用户体验。信息层级明确，视觉表达直观，让用户一眼理解操作意图与当前状态。",
  },
  {
    index: "02",
    icon: Ruler,
    titleZh: "标准",
    titleEn: "Standard",
    accent: "emerald",
    description:
      "统一设计语言与交互规范，消除随意与混乱，建立协作共识。统一的设计规范与代码实现，确保跨产品、跨团队的交付一致性。",
  },
  {
    index: "03",
    icon: Zap,
    titleZh: "高效",
    titleEn: "Efficient",
    accent: "amber",
    description:
      "复用优于重造，优化流程，让对的事情更快发生，提升团队效率。设计即代码，Design Token 直接导出 JSON，研发交付零损耗。",
  },
  {
    index: "04",
    icon: Box,
    titleZh: "秩序",
    titleEn: "Order",
    accent: "violet",
    description:
      "在复杂中建立结构，保障系统可持续演进，让设计资产长久传承。严谨的间距、圆角、阴影体系，构建有序而和谐的视觉节奏。",
  },
];

function FeatureCard({ item }: { item: DesignValue }) {
  const Icon = item.icon;
  const styles = accentStyles[item.accent];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 sm:p-7",
        "hover:-translate-y-1.5 hover:border-border/80 hover:bg-card/80",
        styles.glow
      )}
    >
      {/* Tech grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(22,93,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(22,93,255,0.04)_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/[0.04] blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cn(
            "font-mono text-[11px] font-medium tracking-[0.22em] text-muted-foreground/80"
          )}
        >
          {item.index}
        </span>
        <div
          className={cn(
            "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-gradient-to-br shadow-inner transition-transform duration-500 group-hover:scale-105",
            styles.ring
          )}
        >
          <Icon className={cn("h-5 w-5 stroke-[1.75]", styles.icon)} />
          <span
            className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 dark:ring-white/5"
            aria-hidden
          />
        </div>
      </div>

      <div
        className={cn(
          "relative mt-5 h-px w-12 bg-gradient-to-r transition-all duration-500 group-hover:w-full",
          styles.line
        )}
        aria-hidden
      />

      <header className="relative mt-5">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h3 className="text-[1.35rem] font-semibold tracking-tight text-foreground">
            {item.titleZh}
          </h3>
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em]",
              styles.badge
            )}
          >
            {item.titleEn}
          </span>
        </div>
      </header>

      <p className="relative mt-4 flex-1 text-[13px] leading-[1.75] tracking-[0.01em] text-muted-foreground">
        {item.description}
      </p>
    </article>
  );
}

export function HomeFeatures() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-border/40 bg-[#f8fafc] dark:bg-[#070b14]"
    >
      {/* Ambient tech background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(22,93,255,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden
      />

      <div className="container relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <header className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
          <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-primary">
            YD · DESIGN VALUES
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            设计价值观
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            清晰是体验的底线 · 标准是协作的基础 · 高效是价值的体现 · 秩序是系统的保障
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {designValues.map((item) => (
            <FeatureCard key={item.titleEn} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
