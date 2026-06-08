"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import {
  containerGlobalRadius,
  containerShadows,
  containerStates,
  containerTokenUsage,
} from "@yd-ds/tokens";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";

export default function ContainerPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Container"
        description="容器规范页面，定义全局圆角、容器状态与阴影层级。所有色值与圆角均来自 @yd-ds/tokens。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">全局圆角规范</h2>
        <div className="rounded-lg border bg-card px-6 py-8">
          <p className="text-sm text-muted-foreground">全局圆角规范</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
            {containerGlobalRadius.label}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{containerGlobalRadius.note}</p>
          <button
            type="button"
            onClick={() => copyToken(containerGlobalRadius.token)}
            className="mt-3 font-mono text-xs text-primary hover:opacity-80"
          >
            Token: {containerGlobalRadius.token} ({containerGlobalRadius.value})
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">ALL</h2>
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[920px] gap-3">
            {containerStates.map((state) => (
              <div key={state.token} className="w-[88px] shrink-0">
                <div
                  className={cn(
                    "h-[88px] w-[88px] border",
                    state.dashed && "border-dashed"
                  )}
                  style={{
                    borderRadius: containerGlobalRadius.value,
                    borderColor: state.borderColor,
                    backgroundColor: state.backgroundColor,
                  }}
                />
                <p className="mt-2 text-center text-sm text-foreground">{state.name}</p>
                <div className="mt-2 space-y-1 text-[10px] leading-relaxed text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => copyToken(state.token)}
                    className="block w-full text-center font-mono text-primary hover:opacity-80"
                  >
                    {state.token}
                  </button>
                  <p className="text-center">Border: {state.borderToken}</p>
                  <p className="text-center">Background: {state.backgroundToken}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Shadows</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {containerShadows.map((item) => (
            <div key={item.token} className="rounded-lg border bg-card p-4">
              <div
                className="mx-auto mb-3 h-[88px] w-[88px] rounded-lg border border-border/40 bg-background"
                style={{
                  borderRadius: containerGlobalRadius.value,
                  boxShadow: item.value,
                }}
              />
              <p className="text-center text-sm font-semibold text-foreground">{item.name}</p>
              <button
                type="button"
                onClick={() => copyToken(item.token)}
                className="mt-2 block w-full text-center font-mono text-[10px] text-primary hover:opacity-80"
              >
                {item.token}
              </button>
              <p className="mt-2 break-all text-center font-mono text-[10px] text-muted-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {containerTokenUsage.map((item) => (
            <button
              key={item.token}
              type="button"
              onClick={() => copyToken(item.token)}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-left transition-colors hover:border-primary/30"
            >
              <span className="font-mono text-sm text-primary">{item.token}</span>
              <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
                {item.value}
              </span>
            </button>
          ))}
        </div>
      </section>

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
    </div>
  );
}
