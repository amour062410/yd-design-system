"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";

type CopyCodeBlockProps = {
  code: string;
  className?: string;
};

export function CopyCodeBlock({ code, className }: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={cn("relative rounded-lg border bg-muted/40", className)}>
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="text-xs text-muted-foreground">Code</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {copied ? "已复制" : "复制代码"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
