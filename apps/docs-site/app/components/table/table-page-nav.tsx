"use client";

import { cn } from "@yd-ds/ui";

const TABLE_PAGE_SECTIONS = [
  { id: "table-basic", label: "Basic Table" },
  { id: "table-states", label: "States" },
  { id: "table-sizes", label: "Sizes" },
  { id: "table-sort", label: "Sort" },
  { id: "table-filter", label: "Filter" },
  { id: "table-selection", label: "Row Selection" },
  { id: "table-fixed", label: "Fixed Columns" },
  { id: "table-pagination", label: "Pagination" },
  { id: "table-editable", label: "Editable Add Row" },
  { id: "table-design-spec", label: "Design Spec" },
  { id: "table-business-patterns", label: "Business Patterns" },
  { id: "table-pattern-expandable", label: "Expandable Detail" },
  { id: "table-pattern-certificate", label: "Certificate Status" },
  { id: "table-business-spec", label: "Business Pattern Spec" },
  { id: "table-api", label: "API" },
  { id: "table-dev", label: "Development" },
  { id: "table-tokens", label: "Token Usage" },
] as const;

export function TablePageNav() {
  return (
    <nav
      className="mb-8 rounded-md border bg-card px-4 py-3"
      aria-label="Table 页面目录"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        页面目录
      </p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[13px]">
        {TABLE_PAGE_SECTIONS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-muted-foreground transition-colors hover:text-[color:var(--table-action-color)]"
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
