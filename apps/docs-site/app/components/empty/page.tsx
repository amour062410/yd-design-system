"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { DesignTokenShowcase } from "@/components/docs/design-token-showcase";
import {
  EMPTY_CODE_EXAMPLE,
  EMPTY_DECISION_GUIDE,
  EMPTY_DESIGN_TOKENS,
  EMPTY_INTRO,
  EMPTY_OVERVIEW_POINTS,
  EMPTY_USAGE_TOKEN_NAMES,
} from "@/lib/data/emptyMock";
import {
  EmptyBasicShowcase,
  EmptyBusinessHeroShowcase,
  EmptyBusinessSceneShowcase,
  EmptyExceptionSceneShowcase,
  EmptyGeneralSceneShowcase,
  EmptyIllustrationGalleryShowcase,
  EmptyPlacementShowcase,
  EmptyReferenceShowcase,
} from "./empty-showcase";

const EMPTY_API_ROWS: ApiTableRow[] = [
  {
    prop: "type",
    type: "EmptyType",
    default: `"default"`,
    description:
      "预设类型，自动匹配 title、description 与 illustration。业务场景优先使用 inspection / rectification / risk 等。",
  },
  { prop: "title", type: "ReactNode", description: "标题，覆盖 type 预设。" },
  { prop: "description", type: "ReactNode", description: "描述，覆盖 type 预设。" },
  { prop: "image", type: "ReactNode", description: "自定义插画，覆盖 type 默认插画。" },
  { prop: "children", type: "ReactNode", description: "底部操作区，如重试、新建按钮。" },
];

const EMPTY_TYPE_ROWS: ApiTableRow[] = [
  { prop: "inspection", type: "business", description: "暂无巡检任务" },
  { prop: "rectification", type: "business", description: "暂无整改任务" },
  { prop: "risk", type: "business", description: "暂无风险告警" },
  { prop: "store", type: "business", description: "暂无门店数据" },
  { prop: "device", type: "business", description: "暂无设备数据" },
  { prop: "default", type: "general", description: "通用空状态" },
  { prop: "search", type: "general", description: "搜索无结果" },
  { prop: "filter", type: "general", description: "筛选无结果" },
  { prop: "folder", type: "general", description: "暂无内容" },
  { prop: "document", type: "general", description: "暂无文档 / 历史记录" },
  { prop: "communication", type: "reference", description: "参考稿 · Communication Empty · 沟通空状态" },
  { prop: "task", type: "reference", description: "参考稿 · Task Empty · 任务空状态" },
  { prop: "network", type: "reference / exception", description: "参考稿 · Network Empty · 网络异常" },
  { prop: "offline", type: "exception", description: "服务离线" },
  { prop: "permission", type: "exception", description: "暂无权限" },
  { prop: "error", type: "exception", description: "加载失败" },
];

export default function EmptyPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Empty" description={EMPTY_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {EMPTY_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">参考稿原型</h2>
        <p className="text-sm text-muted-foreground">
          你提供的 Communication / Task / Network 三张 SVG 是整套 Empty 插画的视觉源，对应{" "}
          <code className="rounded bg-muted px-1">type=&quot;communication&quot;</code>、
          <code className="rounded bg-muted px-1">task</code>、
          <code className="rounded bg-muted px-1">network</code>。
        </p>
        <EmptyReferenceShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Business Empty Showcase</h2>
        <p className="text-sm text-muted-foreground">
          云盯后台核心空状态，以大尺寸卡片呈现，作为页面 Hero 区参考实现。
        </p>
        <EmptyBusinessHeroShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">基础用法</h2>
        <EmptyBasicShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">业务场景</h2>
        <p className="text-sm text-muted-foreground">
          云盯巡检、整改、风险、门店、设备等业务模块推荐预设。
        </p>
        <EmptyBusinessSceneShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">通用场景</h2>
        <p className="text-sm text-muted-foreground">
          列表、搜索、筛选、文件夹、文档与历史记录等通用空态。
        </p>
        <EmptyGeneralSceneShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">异常场景</h2>
        <p className="text-sm text-muted-foreground">
          网络、离线、权限与加载失败，需配合重试或返回操作。
        </p>
        <EmptyExceptionSceneShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Empty 使用场景</h2>
        <p className="text-sm text-muted-foreground">
          通过模拟页面容器，说明 Empty 在表格、列表、搜索与异常态中的放置位置。
        </p>
        <EmptyPlacementShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Empty Decision Guide</h2>
        <p className="text-sm text-muted-foreground">
          明确 Empty 与 Skeleton、Result、Alert 的边界，避免组件职责重叠。
        </p>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-semibold">组件</th>
                <th className="px-4 py-3 font-semibold">使用时机</th>
                <th className="px-4 py-3 font-semibold">示例场景</th>
                <th className="px-4 py-3 font-semibold">不适用</th>
              </tr>
            </thead>
            <tbody>
              {EMPTY_DECISION_GUIDE.map((row) => (
                <tr key={row.component} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.component}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.when}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.example}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Illustration Gallery</h2>
        <p className="text-sm text-muted-foreground">
          按业务 / 通用 / 异常分类的插画索引。卡片宽 300px，插画 120–140px。
        </p>
        <EmptyIllustrationGalleryShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <h3 className="text-lg font-semibold tracking-tight">属性说明</h3>
        <ApiTable rows={EMPTY_API_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">type 预设</h3>
        <ApiTable rows={EMPTY_TYPE_ROWS} />
        <h3 className="pt-4 text-lg font-semibold tracking-tight">代码示例</h3>
        <CopyCodeBlock code={EMPTY_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/empty</code> 引入。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">设计规范</h2>
        <DesignTokenShowcase title="设计 Token" tokens={[...EMPTY_DESIGN_TOKENS]} />
        <div className="grid gap-3 sm:grid-cols-2">
          {EMPTY_USAGE_TOKEN_NAMES.map((token) => (
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
