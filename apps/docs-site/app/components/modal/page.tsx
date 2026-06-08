"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  MODAL_CODE_EXAMPLE,
  MODAL_INTRO,
  MODAL_USAGE,
  MODAL_USAGE_TOKEN_NAMES,
  MODAL_WHEN_NOT_TO_USE,
  MODAL_WHEN_TO_USE,
} from "@/lib/data/modalMock";
import { ModalPageNav } from "./modal-page-nav";
import {
  ModalBasicShowcase,
  ModalConfirmShowcase,
  ModalCustomFooterShowcase,
  ModalCustomHeaderShowcase,
  ModalErrorShowcase,
  ModalLoadingShowcase,
  ModalSuccessShowcase,
  InteractiveDefaultModal,
  ModalBestPracticeShowcase,
  ModalBusinessPatternsShowcase,
  ModalContentPatternsShowcase,
  ModalDesignSpecShowcase,
  ModalFigmaShowcase,
  ModalFooterPatternsShowcase,
  ModalFullscreenShowcase,
  ModalPartsPreview,
  ModalPatternShowcase,
  ModalPatternSpecShowcase,
  ModalSizesShowcase,
  ModalStatesShowcase,
  ModalTypesShowcase,
} from "./modal-showcase";

const MODAL_API: ApiTableRow[] = [
  { prop: "open", type: "boolean", default: "false", description: "是否显示对话框。" },
  { prop: "onClose", type: "() => void", description: "关闭回调（遮罩 / 关闭按钮）。" },
  {
    prop: "size",
    type: `"sm" | "md" | "lg" | "xl" | "fullscreen"`,
    default: "lg",
    description: "sm 400 · md 600 · lg 800 · xl 1000 · fullscreen 全屏。",
  },
  {
    prop: "type",
    type: `"default" | "info" | "success" | "warning" | "error"`,
    default: "default",
    description: "业务类型，影响 Header 图标。",
  },
  { prop: "title", type: "ReactNode", description: "标题。" },
  { prop: "maskClosable", type: "boolean", default: "true", description: "点击遮罩是否关闭。" },
  { prop: "keyboard", type: "boolean", default: "true", description: "按 Esc 是否关闭。" },
  { prop: "destroyOnClose", type: "boolean", default: "true", description: "关闭后是否销毁子节点。" },
  { prop: "loading", type: "boolean", default: "false", description: "内容区 Loading 遮罩。" },
  { prop: "header", type: "ReactNode", description: "自定义 Header（替代 title + 默认 Header）。" },
  { prop: "footer", type: "ReactNode", description: "自定义 Footer。" },
  { prop: "previewHeight", type: "string", description: "inline + fullscreen 文档预览高度。" },
  { prop: "inline", type: "boolean", description: "文档静态预览，不挂载 Portal。" },
];

const MODAL_COMPOSED_API: ApiTableRow[] = [
  { prop: "ConfirmModal", type: "component", description: "Delete / Warning / 状态确认框。" },
  { prop: "FormModal", type: "component", description: "新增 / 编辑表单对话框。" },
  { prop: "DetailModal", type: "component", description: "只读详情对话框。" },
  { prop: "UploadModal", type: "component", description: "附件 / 证照上传。" },
  { prop: "ApprovalModal", type: "component", description: "审批意见 + 驳回 / 通过。" },
  { prop: "FullscreenModal", type: "component", description: "全屏复杂配置。" },
  { prop: "ModalHeader", type: "component", description: "标题区 + 关闭按钮 / 状态图标。" },
  { prop: "ModalBody", type: "component", description: "内容区，fullscreen 时可滚动。" },
  { prop: "ModalFooter", type: "component", description: "底部按钮区，支持 loading / disabled / danger。" },
];

