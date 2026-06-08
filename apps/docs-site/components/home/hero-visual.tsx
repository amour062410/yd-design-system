"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { Button } from "@yd-ds/ui";
import { cn } from "@yd-ds/ui";

const sidebarItems = [
  { label: "按钮", active: true },
  { label: "进度条" },
  { label: "标签" },
  { label: "表格" },
  { label: "弹窗" },
  { label: "标签页" },
  { label: "业务组件" },
  { label: "上传" },
];

const colorSwatches = [
  "bg-[#E8F0FF]",
  "bg-[#B3D4FF]",
  "bg-[#6BA3FF]",
  "bg-primary",
  "bg-[#0E42C2]",
];

const componentChips = ["Progress", "Tag", "Table"] as const;

function FloatGlass({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/60 bg-white/70 px-3.5 py-3 shadow-[0_8px_30px_-12px_rgba(22,93,255,0.15)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function FloatLabel({
  titleZh,
  titleEn,
}: {
  titleZh: string;
  titleEn: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
        {titleZh}
      </span>
      <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-primary/70">
        {titleEn}
      </span>
    </div>
  );
}

export function HeroVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${y * -3}deg`);
    el.style.setProperty("--tilt-y", `${x * 4}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[540px] px-1 sm:max-w-[560px]",
        className
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="pointer-events-none absolute -right-6 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-3xl"
        aria-hidden
      />

      {/* 左上 — 色彩 */}
      <FloatGlass
        className="animate-float absolute left-0 top-4 z-20 w-[108px] sm:left-1"
        style={{ animationDuration: "5.5s" }}
      >
        <FloatLabel titleZh="色彩" titleEn="Color" />
        <div className="mt-2.5 flex gap-1">
          {colorSwatches.map((c, i) => (
            <span
              key={i}
              className={cn("h-5 w-3 rounded-sm first:rounded-l-md last:rounded-r-md", c)}
            />
          ))}
        </div>
      </FloatGlass>

      {/* 右上 — 字体 */}
      <FloatGlass
        className="animate-float-delayed absolute right-0 top-[14%] z-20 w-[100px] sm:right-1"
      >
        <FloatLabel titleZh="字体" titleEn="Type" />
        <p className="mt-2 text-[26px] font-semibold leading-none tracking-tight text-foreground">
          Aa
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">Inter</p>
      </FloatGlass>

      {/* 右下 — 间距 */}
      <FloatGlass className="animate-float-slow absolute bottom-[30%] right-0 z-20 sm:right-1">
        <FloatLabel titleZh="间距" titleEn="Space" />
        <p className="mt-2 font-mono text-[15px] font-semibold tracking-tight text-foreground">
          8<span className="text-[11px] font-normal text-muted-foreground">px</span>
        </p>
      </FloatGlass>

      {/* 左下 — 圆角（新增） */}
      <FloatGlass
        className="animate-float absolute bottom-[10%] left-0 z-20 w-[104px] sm:left-2"
        style={{ animationDuration: "5.8s" }}
      >
        <FloatLabel titleZh="圆角" titleEn="Radius" />
        <div className="mt-2.5 flex items-end justify-between gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
            <span className="h-5 w-5 rounded-[6px] bg-primary" />
          </span>
          <p className="font-mono text-[15px] font-semibold leading-none text-foreground">
            6<span className="text-[11px] font-normal text-muted-foreground">px</span>
          </p>
        </div>
      </FloatGlass>

      {/* 右下 — 组件（新增） */}
      <FloatGlass
        className="animate-float-delayed absolute -right-1 bottom-4 z-20 hidden min-w-[128px] sm:block sm:right-0"
      >
        <FloatLabel titleZh="组件" titleEn="UI" />
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {componentChips.map((name) => (
            <span
              key={name}
              className="rounded-md border border-border/50 bg-background/80 px-2 py-0.5 font-mono text-[9px] font-medium tracking-wide text-foreground/90"
            >
              {name}
            </span>
          ))}
        </div>
      </FloatGlass>

      {/* 主预览窗 */}
      <div
        ref={ref}
        className="animate-fade-up-delay-2 relative z-10 mx-auto w-[94%] pt-8 transition-transform duration-300 ease-out sm:pt-10"
        style={{
          transform:
            "perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_20px_50px_-24px_rgba(22,93,255,0.2)]">
          <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/20 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
            <span className="ml-2 font-mono text-[10px] tracking-wide text-muted-foreground/80">
              组件库预览
            </span>
          </div>

          <div className="flex min-h-[300px]">
            <aside className="hidden w-[120px] shrink-0 border-r border-border/40 bg-muted/10 p-3 sm:block">
              <p className="mb-2 px-1 text-[10px] font-medium text-muted-foreground">组件</p>
              <ul className="space-y-0.5">
                {sidebarItems.map((item) => (
                  <li
                    key={item.label}
                    className={cn(
                      "rounded-md px-2 py-1.5 text-[11px] font-medium",
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex flex-1 flex-col gap-3.5 p-4 sm:p-5">
              <Button size="sm" className="w-fit">
                主要按钮
              </Button>
              <input
                readOnly
                placeholder="请输入"
                className="h-9 w-full max-w-[200px] rounded-md border border-input bg-background px-3 text-sm outline-none"
              />
              <div className="flex h-9 w-full max-w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
                请选择
                <span className="text-xs opacity-40">▾</span>
              </div>
              <div className="mt-auto flex items-center gap-3 border-t border-border/30 pt-3">
                <span className="inline-flex h-5 w-9 rounded-full bg-primary">
                  <span className="ml-auto mr-0.5 mt-0.5 h-4 w-4 rounded-full bg-white" />
                </span>
                <span className="text-[11px] text-muted-foreground">开关</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
