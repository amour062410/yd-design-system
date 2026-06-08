import { cn } from "@yd-ds/ui";

type CodeBlockProps = {
  code: string;
  className?: string;
};

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border bg-muted/40 p-4 font-mono text-xs leading-relaxed",
        className
      )}
    >
      <code>{code.trim()}</code>
    </pre>
  );
}
