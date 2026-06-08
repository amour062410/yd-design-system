"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  UPLOAD_CODE_EXAMPLE,
  UPLOAD_INTRO,
  UPLOAD_USAGE_TOKEN_NAMES,
} from "@/lib/data/uploadMock";
import {
  UploadAvatarShowcase,
  UploadBasicShowcase,
  UploadDarkModeShowcase,
  UploadDisabledShowcase,
  UploadDragShowcase,
  UploadPictureCardShowcase,
  UploadPictureShowcase,
  UploadProgressShowcase,
} from "./upload-showcase";

export default function UploadPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Upload" description={UPLOAD_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Basic Upload</h2>
        <p className="text-sm text-muted-foreground">
          文本列表形态，适合文档、附件上传。
        </p>
        <UploadBasicShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Drag Upload</h2>
        <p className="text-sm text-muted-foreground">
          拖拽区域上传，支持批量文件。
        </p>
        <UploadDragShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Picture Upload</h2>
        <p className="text-sm text-muted-foreground">
          图文列表与图片卡片两种图片展示形态。
        </p>
        <UploadPictureShowcase />
        <UploadPictureCardShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Avatar Upload</h2>
        <p className="text-sm text-muted-foreground">
          圆形头像上传，通常限制单张图片。
        </p>
        <UploadAvatarShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Disabled</h2>
        <p className="text-sm text-muted-foreground">
          禁用态不可触发选择与拖拽。
        </p>
        <UploadDisabledShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Upload Progress</h2>
        <p className="text-sm text-muted-foreground">
          上传中进度条、成功与失败状态反馈。
        </p>
        <UploadProgressShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Dark Mode Preview</h2>
        <UploadDarkModeShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={UPLOAD_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/upload</code> 引入。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {UPLOAD_USAGE_TOKEN_NAMES.map((token) => (
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
