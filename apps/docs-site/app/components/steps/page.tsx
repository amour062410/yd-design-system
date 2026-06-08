"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  STEPS_CODE_EXAMPLE,
  STEPS_DECISION_GUIDE,
  STEPS_INTRO,
  STEPS_OVERVIEW_POINTS,
  STEPS_USAGE_TOKEN_NAMES,
} from "@/lib/data/stepsMock";
import {
  StepsBasicShowcase,
  StepsBusinessShowcase,
  StepsHorizontalShowcase,
  StepsIconShowcase,
  StepsInspectionShowcase,
  StepsRectificationShowcase,
  StepsStatusShowcase,
  StepsVerticalShowcase,
} from "./steps-showcase";

const STEPS_API_ROWS: ApiTableRow[] = [
  { prop: "current", type: "number", default: "0", description: "当前步骤索引，从 0 开始" },
  {
    prop: "status",
    type: '"wait" | "process" | "finish" | "error" | "warning"',
    description: "当前步骤状态，如 error 时当前步显示错误图标",
  },
  {
    prop: "direction",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "步骤条方向",
  },
  {
    prop: "size",
    type: '"small" | "middle" | "large"',
    default: '"middle"',
    description: "步骤条尺寸",
  },
  {
    prop: "items",
    type: "StepItem[]",
    description: "步骤数据，含 title / description / subTitle / icon / status",
  },
  { prop: "onChange", type: "(current: number) => void", description: "点击步骤时回调" },
];

const STEP_ITEM_ROWS: ApiTableRow[] = [
  { prop: "title", type: "ReactNode", description: "步骤标题" },
  { prop: "description", type: "ReactNode", description: "步骤描述" },
  { prop: "subTitle", type: "ReactNode", description: "副标题，如时间戳" },
  { prop: "icon", type: "ReactNode", description: "自定义图标，覆盖状态默认图标" },
  {
    prop: "status",
    type: "StepStatus",
    description: "单步状态，未设置时由 current 推导",
  },
  { prop: "disabled", type: "boolean", description: "禁用点击" },
];

const BUSINESS_PRESET_ROWS: ApiTableRow[] = [
  { prop: "InspectionSteps", type: "component", description: "创建任务 → 执行巡检 → 提交结果 → 完成归档" },
  { prop: "RectificationSteps", type: "component", description: "待整改 → 整改中 → 待复检 → 已完成" },
  { prop: "StoreSetupSteps", type: "component", description: "创建门店 → 配置人员 → 配置巡检 → 正式上线" },
  { prop: "ReportGenerateSteps", type: "component", description: "选择范围 → 数据汇总 → 生成报告 → 导出分享" },
];

export default function StepsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Steps
        </h1>
        <p
          className="text-[14px] text-[#86909c]"
          style={{ lineHeight: 1.8 }}
        >
          {STEPS_INTRO}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129] mb-4">
          Overview
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {STEPS_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <StepsBasicShowcase />
      <StepsHorizontalShowcase />
      <StepsVerticalShowcase />
      <StepsStatusShowcase />
      <StepsIconShowcase />
      <StepsInspectionShowcase />
      <StepsRectificationShowcase />
      <StepsBusinessShowcase />

      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          设计规范
        </h2>
        <p className="text-sm text-muted-foreground">
          Steps、Progress、Timeline 职责分离，避免在同一流程中混用造成信息冗余。
        </p>
        <div className="overflow-x-auto rounded-[6px] border-[#e5e6eb] border bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">组件</th>
                <th className="px-4 py-3 font-medium">何时使用</th>
                <th className="px-4 py-3 font-medium">云盯示例</th>
                <th className="px-4 py-3 font-medium">避免</th>
              </tr>
            </thead>
            <tbody>
              {STEPS_DECISION_GUIDE.map((row) => (
                <tr key={row.component} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.component}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.when}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.examples}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          API
        </h2>
        <ApiTable rows={STEPS_API_ROWS} />
        <h3 className="text-lg font-medium">StepItem</h3>
        <ApiTable rows={STEP_ITEM_ROWS} />
        <h3 className="text-lg font-medium">Business Presets</h3>
        <ApiTable rows={BUSINESS_PRESET_ROWS} />
      </section>

      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Development Usage
        </h2>
        <CopyCodeBlock
          code={STEPS_CODE_EXAMPLE}
          className="bg-[#f7f8fa] border-[#e5e6eb] rounded-[6px]"
        />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/steps</code> 引入。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Token Usage
        </h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制，深浅主题见 showcase-tokens.css。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {STEPS_USAGE_TOKEN_NAMES.map((token) => (
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
      >
        已复制 {copied}
      </div>
    </div>
  );
}
