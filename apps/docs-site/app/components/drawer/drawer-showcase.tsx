"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@yd-ds/ui";
import { Button } from "@yd-ds/ui/button";
import {
  ApprovalDrawer,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerPushContainer,
  EditUserFormDrawer,
  NestedUserDrawerFlow,
  OrderDetailDrawer,
  SystemConfigDrawer,
  UserDetailDrawer,
  type DrawerPlacement,
  type DrawerSize,
  type DrawerShowcaseState,
} from "@yd-ds/ui/drawer";
import { Input, TextArea } from "@yd-ds/ui/input";
import { Tabs } from "@yd-ds/ui/tabs";
import { drawerSizeSpecs } from "@yd-ds/tokens";
import {
  DRAWER_ANATOMY_SPEC_ROWS,
  DRAWER_BEST_PRACTICE_ROWS,
  DRAWER_DESIGN_SPEC_ROWS,
} from "@/lib/data/drawerMock";

function ShowcaseCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[8px] border bg-card px-6 py-8 md:px-8", className)}>
      {title ? <p className="mb-1 text-sm font-medium text-foreground">{title}</p> : null}
      {description ? (
        <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

function ScrollPreview({
  children,
  minWidth,
}: {
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="mx-auto w-full" style={{ minWidth, maxWidth: minWidth }}>
        {children}
      </div>
    </div>
  );
}

function SpecTable({
  columns,
  rows,
  keyField = "token",
}: {
  columns: [string, string, string];
  rows: readonly { [key: string]: string }[];
  keyField?: "token" | "part" | "scenario";
}) {
  const [c0, c1, c2] = columns;
  const resolvedKey =
    keyField === "token" && rows[0]?.part
      ? "part"
      : keyField === "token" && rows[0]?.scenario
        ? "scenario"
        : keyField;

  return (
    <div className="overflow-x-auto rounded-[8px] border border-[color:var(--drawer-border-color)]">
      <table className="w-full min-w-[520px] text-left text-[13px]">
        <thead>
          <tr
            className="border-b border-[color:var(--table-header-border-color)]"
            style={{ backgroundColor: "var(--table-header-bg)" }}
          >
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">{c0}</th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">{c1}</th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">{c2}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={String(row[resolvedKey])}
              className="border-b border-[color:var(--drawer-border-color)] last:border-0"
            >
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--drawer-brand-color)]">
                {row[resolvedKey]}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--color-text-secondary)]">
                {row.value}
              </td>
              <td className="px-4 py-3 text-[color:var(--color-text-secondary)]">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProcurementFormBody() {
  return (
    <div className="mx-auto w-full max-w-[560px] space-y-5">
      <div>
        <label className="mb-2 block text-sm text-[color:var(--drawer-title-color)]">
          申请标题 <span className="text-[color:var(--modal-error-color)]">*</span>
        </label>
        <Input defaultValue="Q2 办公设备采购" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-[color:var(--drawer-title-color)]">
          预算金额 <span className="text-[color:var(--modal-error-color)]">*</span>
        </label>
        <Input defaultValue="128600" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-[color:var(--drawer-title-color)]">申请说明</label>
        <TextArea
          rows={4}
          defaultValue="含显示器、人体工学椅及网络设备，已与 IT 资产台账核对。"
        />
      </div>
    </div>
  );
}

