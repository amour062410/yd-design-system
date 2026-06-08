type DesignTokenItem = {
  name: string;
  value: string;
  description?: string;
};

type DesignTokenShowcaseProps = {
  title?: string;
  tokens: DesignTokenItem[];
};

export function DesignTokenShowcase({
  title = "相关 Design Tokens",
  tokens,
}: DesignTokenShowcaseProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {tokens.map((token) => (
          <div
            key={token.name}
            className="flex items-start gap-4 rounded-lg border bg-card p-4"
          >
            <div
              className="mt-0.5 size-10 shrink-0 rounded-md border shadow-sm"
              style={{
                backgroundColor: token.value.startsWith("#")
                  ? token.value
                  : undefined,
                borderRadius:
                  token.name.includes("radius") ||
                  token.name.includes("Radius")
                    ? token.value
                    : undefined,
              }}
            >
              {!token.value.startsWith("#") &&
              !token.name.toLowerCase().includes("radius") ? (
                <div className="flex size-full items-center justify-center bg-muted text-[10px] text-muted-foreground">
                  CSS
                </div>
              ) : null}
            </div>
            <div className="min-w-0 space-y-1">
              <p className="font-mono text-sm font-medium">{token.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {token.value}
              </p>
              {token.description ? (
                <p className="text-sm text-muted-foreground">
                  {token.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
