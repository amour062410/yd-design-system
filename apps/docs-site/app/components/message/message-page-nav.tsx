"use client";

import { cn } from "@yd-ds/ui";

const MESSAGE_PAGE_SECTIONS = [
  { id: "message-overview", label: "Overview" },
  { id: "message-types", label: "Message Types" },
  { id: "message-position", label: "Message Position" },
  { id: "message-long-content", label: "Long Content" },
  { id: "message-loading", label: "Loading Message" },
  { id: "message-interactive", label: "Interactive Demo" },
  { id: "message-api", label: "API" },
  { id: "message-tokens", label: "Design Token" },
] as const;

export function MessagePageNav() {
  return (
    <nav className="mb-8 rounded-md border bg-card px-4 py-3" aria-label="Message 页面目录">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        页面目录
      </p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[13px]">
        {MESSAGE_PAGE_SECTIONS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-muted-foreground transition-colors hover:text-[color:var(--message-info-color)]"
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
