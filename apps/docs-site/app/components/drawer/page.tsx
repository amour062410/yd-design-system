"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  DRAWER_CODE_EXAMPLE,
  DRAWER_INTRO,
  DRAWER_USAGE,
  DRAWER_USAGE_TOKEN_NAMES,
  DRAWER_WHEN_TO_USE_DRAWER,
  DRAWER_WHEN_TO_USE_MODAL,
} from "@/lib/data/drawerMock";
import { DrawerPageNav } from "./drawer-page-nav";
import {
  DrawerBasicShowcase,
  DrawerCustomFooterShowcase,
  DrawerCustomHeaderShowcase,
  DrawerLoadingShowcase,
  DrawerNestedShowcase,
  DrawerPlacementShowcase,
  DrawerPushShowcase,
  DrawerAnatomyShowcase,
  DrawerBestPracticeShowcase,
  DrawerBusinessPatternsShowcase,
  DrawerDesignSpecShowcase,
  DrawerDocIntro,
  DrawerFigmaShowcase,
  DrawerSizesShowcase,
  DrawerStatesShowcase,
  DrawerVsModalShowcase,
  InteractiveBasicDrawer,
} from "./drawer-showcase";

const DRAWER_API: ApiTableRow[] = [
  { prop: "open", type: "boolean", default: "false", description: "是否显示抽屉。" },
  { prop: "onClose", type: "() => void", description: "关闭回调。" },
  {
    prop: "size",
    type: `"sm" | "md" | "lg" | "xl"`,
    default: "md",
    description: "sm 378 · md 480 · lg 640 · xl 800。",
  },
  {
    prop: "placement",
    type: `"right" | "left" | "top" | "bottom"`,
    default: "right",
    description: "滑出方向。",
  },
  { prop: "level", type: "number", default: "1", description: "多层抽屉层级，影响 z-index。" },
  { prop: "title", type: "ReactNode", description: "标题。" },
  { prop: "description", type: "ReactNode", description: "Header 描述文案。" },
  { prop: "status", type: "ReactNode", description: "Header 状态标签。" },
  {
    prop: "statusTone",
    type: `"default" | "success" | "warning" | "error" | "info"`,
    default: "default",
    description: "状态标签色调。",
  },
  { prop: "maskClosable", type: "boolean", default: "true", description: "点击遮罩关闭。" },
  { prop: "keyboard", type: "boolean", default: "true", description: "按 Esc 关闭。" },
  { prop: "destroyOnClose", type: "boolean", default: "true", description: "关闭后销毁子节点。" },
  { prop: "push", type: "boolean", default: "false", description: "推开 DrawerPushContainer 主内容。" },
  { prop: "header", type: "ReactNode", description: "自定义 Header。" },
  { prop: "showFooter", type: "boolean", default: "true", description: "是否显示 Footer。" },
  { prop: "loading", type: "boolean", description: "加载态。" },
  { prop: "empty", type: "boolean", description: "空状态。" },
  { prop: "error", type: "boolean", description: "错误态。" },
  { prop: "disabled", type: "boolean", description: "Footer 禁用。" },
];

const DRAWER_COMPOSED_API: ApiTableRow[] = [
  { prop: "DrawerHeader", type: "component", description: "标题 + 描述 + 状态 + 关闭。" },
  { prop: "DrawerBody", type: "component", description: "可滚动内容区，支持 empty / error。" },
  { prop: "DrawerFooter", type: "component", description: "取消 + 保存。" },
  { prop: "UserDetailDrawer", type: "component", description: "用户详情业务抽屉。" },
  { prop: "EditUserFormDrawer", type: "component", description: "编辑用户表单抽屉。" },
  { prop: "OrderDetailDrawer", type: "component", description: "订单详情业务抽屉。" },
  { prop: "SystemConfigDrawer", type: "component", description: "系统配置抽屉。" },
  { prop: "ApprovalDrawer", type: "component", description: "审批详情抽屉。" },
  { prop: "NestedUserDrawerFlow", type: "component", description: "三层嵌套：详情 → 编辑 → 角色。" },
  { prop: "DrawerPushContainer", type: "component", description: "Push 模式主内容包裹容器。" },
];

