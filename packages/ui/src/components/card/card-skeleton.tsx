"use client";

import { cn } from "../../lib/utils";
import type { CardVariant } from "./card.types";

function SkeletonBar({ className, highlight }: { className?: string; highlight?: boolean }) {
  return (
    <span
      className={cn("block animate-pulse rounded", className)}
      style={{
        backgroundColor: highlight
          ? "var(--card-skeleton-highlight, #E5E6EB)"
          : "var(--card-skeleton-bg, #F2F3F5)",
      }}
    />
  );
}

export function CardSkeleton({ variant = "default" }: { variant?: CardVariant }) {
  return (
    <div className="flex flex-col gap-3" aria-busy="true">
      <SkeletonBar className="h-4 w-24" />
      {variant === "statistics" || variant === "dashboard" ? (
        <SkeletonBar className="h-8 w-20" highlight />
      ) : null}
      <SkeletonBar className="h-3 w-full" />
      <SkeletonBar className="h-3 w-4/5" />
    </div>
  );
}
