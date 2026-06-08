import { Download, Plus } from "lucide-react";
import { Button } from "@yd-ds/ui";
import { primitiveColors } from "@yd-ds/tokens";
import { ComponentPreview } from "@/components/component-preview";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { DesignTokenShowcase } from "@/components/docs/design-token-showcase";

const buttonApiRows: ApiTableRow[] = [
  {
    prop: "variant",
    type: `"default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "dashed"`,
    default: `"default"`,
    description: "按钮视觉样式变体。",
  },
  {
    prop: "size",
    type: `"default" | "sm" | "lg" | "icon"`,
    default: `"default"`,
    description: "按钮尺寸，icon 用于仅图标场景。",
  },
  {
    prop: "loading",
    type: "boolean",
    default: "false",
    description: "加载状态，显示旋转指示器并禁用交互。",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "禁用按钮。",
  },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "将按钮样式合并到子元素（如 Link）上。",
  },
  {
    prop: "className",
    type: "string",
    description: "附加 Tailwind 类名。",
  },
];

export default function ButtonPage() {
  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Button"
        description="企业级操作按钮，支持多种变体、尺寸、加载与禁用状态，品牌色 #165DFF，圆角 6px，亮/暗主题自适应。"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <CodeBlock
          code={`import { Button } from "@yd-ds/ui";

export function Example() {
  return <Button>提交</Button>;
}`}
        />
      </section>

      <ComponentPreview
        title="基础用法"
        description="主按钮用于页面主操作，次按钮用于次要操作。"
      >
        <Button>主按钮</Button>
        <Button variant="secondary">次按钮</Button>
        <Button variant="outline">线框按钮</Button>
      </ComponentPreview>

      <ComponentPreview title="变体 Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="dashed">Dashed</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </ComponentPreview>

      <ComponentPreview title="尺寸 Sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="添加">
          <Plus />
        </Button>
      </ComponentPreview>

      <ComponentPreview title="图标按钮">
        <Button>
          <Download />
          下载
        </Button>
        <Button variant="outline">
          <Plus />
          新建
        </Button>
      </ComponentPreview>

      <ComponentPreview title="加载与禁用">
        <Button loading>加载中</Button>
        <Button variant="outline" loading>
          提交中
        </Button>
        <Button disabled>已禁用</Button>
      </ComponentPreview>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <p className="text-sm text-muted-foreground">
          继承原生 <code className="rounded bg-muted px-1">button</code>{" "}
          元素属性，并通过 <code className="rounded bg-muted px-1">ButtonProps</code>{" "}
          扩展变体与加载能力。
        </p>
        <ApiTable rows={buttonApiRows} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Props 类型</h2>
        <CodeBlock
          code={`export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}`}
        />
      </section>

      <DesignTokenShowcase
        tokens={[
          {
            name: "brand.500 / --primary",
            value: primitiveColors.brand[500],
            description: "主按钮背景与链接色，品牌主色。",
          },
          {
            name: "radius.md",
            value: "6px",
            description: "按钮圆角，对应 Tailwind rounded-md。",
          },
          {
            name: "--ring",
            value: "hsl(224 100% 54%)",
            description: "聚焦环颜色，与品牌色一致。",
          },
          {
            name: "--destructive",
            value: "语义危险色",
            description: "危险操作按钮背景。",
          },
        ]}
      />
    </div>
  );
}
