"use client";

import { Upload, UploadShowcase } from "@yd-ds/ui/upload";
import {
  UPLOAD_AVATAR_DEMO,
  UPLOAD_BASIC_DEMO,
  UPLOAD_DRAG_DEMO,
  UPLOAD_PICTURE_CARD_DEMO,
  UPLOAD_PICTURE_DEMO,
  UPLOAD_PROGRESS_DEMO,
} from "@/lib/data/uploadMock";

export function UploadBasicShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">
        静态规格 · 文本列表（上传中 / 成功 / 失败）
      </p>
      <UploadShowcase listType="text" files={UPLOAD_BASIC_DEMO} />
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 点击选择文件</p>
        <Upload listType="text" multiple accept="image/*,.pdf" />
      </div>
    </div>
  );
}

export function UploadDragShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格 · 拖拽上传区</p>
      <UploadShowcase dragger files={UPLOAD_DRAG_DEMO} />
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 拖拽或点击上传</p>
        <Upload dragger multiple />
      </div>
    </div>
  );
}

export function UploadPictureShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格 · 图文列表</p>
      <UploadShowcase listType="picture" files={UPLOAD_PICTURE_DEMO} />
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 图片列表</p>
        <Upload listType="picture" accept="image/*" multiple />
      </div>
    </div>
  );
}

export function UploadPictureCardShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格 · 图片卡片网格</p>
      <UploadShowcase listType="picture-card" files={UPLOAD_PICTURE_CARD_DEMO} />
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 最多 4 张</p>
        <Upload
          listType="picture-card"
          accept="image/*"
          multiple
          maxCount={4}
        />
      </div>
    </div>
  );
}

export function UploadAvatarShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格 · 圆形头像上传</p>
      <UploadShowcase avatar files={UPLOAD_AVATAR_DEMO} />
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 单张头像</p>
        <Upload avatar accept="image/*" maxCount={1} />
      </div>
    </div>
  );
}

export function UploadDisabledShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs text-muted-foreground">Basic · Disabled</p>
          <UploadShowcase
            listType="text"
            disabled
            files={UPLOAD_BASIC_DEMO.slice(0, 1)}
          />
        </div>
        <div>
          <p className="mb-3 text-xs text-muted-foreground">Drag · Disabled</p>
          <div className="pointer-events-none opacity-60">
            <UploadShowcase dragger files={[]} />
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs text-muted-foreground">Picture Card · Disabled</p>
          <UploadShowcase
            listType="picture-card"
            disabled
            files={UPLOAD_PICTURE_CARD_DEMO.slice(0, 1)}
          />
        </div>
        <div>
          <p className="mb-3 text-xs text-muted-foreground">Avatar · Disabled</p>
          <UploadShowcase avatar disabled files={UPLOAD_AVATAR_DEMO} />
        </div>
      </div>
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-3 text-xs text-muted-foreground">可交互组件 disabled</p>
        <Upload listType="text" disabled buttonText="上传文件" />
      </div>
    </div>
  );
}

export function UploadProgressShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">
        上传进度 · 文本列表 / 图文列表 / 图片卡片
      </p>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-[11px] text-muted-foreground">Text</p>
          <UploadShowcase listType="text" files={UPLOAD_PROGRESS_DEMO} />
        </div>
        <div>
          <p className="mb-3 text-[11px] text-muted-foreground">Picture</p>
          <UploadShowcase
            listType="picture"
            files={UPLOAD_PROGRESS_DEMO.map((f, i) => ({
              ...f,
              uid: `pp-${i}`,
              thumbUrl: i === 0 ? UPLOAD_PICTURE_DEMO[0]?.thumbUrl : undefined,
            }))}
          />
        </div>
        <div className="lg:col-span-2">
          <p className="mb-3 text-[11px] text-muted-foreground">Picture Card</p>
          <UploadShowcase
            listType="picture-card"
            files={UPLOAD_PROGRESS_DEMO.map((f, i) => ({
              ...f,
              uid: `pc-${i}`,
            }))}
          />
        </div>
      </div>
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">
          可交互 · 选择文件后模拟上传进度
        </p>
        <Upload listType="text" multiple />
      </div>
    </div>
  );
}

export function UploadDarkModeShowcase() {
  return (
    <div className="dark rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-6 text-xs text-muted-foreground">Dark Mode 预览</p>
      <div className="grid gap-10 lg:grid-cols-2">
        <Upload listType="text" multiple accept="image/*,.pdf" />
        <Upload dragger />
      </div>
    </div>
  );
}
