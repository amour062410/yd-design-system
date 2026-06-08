"use client";

import {
  AlertTriangle,
  Check,
  Info,
  Loader2,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { messageTokens } from "@yd-ds/tokens";
import { cn } from "../lib/utils";

export type MessageType =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading";

export type MessagePosition =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

export interface MessageConfig {
  type?: MessageType;
  content: ReactNode;
  duration?: number;
  closable?: boolean;
  icon?: ReactNode | false;
  position?: MessagePosition;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
}

type MessageItem = MessageConfig & {
  id: string;
  visible: boolean;
};

const TYPE_COLORS: Record<MessageType, string> = {
  default: "var(--message-text-color)",
  success: messageTokens["message-success-color"],
  info: messageTokens["message-info-color"],
  warning: messageTokens["message-warning-color"],
  error: messageTokens["message-error-color"],
  loading: messageTokens["message-info-color"],
};

const TYPE_ICON_BG: Record<MessageType, string> = {
  default: "var(--message-border-color)",
  success: "rgba(0, 180, 42, 0.12)",
  info: "rgba(22, 93, 255, 0.12)",
  warning: "rgba(255, 125, 0, 0.12)",
  error: "rgba(245, 63, 63, 0.12)",
  loading: "rgba(22, 93, 255, 0.12)",
};

const POSITION_CLASS: Record<MessagePosition, string> = {
  top: "top-6 left-1/2 -translate-x-1/2 items-center",
  topLeft: "top-6 left-6 items-start",
  topRight: "top-6 right-6 items-end",
  bottom: "bottom-6 left-1/2 -translate-x-1/2 items-center",
  bottomLeft: "bottom-6 left-6 items-start",
  bottomRight: "bottom-6 right-6 items-end",
};

const DEFAULT_DURATION = 3000;

let messageSeed = 0;
let messages: MessageItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return messages;
}

function parseDuration(value?: number) {
  if (value === 0) return 0;
  return value ?? DEFAULT_DURATION;
}

function openMessage(config: MessageConfig) {
  const id = config.id ?? `message-${++messageSeed}`;
  const item: MessageItem = {
    ...config,
    id,
    type: config.type ?? "default",
    position: config.position ?? "top",
    closable: config.closable ?? false,
    visible: true,
  };
  messages = [...messages, item];
  emit();

  const duration = parseDuration(config.duration);
  if (duration > 0 && item.type !== "loading") {
    window.setTimeout(() => closeMessage(id), duration);
  }
  return id;
}

function closeMessage(id: string) {
  const target = messages.find((m) => m.id === id);
  if (!target) return;
  messages = messages.map((m) => (m.id === id ? { ...m, visible: false } : m));
  emit();
  window.setTimeout(() => {
    messages = messages.filter((m) => m.id !== id);
    emit();
    target.onClose?.();
  }, 300);
}

function destroyAll() {
  messages = [];
  emit();
}

export const message = {
  open: openMessage,
  success: (content: ReactNode, config?: Omit<MessageConfig, "content" | "type">) =>
    openMessage({ ...config, type: "success", content }),
  info: (content: ReactNode, config?: Omit<MessageConfig, "content" | "type">) =>
    openMessage({ ...config, type: "info", content }),
  warning: (content: ReactNode, config?: Omit<MessageConfig, "content" | "type">) =>
    openMessage({ ...config, type: "warning", content }),
  error: (content: ReactNode, config?: Omit<MessageConfig, "content" | "type">) =>
    openMessage({ ...config, type: "error", content }),
  loading: (content: ReactNode, config?: Omit<MessageConfig, "content" | "type">) =>
    openMessage({ ...config, type: "loading", content, duration: config?.duration ?? 0 }),
  close: closeMessage,
  destroy: destroyAll,
};

function DefaultTypeIcon({ type }: { type: MessageType }) {
  const color = TYPE_COLORS[type];
  const size = "var(--message-icon-size)";

  if (type === "loading") {
    return (
      <Loader2
        className="animate-spin"
        style={{ width: size, height: size, color }}
        aria-hidden
      />
    );
  }
  if (type === "success") {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: TYPE_ICON_BG.success,
          color,
        }}
      >
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (type === "info") {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full text-[11px] font-bold"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          color: "#fff",
        }}
      >
        i
      </span>
    );
  }
  if (type === "warning") {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: TYPE_ICON_BG.warning,
          color,
        }}
      >
        <AlertTriangle className="size-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (type === "error") {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          color: "#fff",
        }}
      >
        <X className="size-3.5" strokeWidth={3} />
      </span>
    );
  }
  return null;
}

export interface MessageNoticeProps extends MessageConfig {
  className?: string;
  /** 文档静态展示，不挂载全局队列 */
  static?: boolean;
}

export function MessageNotice({
  type = "default",
  content,
  title,
  description,
  action,
  icon,
  closable = false,
  onClose,
  className,
  static: isStatic,
}: MessageNoticeProps) {
  const showIcon = icon !== false;
  const resolvedIcon =
    icon === undefined ? <DefaultTypeIcon type={type} /> : icon;

  return (
    <div
      role="status"
      className={cn(
        "inline-flex w-full max-w-[var(--message-max-width)] items-start gap-3 rounded-[var(--message-radius)] border border-[color:var(--message-border-color)] bg-[color:var(--message-bg)] shadow-[var(--message-shadow)]",
        !isStatic && "message-enter pointer-events-auto",
        className
      )}
      style={{
        minHeight: "var(--message-min-height)",
        padding: "var(--message-padding-y) var(--message-padding-x)",
        gap: "var(--message-gap)",
      }}
    >
      {showIcon ? (
        <span className="mt-0.5 flex shrink-0 items-center justify-center">
          {resolvedIcon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        {title ? (
          <p
            className="text-sm font-semibold leading-5"
            style={{ color: "var(--message-text-color)" }}
          >
            {title}
          </p>
        ) : null}
        <p
          className={cn(
            "text-sm leading-5",
            title ? "mt-1" : undefined,
            !title && !description ? "font-medium" : undefined
          )}
          style={{
            color: description
              ? "var(--message-text-color)"
              : "var(--message-text-color)",
          }}
        >
          {content}
        </p>
        {description ? (
          <p
            className="mt-1 text-[13px] leading-5"
            style={{ color: "var(--message-desc-color)" }}
          >
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
      {closable ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--message-radius)] transition-colors hover:bg-[color:var(--color-brand-hover)]"
          style={{ color: "var(--message-close-color)" }}
          aria-label="关闭"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

function MessageInstance({ item }: { item: MessageItem }) {
  const handleClose = useCallback(() => {
    closeMessage(item.id);
  }, [item.id]);

  if (!item.visible) return null;

  return (
    <MessageNotice
      {...item}
      onClose={handleClose}
      closable={item.closable}
    />
  );
}

function MessageHost() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const positions = Object.keys(POSITION_CLASS) as MessagePosition[];

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[var(--message-z-index)]">
      {positions.map((position) => {
        const items = list.filter((m) => m.position === position && m.visible);
        if (!items.length) return null;
        return (
          <div
            key={position}
            className={cn(
              "pointer-events-none fixed flex w-full max-w-[520px] flex-col gap-3",
              POSITION_CLASS[position]
            )}
          >
            {items.map((item) => (
              <MessageInstance key={item.id} item={item} />
            ))}
          </div>
        );
      })}
    </div>,
    document.body
  );
}

export function MessageProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MessageHost />
    </>
  );
}

export function useMessage() {
  return message;
}
