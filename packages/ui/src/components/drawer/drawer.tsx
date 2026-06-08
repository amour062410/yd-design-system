"use client";

import { AlertCircle, Loader2, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { drawerSizeSpecs } from "./drawer-tokens";
import { useDrawerPushContext } from "./drawer-push";
import { Button } from "../button";
import { Input, TextArea } from "../input";
import { Select } from "../select";
import { cn } from "../../lib/utils";
import type {
  ApprovalDrawerProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPlacement,
  DrawerProps,
  DrawerShowcaseState,
  DrawerSize,
  DrawerStatusTone,
  EditUserFormDrawerProps,
  MultiLevelDrawerProps,
  OrderDetailDrawerProps,
  SystemConfigDrawerProps,
  UserDetailDrawerProps,
} from "./drawer.types";

export type {
  ApprovalDrawerProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPlacement,
  DrawerProps,
  DrawerShowcaseState,
  DrawerSize,
  DrawerStatusTone,
  EditUserFormDrawerProps,
  MultiLevelDrawerProps,
  OrderDetailDrawerProps,
  SystemConfigDrawerProps,
  UserDetailDrawerProps,
} from "./drawer.types";

export { DrawerPushContainer, useDrawerPushContext } from "./drawer-push";

const DRAWER_STATUS_STYLES: Record<
  DrawerStatusTone,
  { backgroundColor: string; color: string }
> = {
  default: {
    backgroundColor: "var(--table-header-bg)",
    color: "var(--color-text-secondary)",
  },
  success: {
    backgroundColor: "rgba(0, 180, 42, 0.08)",
    color: "var(--modal-success-color)",
  },
  warning: {
    backgroundColor: "rgba(255, 125, 0, 0.08)",
    color: "var(--modal-warning-color)",
  },
  error: {
    backgroundColor: "rgba(245, 63, 63, 0.08)",
    color: "var(--modal-error-color)",
  },
  info: {
    backgroundColor: "rgba(22, 93, 255, 0.08)",
    color: "var(--drawer-brand-color)",
  },
};

function getDrawerSize(size: DrawerSize) {
  return drawerSizeSpecs[size].width;
}

function parseDrawerPixels(size: DrawerSize) {
  const raw = getDrawerSize(size);
  const match = raw.match(/^(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 480;
}

function isHorizontal(placement: DrawerPlacement) {
  return placement === "top" || placement === "bottom";
}

function getPanelAnimation(placement: DrawerPlacement) {
  const map: Record<DrawerPlacement, string> = {
    right: "drawer-slide-in-right",
    left: "drawer-slide-in-left",
    top: "drawer-slide-in-top",
    bottom: "drawer-slide-in-bottom",
  };
  return map[placement];
}

function getPanelStyle(size: DrawerSize, placement: DrawerPlacement) {
  const dimension = getDrawerSize(size);
  if (isHorizontal(placement)) {
    return {
      width: "100%",
      height: dimension,
      maxHeight: dimension,
    };
  }
  return {
    width: dimension,
    maxWidth: dimension,
    height: "100%",
  };
}

export function DrawerHeader({
  title,
  titleId,
  description,
  status,
  statusTone = "default",
  showClose = true,
  onClose,
  className,
  children,
}: DrawerHeaderProps) {
  const statusStyle = DRAWER_STATUS_STYLES[statusTone];
  const hasMeta = Boolean(description || status);

  return (
    <div
      className={cn(
        "flex shrink-0 items-start justify-between gap-3 border-b border-[color:var(--drawer-border-color)]",
        className
      )}
      style={{
        boxSizing: "border-box",
        minHeight: "var(--drawer-header-height)",
        height: hasMeta ? undefined : "var(--drawer-header-height)",
        padding: hasMeta
          ? "16px var(--drawer-padding)"
          : "0 var(--drawer-padding)",
      }}
    >
      <div className="min-w-0 flex-1 pr-2">
        {title ? (
          <h2
            id={titleId}
            className="truncate text-base font-semibold leading-6"
            style={{ color: "var(--drawer-title-color)" }}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-1 text-[13px] leading-5 text-[color:var(--color-text-tertiary)]">
            {description}
          </p>
        ) : null}
        {status ? (
          <span
            className="mt-2 inline-flex items-center rounded-[var(--drawer-radius)] px-2 py-0.5 text-xs font-medium"
            style={statusStyle}
          >
            {status}
          </span>
        ) : null}
        {children}
      </div>
      {showClose ? (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--drawer-radius)] transition-colors hover:bg-[color:var(--table-row-hover-bg)]"
          style={{ color: "var(--drawer-close-color)" }}
          aria-label="关闭"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export function DrawerBody({
  children,
  className,
  slotPlaceholder = false,
  empty = false,
  error = false,
  onRetry,
}: DrawerBodyProps) {
  if (error) {
    return (
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto text-sm",
          className
        )}
        style={{ padding: "var(--drawer-padding)" }}
      >
        <AlertCircle
          className="size-10 shrink-0"
          style={{ color: "var(--modal-error-color)" }}
          aria-hidden
        />
        <div className="text-center">
          <p
            className="font-medium"
            style={{ color: "var(--drawer-title-color)" }}
          >
            加载失败
          </p>
          <p className="mt-1 text-[color:var(--color-text-tertiary)]">
            请检查网络连接后重试
          </p>
        </div>
        {onRetry ? (
          <Button size="default" onClick={onRetry}>
            重试
          </Button>
        ) : null}
      </div>
    );
  }

  if (slotPlaceholder) {
    return (
      <div
        className={cn("min-h-0 flex-1 overflow-y-auto", className)}
        style={{ padding: "var(--drawer-padding)" }}
      >
        <div
          className="flex min-h-[240px] items-center justify-center rounded-[var(--drawer-radius)] border border-dashed text-sm font-medium"
          style={{
            borderColor: "var(--drawer-slot-border)",
            backgroundColor: "var(--drawer-slot-bg)",
            color: "var(--drawer-brand-color)",
          }}
        >
          Slot
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto text-sm",
          className
        )}
        style={{
          padding: "var(--drawer-padding)",
          color: "var(--drawer-text-color)",
        }}
      >
        <p className="text-[color:var(--color-text-tertiary)]">暂无数据</p>
      </div>
    );
  }

  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto text-sm leading-6", className)}
      style={{
        padding: "var(--drawer-padding)",
        color: "var(--drawer-text-color)",
      }}
    >
      {children}
    </div>
  );
}

