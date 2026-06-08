"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yd-ds/ui";
import {
  businessComponentsNavigation,
  formatBusinessComponentNavLabel,
} from "@/lib/business-components-navigation";

export function BusinessComponentsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 overflow-hidden md:w-60">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        巡检业务组件
      </p>
      <nav className="flex flex-col gap-0.5 text-sm">
        {businessComponentsNavigation.map((item) => {
          const isActive = pathname === item.href;
          const isReady = item.ready !== false;

          return (
            <Link
              key={item.href}
              href={isReady ? item.href : "#"}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative block rounded-md px-2.5 py-1.5 transition-colors",
                isActive
                  ? "max-w-full bg-primary/10 font-medium text-primary before:absolute before:left-0 before:top-1.5 before:h-[calc(100%-12px)] before:w-0.5 before:rounded-full before:bg-primary"
                  : isReady
                    ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    : "cursor-not-allowed text-muted-foreground/50"
              )}
            >
              <span className="block truncate">{formatBusinessComponentNavLabel(item)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
