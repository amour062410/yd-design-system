"use client";

import { useRef } from "react";
import { cn } from "@yd-ds/ui";
import { Button } from "@yd-ds/ui/button";
import { Link } from "@yd-ds/ui/link";
import { MessageNotice, message } from "@yd-ds/ui/message";
import { messageDesignSpecRows } from "@yd-ds/tokens";
import {
  MESSAGE_LOADING_COPY,
  MESSAGE_LONG_CONTENT,
  MESSAGE_POSITION_OPTIONS,
  MESSAGE_TYPE_SAMPLES,
  MESSAGE_WHEN_TO_USE,
} from "@/lib/data/messageMock";

function ShowcaseCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border bg-card px-6 py-8 md:px-8", className)}>
      {title ? (
        <p className="mb-1 text-sm font-medium text-foreground">{title}</p>
      ) : null}
      {description ? (
        <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

function SpecTable({
  rows,
}: {
  rows: readonly { token: string; value: string; desc: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-[color:var(--message-border-color)]">
      <table className="w-full min-w-[520px] text-left text-[13px]">
        <thead>
          <tr
            className="border-b border-[color:var(--table-header-border-color)]"
            style={{ backgroundColor: "var(--table-header-bg)" }}
          >
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              Token
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              Value
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              说明
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.token}
              className="border-b border-[color:var(--message-border-color)] last:border-0"
            >
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--message-info-color)]">
                {row.token}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--color-text-secondary)]">
                {row.value}
              </td>
              <td className="px-4 py-3 text-[color:var(--color-text-secondary)]">
                {row.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MessageOverviewShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-md border bg-card px-6 py-5">
        <p className="mb-3 text-sm font-medium text-foreground">适用场景</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {MESSAGE_WHEN_TO_USE.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[color:var(--message-success-color)]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-md border bg-card px-6 py-5">
        <p className="mb-3 text-sm font-medium text-foreground">设计要点</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>最大宽度 480px，最小高度 48px</li>
          <li>圆角 8px，阴影 0 4px 16px rgba(0,0,0,.08)</li>
          <li>默认 3s 自动消失，支持 closable 手动关闭</li>
          <li>入场动画：Fade In + Slide Down</li>
        </ul>
      </div>
    </div>
  );
}

export function MessageTypesShowcase() {
  return (
    <div className="flex flex-col gap-4">
      {MESSAGE_TYPE_SAMPLES.map((sample) => (
        <div key={sample.type} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <div className="w-28 shrink-0">
            <p className="text-sm font-medium capitalize text-foreground">{sample.type}</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{sample.color}</p>
          </div>
          <MessageNotice type={sample.type} content={sample.content} static />
        </div>
      ))}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div className="w-28 shrink-0">
          <p className="text-sm font-medium text-foreground">Default</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">无图标</p>
        </div>
        <MessageNotice type="default" content="这是一条全局提示 Message" icon={false} static />
      </div>
    </div>
  );
}

export function MessagePositionShowcase() {
  return (
    <ShowcaseCard
      title="点击按钮在对应位置弹出 Message"
      description="同一时刻可叠加多条；每条按 position 分组堆叠。"
    >
      <div className="flex flex-wrap gap-2">
        {MESSAGE_POSITION_OPTIONS.map((item) => (
          <Button
            key={item.position}
            variant="outline"
            size="sm"
            onClick={() =>
              message.info(`${item.label} 位置示例`, {
                position: item.position,
                duration: 4000,
              })
            }
          >
            {item.label}
          </Button>
        ))}
      </div>
    </ShowcaseCard>
  );
}

export function MessageLongContentShowcase() {
  const { title, content, description, actionLabel } = MESSAGE_LONG_CONTENT;

  return (
    <div className="space-y-6">
      <MessageNotice
        type="info"
        title={title}
        content={content}
        description={description}
        action={
          <Link href="#" onClick={(e) => e.preventDefault()}>
            {actionLabel}
          </Link>
        }
        closable
        static
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          message.open({
            type: "info",
            position: "top",
            title,
            content,
            description,
            action: (
              <Link href="#" onClick={(e) => e.preventDefault()}>
                {actionLabel}
              </Link>
            ),
            closable: true,
            duration: 0,
          })
        }
      >
        触发长内容 Message（可关闭，不自动消失）
      </Button>
    </div>
  );
}

export function MessageLoadingShowcase() {
  const loadingIdRef = useRef<string | null>(null);

  return (
    <div className="space-y-6">
      <MessageNotice type="loading" content={MESSAGE_LOADING_COPY} static />
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            if (loadingIdRef.current) message.close(loadingIdRef.current);
            loadingIdRef.current = message.loading(MESSAGE_LOADING_COPY, {
              position: "top",
            });
          }}
        >
          开始上传
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (loadingIdRef.current) {
              message.close(loadingIdRef.current);
              loadingIdRef.current = null;
              message.success("上传完成");
            }
          }}
        >
          完成上传
        </Button>
      </div>
    </div>
  );
}

const DEMO_BUTTONS = [
  { type: "success" as const, label: "Success", content: "保存成功" },
  { type: "info" as const, label: "Info", content: "系统正在处理中" },
  { type: "warning" as const, label: "Warning", content: "部分数据未填写" },
  { type: "error" as const, label: "Error", content: "提交失败，请重试" },
];

function triggerDemoMessage(type: (typeof DEMO_BUTTONS)[number]["type"], content: string) {
  if (type === "success") message.success(content);
  else if (type === "info") message.info(content);
  else if (type === "warning") message.warning(content);
  else message.error(content);
}

export function MessageInteractiveDemo() {
  return (
    <ShowcaseCard title="全局 Message API" description="点击按钮触发真实浮层，默认 top 居中，3s 后消失。">
      <div className="flex flex-wrap gap-2">
        {DEMO_BUTTONS.map((item) => (
          <Button
            key={item.type}
            variant="outline"
            size="sm"
            onClick={() => triggerDemoMessage(item.type, item.content)}
          >
            {item.label}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            message.open({
              type: "info",
              content: "可手动关闭的消息",
              closable: true,
              position: "topRight",
              duration: 0,
            })
          }
        >
          Closable
        </Button>
      </div>
    </ShowcaseCard>
  );
}

export function MessageDesignTokenShowcase() {
  const displayRows = messageDesignSpecRows.filter((row) =>
    [
      "message-min-height",
      "message-radius",
      "message-shadow",
      "message-padding-x",
      "message-padding-y",
      "message-icon-size",
    ].includes(row.token)
  );

  return (
    <div className="space-y-4">
      <SpecTable rows={displayRows} />
      <p className="text-xs text-muted-foreground">
        完整 Token 见 <code className="rounded bg-muted px-1">@yd-ds/tokens</code> 中的{" "}
        <code className="rounded bg-muted px-1">messageTokens</code>。
      </p>
    </div>
  );
}
