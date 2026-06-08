"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { DesignTokenShowcase } from "@/components/docs/design-token-showcase";
import {
  STATISTIC_CODE_EXAMPLE,
  STATISTIC_DESIGN_TOKENS,
  STATISTIC_INTRO,
  STATISTIC_USAGE_TOKEN_NAMES,
} from "@/lib/data/statisticMock";
import {
  StatisticBasicShowcase,
  StatisticCockpitShowcase,
  StatisticCurrencyShowcase,
  StatisticGroupShowcase,
  StatisticKpiCardShowcase,
  StatisticLoadingShowcase,
  StatisticPercentShowcase,
  StatisticTrendShowcase,
} from "./statistic-showcase";

const STATISTIC_API_ROWS: ApiTableRow[] = [
  { prop: "title", type: "ReactNode", description: "指标标题。" },
  { prop: "value", type: "string | number", description: "展示数值。" },
  { prop: "precision", type: "number", description: "小数精度。" },
  { prop: "prefix", type: "ReactNode", description: "数值前缀，如 ¥。" },
  { prop: "suffix", type: "ReactNode", description: "数值后缀，如 %。" },
  { prop: "loading", type: "boolean", default: "false", description: "骨架加载态。" },
  { prop: "valueStyle", type: "CSSProperties", description: "自定义数值样式。" },
  { prop: "trend", type: `"up" | "down"`, description: "趋势方向。" },
  { prop: "trendValue", type: "string | number", description: "趋势文案，默认追加 %。" },
];

const STATISTIC_CARD_API_ROWS: ApiTableRow[] = [
  { prop: "title", type: "ReactNode", description: "指标标题。" },
  { prop: "value", type: "string | number", description: "主数值。" },
  { prop: "precision", type: "number", description: "小数精度。" },
  { prop: "prefix", type: "ReactNode", description: "数值前缀。" },
  { prop: "suffix", type: "ReactNode", description: "数值后缀。" },
  { prop: "trend", type: `"up" | "down"`, description: "趋势方向。" },
  { prop: "trendValue", type: "string | number", description: "趋势数值，展示为 ↑12.5%。" },
  { prop: "description", type: "ReactNode", description: "辅助说明，如「较上月新增28家」。" },
  {
    prop: "status",
    type: `"primary" | "success" | "warning" | "danger"`,
    default: "primary",
    description: "状态色，影响左侧图标区配色。",
  },
  { prop: "icon", type: "ReactNode", description: "左侧图标区内容。" },
  { prop: "loading", type: "boolean", default: "false", description: "骨架加载态。" },
];

const STATISTIC_GROUP_API_ROWS: ApiTableRow[] = [
  {
    prop: "columns",
    type: "2 | 3 | 4",
    default: "4",
    description: "响应式栅格列数。",
  },
  { prop: "children", type: "Statistic[]", description: "统计项子节点。" },
];

const STATISTIC_CARD_GROUP_API_ROWS: ApiTableRow[] = [
  {
    prop: "columns",
    type: "2 | 3 | 4",
    default: "4",
    description: "KPI 指标卡响应式栅格列数。",
  },
  { prop: "children", type: "StatisticCard[]", description: "KPI 指标卡子节点。" },
];

const STATISTIC_PRESET_ROWS: ApiTableRow[] = [
  { prop: "RectificationStatistic", type: "component", description: "待整改数量，默认标题「待整改门店」。" },
  { prop: "RiskStatistic", type: "component", description: "高风险数量，数值 danger 色。" },
  { prop: "InspectionStatistic", type: "component", description: "巡检完成率，默认后缀 %。" },
  { prop: "StoreStatistic", type: "component", description: "门店总数。" },
];

export default function StatisticPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Statistic" description={STATISTIC_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">基础用法</h2>
        <StatisticBasicShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">百分比</h2>
        <StatisticPercentShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">货币</h2>
        <StatisticCurrencyShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">趋势</h2>
        <StatisticTrendShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">KPI 指标卡</h2>
        <p className="text-sm text-muted-foreground">
          企业级 KPI Card Pattern：标题 · 主数值 · 趋势 · 辅助说明。支持状态色与左侧图标区，默认 4 列栅格布局。
        </p>
        <StatisticKpiCardShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">统计组</h2>
        <StatisticGroupShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">加载状态</h2>
        <StatisticLoadingShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">云盯驾驶舱示例</h2>
        <p className="text-sm text-muted-foreground">
          模拟首页 KPI 区域：门店总数 · 已巡检门店 · 待整改问题 · 高风险门店，采用 KPI Card 组合展示。
        </p>
        <StatisticCockpitShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">属性说明</h2>
        <h3 className="text-lg font-semibold tracking-tight">Statistic</h3>
        <ApiTable rows={STATISTIC_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">StatisticCard</h3>
        <ApiTable rows={STATISTIC_CARD_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">StatisticGroup</h3>
        <ApiTable rows={STATISTIC_GROUP_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">StatisticCardGroup</h3>
        <ApiTable rows={STATISTIC_CARD_GROUP_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">业务预设</h3>
        <ApiTable rows={STATISTIC_PRESET_ROWS} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">代码示例</h2>
        <CopyCodeBlock code={STATISTIC_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/statistic</code> 引入。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">设计规范</h2>
        <DesignTokenShowcase title="设计 Token" tokens={[...STATISTIC_DESIGN_TOKENS]} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token 引用</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {STATISTIC_USAGE_TOKEN_NAMES.map((token) => (
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
