"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";

const defaultCode = `<Row gutter={24}>
  <Col span={8}>A</Col>
  <Col span={8}>B</Col>
  <Col span={8}>C</Col>
</Row>`;

function highlightCode(code: string) {
  const parts = code.split(/(<\/?\w+[^>]*>|\{[^}]+\}|[A-Z])/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("<")) {
      return (
        <span key={i} className="text-[#7DD3FC]">
          {part}
        </span>
      );
    }
    if (part.startsWith("{")) {
      return (
        <span key={i} className="text-[#FBBF24]">
          {part}
        </span>
      );
    }
    if (/^[A-Z]$/.test(part)) {
      return (
        <span key={i} className="text-[#A5F3FC]">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type GridCodeBlockProps = {
  code?: string;
  className?: string;
  onCopySuccess?: () => void;
};

export function GridCodeBlock({
  code = defaultCode,
  className,
  onCopySuccess,
}: GridCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    onCopySuccess?.();
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={cn("overflow-hidden rounded-md border border-[#1e293b] bg-[#0f172a]", className)}>
      <div className="flex items-center justify-between border-b border-[#1e293b] px-4 py-2">
        <span className="text-xs text-slate-400">tsx</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {copied ? "复制成功" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-200">
        <code>{highlightCode(code.trim())}</code>
      </pre>
    </div>
  );
}
