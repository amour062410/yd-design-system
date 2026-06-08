"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yd-ds/ui";
import { componentNavigation, formatComponentNavLabel } from "@/lib/component-navigation";

export function ComponentsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 overflow-hidden md:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        组件
      </p>
      <nav className="flex flex-col gap-0.5 text-sm">
        {componentNavigation.map((item) => {
          const isActive = pathname === item.href;
          const isReady = item.ready !== false;

          return (
            <Link
              key={item.href}
              href={isReady ? item.href : "#"}
              aria-current={isActive ? "page" : undefined}
              aria-disabled={!isReady}
              className={cn(
                "relative block rounded-md px-2.5 py-1.5 transition-colors",
                isActive
                  ? "max-w-full bg-primary/10 font-medium text-primary before:absolute before:left-0 before:top-1.5 before:h-[calc(100%-12px)] before:w-0.5 before:rounded-full before:bg-primary"
                  : isReady
                    ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    : "cursor-not-allowed text-muted-foreground/50"
              )}
              onClick={(e) => {
                if (!isReady) e.preventDefault();
              }}
            >
              <span className="block truncate">{formatComponentNavLabel(item)}</span>
              {!isReady ? (
                <span className="ml-1.5 text-[10px] text-muted-foreground/60">
                  待迁移
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