export default function ModalPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Modal" description={MODAL_INTRO} />

      <section id="modal-basic" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Basic</h2>
        <ModalBasicShowcase />
      </section>

      <section id="modal-confirm" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Confirm</h2>
        <ModalConfirmShowcase />
      </section>

      <section id="modal-success" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Success</h2>
        <ModalSuccessShowcase />
      </section>

      <section id="modal-error" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Error</h2>
        <ModalErrorShowcase />
      </section>

      <section id="modal-loading" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Loading</h2>
        <ModalLoadingShowcase />
      </section>

      <section id="modal-custom-footer" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Custom Footer</h2>
        <ModalCustomFooterShowcase />
      </section>

      <section id="modal-custom-header" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Custom Header</h2>
        <ModalCustomHeaderShowcase />
      </section>

      <ModalPageNav />

      <section id="modal-usage" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{MODAL_USAGE}</p>
        <InteractiveDefaultModal />
        <ModalPartsPreview />
      </section>

      <section id="modal-when-to-use" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">When To Use</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border bg-card px-6 py-5">
            <p className="mb-3 text-sm font-medium text-foreground">适用场景</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {MODAL_WHEN_TO_USE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[color:var(--modal-success-color)]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-card px-6 py-5">
            <p className="mb-3 text-sm font-medium text-foreground">不适用场景</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {MODAL_WHEN_NOT_TO_USE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[color:var(--modal-error-color)]">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="modal-best-practice" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Best Practice</h2>
        <p className="text-sm text-muted-foreground">
          Modal 与 Drawer 的选型指南 — 何时居中阻断，何时侧边滑出。
        </p>
        <ModalBestPracticeShowcase />
      </section>

      <section id="modal-showcase" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Modal Showcase</h2>
        <p className="text-sm text-muted-foreground">
          设计稿全部状态，内容区使用真实业务文案与表单字段。
        </p>
        <ModalFigmaShowcase />
      </section>

      <section id="modal-sizes" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Modal Sizes</h2>
        <p className="text-sm text-muted-foreground">
          Small 400px · Medium 600px · Large 800px · Extra Large 1000px。
        </p>
        <ModalSizesShowcase />
      </section>

      <section id="modal-fullscreen" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Fullscreen Modal</h2>
        <p className="text-sm text-muted-foreground">
          企业后台复杂配置：多区块表单、可滚动 Body、calc(100vw - 48px) 全屏宽度。
        </p>
        <ModalFullscreenShowcase />
      </section>

      <section id="modal-types" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Modal Types</h2>
        <p className="text-sm text-muted-foreground">
          Default、Info、Success、Warning、Error 五种业务类型。
        </p>
        <ModalTypesShowcase />
      </section>

      <section id="modal-states" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Modal States</h2>
        <p className="text-sm text-muted-foreground">
          Default、Hover、Loading、Disabled 按钮态。
        </p>
        <ModalStatesShowcase />
      </section>

      <section id="modal-footer-patterns" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Footer Patterns</h2>
        <p className="text-sm text-muted-foreground">
          单按钮、双按钮、危险操作、自定义 Footer。
        </p>
        <ModalFooterPatternsShowcase />
      </section>

      <section id="modal-content-patterns" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Content Patterns</h2>
        <p className="text-sm text-muted-foreground">
          文本、表单、详情、复杂全屏内容 — 无大面积 Slot 占位。
        </p>
        <ModalContentPatternsShowcase />
      </section>

      <section id="modal-patterns" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Modal Pattern</h2>
        <p className="text-sm text-muted-foreground">
          YD Design System 业务模式沉淀：Delete / Form / Detail / Upload / Approval / Warning / Fullscreen。
        </p>
        <ModalPatternShowcase />
      </section>

      <section id="modal-pattern-spec" className="scroll-mt-24 space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">Modal Pattern Spec</h3>
        <p className="text-sm text-muted-foreground">
          各 Pattern 推荐尺寸、Footer 组合与适用场景。
        </p>
        <ModalPatternSpecShowcase />
      </section>

      <section id="modal-interactive" className="scroll-mt-24 space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">Interactive Demo</h3>
        <p className="text-sm text-muted-foreground">
          Portal 模式真实业务对话框，可实际操作关闭与提交。
        </p>
        <ModalBusinessPatternsShowcase />
      </section>

      <section id="modal-design-spec" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Design Spec</h2>
        <p className="text-sm text-muted-foreground">
          Structure、Spacing、Shadow、Motion、Mask、Header、Body、Footer。
        </p>
        <ModalDesignSpecShowcase />
      </section>

      <section id="modal-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <ApiTable rows={MODAL_API} />
        <h3 className="pt-4 text-lg font-semibold">组合组件</h3>
        <ApiTable rows={MODAL_COMPOSED_API} />
      </section>

      <section id="modal-dev" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={MODAL_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/modal</code> 引入业务对话框组件。
        </p>
      </section>

      <section id="modal-tokens" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODAL_USAGE_TOKEN_NAMES.map((token) => (
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
