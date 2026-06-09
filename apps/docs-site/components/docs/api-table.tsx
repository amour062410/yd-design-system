import { cn } from "@yd-ds/ui";

export type ApiTableRow = {
  prop: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
  version?: string;
  deprecated?: boolean;
};

type ApiTableProps = {
  rows: ApiTableRow[];
  className?: string;
  /** Ant Design 风格：参数 / 说明 / 类型 / 默认值 / 版本 */
  showVersion?: boolean;
};

export function ApiTable({ rows, className, showVersion = false }: ApiTableProps) {
  if (showVersion) {
    return (
      <div className={cn("overflow-x-auto rounded-lg border", className)}>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-semibold">参数</th>
              <th className="px-4 py-3 font-semibold">说明</th>
              <th className="px-4 py-3 font-semibold">类型</th>
              <th className="px-4 py-3 font-semibold">默认值</th>
              <th className="px-4 py-3 font-semibold">版本</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.prop} className="border-b last:border-0">
                <td className="px-4 py-3 align-top">
                  <code
                    className={cn(
                      "rounded bg-muted px-1.5 py-0.5 font-mono text-xs",
                      row.deprecated && "text-muted-foreground line-through"
                    )}
                  >
                    {row.prop}
                  </code>
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">{row.description}</td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.type}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.default ?? "-"}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.version ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-lg border", className)}>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 font-semibold">属性</th>
            <th className="px-4 py-3 font-semibold">类型</th>
            <th className="px-4 py-3 font-semibold">默认值</th>
            <th className="px-4 py-3 font-semibold">说明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop} className="border-b last:border-0">
              <td className="px-4 py-3 align-top">
                <code
                  className={cn(
                    "rounded bg-muted px-1.5 py-0.5 font-mono text-xs",
                    row.deprecated && "line-through text-muted-foreground"
                  )}
                >
                  {row.prop}
                  {row.required ? (
                    <span className="ml-1 text-destructive">*</span>
                  ) : null}
                </code>
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
