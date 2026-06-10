"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yd-ds/ui";
import {
  componentNavigation,
  componentCategoryOrder,
  componentCategoryLabels,
  formatComponentNavLabel,
  type ComponentCategory,
} from "@/lib/component-navigation";

/** Group items by category, respecting categoryOrder */
function groupByCategory(items: typeof componentNavigation) {
  const groups = new Map<ComponentCategory, typeof componentNavigation>();
  for (const item of items) {
    const cat = item.category;
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(item);
  }
  return componentCategoryOrder
    .filter((cat) => groups.has(cat))
    .map((cat) => ({
      category: cat,
      label: componentCategoryLabels[cat],
      items: groups.get(cat)!,
    }));
}

export function ComponentsSidebar() {
  const pathname = usePathname();
  const groups = groupByCategory(componentNavigation);

  return (
    <aside className="hidden w-56 shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] overflow-y-auto pb-8 md:block">
      {/* Page title */}
      <h2 className="mb-5 text-sm font-semibold text-text-primary">组件</h2>

      <nav className="flex flex-col">
        {groups.map((group, groupIdx) => (
          <div
            key={group.category}
            className={cn(
              "flex flex-col",
              groupIdx > 0 && "mt-5",
              groupIdx < groups.length - 1 && "pb-5",
              groupIdx < groups.length - 1 && "border-b border-border"
            )}
          >
            {/* Category header — Ant Design style: label + count */}
            <div className="mb-1 flex items-center justify-between px-3">
              <span className="text-[11px] font-medium tracking-wide text-text-tertiary">
                {group.label}
              </span>
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-surface-card-soft px-1.5 text-[10px] font-medium text-text-tertiary">
                {group.items.length}
              </span>
            </div>

            {/* Menu items */}
            <div className="flex flex-col">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const isReady = item.ready !== false;

                return (
                  <Link
                    key={item.href}
                    href={isReady ? item.href : "#"}
                    aria-current={isActive ? "page" : undefined}
                    aria-disabled={!isReady}
                    className={cn(
                      "group relative flex h-8 items-center rounded-md px-3 text-[13px] leading-none transition-colors duration-150",
                      isActive
                        ? "bg-brand-muted font-medium text-brand"
                        : isReady
                          ? "text-text-secondary hover:bg-surface-card-soft hover:text-text-primary"
                          : "cursor-not-allowed text-text-disabled"
                    )}
                    onClick={(e) => {
                      if (!isReady) e.preventDefault();
                    }}
                  >
                    {/* Active indicator bar — left edge */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-brand" />
                    )}
                    <span className="truncate">{formatComponentNavLabel(item)}</span>
                    {!isReady && (
                      <span className="ml-auto text-[10px] text-text-disabled">
                        待迁移
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