export default function DrawerPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Drawer" description={DRAWER_INTRO} />
      <DrawerDocIntro />

      <section id="drawer-basic" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Basic</h2>
        <DrawerBasicShowcase />
      </section>

      <section id="drawer-placement" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Placement</h2>
        <DrawerPlacementShowcase />
      </section>

      <section id="drawer-nested" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Nested</h2>
        <DrawerNestedShowcase />
      </section>

      <section id="drawer-loading" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Loading</h2>
        <DrawerLoadingShowcase />
      </section>

      <section id="drawer-custom-footer" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Custom Footer</h2>
        <DrawerCustomFooterShowcase />
      </section>

      <section id="drawer-push" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Push</h2>
        <DrawerPushShowcase />
      </section>

      <section id="drawer-custom-header" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Custom Header</h2>
        <DrawerCustomHeaderShowcase />
      </section>

      <DrawerPageNav />

      <section id="drawer-usage" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <p className="text-sm text-muted-foreground">什么时候使用 Drawer：</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {DRAWER_USAGE.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[color:var(--drawer-brand-color)]">●</span>
              {item}
            </li>
          ))}
        </ul>
        <InteractiveBasicDrawer />
      </section>

      <section id="drawer-when-to-use" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">When To Use</h2>
        <DrawerVsModalShowcase />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border bg-card px-6 py-5">
            <p className="mb-3 text-sm font-medium">Drawer</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {DRAWER_WHEN_TO_USE_DRAWER.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-card px-6 py-5">
            <p className="mb-3 text-sm font-medium">Modal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {DRAWER_WHEN_TO_USE_MODAL.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="drawer-showcase" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Drawer Showcase</h2>
        <p className="text-sm text-muted-foreground">
          全部示例为真实交互：点击按钮 Portal 打开，含 Basic / 无 Footer / 顶部 / 多层嵌套。
        </p>
        <DrawerFigmaShowcase />
      </section>

      <section id="drawer-business" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Business Patterns</h2>
        <p className="text-sm text-muted-foreground">
          用户详情 · 编辑表单 · 订单详情 · 审批详情 · 系统配置。
        </p>
        <DrawerBusinessPatternsShowcase />
      </section>

      <section id="drawer-states" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Drawer States</h2>
        <p className="text-sm text-muted-foreground">
          Tabs 切换：Default · Loading · Empty · Disabled · Error。
        </p>
        <DrawerStatesShowcase />
      </section>

      <section id="drawer-sizes" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Drawer Sizes</h2>
        <p className="text-sm text-muted-foreground">
          Small 378px · Medium 480px · Large 640px · XL 800px。
        </p>
        <DrawerSizesShowcase />
      </section>

      <section id="drawer-anatomy" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Drawer Anatomy</h2>
        <p className="text-sm text-muted-foreground">
          Header · Body · Footer · Close Button · Mask。
        </p>
        <DrawerAnatomyShowcase />
      </section>

      <section id="drawer-design-spec" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Design Spec</h2>
        <p className="text-sm text-muted-foreground">
          Width · Header / Footer Height · Padding · Radius · Shadow · Mask · Animation。
        </p>
        <DrawerDesignSpecShowcase />
      </section>

      <section id="drawer-best-practice" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Best Practice</h2>
        <p className="text-sm text-muted-foreground">Drawer · Modal · Full Page 选型指南。</p>
        <DrawerBestPracticeShowcase />
      </section>

      <section id="drawer-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <ApiTable rows={DRAWER_API} />
        <h3 className="pt-4 text-lg font-semibold">组合组件</h3>
        <ApiTable rows={DRAWER_COMPOSED_API} />
      </section>

      <section id="drawer-dev" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={DRAWER_CODE_EXAMPLE} />
      </section>

      <section id="drawer-tokens" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {DRAWER_USAGE_TOKEN_NAMES.map((token) => (
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
