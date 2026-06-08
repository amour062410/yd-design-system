"use client";

import { cn } from "@yd-ds/ui";

const MODAL_PAGE_SECTIONS = [
  { id: "modal-usage", label: "Usage" },
  { id: "modal-when-to-use", label: "When To Use" },
  { id: "modal-best-practice", label: "Best Practice" },
  { id: "modal-showcase", label: "Showcase" },
  { id: "modal-sizes", label: "Sizes" },
  { id: "modal-fullscreen", label: "Fullscreen" },
  { id: "modal-types", label: "Types" },
  { id: "modal-states", label: "States" },
  { id: "modal-footer-patterns", label: "Footer Patterns" },
  { id: "modal-content-patterns", label: "Content Patterns" },
  { id: "modal-patterns", label: "Modal Pattern" },
  { id: "modal-pattern-spec", label: "Pattern Spec" },
  { id: "modal-interactive", label: "Interactive Demo" },
  { id: "modal-design-spec", label: "Design Spec" },
  { id: "modal-api", label: "API" },
  { id: "modal-dev", label: "Development" },
  { id: "modal-tokens", label: "Token Usage" },
] as const;

export function ModalPageNav() {
  return (
    <nav
      className="mb-8 rounded-md border bg-card px-4 py-3"
      aria-label="Modal 页面目录"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        页面目录
      </p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[13px]">
        {MODAL_PAGE_SECTIONS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-muted-foreground transition-colors hover:text-[color:var(--modal-info-color)]"
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
