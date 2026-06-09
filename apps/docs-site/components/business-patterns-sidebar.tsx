"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yd-ds/ui";
import {
  businessPatternNavigation,
  formatBusinessPatternNavLabel,
} from "@/lib/business-patterns-navigation";

export function BusinessPatternsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-[220px]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        业务模式
      </p>
      <nav aria-label="业务案例目录">
        <ul className="space-y-0.5">
          {businessPatternNavigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-[8px] px-3 py-2 text-[13px] transition-colors",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    !item.ready && "pointer-events-none opacity-40"
                  )}
                >
                  {formatBusinessPatternNavLabel(item)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