function SizePreviewBody({ size }: { size: DrawerSize }) {
  const spec = drawerSizeSpecs[size];
  return (
    <div className="space-y-4">
      <div
        className="rounded-[8px] border px-4 py-3 text-sm"
        style={{
          borderColor: "var(--drawer-brand-color)",
          backgroundColor: "var(--drawer-slot-bg)",
          color: "var(--drawer-brand-color)",
        }}
      >
        当前尺寸：<strong>{spec.label}</strong> · 面板宽度 <strong>{spec.width}</strong>
      </div>
      <p className="text-[color:var(--color-text-secondary)]">
        从页面右侧滑入，保留列表页上下文。宽度越大，越适合复杂表单与多栏详情；轻量操作可选用
        Small（378px）。
      </p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "适用场景", value: "详情 / 编辑 / 配置" },
          { label: "圆角", value: "8px（统一）" },
          { label: "Header", value: "标题 + 描述 + 状态" },
          { label: "动画", value: "300ms ease-out" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[8px] border border-[color:var(--drawer-border-color)] px-3 py-2"
          >
            <dt className="text-xs text-[color:var(--color-text-tertiary)]">{item.label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-[color:var(--drawer-title-color)]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const STATE_TAB_ITEMS = [
  { key: "default", label: "Default" },
  { key: "loading", label: "Loading" },
  { key: "empty", label: "Empty" },
  { key: "disabled", label: "Disabled" },
  { key: "error", label: "Error" },
] as const;

const STATE_DESCRIPTIONS: Record<DrawerShowcaseState, string> = {
  default: "默认内容态，展示完整业务信息与操作区。",
  loading: "数据请求中，Footer 按钮 loading，Body 展示加载指示。",
  empty: "无数据时的空状态，引导用户切换条件或新建。",
  disabled: "表单未通过校验或权限不足时，主操作禁用。",
  error: "接口失败时的错误态，提供重试入口。",
};

function StatePreviewDrawer({
  state,
  open,
  onClose,
}: {
  state: DrawerShowcaseState;
  open: boolean;
  onClose: () => void;
}) {
  const [retryKey, setRetryKey] = useState(0);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="md"
      title="用户列表"
      description="按部门筛选后的用户数据"
      status={state === "error" ? "加载失败" : state === "empty" ? "无数据" : "共 128 条"}
      statusTone={
        state === "error" ? "error" : state === "empty" ? "warning" : "info"
      }
      loading={state === "loading"}
      empty={state === "empty"}
      error={state === "error" && retryKey === 0}
      onRetry={() => setRetryKey(1)}
      disabled={state === "disabled"}
      footer={
        <DrawerFooter
          loading={state === "loading"}
          disabled={state === "disabled"}
          onCancel={onClose}
          onOk={onClose}
          okText={state === "error" ? "关闭" : "确定"}
        />
      }
    >
      {state === "default" ? (
        <ul className="divide-y divide-[color:var(--drawer-border-color)]">
          {[
            { name: "张明", dept: "研发一部", role: "管理员" },
            { name: "李华", dept: "研发一部", role: "审批人" },
            { name: "王芳", dept: "产品中心", role: "运营" },
          ].map((user) => (
            <li
              key={user.name}
              className="flex items-center justify-between py-3 first:pt-0"
            >
              <div>
                <p className="font-medium text-[color:var(--drawer-title-color)]">{user.name}</p>
                <p className="text-[13px] text-[color:var(--color-text-tertiary)]">{user.dept}</p>
              </div>
              <span className="text-[13px] text-[color:var(--drawer-brand-color)]">{user.role}</span>
            </li>
          ))}
        </ul>
      ) : state === "disabled" ? (
        <p>请完善必填项后再保存。当前「邮箱」格式未通过校验。</p>
      ) : state === "error" && retryKey > 0 ? (
        <p className="text-[color:var(--modal-success-color)]">重试成功，数据已加载。</p>
      ) : null}
    </Drawer>
  );
}

export function DrawerDocIntro() {
  return (
    <div className="grid gap-4 rounded-[8px] border border-[color:var(--drawer-border-color)] bg-[color:var(--drawer-slot-bg)] px-6 py-5 md:grid-cols-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--drawer-brand-color)]">
          何时使用
        </p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          详情查看、复杂编辑、多步骤子流程、需参照背景页面时，从边缘滑入 Drawer。
        </p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--modal-info-color)]">
          Drawer vs Modal
        </p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Modal 居中阻断，适合确认与短提示；Drawer 保留上下文，适合高密度 B 端内容。
        </p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--modal-warning-color)]">
          交互方式
        </p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          点击按钮打开 · 遮罩/关闭按钮关闭 · 支持多层嵌套 · 尺寸 378–800px。
        </p>
      </div>
    </div>
  );
}

