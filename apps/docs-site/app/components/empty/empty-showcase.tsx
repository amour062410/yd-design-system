"use client";

import { Search } from "lucide-react";
import {
  EMPTY_TYPE_PRESETS,
  Empty,
  type EmptyType,
} from "@yd-ds/ui/empty";
import {
  EMPTY_GALLERY_BUSINESS,
  EMPTY_GALLERY_EXCEPTION,
  EMPTY_GALLERY_GENERAL,
  EMPTY_GALLERY_HISTORY,
  EMPTY_GALLERY_REFERENCE,
  EMPTY_PLACEMENT_SCENARIOS,
  EMPTY_REFERENCE_PROTOTYPES,
} from "@/lib/data/emptyMock";

const GALLERY_ILLUSTRATION_SIZE = "130px";
const GALLERY_CARD_WIDTH = "300px";

function ShowcasePanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md border bg-card px-6 py-8 md:px-10 md:py-10 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function ScaledEmpty({
  type,
  title,
  description,
  illustrationSize = GALLERY_ILLUSTRATION_SIZE,
  compact = false,
}: {
  type: EmptyType;
  title?: string;
  description?: string;
  illustrationSize?: string;
  compact?: boolean;
}) {
  return (
    <div
      style={
        {
          "--empty-illustration-size": illustrationSize,
          "--empty-padding-y": compact ? "16px" : "24px",
          "--empty-padding-x": compact ? "12px" : "20px",
        } as React.CSSProperties
      }
    >
      <Empty type={type} title={title} description={description} />
    </div>
  );
}

function EmptyGalleryCard({
  type,
  title,
  description,
  label,
}: {
  type: EmptyType;
  title?: string;
  description?: string;
  label?: string;
}) {
  const preset = EMPTY_TYPE_PRESETS[type];
  return (
    <div
      className="flex shrink-0 flex-col rounded-md border bg-card px-5 py-6"
      style={{ width: GALLERY_CARD_WIDTH, minHeight: "220px" }}
    >
      <p className="mb-3 text-center font-mono text-xs text-muted-foreground">
        type=&quot;{label ?? type}&quot;
      </p>
      <div className="flex flex-1 items-center justify-center">
        <ScaledEmpty
          type={type}
          title={title ?? preset.title}
          description={description ?? preset.description}
          compact
        />
      </div>
    </div>
  );
}

function GalleryCategory({
  title,
  types,
  extra,
}: {
  title: string;
  types: EmptyType[];
  extra?: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <div className="flex flex-wrap gap-5">
        {types.map((type) => (
          <EmptyGalleryCard key={type} type={type} />
        ))}
        {extra}
      </div>
    </div>
  );
}

