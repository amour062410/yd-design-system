"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@yd-ds/ui";
import { PrismCodeBlock } from "./prism-code-block";

type ComponentDemoBlockProps = {
  title: string;
  description?: string;
  version?: string;
  code: string;
  children: ReactNode;
  className?: string;
};

export function ComponentDemoBlock({
  title,
  description,
  version,
  code,
  children,
  className,
}: ComponentDemoBlockProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
            {version ? (
              <span className="rounded border border-border px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {version}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="text-[13px] text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="shrink-0 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          {open ? "收起源码" : "展开源码"}
        </button>
      </div>
      <div className="px-6 py-6">{children}</div>
      {open ? (
        <PrismCodeBlock code={code} copied={copied} onCopy={handleCopy} />
      ) : null}
    </div>
  );
}
