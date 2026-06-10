"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { DesignTokenShowcase } from "@/components/docs/design-token-showcase";
import {
  BADGE_CODE_EXAMPLE,
  BADGE_DESIGN_TOKENS,
  BADGE_INTRO,
  BADGE_USAGE_TOKEN_NAMES,
} from "@/lib/data/badgeMock";
import {
  BadgeBusinessShowcase,
  BadgeCountShowcase,
  BadgeDotShowcase,
  BadgePaletteShowcase,
  BadgeRibbonShowcase,
  BadgeSizesShowcase,
  BadgeStatusShowcase,
} from "./badge-showcase";

const BADGE_API_ROWS: ApiTableRow[] = [
  {
    prop: "type",
    type: `"dot" | "count" | "status" | "ribbon"`,
    default: "自动推断",
    description: "徽标类型。有 count 默认为 count，有 text 默认为 status。",
  },
  {
    prop: "status",
    type: `"default" | "primary" | "success" | "warning" | "danger" | "info"`,
    default: `"danger"`,
    description: "语义色。",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "尺寸：16px / 18px / 20px 胶囊高度。",
  },
  {
    prop: "count",
    type: "number",
    description: "数字徽标计数值。",
  },
  {
    prop: "maxCount",
    type: "number",
    default: "99",
    description: "最大显示值，超出显示 overflowCount。",
  },
  {
    prop: "overflowCount",
    type: "string",
    default: `"99+"`,
    description: "溢出文案。",
  },
  {
    prop: "showZero",
    type: "boolean",
    default: "false",
    description: "count 为 0 时是否展示。",
  },
  {
    prop: "dot",
    type: "boolean",
    default: "false",
    description: "强制圆点模式，忽略 count。",
  },
  {
    prop: "pulse",
    type: "boolean",
    default: "false",
    description: "圆点呼吸动画，用于新告警提醒。",
  },
  {
    prop: "text",
    type: "string",
    description: "status / ribbon 模式文案。",
  },
  {
    prop: "children",
    type: "ReactNode",
    description: "附着宿主（图标、按钮等），徽标偏移至右上角。",
  },
];

const BADGE_PRESET_API_ROWS: ApiTableRow[] = [
  {
    prop: "RectificationBadge",
    type: "component",
    description: "待整改数量，默认 warning。支持 showLabel 展示「待整改」文案。",
  },
  {
    prop: "RiskBadge",
    type: "component",
    description: "风险数量，level: high / medium / low 映射语义色。",
  },
  {
    prop: "InspectionBadge",
    type: "component",
    description: "巡检数量，variant: pending（待巡检）/ overdue（已逾期）。",
  },
  {
    prop: "NotificationBadge",
    type: "component",
    description: "告警未读数，默认 danger，支持 unread 与 pulse。",
  },
];

export default function BadgePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Badge" description={BADGE_INTRO} />

      <BadgePaletteShowcase />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">数字徽标</h2>
        <BadgeCountShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">红点徽标</h2>
        <BadgeDotShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">状态徽标</h2>
        <BadgeStatusShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">丝带徽标</h2>
        <p className="text-sm text-muted-foreground">
          Arco / Ant Ribbon 风格：右下 6px clip 切角、左下折线阴影、轻量悬浮感；悬挂 right: -4px。
        </p>
        <BadgeRibbonShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">尺寸规格</h2>
        <BadgeSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">云盯业务示例</h2>
        <BadgeBusinessShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">属性说明</h2>
        <h3 className="text-lg font-semibold tracking-tight">Badge</h3>
        <ApiTable rows={BADGE_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">业务预设</h3>
        <ApiTable rows={BADGE_PRESET_API_ROWS} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={BADGE_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/badge</code> 引入。
        </p>
      </section>

      <DesignTokenShowcase title="设计规范" tokens={[...BADGE_DESIGN_TOKENS]} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token 引用</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {BADGE_USAGE_TOKEN_NAMES.map((token) => (
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
