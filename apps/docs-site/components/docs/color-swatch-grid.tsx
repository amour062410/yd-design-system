"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import type { ColorSwatchDefinition } from "@yd-ds/tokens";

function isLightSwatch(value: string) {
  const rgbaMatch = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?/i
  );
  if (rgbaMatch) {
    const r = Number(rgbaMatch[1]);
    const g = Number(rgbaMatch[2]);
    const b = Number(rgbaMatch[3]);
    const a = rgbaMatch[4] !== undefined ? Number(rgbaMatch[4]) : 1;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.72 || a < 0.15;
  }
  if (!value.startsWith("#")) return true;
  const normalized = value.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

type ColorSwatchGridProps = {
  swatches: ColorSwatchDefinition[];
  columns?: "brand" | "functional" | "neutral" | "palette";
};

export function ColorSwatchGrid({ swatches, columns = "brand" }: ColorSwatchGridProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedValue(value);
    window.setTimeout(() => setCopiedValue(null), 1200);
  };

  const gridClass =
    columns === "functional"
      ? "grid grid-cols-2 gap-3 sm:grid-cols-4"
      : columns === "neutral" || columns === "brand"
        ? "grid grid-cols-2 gap-3 sm:grid-cols-5"
        : "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6";

  return (
    <>
      <div className={gridClass}>
        {swatches.map((swatch) => {
          const light = isLightSwatch(swatch.value);
          return (
            <button
              key={swatch.token}
              type="button"
              onClick={() => handleCopy(swatch.display)}
              className="group rounded-lg border bg-card p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              title={`点击复制 ${swatch.display}`}
            >
              <div
                className="mb-3 h-16 w-full rounded-md border border-black/5 shadow-inner"
                style={{ backgroundColor: swatch.value }}
              />
              <p className="text-sm font-semibold tracking-tight text-foreground">
                {swatch.name}
              </p>
              <p className="mt-1 font-mono text-[11px] text-primary">{swatch.token}</p>
              <p className="mt-1.5 break-all font-mono text-xs text-foreground">
                {swatch.display}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                rgb({swatch.rgb})
              </p>
              {swatch.usage ? (
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                  {swatch.usage}
                </p>
              ) : null}
              <p
                className={cn(
                  "mt-2 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100",
                  light ? "text-muted-foreground" : "text-primary"
                )}
              >
                点击复制色值
              </p>
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 truncate rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200",
          copiedValue ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="status"
        aria-live="polite"
      >
        已复制：{copiedValue}
      </div>
    </>
  );
}