export function DrawerFooter({
  children,
  className,
  cancelText = "取消",
  okText = "保存",
  showCancel = true,
  loading = false,
  disabled = false,
  onCancel,
  onOk,
}: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-end border-t border-[color:var(--drawer-border-color)]",
        className
      )}
      style={{
        minHeight: "var(--drawer-footer-height)",
        padding: "0 var(--drawer-padding)",
        gap: "var(--drawer-footer-gap)",
      }}
    >
      {children ?? (
        <>
          {showCancel ? (
            <Button variant="outline" size="default" onClick={onCancel} disabled={disabled || loading}>
              {cancelText}
            </Button>
          ) : null}
          <Button size="default" loading={loading} disabled={disabled} onClick={onOk}>
            {okText}
          </Button>
        </>
      )}
    </div>
  );
}

export function Drawer({
  open = false,
  onClose,
  size = "md",
  placement = "right",
  title,
  header,
  description,
  status,
  statusTone = "default",
  children,
  footer,
  showFooter = true,
  showClose = true,
  maskClosable = true,
  keyboard = true,
  destroyOnClose = true,
  push = false,
  slotPlaceholder,
  empty,
  error,
  onRetry,
  loading,
  disabled,
  level = 1,
  className,
  inline = false,
  embedded = false,
  previewHeight = "520px",
}: DrawerProps) {
  const titleId = useId();
  const pushContext = useDrawerPushContext();
  const horizontal = isHorizontal(placement);
  const panelStyle = getPanelStyle(size, placement);
  const animation = getPanelAnimation(placement);
  const nestedInset = (level - 1) * 48;
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

  useEffect(() => {
    if (!push || !pushContext || inline) return;
    const pixels = open ? parseDrawerPixels(size) : 0;
    pushContext.setPushOffset(placement, pixels);
    return () => pushContext.setPushOffset(placement, 0);
  }, [open, push, pushContext, placement, size, inline]);

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
        "flex flex-col overflow-hidden bg-[color:var(--drawer-bg)] shadow-[var(--drawer-shadow)]",
        horizontal ? "w-full" : "h-full",
        className
      )}
      style={{
        ...panelStyle,
        borderRadius: horizontal
          ? placement === "top"
            ? "0 0 var(--drawer-radius) var(--drawer-radius)"
            : "var(--drawer-radius) var(--drawer-radius) 0 0"
          : placement === "right"
            ? "var(--drawer-radius) 0 0 var(--drawer-radius)"
            : "0 var(--drawer-radius) var(--drawer-radius) 0",
        animation: showLayer
          ? `${animation} var(--drawer-animation-duration) ease-out`
          : undefined,
      }}
      onClick={(e) => e.stopPropagation()}
      aria-hidden={!showLayer && !inline ? true : undefined}
    >
      {header !== undefined ? (
        header
      ) : title !== undefined ? (
        <DrawerHeader
          title={title}
          titleId={titleId}
          description={description}
          status={status}
          statusTone={statusTone}
          showClose={showClose}
          onClose={onClose}
        />
      ) : null}
      {slotPlaceholder ? (
        <DrawerBody slotPlaceholder />
      ) : error ? (
        <DrawerBody error onRetry={onRetry} />
      ) : (
        <div className="relative flex min-h-0 flex-1 flex-col">
          <DrawerBody empty={empty}>{children}</DrawerBody>
          {loading ? (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{
                backgroundColor: "color-mix(in srgb, var(--drawer-bg) 72%, transparent)",
              }}
              aria-busy
              aria-label="加载中"
            >
              <Loader2
                className="size-8 animate-spin"
                style={{ color: "var(--drawer-brand-color)" }}
              />
            </div>
          ) : null}
        </div>
      )}
      {showFooter
        ? footer ?? (
            <DrawerFooter
              loading={loading}
              disabled={disabled}
              onCancel={onClose}
              onOk={onClose}
            />
          )
        : null}
    </div>
  );

  const mask = (
    <div
      className={cn("absolute inset-0", inline ? undefined : "fixed")}
      style={{
        backgroundColor: "var(--drawer-mask)",
        zIndex: 40 + level * 10,
        animation: showLayer
          ? `drawer-mask-fade-in var(--drawer-animation-duration) ease-out`
          : undefined,
      }}
      onClick={handleMaskClick}
      role="presentation"
    />
  );

  const panelWrapperClass = cn(
    "absolute flex",
    horizontal
      ? placement === "top"
        ? "inset-x-0 top-0"
        : "inset-x-0 bottom-0"
      : placement === "right"
        ? "inset-y-0 right-0"
        : "inset-y-0 left-0",
    inline ? undefined : "fixed"
  );

  const panelWrapperStyle: CSSProperties = {
    zIndex: 41 + level * 10,
    ...(placement === "right" && level > 1 ? { right: nestedInset } : {}),
    ...(placement === "left" && level > 1 ? { left: nestedInset } : {}),
    ...(placement === "top" && level > 1 ? { top: nestedInset } : {}),
    ...(placement === "bottom" && level > 1 ? { bottom: nestedInset } : {}),
  };

  const content = (
    <>
      {mask}
      <div className={panelWrapperClass} style={panelWrapperStyle}>
        {panel}
      </div>
    </>
  );

  if (inline && embedded) {
    return showLayer ? content : null;
  }

  if (inline) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-md border border-[color:var(--drawer-border-color)] bg-[color:var(--color-surface-page)]"
        style={{ height: previewHeight }}
      >
        {showLayer ? content : (
          <div className="flex h-full items-center justify-center text-sm text-[color:var(--color-text-tertiary)]">
            点击按钮打开抽屉预览
          </div>
        )}
      </div>
    );
  }

  return createPortal(
    <div
      className={cn(!showLayer && "pointer-events-none invisible")}
      aria-hidden={!showLayer}
    >
      {content}
    </div>,
    document.body
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
      <label className="mb-2 block text-sm text-[color:var(--drawer-title-color)]">
        {label}
        {required ? (
          <span className="ml-0.5 text-[color:var(--modal-error-color)]">*</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3
        className="mb-3 text-sm font-semibold text-[color:var(--drawer-title-color)]"
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function DetailGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl
      className="grid gap-x-6 gap-y-3 sm:grid-cols-2"
      style={{ rowGap: "var(--drawer-body-gap)" }}
    >
      {items.map((item) => (
        <div key={item.label} className="flex gap-3 text-sm">
          <dt className="w-20 shrink-0 text-[color:var(--color-text-tertiary)]">
            {item.label}
          </dt>
          <dd className="min-w-0 text-[color:var(--drawer-title-color)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function UserDetailContent({ onEdit }: { onEdit?: () => void }) {
  return (
    <div className="space-y-6">
      <DetailSection title="基本信息">
        <DetailGrid
          items={[
            { label: "姓名", value: "张明" },
            { label: "工号", value: "YD-20240312" },
            { label: "邮箱", value: "zhangming@example.com" },
            { label: "手机号", value: "13800138000" },
          ]}
        />
      </DetailSection>
      <DetailSection title="组织信息">
        <DetailGrid
          items={[
            { label: "部门", value: "研发一部" },
            { label: "职位", value: "前端工程师" },
            { label: "直属上级", value: "李华" },
            { label: "入职日期", value: "2024-03-12" },
          ]}
        />
      </DetailSection>
      <DetailSection title="角色权限">
        <DetailGrid
          items={[
            { label: "角色", value: "系统管理员、审批人" },
            { label: "数据权限", value: "本部门及下级" },
            { label: "功能权限", value: "用户管理、审批中心" },
          ]}
        />
      </DetailSection>
      <DetailSection title="登录记录">
        <DetailGrid
          items={[
            { label: "最近登录", value: "2024-06-01 14:22" },
            { label: "登录 IP", value: "10.12.8.56" },
            { label: "登录设备", value: "Chrome · macOS" },
          ]}
        />
      </DetailSection>
      {onEdit ? (
        <div className="flex justify-end border-t border-[color:var(--drawer-border-color)] pt-4">
          <Button size="default" onClick={onEdit}>
            编辑用户
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function EditUserFormContent({ onAssignRole }: { onAssignRole?: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[560px] space-y-6">
      <DetailSection title="基本信息">
        <div className="grid grid-cols-2" style={{ gap: "var(--drawer-body-gap)" }}>
          <FormField label="姓名" required>
            <Input defaultValue="张明" />
          </FormField>
          <FormField label="工号">
            <Input defaultValue="YD-20240312" disabled />
          </FormField>
          <FormField label="邮箱" required>
            <Input defaultValue="zhangming@example.com" />
          </FormField>
          <FormField label="手机号" required>
            <Input defaultValue="13800138000" />
          </FormField>
          <FormField label="部门">
            <Select
              options={["研发一部", "研发二部", "产品中心"]}
              defaultValue="研发一部"
            />
          </FormField>
          <FormField label="职位">
            <Input defaultValue="前端工程师" />
          </FormField>
        </div>
      </DetailSection>
      {onAssignRole ? (
        <div className="flex justify-end">
          <Button variant="outline" size="default" onClick={onAssignRole}>
            分配角色
          </Button>
        </div>
      ) : null}
    </div>
  );
}

const ROLE_OPTIONS = [
  { id: "admin", label: "系统管理员", desc: "用户、角色、系统配置" },
  { id: "approver", label: "审批人", desc: "审批中心、流程配置" },
  { id: "operator", label: "运营人员", desc: "内容、活动、数据看板" },
  { id: "viewer", label: "只读访客", desc: "仅查看，不可编辑" },
];

function AssignRoleContent() {
  const [roles, setRoles] = useState<string[]>(["admin", "approver"]);

  const toggle = (id: string) => {
    setRoles((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-[13px] text-[color:var(--color-text-tertiary)]">
        已选 {roles.length} 个角色，保存后立即生效。
      </p>
      {ROLE_OPTIONS.map((role) => {
        const checked = roles.includes(role.id);
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => toggle(role.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-[var(--drawer-radius)] border px-4 py-3 text-left transition-colors",
              checked
                ? "border-[color:var(--drawer-brand-color)] bg-[color:var(--drawer-slot-bg)]"
                : "border-[color:var(--drawer-border-color)] hover:border-[color:var(--drawer-brand-color)]/40"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[8px] border text-[10px] font-bold",
                checked
                  ? "border-[color:var(--drawer-brand-color)] bg-[color:var(--drawer-brand-color)] text-white"
                  : "border-[color:var(--drawer-border-color)]"
              )}
            >
              {checked ? "✓" : ""}
            </span>
            <span>
              <span className="block text-sm font-medium text-[color:var(--drawer-title-color)]">
                {role.label}
              </span>
              <span className="mt-0.5 block text-[13px] text-[color:var(--color-text-tertiary)]">
                {role.desc}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function UserDetailDrawer({
  open,
  onClose,
  inline,
  previewHeight,
}: UserDetailDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="lg"
      title="用户详情"
      description="查看用户档案、组织归属与权限信息"
      status="在职"
      statusTone="success"
      inline={inline}
      previewHeight={previewHeight}
      footer={<DrawerFooter showCancel={false} okText="关闭" onOk={onClose} />}
    >
      <UserDetailContent />
    </Drawer>
  );
}

export function OrderDetailDrawer({
  open,
  onClose,
  inline,
  previewHeight,
}: OrderDetailDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="lg"
      title="订单详情"
      description="查看订单、商品、物流与支付信息"
      status="待发货"
      statusTone="warning"
      inline={inline}
      previewHeight={previewHeight}
      footer={<DrawerFooter showCancel={false} okText="关闭" onOk={onClose} />}
    >
      <div className="space-y-6">
        <DetailSection title="订单信息">
          <DetailGrid
            items={[
              { label: "订单号", value: "ORD-20240601001" },
              { label: "下单时间", value: "2024-06-01 09:30" },
              { label: "订单状态", value: "待发货" },
              { label: "订单金额", value: "¥ 12,860.00" },
            ]}
          />
        </DetailSection>
        <DetailSection title="商品信息">
          <DetailGrid
            items={[
              { label: "商品名称", value: "YD 企业版订阅 · 100 席位" },
              { label: "数量", value: "1" },
              { label: "单价", value: "¥ 12,860.00" },
              { label: "优惠", value: "无" },
            ]}
          />
        </DetailSection>
        <DetailSection title="物流信息">
          <DetailGrid
            items={[
              { label: "收货人", value: "王芳" },
              { label: "联系电话", value: "13900139000" },
              { label: "收货地址", value: "北京市朝阳区望京 SOHO T3" },
              { label: "物流公司", value: "顺丰速运" },
            ]}
          />
        </DetailSection>
        <DetailSection title="支付信息">
          <DetailGrid
            items={[
              { label: "支付方式", value: "对公转账" },
              { label: "支付时间", value: "2024-06-01 09:35" },
              { label: "交易流水", value: "TXN20240601001234" },
            ]}
          />
        </DetailSection>
      </div>
    </Drawer>
  );
}

export function SystemConfigDrawer({
  open,
  onClose,
  onSave,
  inline,
  previewHeight,
}: SystemConfigDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="xl"
      title="系统配置"
      description="管理平台名称、安全策略与通知渠道"
      status="生产环境"
      statusTone="info"
      inline={inline}
      previewHeight={previewHeight}
      footer={
        <DrawerFooter onCancel={onClose} onOk={onSave ?? onClose} okText="保存配置" />
      }
    >
      <div className="mx-auto w-full max-w-[720px] space-y-6">
        <DetailSection title="基础配置">
          <div className="grid grid-cols-2" style={{ gap: "var(--drawer-body-gap)" }}>
            <FormField label="系统名称" required>
              <Input defaultValue="YD 企业管理平台" />
            </FormField>
            <FormField label="系统编码" required>
              <Input defaultValue="YD-ADMIN-PROD" />
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
        </DetailSection>
        <DetailSection title="安全策略">
          <div className="grid grid-cols-2" style={{ gap: "var(--drawer-body-gap)" }}>
            <FormField label="登录超时 (分钟)">
              <Input defaultValue="30" />
            </FormField>
            <FormField label="密码有效期 (天)">
              <Input defaultValue="90" />
            </FormField>
            <FormField label="失败锁定次数">
              <Input defaultValue="5" />
            </FormField>
            <FormField label="双因素认证">
              <Select
                options={["管理员强制开启", "可选开启", "关闭"]}
                defaultValue="管理员强制开启"
              />
            </FormField>
          </div>
        </DetailSection>
        <DetailSection title="通知设置">
          <div className="grid grid-cols-2" style={{ gap: "var(--drawer-body-gap)" }}>
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
        </DetailSection>
      </div>
    </Drawer>
  );
}

export function ApprovalDrawer({
  open,
  onClose,
  inline,
  previewHeight,
}: ApprovalDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="md"
      title="审批详情"
      description="采购申请 · 财务审批节点"
      status="待审批"
      statusTone="info"
      inline={inline}
      previewHeight={previewHeight}
      footer={
        <DrawerFooter>
          <Button variant="outline" size="default" onClick={onClose}>
            驳回
          </Button>
          <Button size="default" onClick={onClose}>
            通过
          </Button>
        </DrawerFooter>
      }
    >
      <div className="space-y-6">
        <DetailSection title="审批记录">
          <div className="space-y-3">
            {[
              { step: "提交申请", user: "李华", time: "2024-06-01 09:00", status: "已完成" },
              { step: "部门审批", user: "王芳", time: "2024-06-01 10:30", status: "已完成" },
              { step: "财务审批", user: "赵强", time: "—", status: "进行中" },
            ].map((row) => (
              <div
                key={row.step}
                className="flex items-center justify-between rounded-[var(--drawer-radius)] border border-[color:var(--drawer-border-color)] px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-[color:var(--drawer-title-color)]">{row.step}</p>
                  <p className="text-[color:var(--color-text-tertiary)]">
                    {row.user} · {row.time}
                  </p>
                </div>
                <span className="text-[color:var(--drawer-brand-color)]">{row.status}</span>
              </div>
            ))}
          </div>
        </DetailSection>
        <DetailSection title="审批意见">
          <FormField label="意见" required>
            <TextArea
              rows={3}
              defaultValue="采购清单与预算一致，同意通过。"
              placeholder="请输入审批意见"
            />
          </FormField>
        </DetailSection>
        <DetailSection title="审批结果">
          <DetailGrid
            items={[
              { label: "当前节点", value: "财务审批" },
              { label: "申请金额", value: "¥ 128,600.00" },
              { label: "预计完成", value: "2024-06-02" },
            ]}
          />
        </DetailSection>
      </div>
    </Drawer>
  );
}

export function EditUserFormDrawer({
  open,
  onClose,
  onSave,
}: EditUserFormDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="md"
      title="编辑用户"
      description="修改基本信息与组织归属"
      status="草稿"
      statusTone="warning"
      footer={
        <DrawerFooter onCancel={onClose} onOk={onSave ?? onClose} okText="保存" />
      }
    >
      <EditUserFormContent />
    </Drawer>
  );
}

export function NestedUserDrawerFlow() {
  const [level1Open, setLevel1Open] = useState(false);
  const [level2Open, setLevel2Open] = useState(false);
  const [level3Open, setLevel3Open] = useState(false);

  const closeAll = () => {
    setLevel3Open(false);
    setLevel2Open(false);
    setLevel1Open(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setLevel1Open(true)}>
        打开三层嵌套抽屉
      </Button>
      <Drawer
        open={level1Open}
        onClose={closeAll}
        level={1}
        size="lg"
        title="用户详情"
        description="查看用户完整档案与权限信息"
        status="在职"
        statusTone="success"
        footer={
          <DrawerFooter showCancel={false} okText="关闭" onOk={closeAll} />
        }
      >
        <UserDetailContent onEdit={() => setLevel2Open(true)} />
      </Drawer>
      <Drawer
        open={level2Open}
        onClose={() => {
          setLevel3Open(false);
          setLevel2Open(false);
        }}
        level={2}
        size="md"
        title="编辑用户"
        description="修改基本信息与组织归属"
        status="未保存"
        statusTone="warning"
        footer={
          <DrawerFooter
            onCancel={() => {
              setLevel3Open(false);
              setLevel2Open(false);
            }}
            onOk={() => {
              setLevel3Open(false);
              setLevel2Open(false);
            }}
            okText="保存"
          />
        }
      >
        <EditUserFormContent onAssignRole={() => setLevel3Open(true)} />
      </Drawer>
      <Drawer
        open={level3Open}
        onClose={() => setLevel3Open(false)}
        level={3}
        size="sm"
        title="分配角色"
        description="配置系统角色与数据权限范围"
        status="2 项已选"
        statusTone="info"
        footer={
          <DrawerFooter
            onCancel={() => setLevel3Open(false)}
            onOk={() => setLevel3Open(false)}
            okText="确认分配"
          />
        }
      >
        <AssignRoleContent />
      </Drawer>
    </>
  );
}

/** @deprecated 使用 NestedUserDrawerFlow */
export function MultiLevelDrawer(_props?: MultiLevelDrawerProps) {
  return <NestedUserDrawerFlow />;
}

/** 文档静态预览 */
export function DrawerFrame({
  size = "md",
  placement = "right",
  title = "抽屉标题",
  showFooter = true,
  slotPlaceholder = true,
  previewHeight = "480px",
  level = 1,
}: {
  size?: DrawerSize;
  placement?: DrawerPlacement;
  title?: ReactNode;
  showFooter?: boolean;
  slotPlaceholder?: boolean;
  previewHeight?: string;
  level?: number;
}) {
  return (
    <Drawer
      inline
      open
      size={size}
      placement={placement}
      title={title}
      showFooter={showFooter}
      slotPlaceholder={slotPlaceholder}
      previewHeight={previewHeight}
      level={level}
      maskClosable={false}
      onClose={() => undefined}
      footer={
        showFooter ? (
          <DrawerFooter onCancel={() => undefined} onOk={() => undefined} />
        ) : undefined
      }
    />
  );
}

export function DrawerLoadingBody() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 text-sm text-[color:var(--drawer-text-color)]">
      <Loader2 className="size-6 animate-spin text-[color:var(--drawer-brand-color)]" />
      <span>加载中…</span>
    </div>
  );
}