export function DrawerFigmaShowcase() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [noFooterOpen, setNoFooterOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [xlOpen, setXlOpen] = useState(false);

  return (
    <div className="space-y-8">
      <ShowcaseCard
        title="Basic Drawer"
        description="右侧滑出 · 标题 + 描述 + 状态 · 真实表单内容"
      >
        <Button variant="outline" onClick={() => setBasicOpen(true)}>
          打开基础抽屉
        </Button>
        <Drawer
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          size="md"
          title="编辑采购申请"
          description="在保留列表上下文的同时完成编辑"
          status="审批中"
          statusTone="info"
          footer={
            <DrawerFooter
              onCancel={() => setBasicOpen(false)}
              onOk={() => setBasicOpen(false)}
            />
          }
        >
          <ProcurementFormBody />
        </Drawer>
      </ShowcaseCard>

      <div className="grid gap-6 md:grid-cols-2">
        <ShowcaseCard title="无 Footer" description="纯详情阅读，Body 延伸至底部">
          <Button variant="outline" onClick={() => setNoFooterOpen(true)}>
            打开无 Footer 抽屉
          </Button>
          <Drawer
            open={noFooterOpen}
            onClose={() => setNoFooterOpen(false)}
            size="md"
            title="操作日志"
            description="最近 7 天系统操作记录"
            status="只读"
            showFooter={false}
          >
            <ul className="space-y-3">
              {[
                "14:22 张明 更新了用户角色",
                "13:05 李华 通过了采购审批",
                "11:40 系统 同步了组织架构",
              ].map((line) => (
                <li
                  key={line}
                  className="rounded-[8px] border border-[color:var(--drawer-border-color)] px-3 py-2 text-[13px]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Drawer>
        </ShowcaseCard>

        <ShowcaseCard title="Horizontal Drawer" description="顶部滑出 · 宽屏横向内容">
          <Button variant="outline" onClick={() => setTopOpen(true)}>
            打开顶部抽屉
          </Button>
          <Drawer
            open={topOpen}
            onClose={() => setTopOpen(false)}
            placement="top"
            size="md"
            title="批量导入"
            description="上传 Excel 并映射字段"
            status="步骤 2/3"
            footer={
              <DrawerFooter
                onCancel={() => setTopOpen(false)}
                onOk={() => setTopOpen(false)}
                okText="下一步"
              />
            }
          >
            <p className="text-sm">
              已解析 256 行，3 行需人工确认。请核对「部门」「工号」列映射后继续。
            </p>
          </Drawer>
        </ShowcaseCard>
      </div>

      <ShowcaseCard
        title="Large Drawer"
        description="640px · 复杂表单与多区块详情"
      >
        <Button variant="outline" onClick={() => setLargeOpen(true)}>
          打开 Large 抽屉
        </Button>
        <Drawer
          open={largeOpen}
          onClose={() => setLargeOpen(false)}
          size="lg"
          title="编辑采购申请"
          description="多区块表单 · 两列布局"
          status="待提交"
          statusTone="warning"
          footer={
            <DrawerFooter
              onCancel={() => setLargeOpen(false)}
              onOk={() => setLargeOpen(false)}
            />
          }
        >
          <ProcurementFormBody />
        </Drawer>
      </ShowcaseCard>

      <ShowcaseCard title="Extra Large Drawer" description="800px · 系统级配置面板">
        <Button variant="outline" onClick={() => setXlOpen(true)}>
          打开 XL 抽屉
        </Button>
        <SystemConfigDrawer open={xlOpen} onClose={() => setXlOpen(false)} />
      </ShowcaseCard>

      <ShowcaseCard
        title="Multi Level Drawer"
        description="用户详情 → 编辑用户 → 分配角色 · 真实三层嵌套"
      >
        <NestedUserDrawerFlow />
      </ShowcaseCard>
    </div>
  );
}

export function DrawerSizesShowcase() {
  const sizes = Object.entries(drawerSizeSpecs) as [
    DrawerSize,
    (typeof drawerSizeSpecs)[DrawerSize],
  ][];
  const [openSize, setOpenSize] = useState<DrawerSize | null>(null);

  return (
    <ShowcaseCard description="点击按钮打开对应宽度抽屉，对比 378 / 480 / 640 / 800px 差异。">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sizes.map(([key, spec]) => (
          <button
            key={key}
            type="button"
            onClick={() => setOpenSize(key)}
            className="rounded-[8px] border border-[color:var(--drawer-border-color)] bg-card px-4 py-5 text-left transition-colors hover:border-[color:var(--drawer-brand-color)]"
          >
            <p className="text-sm font-semibold text-foreground">{spec.label}</p>
            <p className="mt-1 font-mono text-lg font-bold text-[color:var(--drawer-brand-color)]">
              {spec.width}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">点击预览</p>
          </button>
        ))}
      </div>
      {sizes.map(([key]) => (
        <Drawer
          key={key}
          open={openSize === key}
          onClose={() => setOpenSize(null)}
          size={key}
          title={`${drawerSizeSpecs[key].label} Drawer`}
          description="对比不同尺寸下的信息密度与布局空间"
          status={drawerSizeSpecs[key].width}
          statusTone="info"
          footer={
            <DrawerFooter
              onCancel={() => setOpenSize(null)}
              onOk={() => setOpenSize(null)}
              okText="关闭"
            />
          }
        >
          <SizePreviewBody size={key} />
        </Drawer>
      ))}
    </ShowcaseCard>
  );
}

export function DrawerStatesShowcase() {
  const [tab, setTab] = useState<string>("default");
  const [open, setOpen] = useState(false);
  const state = tab as DrawerShowcaseState;

  return (
    <ShowcaseCard>
      <Tabs
        items={[...STATE_TAB_ITEMS]}
        activeKey={tab}
        onChange={setTab}
        type="line"
      />
      <p className="mt-6 text-sm text-muted-foreground">{STATE_DESCRIPTIONS[state]}</p>
      <div className="mt-4">
        <Button variant="outline" onClick={() => setOpen(true)}>
          打开 {STATE_TAB_ITEMS.find((t) => t.key === tab)?.label} 状态
        </Button>
      </div>
      <StatePreviewDrawer state={state} open={open} onClose={() => setOpen(false)} />
    </ShowcaseCard>
  );
}

const BUSINESS_SCENARIOS = [
  { key: "user", label: "用户详情", desc: "档案 · 组织 · 权限 · 登录记录" },
  { key: "edit", label: "编辑表单", desc: "基本信息 · 组织归属" },
  { key: "order", label: "订单详情", desc: "订单 · 商品 · 物流 · 支付" },
  { key: "approval", label: "审批详情", desc: "审批链 · 意见 · 结果" },
  { key: "config", label: "系统配置", desc: "基础 · 安全 · 通知" },
] as const;

export function DrawerBusinessPatternsShowcase() {
  const [userOpen, setUserOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  const openers: Record<string, () => void> = {
    user: () => setUserOpen(true),
    edit: () => setEditOpen(true),
    order: () => setOrderOpen(true),
    approval: () => setApprovalOpen(true),
    config: () => setConfigOpen(true),
  };

  return (
    <>
      <ShowcaseCard description="企业后台典型场景 · 点击卡片打开真实 Portal 抽屉，无静态缩略图。">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_SCENARIOS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={openers[item.key]}
              className="rounded-[8px] border border-[color:var(--drawer-border-color)] px-4 py-4 text-left transition-colors hover:border-[color:var(--drawer-brand-color)] hover:bg-[color:var(--drawer-slot-bg)]"
            >
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </button>
          ))}
        </div>
      </ShowcaseCard>

      <UserDetailDrawer open={userOpen} onClose={() => setUserOpen(false)} />
      <EditUserFormDrawer
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={() => setEditOpen(false)}
      />
      <OrderDetailDrawer open={orderOpen} onClose={() => setOrderOpen(false)} />
      <ApprovalDrawer open={approvalOpen} onClose={() => setApprovalOpen(false)} />
      <SystemConfigDrawer
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        onSave={() => setConfigOpen(false)}
      />
    </>
  );
}

