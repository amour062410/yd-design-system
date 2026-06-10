"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yd-ds/ui";
import {
  businessShowcaseNavigation,
  formatBusinessShowcaseNavLabel,
} from "@/lib/business-showcase-navigation";

const groups = [
  { key: "patterns" as const, label: "业务模式" },
  { key: "demos" as const, label: "案例展示" },
];

export function BusinessShowcaseSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-[220px]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        业务展示
      </p>
      <nav aria-label="业务展示目录">
        {groups.map((group, gi) => {
          const items = businessShowcaseNavigation.filter(
            (item) => item.group === group.key
          );
          return (
            <div key={group.key}>
              <p className="mb-1.5 mt-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
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
                        {formatBusinessShowcaseNavLabel(item)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {gi < groups.length - 1 && (
                <div className="my-3 h-px bg-border/50" />
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
