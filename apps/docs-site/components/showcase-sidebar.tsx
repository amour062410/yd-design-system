"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yd-ds/ui";
import { formatShowcaseNavLabel, showcaseNavigation } from "@/lib/showcase-navigation";

export function ShowcaseSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-[220px]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        案例展示
      </p>
      <nav aria-label="Showcase 目录">
        <ul className="space-y-0.5">
          {showcaseNavigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-[8px] px-3 py-2 text-[13px] transition-colors",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {formatShowcaseNavLabel(item)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