export function DrawerAnatomyShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <SpecTable
        columns={["结构", "规格", "说明"]}
        rows={[...DRAWER_ANATOMY_SPEC_ROWS]}
        keyField="part"
      />
      <Button variant="outline" onClick={() => setOpen(true)}>
        打开抽屉查看结构
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size="md"
        title="抽屉结构"
        description="Header · Body · Footer · Mask"
        status="8px 圆角"
        footer={
          <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
        }
      >
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>
            <strong>Header</strong>：标题、描述、状态标签、关闭按钮（min 56px，标题区上下各 16px）
          </li>
          <li>
            <strong>Body</strong>：可滚动内容区，padding 24px
          </li>
          <li>
            <strong>Footer</strong>：取消 + 主操作，高度 56px
          </li>
          <li>
            <strong>Mask</strong>：rgba(15,20,25,0.45)，可点击关闭
          </li>
        </ol>
      </Drawer>
    </div>
  );
}

export function DrawerDesignSpecShowcase() {
  return <SpecTable columns={["Token", "Value", "说明"]} rows={[...DRAWER_DESIGN_SPEC_ROWS]} />;
}

export function DrawerBestPracticeShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <ShowcaseCard title="使用 Drawer">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["复杂编辑", "详情查看", "多步骤流程", "需参照背景页面"].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[color:var(--drawer-brand-color)]">●</span>
                {item}
              </li>
            ))}
          </ul>
        </ShowcaseCard>
        <ShowcaseCard title="使用 Modal">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["轻量确认", "删除二次确认", "短文本提示", "居中阻断"].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[color:var(--modal-info-color)]">●</span>
                {item}
              </li>
            ))}
          </ul>
        </ShowcaseCard>
        <ShowcaseCard title="使用 Full Page">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["字段 > 15 项", "流程 / 权限树", "需 URL 分享"].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[color:var(--modal-warning-color)]">●</span>
                {item}
              </li>
            ))}
          </ul>
        </ShowcaseCard>
      </div>
      <SpecTable
        columns={["场景", "Drawer", "Modal / Page"]}
        rows={DRAWER_BEST_PRACTICE_ROWS.map((row) => ({
          scenario: row.scenario,
          value: row.drawer,
          desc: `${row.modal} · ${row.page}`,
        }))}
        keyField="scenario"
      />
      <ShowcaseCard title="多层嵌套" description="子流程在上一层之上打开，关闭子层不关闭父层。">
        <NestedUserDrawerFlow />
      </ShowcaseCard>
    </div>
  );
}

