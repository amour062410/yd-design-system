"use client";

import {
  AlertTriangle,
  Check,
  Info,
  Loader2,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { modalSizeSpecs } from "./modal-tokens";
import { Button } from "../button";
import { Input, TextArea } from "../input";
import { Upload } from "../upload";
import { cn } from "../../lib/utils";
import type {
  ApprovalModalProps,
  ConfirmModalProps,
  DetailModalProps,
  FormModalProps,
  FullscreenModalProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalShowcaseState,
  ModalSize,
  ModalType,
  UploadModalProps,
} from "./modal.types";

export type {
  ApprovalModalProps,
  ConfirmModalProps,
  DetailModalProps,
  FormModalProps,
  FullscreenModalProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalShowcaseState,
  ModalSize,
  ModalType,
  UploadModalProps,
} from "./modal.types";

const STATUS_META: Record<
  Exclude<ModalType, "default">,
  { color: string; Icon: LucideIcon; label: string }
> = {
  info: { color: "var(--modal-info-color)", Icon: Info, label: "信息" },
  success: { color: "var(--modal-success-color)", Icon: Check, label: "成功" },
  warning: { color: "var(--modal-warning-color)", Icon: AlertTriangle, label: "警示" },
  error: { color: "var(--modal-error-color)", Icon: X, label: "错误" },
};

function getModalDimensions(size: ModalSize) {
  if (size === "fullscreen") {
    return {
      width: "var(--modal-width-fullscreen)",
      maxWidth: "var(--modal-width-fullscreen)",
      height: "var(--modal-height-fullscreen)",
      maxHeight: "var(--modal-height-fullscreen)",
    };
  }
  return {
    width: "100%",
    maxWidth: modalSizeSpecs[size].width,
  };
}

function isFullscreen(size: ModalSize) {
  return size === "fullscreen";
}

export function ModalStatusIcon({
  type,
  className,
}: {
  type: Exclude<ModalType, "default">;
  className?: string;
}) {
  const meta = STATUS_META[type];
  const Icon = meta.Icon;
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white",
        className
      )}
      style={{ backgroundColor: meta.color }}
    >
      <Icon className="size-3.5" strokeWidth={2.5} />
    </span>
  );
}