export function EmptyReferenceShowcase() {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-primary/20 bg-[color:var(--color-surface-page)]">
      <div className="border-b bg-primary/5 px-6 py-4 md:px-8">
        <p className="text-base font-semibold text-foreground">插画视觉基线 · Reference Prototypes</p>
        <p className="mt-1 text-sm text-muted-foreground">
          以下三张为 Empty 插画体系源稿。后续 default / inspection / offline 等均由该视觉语言扩展，不重新设计风格。
        </p>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
        {EMPTY_REFERENCE_PROTOTYPES.map((proto) => (
          <div
            key={proto.type}
            className="flex flex-col rounded-lg border bg-card shadow-sm"
            style={{ minHeight: "280px" }}
          >
            <div className="border-b px-5 py-3">
              <p className="font-mono text-xs text-primary">{proto.name}</p>
              <p className="mt-0.5 text-sm font-medium">{proto.nameZh}</p>
              <p className="mt-1 text-xs text-muted-foreground">{proto.description}</p>
            </div>
            <div className="flex flex-1 items-center justify-center px-4 py-6">
              <ScaledEmpty type={proto.type} illustrationSize="150px" />
            </div>
            <p className="border-t px-5 py-2 text-center font-mono text-[11px] text-muted-foreground">
              type=&quot;{proto.type}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyBusinessHeroShowcase() {
  const heroTypes: EmptyType[] = ["inspection", "rectification", "risk"];

  return (
    <div className="overflow-hidden rounded-lg border bg-[color:var(--color-surface-page)]">
      <div className="border-b bg-muted/30 px-6 py-4 md:px-8">
        <p className="text-base font-semibold text-foreground">云盯巡检 · 空状态概览</p>
        <p className="mt-1 text-sm text-muted-foreground">
          业务后台最常见的三类空状态，推荐作为页面 Hero 区参考
        </p>
      </div>
      <div className="grid gap-5 p-6 md:grid-cols-3 md:p-8">
        {heroTypes.map((type) => (
          <div
            key={type}
            className="flex items-center justify-center rounded-lg border bg-card px-6 py-8 shadow-sm"
            style={{ minHeight: "240px" }}
          >
            <ScaledEmpty type={type} illustrationSize="140px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyBasicShowcase() {
  return (
    <ShowcasePanel>
      <ScaledEmpty type="default" illustrationSize="140px" />
      <p className="mt-6 text-center text-xs text-muted-foreground">
        最简用法：<code className="rounded bg-muted px-1">&lt;Empty /&gt;</code> 等价于{" "}
        <code className="rounded bg-muted px-1">type=&quot;default&quot;</code>
      </p>
    </ShowcasePanel>
  );
}

export function EmptyBusinessSceneShowcase() {
  return (
    <div className="flex flex-wrap gap-5">
      {EMPTY_GALLERY_BUSINESS.map((type) => (
        <EmptyGalleryCard key={type} type={type} />
      ))}
    </div>
  );
}

export function EmptyGeneralSceneShowcase() {
  return (
    <div className="flex flex-wrap gap-5">
      {EMPTY_GALLERY_GENERAL.map((type) => (
        <EmptyGalleryCard key={type} type={type} />
      ))}
      <EmptyGalleryCard
        type={EMPTY_GALLERY_HISTORY.type}
        label={EMPTY_GALLERY_HISTORY.label}
        title={EMPTY_GALLERY_HISTORY.title}
        description={EMPTY_GALLERY_HISTORY.description}
      />
    </div>
  );
}

export function EmptyExceptionSceneShowcase() {
  return (
    <div className="flex flex-wrap gap-5">
      {EMPTY_GALLERY_EXCEPTION.map((type) => (
        <EmptyGalleryCard key={type} type={type} />
      ))}
    </div>
  );
}

export function EmptyIllustrationGalleryShowcase() {
  return (
    <div className="space-y-10 rounded-lg border bg-muted/20 p-6 md:p-8">
      <GalleryCategory
        title="参考稿原型（视觉基线）"
        types={EMPTY_GALLERY_REFERENCE}
      />
      <GalleryCategory title="云盯业务场景" types={EMPTY_GALLERY_BUSINESS} />
      <GalleryCategory
        title="通用场景"
        types={EMPTY_GALLERY_GENERAL}
        extra={
          <EmptyGalleryCard
            type={EMPTY_GALLERY_HISTORY.type}
            label={EMPTY_GALLERY_HISTORY.label}
            title={EMPTY_GALLERY_HISTORY.title}
            description={EMPTY_GALLERY_HISTORY.description}
          />
        }
      />
      <GalleryCategory title="异常场景" types={EMPTY_GALLERY_EXCEPTION} />
    </div>
  );
}

function PlacementFrame({
  variant,
  children,
}: {
  variant: "table" | "list" | "search" | "error";
  children: React.ReactNode;
}) {
  if (variant === "table") {
    return (
      <div className="overflow-hidden rounded-md border">
        <div className="grid grid-cols-3 border-b bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span>门店名称</span>
          <span>巡检状态</span>
          <span>最近巡检</span>
        </div>
        <div className="min-h-[200px] bg-card">{children}</div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="rounded-md border bg-card">
        <div className="border-b px-4 py-3 text-sm font-medium">门店列表</div>
        <div className="min-h-[200px] px-4">{children}</div>
      </div>
    );
  }

  if (variant === "search") {
    return (
      <div className="rounded-md border bg-card p-4">
        <div className="mb-4 flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          <Search className="size-4 shrink-0" />
          <span>搜索门店名称、编号…</span>
        </div>
        <div className="min-h-[180px]">{children}</div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-dashed bg-card">
      <div className="border-b px-4 py-2 text-xs text-muted-foreground">内容区 · 加载失败</div>
      <div className="min-h-[200px]">{children}</div>
    </div>
  );
}

export function EmptyPlacementShowcase() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {EMPTY_PLACEMENT_SCENARIOS.map((scenario) => (
        <div key={scenario.title} className="space-y-3">
          <div>
            <p className="font-medium text-foreground">{scenario.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{scenario.description}</p>
          </div>
          <PlacementFrame variant={scenario.frame}>
            <ScaledEmpty
              type={scenario.type}
              illustrationSize="120px"
              compact
            />
          </PlacementFrame>
        </div>
      ))}
    </div>
  );
}