export function DrawerVsModalShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ShowcaseCard title="Drawer VS Modal">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>轻量确认 → Modal</li>
          <li>复杂编辑 → Drawer</li>
          <li>详情查看 → Drawer</li>
          <li>多步骤流程 → Drawer（或独立页）</li>
        </ul>
      </ShowcaseCard>
      <ShowcaseCard title="最佳实践">
        <p className="text-sm text-muted-foreground">
          抽屉从边缘滑入，保留页面上下文；对话框居中阻断，适合短操作。根据内容量与是否需要参照背景选择组件。
        </p>
      </ShowcaseCard>
    </div>
  );
}

export function InteractiveBasicDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Drawer 示例</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size="md"
        title="编辑采购申请"
        description="Drawer 从右侧滑入，不阻断列表页上下文"
        status="草稿"
        statusTone="default"
        footer={
          <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
        }
      >
        <ProcurementFormBody />
      </Drawer>
    </>
  );
}

export function DrawerBasicShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <ShowcaseCard title="Basic" description="右侧抽屉 · Esc / 遮罩关闭 · 圆角 6px">
      <Button onClick={() => setOpen(true)}>打开 Basic Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="基础抽屉"
        description="与 Modal 一致的交互规范"
        footer={
          <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
        }
      >
        <ProcurementFormBody />
      </Drawer>
    </ShowcaseCard>
  );
}

const PLACEMENTS: DrawerPlacement[] = ["right", "left", "top", "bottom"];

