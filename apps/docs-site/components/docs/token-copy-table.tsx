"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import type { TypographyTokenRow } from "@yd-ds/tokens";

type TokenCopyTableProps = {
  rows: TypographyTokenRow[];
  title?: string;
};

export function TokenCopyTable({ rows, title = "Typography Token" }: TokenCopyTableProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-semibold">Token Name</th>
              <th className="px-4 py-3 font-semibold">Value</th>
              <th className="px-4 py-3 font-semibold">Category</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.token} className="border-b last:border-0">
                <td className="px-4 py-3 align-top">
                  <button
                    type="button"
                    onClick={() => handleCopy(row.token)}
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10"
                    title="点击复制 Token 名称"
                  >
                    {row.token}
                  </button>
                </td>
                <td className="max-w-xs break-all px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.value}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {row.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 truncate rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200",
          copied ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="status"
        aria-live="polite"
      >
        已复制 Token：{copied}
      </div>

      <p className="sr-only">{title}</p>
    </>
  );
}
