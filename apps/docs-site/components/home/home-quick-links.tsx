import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { readyBusinessComponentsNavigation } from "@/lib/business-components-navigation";
import { readyComponentNavigation } from "@/lib/component-navigation";
import {
  businessComponentsEntryHref,
  componentsEntryHref,
} from "@/lib/site-navigation";

const HIGHLIGHT_SLUGS = new Set(["progress", "tag", "badge", "statistic", "table"]);

const highlightComponents = readyComponentNavigation.filter((item) =>
  HIGHLIGHT_SLUGS.has(item.href.replace("/components/", ""))
);

export function HomeQuickLinks() {
  return (
    <section className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">快速入口</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              基础组件与巡检业务组件，点击即可进入文档。
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link
              href={componentsEntryHref}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              全部组件
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href={businessComponentsEntryHref}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              巡检业务组件
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              基础组件
            </p>
            <div className="flex flex-wrap gap-2">
              {highlightComponents.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  {item.labelZh}
                </Link>
              ))}
              <Link
                href={componentsEntryHref}
                className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                更多…
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              巡检业务组件
            </p>
            <div className="flex flex-wrap gap-2">
              {readyBusinessComponentsNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  {item.labelZh}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
