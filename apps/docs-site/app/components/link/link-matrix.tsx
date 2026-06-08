"use client";

import { Link } from "@yd-ds/ui/link";
import {
  LINK_GROUPS,
  LINK_STATES,
  LINK_STATUSES,
  LINK_USAGE_TEXT,
} from "@/lib/data/linkMock";

export function LinkMatrix() {
  return (
    <div className="rounded-md border bg-card">
      <div className="border-b border-border/60 bg-muted/30 px-6 py-4 md:px-8">
        <p className="text-sm text-muted-foreground">{LINK_USAGE_TEXT}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {LINK_STATES.map(({ label }) => (
            <span
              key={`state-chip-${label}`}
              className="rounded-full border border-border/70 bg-background px-3 py-1 text-[11px] text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 px-6 py-6 md:px-8 md:py-8">
        {LINK_GROUPS.map((group, groupIndex) => (
          <div
            key={group.key}
            className={groupIndex > 0 ? "border-t border-border/50 pt-8" : ""}
          >
            <h3 className="mb-5 text-[13px] font-semibold text-foreground">{group.title}</h3>

            <div className="overflow-x-auto">
              <div className="grid min-w-[520px] grid-cols-[88px_repeat(4,minmax(0,1fr))] items-center gap-y-4">
                <span className="text-[11px] font-medium text-muted-foreground">语义色</span>
                {LINK_STATES.map(({ label }) => (
                  <span
                    key={`${group.key}-head-${label}`}
                    className="text-[11px] font-medium text-muted-foreground"
                  >
                    {label}
                  </span>
                ))}

                {LINK_STATUSES.map(({ status, label }) => (
                  <div key={`${group.key}-${status}`} className="contents">
                    <span className="text-[12px] font-medium text-foreground/80">{label}</span>
                    {LINK_STATES.map(({ state }) => (
                      <div key={`${group.key}-${status}-${state}`} className="min-h-7">
                        <Link
                          status={status}
                          showIcon={group.showIcon}
                          iconPosition={group.iconPosition}
                          showcaseState={state}
                        >
                          LINK
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
