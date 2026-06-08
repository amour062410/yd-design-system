import {
  brandPrimary,
  colorPaletteGroups,
  colorScaleGroups,
  functionalColors,
} from "@yd-ds/tokens";
import { ColorSwatchGrid } from "@/components/docs/color-swatch-grid";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { DesignTokenShowcase } from "@/components/docs/design-token-showcase";

const brandGroup = colorScaleGroups.find((g) => g.id === "brand")!;
const functionalGroup = colorScaleGroups.find((g) => g.id === "functional")!;
const neutralGroup = colorScaleGroups.find((g) => g.id === "neutral")!;

const totalSwatches =
  colorScaleGroups.reduce((sum, g) => sum + g.swatches.length, 0) +
  colorPaletteGroups.reduce((sum, g) => sum + g.swatches.length, 0);

export default function ColorsPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Colors"
        description={`统一系统色板：品牌色阶、功能语义色、中性灰阶及边框 / 文字 / 状态 / 辅助色。共 ${totalSwatches} 个颜色 Token，Primary-6 为品牌主色 #165DFF。点击色块可复制色值。`}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{brandGroup.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{brandGroup.description}</p>
        </div>
        <ColorSwatchGrid swatches={brandGroup.swatches} columns="brand" />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {functionalGroup.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {functionalGroup.description}
          </p>
        </div>
        <ColorSwatchGrid swatches={functionalGroup.swatches} columns="functional" />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{neutralGroup.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{neutralGroup.description}</p>
        </div>
        <ColorSwatchGrid swatches={neutralGroup.swatches} columns="neutral" />
      </section>

      {colorPaletteGroups.map((group) => (
        <section key={group.id} className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{group.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
          </div>
          <ColorSwatchGrid swatches={group.swatches} columns="palette" />
        </section>
      ))}

      <DesignTokenShowcase
        title="Token 引用说明"
        tokens={[
          {
            name: "color.brand.primary-6",
            value: brandPrimary[6],
            description: "品牌主色阶，对应 CSS 变量 --primary。",
          },
          {
            name: "color.functional.success",
            value: functionalColors.success,
            description: "功能语义 — 成功状态。",
          },
          {
            name: "color.border.default",
            value: "#E5E6EB",
            description: "默认边框与分隔线。",
          },
          {
            name: "color.text.primary",
            value: "rgba(0,0,0,0.88)",
            description: "正文与标题文本。",
          },
          {
            name: "color.neutral.gray-4",
            value: neutralGroup.swatches[3]?.display ?? "#E5E6EB",
            description: "中性灰阶 — 常用边框色。",
          },
        ]}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <p className="text-sm text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/tokens</code>{" "}
          导入色阶与完整色板数据。
        </p>
        <CodeBlock
          code={`import {
  brandPrimary,
  functionalColors,
  neutralGray,
  colorScaleGroups,
  colorPaletteGroups,
} from "@yd-ds/tokens";

// 品牌主色阶
const primary = brandPrimary[6]; // #165DFF

// 功能语义色
const success = functionalColors.success;

// 完整色板（含 Border / Text / Success 状态 / Accent 等）
colorPaletteGroups.forEach((group) => {
  console.log(group.title, group.swatches.length);
});`}
        />
        <CodeBlock
          code={`/* 主题 CSS 变量（由 @yd-ds/themes 注入） */
.button-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.text-secondary {
  color: rgba(0, 0, 0, 0.65); /* color.text.secondary */
}`}
        />
      </section>
    </div>
  );
}
