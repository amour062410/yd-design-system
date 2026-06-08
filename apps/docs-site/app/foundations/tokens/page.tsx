import { primitiveColors, spacing } from "@yd-ds/tokens";

export default function TokensPage() {
  const brandScale = Object.entries(primitiveColors.brand);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Design Tokens</h1>
        <p className="mt-2 text-muted-foreground">
          Primitive 层原始值与 Semantic 层语义映射，由 @yd-ds/tokens 统一管理。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Brand Colors</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {brandScale.map(([name, value]) => (
            <div key={name} className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: value }}
              />
              <div className="font-mono text-xs">
                <p className="font-medium">brand.{name}</p>
                <p className="text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Spacing Scale</h2>
        <div className="space-y-2">
          {Object.entries(spacing)
            .slice(0, 12)
            .map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-4 rounded-md border px-4 py-2 font-mono text-sm"
              >
                <span className="w-12 text-muted-foreground">{key}</span>
                <span className="w-20">{value}</span>
                <div
                  className="h-3 rounded-sm bg-primary"
                  style={{ width: value }}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