export function ModalHeader({
  title,
  titleId,
  type = "default",
  showClose = true,
  onClose,
  className,
  children,
}: ModalHeaderProps) {
  const isStatus = type !== "default";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between gap-3",
        isStatus ? "pb-0" : "border-b border-[color:var(--modal-border-color)]",
        className
      )}
      style={{
        boxSizing: "border-box",
        height: "var(--modal-header-height)",
        minHeight: "var(--modal-header-height)",
        padding: "0 var(--modal-padding)",
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {isStatus ? <ModalStatusIcon type={type} /> : null}
        <div className="min-w-0 flex-1">
          {title ? (
            <h2
              id={titleId}
              className="text-base font-semibold leading-6"
              style={{ color: "var(--modal-title-color)" }}
            >
              {title}
            </h2>
          ) : null}
          {children}
        </div>
      </div>
      {showClose && !isStatus ? (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--modal-radius)] transition-colors hover:bg-[color:var(--table-row-hover-bg)]"
          style={{ color: "var(--modal-close-color)" }}
          aria-label="关闭"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export function ModalBody({
  children,
  className,
  slotPlaceholder = false,
  scrollable = false,
}: ModalBodyProps & { compact?: boolean }) {
  if (slotPlaceholder) {
    return (
      <div
        className={cn("px-6 pb-6", className)}
        style={{ padding: "var(--modal-padding)" }}
      >
        <div
          className="flex min-h-[200px] items-center justify-center rounded-[var(--modal-radius)] border border-dashed text-sm font-medium"
          style={{
            borderColor: "var(--modal-slot-border)",
            backgroundColor: "var(--modal-slot-bg)",
            color: "var(--modal-info-color)",
          }}
        >
          Slot
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-sm leading-6",
        scrollable && "flex min-h-0 flex-1 flex-col overflow-y-auto",
        className
      )}
      style={{
        padding: "var(--modal-padding)",
        color: "var(--modal-text-color)",
      }}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  children,
  className,
  cancelText = "取消",
  okText = "确定",
  showCancel = true,
  danger = false,
  loading = false,
  disabled = false,
  showcaseState,
  onCancel,
  onOk,
}: ModalFooterProps) {
  const isDisabled = disabled || showcaseState === "disabled";
  const isLoading = loading || showcaseState === "loading";
  const isHover = showcaseState === "hover";

  return (
    <div
      className={cn("flex items-center justify-end", className)}
      style={{
        minHeight: "var(--modal-footer-height)",
        padding: "0 var(--modal-padding) var(--modal-padding)",
        gap: "var(--modal-footer-gap)",
      }}
    >
      {children ?? (
        <>
          {showCancel ? (
            <Button
              variant="outline"
              size="default"
              onClick={onCancel}
              disabled={isDisabled || isLoading}
              className={cn(
                isHover && "border-[color:var(--modal-info-color)] text-[color:var(--modal-info-color)]"
              )}
            >
              {cancelText}
            </Button>
          ) : null}
          <Button
            variant={danger ? "destructive" : "default"}
            size="default"
            loading={isLoading}
            disabled={isDisabled}
            onClick={onOk}
            className={cn(
              !danger &&
                isHover &&
                "bg-[color:var(--color-brand-button-hover)]"
            )}
          >
            {okText}
          </Button>
        </>
      )}
    </div>
  );
}

export function Modal({
  open = true,
  onClose,
  size = "lg",
  type = "default",
  title,
  header,
  children,
  footer,
  showClose = true,
  maskClosable = true,
  keyboard = true,
  destroyOnClose = true,
  loading = false,
  slotPlaceholder,
  className,
  inline = false,
  previewHeight,
  fullWidth = false,
}: ModalProps) {
  const titleId = useId();
  const fullscreen = isFullscreen(size);
  const dimensions = getModalDimensions(size);
  const inlineMaxWidth = fullWidth ? "100%" : dimensions.maxWidth;
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
    else if (destroyOnClose) setMounted(false);
  }, [open, destroyOnClose]);

  useEffect(() => {
    if (!open || inline) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, inline]);

  useEffect(() => {
    if (!open || inline || keyboard === false) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, inline, keyboard, onClose]);

  const handleMaskClick = useCallback(() => {
    if (maskClosable) onClose?.();
  }, [maskClosable, onClose]);

  const showLayer = open || inline;
  if (!mounted && !inline) return null;

  const panel = (
    <div
      role="dialog"
      aria-modal={!inline}
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        "flex w-full flex-col overflow-hidden",
        inline ? "relative" : undefined,
        fullscreen && "min-h-0",
        className
      )}
      style={{
        ...(fullWidth ? { ...dimensions, maxWidth: "100%", width: "100%" } : dimensions),
        ...(inline && fullscreen && previewHeight
          ? { height: previewHeight, maxHeight: previewHeight }
          : {}),
        borderRadius: "var(--modal-radius)",
        backgroundColor: "var(--modal-bg)",
        boxShadow: "var(--modal-shadow)",
      }}
      onClick={(e) => e.stopPropagation()}
      aria-hidden={!showLayer && !inline ? true : undefined}
    >
      {header !== undefined ? (
        header
      ) : title !== undefined ? (
        <ModalHeader
          title={title}
          titleId={titleId}
          type={type}
          showClose={showClose}
          onClose={onClose}
        />
      ) : null}
      {slotPlaceholder ? (
        <ModalBody slotPlaceholder />
      ) : (
        <div className={cn("relative", fullscreen && "flex min-h-0 flex-1 flex-col")}>
          <ModalBody scrollable={fullscreen}>{children}</ModalBody>
          {loading ? (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center rounded-[var(--modal-radius)]"
              style={{ backgroundColor: "color-mix(in srgb, var(--modal-bg) 72%, transparent)" }}
              aria-busy
              aria-label="加载中"
            >
              <Loader2
                className="size-8 animate-spin"
                style={{ color: "var(--modal-info-color)" }}
              />
            </div>
          ) : null}
        </div>
      )}
      {footer}
    </div>
  );

  if (inline) {
    return (
      <div
        className={cn(fullWidth ? "block w-full" : "inline-block w-full")}
        style={{ maxWidth: inlineMaxWidth }}
      >
        {panel}
      </div>
    );
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        fullscreen ? "p-6" : "p-6",
        !showLayer && "pointer-events-none invisible"
      )}
      style={{
        backgroundColor: "var(--modal-overlay)",
        animation: `modal-fade-in var(--modal-animation-duration) ease-out`,
      }}
      onClick={handleMaskClick}
      role="presentation"
    >
      <div
        style={{
          animation: `modal-zoom-in var(--modal-animation-duration) ease-out`,
        }}
      >
        {panel}
      </div>
    </div>,
    document.body
  );
}

