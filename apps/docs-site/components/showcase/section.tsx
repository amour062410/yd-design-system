import { cn } from "@yd-ds/ui";
import type { ReactNode } from "react";

export function Section({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("scroll-mt-24", className)}>
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
  dark,
  inset,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-ds border border-border/80 bg-surface-card p-8 shadow-ds transition-shadow duration-base hover:shadow-ds-lg",
        inset && "bg-surface-card-soft p-6",
        dark && "dark glass",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2.5 block text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
      {children}
    </span>
  );
}