export function DrawerPlacementShowcase() {
  const [active, setActive] = useState<DrawerPlacement>("right");
  const [open, setOpen] = useState(false);
  return (
    <ShowcaseCard title="Placement" description="Left / Right / Top / Bottom 四向滑出">
      <div className="mb-4 flex flex-wrap gap-2">
        {PLACEMENTS.map((p) => (
          <Button
            key={p}
            variant={active === p ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(p)}
          >
            {p}
          </Button>
        ))}
        <Button size="sm" onClick={() => setOpen(true)}>
          打开 {active}
        </Button>
      </div>
      <Drawer
        open={open}
        placement={active}
        onClose={() => setOpen(false)}
        title={`${active} Drawer`}
        size="sm"
        footer={
          <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
        }
      >
        当前方向：{active}
      </Drawer>
    </ShowcaseCard>
  );
}

export function DrawerNestedShowcase() {
  return (
    <ShowcaseCard title="Nested" description="多层嵌套 · level 控制 z-index 与内缩">
      <NestedUserDrawerFlow />
    </ShowcaseCard>
  );
}

export function DrawerLoadingShowcase() {
  return (
    <ShowcaseCard title="Loading">
      <ScrollPreview minWidth={drawerSizeSpecs.md.width}>
        <Drawer
          inline
          open
          title="保存中"
          loading
          footer={<DrawerFooter loading onCancel={() => undefined} onOk={() => undefined} />}
        >
          内容区 Loading 遮罩，Footer 按钮同步 loading。
        </Drawer>
      </ScrollPreview>
    </ShowcaseCard>
  );
}

export function DrawerCustomFooterShowcase() {
  return (
    <ShowcaseCard title="Custom Footer">
      <ScrollPreview minWidth={drawerSizeSpecs.md.width}>
        <Drawer
          inline
          open
          title="发布配置"
          footer={
            <DrawerFooter>
              <Button variant="outline" size="default">
                存草稿
              </Button>
              <Button variant="outline" size="default">
                预览
              </Button>
              <Button size="default">发布</Button>
            </DrawerFooter>
          }
        >
          完全自定义 Footer 按钮组合。
        </Drawer>
      </ScrollPreview>
    </ShowcaseCard>
  );
}

export function DrawerPushShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <ShowcaseCard title="Push" description="推开主内容区，需包裹 DrawerPushContainer">
      <DrawerPushContainer className="min-h-[200px] rounded-md border border-dashed border-[color:var(--drawer-border-color)] bg-[color:var(--color-surface-card-soft)] p-6">
        <p className="mb-4 text-sm text-[color:var(--drawer-text-color)]">
          打开抽屉时，主内容向右 margin 推开（480px / md）。
        </p>
        <Button onClick={() => setOpen(true)}>Push 打开</Button>
        <Drawer
          open={open}
          push
          onClose={() => setOpen(false)}
          title="Push 模式"
          footer={
            <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
          }
        >
          push 与 placement 联动。
        </Drawer>
      </DrawerPushContainer>
    </ShowcaseCard>
  );
}

export function DrawerCustomHeaderShowcase() {
  return (
    <ShowcaseCard title="Custom Header">
      <ScrollPreview minWidth={drawerSizeSpecs.md.width}>
        <Drawer
          inline
          open
          header={
            <DrawerHeader showClose onClose={() => undefined}>
              <div className="flex w-full items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[color:var(--drawer-title-color)]">
                    导入数据
                  </p>
                  <p className="text-xs text-[color:var(--color-text-tertiary)]">步骤 2 / 3</p>
                </div>
                <span
                  className="rounded-[var(--drawer-radius)] px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(22, 93, 255, 0.08)",
                    color: "var(--drawer-brand-color)",
                  }}
                >
                  进行中
                </span>
              </div>
            </DrawerHeader>
          }
          footer={<DrawerFooter onCancel={() => undefined} onOk={() => undefined} />}
        >
          通过 header 属性自定义标题区结构。
        </Drawer>
      </ScrollPreview>
    </ShowcaseCard>
  );
}
