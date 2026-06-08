import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@yd-ds/ui";
import {
  businessComponentsEntryHref,
  componentsEntryHref,
} from "@/lib/site-navigation";
import { HeroVisual } from "./hero-visual";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(22,93,255,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            正式版 v1.0.0
          </div>

          <h1 className="animate-fade-up-delay-1 mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            放心设计，
            <span className="bg-gradient-to-r from-primary to-[#4d8dff] bg-clip-text text-transparent">
              自信交付
            </span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-5 text-lg leading-relaxed text-muted-foreground">
            面向卓越数字产品的现代设计系统。体验一致、易于访问、为规模化而生。
          </p>

          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="group gap-2 shadow-[0_8px_24px_-4px_rgba(22,93,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-4px_rgba(22,93,255,0.5)]"
            >
              <Link href={componentsEntryHref}>
                开始使用
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-background/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/50"
            >
              <Link href={componentsEntryHref}>查看组件</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-background/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/50"
            >
              <Link href={businessComponentsEntryHref}>巡检业务组件</Link>
            </Button>
          </div>
        </div>

        <HeroVisual className="animate-fade-up-delay-2 lg:justify-self-end" />
      </div>
    </section>
  );
}
