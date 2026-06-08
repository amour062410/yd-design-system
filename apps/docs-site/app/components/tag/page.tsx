"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { DesignTokenShowcase } from "@/components/docs/design-token-showcase";
import {
  TAG_CODE_EXAMPLE,
  TAG_DESIGN_TOKENS,
  TAG_INTRO,
  TAG_USAGE_TOKEN_NAMES,
} from "@/lib/data/tagMock";
import {
  TagBusinessShowcase,
  TagClosableShowcase,
  TagGroupShowcase,
  TagIconShowcase,
  TagPaletteShowcase,
  TagSegmentedShowcase,
  TagSizesShowcase,
} from "./tag-showcase";

const TAG_API_ROWS: ApiTableRow[] = [
  {
    prop: "variant",
    type: `"solid" | "light" | "outline"`,
    default: `"outline"`,
    description: "视觉变体。基础组件默认描边，保持中立。",
  },
  {
    prop: "status",
    type: `"primary" | "success" | "warning" | "danger" | "info" | "default"`,
    default: `"default"`,
    description: "语义色状态。",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "尺寸规格：24px / 28px / 32px。",
  },
  {
    prop: "icon",
    type: "ReactNode",
    description: "前置图标。",
  },
  {
    prop: "closable",
    type: "boolean",
    default: "false",
    description: "是否可关闭。",
  },
  {
    prop: "onClose",
    type: "() => void",
    description: "关闭回调。",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "禁用状态。",
  },
];

const TAG_GROUP_API_ROWS: ApiTableRow[] = [
  {
    prop: "mode",
    type: `"none" | "single" | "multiple" | "segmented"`,
    default: `"none"`,
    description: "标签组模式。segmented 用于分段选择器。",
  },
  {
    prop: "items",
    type: "{ value, label, count?, status?, disabled? }[]",
    description: "选项列表，count 用于分段选择器数量展示。",
  },
  {
    prop: "value",
    type: "string | string[]",
    description: "受控选中值。",
  },
  {
    prop: "defaultValue",
    type: "string | string[]",
    description: "非受控默认值。",
  },
  {
    prop: "onChange",
    type: "(value: string | string[]) => void",
    description: "选中变化回调。",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "标签尺寸，分段选择器推荐 lg。",
  },
  {
    prop: "scrollable",
    type: "boolean",
    default: "false",
    description: "横向滚动。",
  },
];

const TAG_PRESET_API_ROWS: ApiTableRow[] = [
  {
    prop: "InspectionStatusTag",
    type: "component",
    description: "巡检任务状态：待开始 / 进行中 / 已完成 / 已逾期 / 已取消。",
  },
  {
    prop: "RiskLevelTag",
    type: "component",
    description: "门店风险等级：高 / 中 / 低。",
  },
  {
    prop: "StoreStatusTag",
    type: "component",
    description: "门店经营状态：营业中 / 停业 / 整改中 / 风险门店 / 未上线。",
  },
];

export default function TagPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Tag" description={TAG_INTRO} />

      <TagPaletteShowcase />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">尺寸规格</h2>
        <TagSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">可关闭标签</h2>
        <TagClosableShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">图标标签</h2>
        <TagIconShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">标签组</h2>
        <TagGroupShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">分段选择器</h2>
        <TagSegmentedShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">巡检业务标签</h2>
        <TagBusinessShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">属性说明</h2>
        <h3 className="text-lg font-semibold tracking-tight">Tag</h3>
        <ApiTable rows={TAG_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">TagGroup</h3>
        <ApiTable rows={TAG_GROUP_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">业务预设</h3>
        <ApiTable rows={TAG_PRESET_API_ROWS} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={TAG_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/tag</code> 引入。
        </p>
      </section>

      <DesignTokenShowcase
        title="设计规范"
        tokens={[...TAG_DESIGN_TOKENS]}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token 引用</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TAG_USAGE_TOKEN_NAMES.map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => copyToken(token)}
              className="rounded-md border bg-card px-4 py-3 text-left transition-colors hover:border-primary/30"
            >
              <span className="font-mono text-sm text-primary">{token}</span>
            </button>
          ))}
        </div>
      </section>

      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200",
          copied ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="status"
      >
        已复制 Token：{copied}
      </div>
    </div>
  );
}