export function ConfirmModal({
  open,
  onClose,
  type = "info",
  title,
  content = "这是一段解释文字，根据内容进行提醒",
  okText = "确定",
  cancelText = "取消",
  showCancel = type === "warning" || type === "success",
  loading,
  disabled,
  onOk,
  maskClosable = true,
  keyboard = true,
  inline,
}: ConfirmModalProps) {
  const danger = type === "error";
  const defaultTitles: Record<Exclude<ModalType, "default">, string> = {
    info: "弹窗标题",
    success: "弹窗成功标题",
    warning: "弹窗警示标题",
    error: "弹窗错误标题",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      type={type}
      title={title ?? defaultTitles[type]}
      showClose={false}
      maskClosable={maskClosable}
      keyboard={keyboard}
      inline={inline}
      footer={
        <ModalFooter
          showCancel={showCancel}
          okText={okText}
          cancelText={cancelText}
          danger={danger}
          loading={loading}
          disabled={disabled}
          onCancel={onClose}
          onOk={onOk ?? onClose}
        />
      }
    >
      {content}
    </Modal>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--modal-title-color)]">
        {label}
        {required ? (
          <span className="ml-0.5 text-[color:var(--modal-error-color)]">*</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

export function FormModal({
  open,
  onClose,
  title = "新增用户",
  onSubmit,
  loading,
  inline,
  okText = "确定",
  children,
}: FormModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={title}
      inline={inline}
      footer={
        <ModalFooter
          loading={loading}
          okText={okText}
          onCancel={onClose}
          onOk={onSubmit ?? onClose}
        />
      }
    >
      {children ?? (
        <div
          className="grid gap-4 sm:grid-cols-2"
          style={{ gap: "var(--modal-body-gap)" }}
        >
          <FormField label="姓名" required>
            <Input defaultValue="张明" placeholder="请输入姓名" />
          </FormField>
          <FormField label="工号" required>
            <Input defaultValue="YD-20240312" placeholder="请输入工号" />
          </FormField>
          <FormField label="邮箱" required>
            <Input defaultValue="zhangming@example.com" placeholder="请输入邮箱" />
          </FormField>
          <FormField label="手机号">
            <Input defaultValue="13800138000" placeholder="请输入手机号" />
          </FormField>
          <FormField label="部门" required>
            <Input defaultValue="研发一部" placeholder="请选择部门" />
          </FormField>
          <FormField label="职位">
            <Input defaultValue="前端工程师" placeholder="请输入职位" />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="备注">
              <TextArea
                rows={3}
                defaultValue="负责设计系统与组件库建设，2024 Q1 入职。"
                placeholder="请输入备注"
              />
            </FormField>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function DetailModal({
  open,
  onClose,
  title = "查看详情",
  inline,
  items = [
    { label: "姓名", value: "张明" },
    { label: "工号", value: "YD-20240312" },
    { label: "部门", value: "研发一部" },
    { label: "职位", value: "前端工程师" },
    { label: "邮箱", value: "zhangming@example.com" },
    { label: "手机号", value: "13800138000" },
    { label: "状态", value: "在职" },
    { label: "创建时间", value: "2024-03-12 09:30" },
    { label: "最近登录", value: "2024-06-01 14:22" },
    { label: "备注", value: "负责设计系统与组件库建设" },
  ],
}: DetailModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={title}
      inline={inline}
      footer={<ModalFooter showCancel={false} onOk={onClose} okText="关闭" />}
    >
      <dl
        className="grid gap-x-6 gap-y-3 sm:grid-cols-2"
        style={{ rowGap: "var(--modal-body-gap)" }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex gap-3 text-sm",
              item.label === "备注" && "sm:col-span-2"
            )}
          >
            <dt className="w-20 shrink-0 text-[color:var(--color-text-tertiary)]">
              {item.label}
            </dt>
            <dd className="min-w-0 text-[color:var(--modal-title-color)]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}

export function UploadModal({
  open,
  onClose,
  title = "上传证照附件",
  onUpload,
  loading,
  inline,
}: UploadModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={title}
      inline={inline}
      footer={
        <ModalFooter
          loading={loading}
          okText="开始上传"
          onCancel={onClose}
          onOk={onUpload ?? onClose}
        />
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--modal-body-gap)" }}>
        <p className="text-sm text-[color:var(--modal-text-color)]">
          支持 PDF、JPG、PNG 格式，单文件不超过 10MB。请上传营业执照、法人身份证等证照材料。
        </p>
        <Upload
          dragger
          multiple
          defaultFileList={[
            {
              uid: "1",
              name: "营业执照_2024.pdf",
              status: "done",
              percent: 100,
            },
          ]}
          buttonText="选择文件"
        />
      </div>
    </Modal>
  );
}

export function ApprovalModal({
  open,
  onClose,
  title = "审批采购申请",
  applicant = "李华 · 研发二部",
  amount = "¥ 128,600.00",
  onApprove,
  onReject,
  inline,
}: ApprovalModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={title}
      inline={inline}
      footer={
        <ModalFooter>
          <Button variant="outline" size="default" onClick={onReject ?? onClose}>
            驳回
          </Button>
          <Button size="default" onClick={onApprove ?? onClose}>
            通过
          </Button>
        </ModalFooter>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--modal-body-gap)" }}>
        <div className="rounded-[var(--modal-radius)] border border-[color:var(--modal-border-color)] bg-[color:var(--color-surface-card-soft)] px-4 py-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[color:var(--color-text-tertiary)]">申请人</span>
            <span className="font-medium text-[color:var(--modal-title-color)]">
              {applicant}
            </span>
          </div>
          <div className="mt-2 flex justify-between gap-4">
            <span className="text-[color:var(--color-text-tertiary)]">申请金额</span>
            <span className="font-medium text-[color:var(--modal-title-color)]">
              {amount}
            </span>
          </div>
        </div>
        <FormField label="审批意见" required>
          <TextArea
            rows={3}
            placeholder="请输入审批意见，驳回时必填"
            defaultValue="采购清单与预算一致，同意通过。"
          />
        </FormField>
      </div>
    </Modal>
  );
}

export function FullscreenModal({
  open,
  onClose,
  title = "系统配置",
  onSave,
  loading,
  inline,
  previewHeight = "520px",
}: FullscreenModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="fullscreen"
      title={title}
      inline={inline}
      previewHeight={previewHeight}
      footer={
        <ModalFooter
          loading={loading}
          okText="保存配置"
          onCancel={onClose}
          onOk={onSave ?? onClose}
        />
      }
    >
      <div className="flex min-h-full flex-col justify-center py-6">
        <div className="mx-auto w-full max-w-[720px]">
          <div className="flex flex-col gap-6">
          <section>
            <h3 className="mb-3 text-sm font-semibold text-[color:var(--modal-title-color)]">
              基础信息
            </h3>
            <div
              className="grid grid-cols-2"
              style={{ gap: "var(--modal-body-gap)" }}
            >
              <FormField label="系统名称" required>
                <Input defaultValue="YD 企业管理平台" />
              </FormField>
              <FormField label="系统编码" required>
                <Input defaultValue="YD-ADMIN-PROD" />
              </FormField>
              <FormField label="环境">
                <Input defaultValue="生产环境" />
              </FormField>
              <div className="col-span-2">
                <FormField label="系统描述">
                  <TextArea
                    rows={2}
                    defaultValue="面向企业后台的统一权限、流程、消息与数据管理配置中心。"
                  />
                </FormField>
              </div>
            </div>
          </section>
          <section className="border-t border-[color:var(--modal-border-color)] pt-6">
            <h3 className="mb-3 text-sm font-semibold text-[color:var(--modal-title-color)]">
              安全策略
            </h3>
            <div
              className="grid grid-cols-2"
              style={{ gap: "var(--modal-body-gap)" }}
            >
              <FormField label="登录超时 (分钟)">
                <Input defaultValue="30" />
              </FormField>
              <FormField label="密码有效期 (天)">
                <Input defaultValue="90" />
              </FormField>
              <FormField label="失败锁定次数">
                <Input defaultValue="5" />
              </FormField>
              <FormField label="IP 白名单">
                <Input defaultValue="10.0.0.0/8, 192.168.0.0/16" />
              </FormField>
              <FormField label="审计日志保留 (天)">
                <Input defaultValue="180" />
              </FormField>
              <FormField label="双因素认证">
                <Input defaultValue="管理员强制开启" />
              </FormField>
            </div>
          </section>
          <section className="border-t border-[color:var(--modal-border-color)] pt-6">
            <h3 className="mb-3 text-sm font-semibold text-[color:var(--modal-title-color)]">
              通知渠道
            </h3>
            <div
              className="grid grid-cols-2"
              style={{ gap: "var(--modal-body-gap)" }}
            >
              <FormField label="邮件通知">
                <Input defaultValue="smtp@yd.com" />
              </FormField>
              <FormField label="短信网关">
                <Input defaultValue="Aliyun SMS · 已连接" />
              </FormField>
              <div className="col-span-2">
                <FormField label="Webhook">
                  <Input defaultValue="https://hooks.yd.com/alert" />
                </FormField>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </Modal>
  );
}

/** 设计稿静态预览帧（文档 Showcase 用） */
export function ModalFrame({
  size = "lg",
  type = "default",
  title = "弹窗标题",
  content,
  slotPlaceholder = false,
  footer,
  className,
  previewHeight,
  fullWidth,
}: {
  size?: ModalSize;
  type?: ModalType;
  title?: ReactNode;
  content?: ReactNode;
  slotPlaceholder?: boolean;
  footer?: ReactNode;
  className?: string;
  previewHeight?: string;
  fullWidth?: boolean;
}) {
  if (type !== "default") {
    return (
      <ConfirmModal
        inline
        open
        type={type}
        title={title}
        content={content ?? "删除「张明」后，其关联的 3 条审批记录将一并移除，此操作不可撤销。"}
        showCancel={type === "warning" || type === "success"}
        danger={type === "error"}
      />
    );
  }

  const defaultContent = (
    <div
      className="grid gap-4 sm:grid-cols-2"
      style={{ gap: "var(--modal-body-gap)" }}
    >
      <FormField label="项目名称" required>
        <Input defaultValue="2024 年度预算审批" />
      </FormField>
      <FormField label="负责人">
        <Input defaultValue="张明" />
      </FormField>
      <div className="sm:col-span-2">
        <FormField label="说明">
          <TextArea rows={2} defaultValue="用于提交 Q2 部门预算，需在 6 月 15 日前完成审批。" />
        </FormField>
      </div>
    </div>
  );

  return (
    <Modal
      inline
      open
      size={size}
      title={title}
      slotPlaceholder={slotPlaceholder}
      previewHeight={previewHeight}
      fullWidth={fullWidth}
      showClose
      className={className}
      footer={
        footer ?? (
          <ModalFooter onCancel={() => undefined} onOk={() => undefined} />
        )
      }
    >
      {content ?? (slotPlaceholder ? undefined : defaultContent)}
    </Modal>
  );
}
