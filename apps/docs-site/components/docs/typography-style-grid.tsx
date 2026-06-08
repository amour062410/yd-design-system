"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import type { TypographyStyleDefinition } from "@yd-ds/tokens";

type TypographyStyleGridProps = {
  styles: TypographyStyleDefinition[];
};

export function TypographyStyleGrid({ styles }: TypographyStyleGridProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <div className="space-y-3">
        {styles.map((style) => (
          <div
            key={style.token}
            className="rounded-lg border bg-card p-4 transition-colors hover:border-primary/25"
          >
            <p
              className="mb-4 text-foreground"
              style={{
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                lineHeight: style.lineHeight,
              }}
            >
              {style.preview}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
              <span>
                <span className="text-foreground/70">{style.name}</span>
              </span>
              <span>
                Size{" "}
                <code className="font-mono text-foreground">{style.fontSize}</code>
              </span>
              <span>
                Weight{" "}
                <code className="font-mono text-foreground">{style.fontWeight}</code>
              </span>
              <span>
                Line Height{" "}
                <code className="font-mono text-foreground">{style.lineHeight}</code>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(style.token)}
                className="ml-auto font-mono text-primary transition-opacity hover:opacity-80"
                title="点击复制 Token 名称"
              >
                {style.token}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 font-mono text-[10px] text-muted-foreground">
              <span>{style.fontSizeToken}</span>
              <span>·</span>
              <span>{style.fontWeightToken}</span>
              <span>·</span>
              <span>{style.lineHeightToken}</span>
            </div>
          </div>
        ))}
      </div>

      <CopyToast copied={copied} label="Token" />
    </>
  );
}

export function FontFamilyGrid({
  families,
}: {
  families: readonly {
    token: string;
    label: string;
    description: string;
    stack: readonly string[];
  }[];
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {families.map((family) => (
          <div key={family.token} className="rounded-lg border bg-card p-4">
            <p
              className="mb-3 text-lg font-semibold tracking-tight"
              style={{ fontFamily: family.stack.join(", ") }}
            >
              YD Design System 字体预览 Aa
            </p>
            <p className="text-sm font-medium text-foreground">{family.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{family.description}</p>
            <p className="mt-3 break-all font-mono text-[11px] leading-relaxed text-muted-foreground">
              {family.stack.join(", ")}
            </p>
            <button
              type="button"
              onClick={() => handleCopy(family.token)}
              className="mt-3 font-mono text-[11px] text-primary hover:opacity-80"
            >
              {family.token}
            </button>
          </div>
        ))}
      </div>
      <CopyToast copied={copied} label="Token" />
    </>
  );
}

export function FontWeightGrid({
  weights,
}: {
  weights: readonly {
    token: string;
    label: string;
    value: string;
    description: string;
  }[];
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {weights.map((weight) => (
          <button
            key={weight.token}
            type="button"
            onClick={() => handleCopy(weight.token)}
            className="rounded-lg border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <p
              className="text-xl text-foreground"
              style={{ fontWeight: weight.value }}
            >
              {weight.label}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{weight.value}</p>
            <p className="mt-1 font-mono text-[11px] text-primary">{weight.token}</p>
          </button>
        ))}
      </div>
      <CopyToast copied={copied} label="Token" />
    </>
  );
}

export function LineHeightGrid({
  items,
}: {
  items: readonly { token: string; value: string }[];
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.token}
            type="button"
            onClick={() => handleCopy(item.token)}
            className="rounded-lg border bg-card p-4 text-left transition-all hover:border-primary/30"
          >
            <p
              className="text-sm text-foreground"
              style={{ lineHeight: item.value }}
            >
              行高 {item.value} — 云盯设计系统 Typography Token 用于构建一致的文字层级与阅读体验。
            </p>
            <p className="mt-3 font-mono text-[11px] text-primary">{item.token}</p>
            <p className="font-mono text-xs text-muted-foreground">{item.value}</p>
          </button>
        ))}
      </div>
      <CopyToast copied={copied} label="Token" />
    </>
  );
}

function CopyToast({ copied, label }: { copied: string | null; label: string }) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 truncate rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200",
        copied ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="status"
      aria-live="polite"
    >
      已复制{label}：{copied}
    </div>
  );
}
