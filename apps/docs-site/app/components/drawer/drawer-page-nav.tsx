"use client";

import { cn } from "@yd-ds/ui";

const DRAWER_PAGE_SECTIONS = [
  { id: "drawer-usage", label: "Usage" },
  { id: "drawer-when-to-use", label: "When To Use" },
  { id: "drawer-showcase", label: "Showcase" },
  { id: "drawer-business", label: "Business Patterns" },
  { id: "drawer-states", label: "States" },
  { id: "drawer-sizes", label: "Sizes" },
  { id: "drawer-anatomy", label: "Anatomy" },
  { id: "drawer-design-spec", label: "Design Spec" },
  { id: "drawer-best-practice", label: "Best Practice" },
  { id: "drawer-api", label: "API" },
  { id: "drawer-dev", label: "Development" },
  { id: "drawer-tokens", label: "Token Usage" },
] as const;

export function DrawerPageNav() {
  return (
    <nav className="mb-8 rounded-md border bg-card px-4 py-3" aria-label="Drawer 页面目录">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        页面目录
      </p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[13px]">
        {DRAWER_PAGE_SECTIONS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-muted-foreground transition-colors hover:text-[color:var(--drawer-brand-color)]"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
