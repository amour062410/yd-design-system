import type { ReactNode } from "react";

type ComponentDocHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function ComponentDocHeader({
  title,
  description,
  action,
}: ComponentDocHeaderProps) {
  return (
    <header className="border-b pb-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-medium text-primary">组件</p>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  );
}
