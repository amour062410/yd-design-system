"use client";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightTsx(code: string) {
  let html = escapeHtml(code.trim());

  html = html.replace(/(\/\/[^\n]*)/g, '<span class="text-[#86909c]">$1</span>');
  html = html.replace(
    /(&lt;\/?[A-Z][A-Za-z0-9]*)/g,
    '<span class="text-[#722ed1]">$1</span>'
  );
  html = html.replace(
    /(&gt;)/g,
    '<span class="text-[#722ed1]">$1</span>'
  );
  html = html.replace(
    /(&quot;[^&]*?&quot;|'[^']*?')/g,
    '<span class="text-[#00b42a]">$1</span>'
  );
  html = html.replace(
    /\b(import|from|const|return|export|type)\b/g,
    '<span class="text-[#165dff]">$1</span>'
  );

  return html;
}

type PrismCodeBlockProps = {
  code: string;
  copied?: boolean;
  onCopy?: () => void;
};

export function PrismCodeBlock({ code, copied, onCopy }: PrismCodeBlockProps) {
  return (
    <div className="border-t border-border bg-[color:var(--surface-card-soft,#f7f8fa)] dark:bg-muted/20">
      <div className="flex items-center justify-end border-b border-border/60 px-4 py-2">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          {copied ? "已复制" : "复制代码"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 text-[color:var(--descriptions-text-primary,#1d2129)] dark:text-[color:var(--descriptions-text-primary,rgba(255,255,255,0.88))]">
        <code dangerouslySetInnerHTML={{ __html: highlightTsx(code) }} />
      </pre>
    </div>
  );
}
