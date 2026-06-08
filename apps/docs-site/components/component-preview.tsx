import { cn } from "@yd-ds/ui";

type ComponentPreviewProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function ComponentPreview({
  title,
  description,
  children,
  className,
}: ComponentPreviewProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div
        className={cn(
          "flex min-h-[120px] flex-wrap items-center gap-4 rounded-xl border bg-card p-8",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
