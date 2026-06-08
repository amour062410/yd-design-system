"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@yd-ds/ui";
import { Button } from "@yd-ds/ui/button";
import {
  ApprovalModal,
  ConfirmModal,
  DetailModal,
  FormModal,
  FullscreenModal,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFrame,
  ModalHeader,
  UploadModal,
  type ModalSize,
} from "@yd-ds/ui/modal";
import { modalSizeSpecs } from "@yd-ds/tokens";
import {
  DELETE_MODAL_CONTENT,
  MODAL_BEST_PRACTICE_COMPARE,
  MODAL_BEST_PRACTICE_DRAWER,
  MODAL_BEST_PRACTICE_MODAL,
  MODAL_PATTERN_SPEC_ROWS,
  MODAL_SPACING_SPEC_ROWS,
  MODAL_STRUCTURE_SPEC_ROWS,
  MODAL_VISUAL_SPEC_ROWS,
  WARNING_MODAL_CONTENT,
} from "@/lib/data/modalMock";

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
  columns,
  rows,
  keyField = "token",
}: {
  columns: [string, string, string];
  rows: readonly { [key: string]: string }[];
  keyField?: "token" | "part" | "pattern";
}) {
  const [c0, c1, c2] = columns;
  const resolvedKey =
    keyField === "token" && rows[0]?.part
      ? "part"
      : keyField === "token" && rows[0]?.pattern
        ? "pattern"
        : keyField;

  return (
    <div className="overflow-x-auto rounded-md border border-[color:var(--modal-border-color)]">
      <table className="w-full min-w-[520px] text-left text-[13px]">
        <thead>
          <tr
            className="border-b border-[color:var(--table-header-border-color)]"
            style={{ backgroundColor: "var(--table-header-bg)" }}
          >
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              {c0}
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              {c1}
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              {c2}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={String(row[resolvedKey])}
              className="border-b border-[color:var(--modal-border-color)] last:border-0"
            >
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--modal-info-color)]">
                {row[resolvedKey]}
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

function ScrollPreview({
  children,
  minWidth,
}: {
  children: React.ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-md bg-[color:var(--color-surface-page)] p-6">
      <div className="mx-auto" style={{ minWidth: minWidth ?? "100%", width: "fit-content" }}>
        {children}
      </div>
    </div>
  );
}

function InlinePreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center rounded-md bg-[color:var(--color-surface-page)] p-6">
      {children}
    </div>
  );
}

const STATUS_DIALOG_SHOWCASE = [
  {
    title: "Info Dialog",
    description: "信息 · 单按钮",
    type: "info" as const,
    modalTitle: "同步完成",
    content: "已成功同步 128 条组织架构数据，其中 2 条因编码冲突需人工处理。",
  },
  {
    title: "Error Dialog",
    description: "错误 · 危险确定",
    type: "error" as const,
    modalTitle: "删除失败",
    content: DELETE_MODAL_CONTENT,
  },
  {
    title: "Warning Dialog",
    description: "警示 · 双按钮",
    type: "warning" as const,
    modalTitle: "切换环境",
    content: WARNING_MODAL_CONTENT,
  },
  {
    title: "Success Dialog",
    description: "成功 · 双按钮",
    type: "success" as const,
    modalTitle: "发布成功",
    content: "版本 v2.4.0 已发布至生产环境，预计 3 分钟内全量生效。",
  },
] as const;

function DefaultAndStatusModalShowcase({
  defaultTitle = "Default Modal",
  defaultDescription = "表单内容 · 取消 / 确定 · 横向拉通展示",
  modalTitle = "提交预算审批",
}: {
  defaultTitle?: string;
  defaultDescription?: string;
  modalTitle?: string;
}) {
  return (
    <div className="space-y-8">
      <ShowcaseCard title={defaultTitle} description={defaultDescription}>
        <div className="w-full rounded-md bg-[color:var(--color-surface-page)] p-6">
          <ModalFrame fullWidth size="lg" type="default" title={modalTitle} />
        </div>
      </ShowcaseCard>

      <div className="grid gap-6 md:grid-cols-2">
        {STATUS_DIALOG_SHOWCASE.map((dialog) => (
          <ShowcaseCard
            key={dialog.type}
            title={dialog.title}
            description={dialog.description}
          >
            <InlinePreview>
              <ModalFrame
                type={dialog.type}
                title={dialog.modalTitle}
                content={dialog.content}
              />
            </InlinePreview>
          </ShowcaseCard>
        ))}
      </div>
    </div>
  );
}

export function ModalBestPracticeShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ShowcaseCard title="使用 Modal">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {MODAL_BEST_PRACTICE_MODAL.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[color:var(--modal-info-color)]">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ShowcaseCard>
      <ShowcaseCard title="使用 Drawer">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {MODAL_BEST_PRACTICE_DRAWER.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[color:var(--modal-warning-color)]">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ShowcaseCard>
      <div className="lg:col-span-2">
        <SpecTable
          columns={["场景", "Modal", "Drawer"]}
          rows={MODAL_BEST_PRACTICE_COMPARE.map((row) => ({
            part: row.scenario,
            value: row.modal,
            desc: row.drawer,
          }))}
          keyField="part"
        />
      </div>
    </div>
  );
}

export function ModalFigmaShowcase() {
  return <DefaultAndStatusModalShowcase />;
}

export function ModalSizesShowcase() {
  const sizes = Object.entries(modalSizeSpecs).filter(
    ([key]) => key !== "fullscreen"
  ) as [Exclude<ModalSize, "fullscreen">, (typeof modalSizeSpecs)[Exclude<ModalSize, "fullscreen">]][];

  return (
    <div className="space-y-6">
      {sizes.map(([key, spec]) => (
        <ShowcaseCard
          key={key}
          title={spec.label}
          description={`宽度 ${spec.width} · 同内容对比尺寸差异`}
        >
          <ScrollPreview minWidth={spec.width}>
            <ModalFrame size={key} title={`${spec.label} · 编辑采购申请`} />
          </ScrollPreview>
        </ShowcaseCard>
      ))}
    </div>
  );
}

export function ModalFullscreenShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ShowcaseCard
        title="Fullscreen Modal"
        description="企业后台复杂配置：多区块表单 + 可滚动 Body + 全屏尺寸"
      >
        <div className="space-y-4">
          <Button onClick={() => setOpen(true)}>打开全屏配置</Button>
          <ScrollPreview minWidth="100%">
            <FullscreenModal inline open previewHeight="480px" />
          </ScrollPreview>
        </div>
      </ShowcaseCard>
      <FullscreenModal open={open} onClose={() => setOpen(false)} onSave={() => setOpen(false)} />
    </>
  );
}

export function ModalTypesShowcase() {
  return (
    <DefaultAndStatusModalShowcase
      defaultTitle="Default"
      defaultDescription="默认类型 · 标题 + 表单 + 取消 / 确定"
      modalTitle="弹窗标题"
    />
  );
}

export function ModalStatesShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {(
        [
          { state: "default" as const, title: "Default", text: "请确认是否提交本次采购申请，提交后将进入审批流程。" },
          { state: "hover" as const, title: "Hover", text: "鼠标悬停时取消按钮描边变品牌色，主按钮背景加深。" },
          { state: "loading" as const, title: "Loading", text: "正在提交审批，请勿关闭窗口…" },
          { state: "disabled" as const, title: "Disabled", text: "必填项未完成，暂不可提交。" },
        ] as const
      ).map(({ state, title, text }) => (
        <ShowcaseCard key={state} title={title}>
          <InlinePreview>
            <Modal
              inline
              open
              size="sm"
              title="提交确认"
              footer={
                <ModalFooter
                  showcaseState={state}
                  onCancel={() => undefined}
                  onOk={() => undefined}
                />
              }
            >
              {text}
            </Modal>
          </InlinePreview>
        </ShowcaseCard>
      ))}
    </div>
  );
}

export function ModalFooterPatternsShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ShowcaseCard title="单按钮">
        <InlinePreview>
          <ConfirmModal
            inline
            open
            type="info"
            title="导出完成"
            content="报表已生成，共 1,024 条记录，可在下载中心查看。"
            showCancel={false}
            okText="知道了"
          />
        </InlinePreview>
      </ShowcaseCard>
      <ShowcaseCard title="双按钮">
        <InlinePreview>
          <ConfirmModal
            inline
            open
            type="warning"
            title="停用账号"
            content="停用后该用户将无法登录系统，是否继续？"
          />
        </InlinePreview>
      </ShowcaseCard>
      <ShowcaseCard title="危险操作">
        <InlinePreview>
          <ConfirmModal
            inline
            open
            type="error"
            title="删除部门"
            content={DELETE_MODAL_CONTENT}
            okText="删除"
            showCancel
          />
        </InlinePreview>
      </ShowcaseCard>
      <ShowcaseCard title="自定义 Footer">
        <InlinePreview>
          <Modal
            inline
            open
            size="md"
            title="批量导出"
            footer={
              <ModalFooter>
                <Button variant="outline" size="default">
                  预览
                </Button>
                <Button variant="outline" size="default">
                  取消
                </Button>
                <Button size="default">导出 Excel</Button>
              </ModalFooter>
            }
          >
            已选择 24 条记录，导出字段：姓名、部门、状态、创建时间。
          </Modal>
        </InlinePreview>
      </ShowcaseCard>
    </div>
  );
}

export function ModalContentPatternsShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ShowcaseCard title="文本内容">
        <InlinePreview>
          <ConfirmModal
            inline
            open
            type="warning"
            title="风险提示"
            content={WARNING_MODAL_CONTENT}
          />
        </InlinePreview>
      </ShowcaseCard>
      <ShowcaseCard title="表单内容">
        <ScrollPreview minWidth={modalSizeSpecs.md.width}>
          <FormModal inline open title="新增用户" />
        </ScrollPreview>
      </ShowcaseCard>
      <ShowcaseCard title="详情内容">
        <ScrollPreview minWidth={modalSizeSpecs.md.width}>
          <DetailModal inline open title="用户详情" />
        </ScrollPreview>
      </ShowcaseCard>
      <ShowcaseCard title="复杂内容">
        <ScrollPreview minWidth="100%">
          <FullscreenModal inline open previewHeight="360px" title="权限配置" />
        </ScrollPreview>
      </ShowcaseCard>
    </div>
  );
}

function PatternInlineCard({
  pattern,
  description,
  children,
}: {
  pattern: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <ShowcaseCard title={pattern} description={description}>
      {children}
    </ShowcaseCard>
  );
}

export function ModalPatternShowcase() {
  return (
    <div className="space-y-8">
      <PatternInlineCard
        pattern="Pattern 01 · Delete Modal"
        description="Small 400px · 危险操作二次确认 · 取消 + 删除"
      >
        <InlinePreview>
          <ConfirmModal
            inline
            open
            type="error"
            title="删除用户"
            content={DELETE_MODAL_CONTENT}
            okText="删除"
            showCancel
          />
        </InlinePreview>
      </PatternInlineCard>

      <PatternInlineCard
        pattern="Pattern 02 · Form Modal"
        description="Medium 600px · 新增 / 编辑 · 双列表单"
      >
        <ScrollPreview minWidth={modalSizeSpecs.md.width}>
          <FormModal inline open title="新增用户" />
        </ScrollPreview>
      </PatternInlineCard>

      <PatternInlineCard
        pattern="Pattern 03 · Detail Modal"
        description="Medium 600px · 只读详情 · Descriptions 两列"
      >
        <ScrollPreview minWidth={modalSizeSpecs.md.width}>
          <DetailModal inline open title="用户详情" />
        </ScrollPreview>
      </PatternInlineCard>

      <PatternInlineCard
        pattern="Pattern 04 · Upload Modal"
        description="Medium 600px · 证照 / 附件上传 · 拖拽 + 文件列表"
      >
        <ScrollPreview minWidth={modalSizeSpecs.md.width}>
          <UploadModal inline open />
        </ScrollPreview>
      </PatternInlineCard>

      <PatternInlineCard
        pattern="Pattern 05 · Approval Modal"
        description="Small 400px · 审批意见 + 驳回 / 通过"
      >
        <InlinePreview>
          <ApprovalModal inline open />
        </InlinePreview>
      </PatternInlineCard>

      <PatternInlineCard
        pattern="Pattern 06 · Warning Modal"
        description="Small 400px · 不可逆操作前警示"
      >
        <InlinePreview>
          <ConfirmModal
            inline
            open
            type="warning"
            title="切换环境"
            content={WARNING_MODAL_CONTENT}
          />
        </InlinePreview>
      </PatternInlineCard>

      <PatternInlineCard
        pattern="Pattern 07 · Fullscreen Modal"
        description="Fullscreen · 多区块复杂配置 · 可滚动 Body"
      >
        <ScrollPreview minWidth="100%">
          <FullscreenModal inline open previewHeight="420px" />
        </ScrollPreview>
      </PatternInlineCard>
    </div>
  );
}

function PatternTrigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="outline" size="default" onClick={onClick}>
      {label}
    </Button>
  );
}

export function ModalBusinessPatternsShowcase() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  return (
    <>
      <ShowcaseCard description="点击按钮体验 Portal 模式真实业务对话框">
        <div className="flex flex-wrap gap-3">
          <PatternTrigger label="Delete Modal" onClick={() => setDeleteOpen(true)} />
          <PatternTrigger label="Form Modal" onClick={() => setFormOpen(true)} />
          <PatternTrigger label="Detail Modal" onClick={() => setDetailOpen(true)} />
          <PatternTrigger label="Upload Modal" onClick={() => setUploadOpen(true)} />
          <PatternTrigger label="Approval Modal" onClick={() => setApprovalOpen(true)} />
          <PatternTrigger label="Warning Modal" onClick={() => setWarningOpen(true)} />
          <PatternTrigger label="Fullscreen Modal" onClick={() => setFullscreenOpen(true)} />
        </div>
      </ShowcaseCard>

      <ConfirmModal
        open={deleteOpen}
        type="error"
        title="删除用户"
        content={DELETE_MODAL_CONTENT}
        okText="删除"
        showCancel
        onClose={() => setDeleteOpen(false)}
        onOk={() => setDeleteOpen(false)}
      />
      <FormModal
        open={formOpen}
        title="新增用户"
        onClose={() => setFormOpen(false)}
        onSubmit={() => setFormOpen(false)}
      />
      <DetailModal open={detailOpen} onClose={() => setDetailOpen(false)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <ApprovalModal open={approvalOpen} onClose={() => setApprovalOpen(false)} />
      <ConfirmModal
        open={warningOpen}
        type="warning"
        title="切换环境"
        content={WARNING_MODAL_CONTENT}
        onClose={() => setWarningOpen(false)}
        onOk={() => setWarningOpen(false)}
      />
      <FullscreenModal
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        onSave={() => setFullscreenOpen(false)}
      />
    </>
  );
}

export function ModalPatternSpecShowcase() {
  return (
    <SpecTable
      columns={["Pattern", "Size / Footer", "说明"]}
      rows={MODAL_PATTERN_SPEC_ROWS.map((row) => ({
        part: row.pattern,
        value: `${row.size} · ${row.footer}`,
        desc: row.desc,
      }))}
      keyField="part"
    />
  );
}

export function ModalDesignSpecShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Structure</h3>
        <SpecTable
          columns={["区域", "规格", "说明"]}
          rows={[...MODAL_STRUCTURE_SPEC_ROWS]}
          keyField="part"
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Spacing</h3>
        <SpecTable
          columns={["Token", "Value", "说明"]}
          rows={[...MODAL_SPACING_SPEC_ROWS]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Shadow · Motion · Mask</h3>
        <SpecTable
          columns={["属性", "Value", "说明"]}
          rows={[...MODAL_VISUAL_SPEC_ROWS]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Header", value: "52px hug · 标题 + 关闭 / 状态图标" },
          { label: "Body", value: "Header ↓ 24px ↓ 内容" },
          { label: "Footer", value: "56px · 右对齐 · 8px 按钮间距" },
        ].map((item) => (
          <div key={item.label} className="rounded-md border bg-card px-4 py-3">
            <p className="text-xs font-medium text-foreground">{item.label}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InteractiveDefaultModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Form Modal</Button>
      <FormModal
        open={open}
        title="编辑采购申请"
        onClose={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
      />
    </>
  );
}

export function ModalPartsPreview() {
  return (
    <ShowcaseCard description="ModalHeader / ModalBody / ModalFooter 可独立组合">
      <ScrollPreview minWidth={modalSizeSpecs.md.width}>
        <div
          className="w-full overflow-hidden rounded-[var(--modal-radius)] border border-[color:var(--modal-border-color)] bg-[color:var(--modal-bg)] shadow-[var(--modal-shadow)]"
          style={{ maxWidth: modalSizeSpecs.md.width }}
        >
          <ModalHeader title="组合示例" onClose={() => undefined} />
          <ModalBody>
            当前申请金额 ¥128,600，关联项目「2024 服务器扩容」，提交后将流转至部门负责人审批。
          </ModalBody>
          <ModalFooter onCancel={() => undefined} onOk={() => undefined} />
        </div>
      </ScrollPreview>
    </ShowcaseCard>
  );
}

function ModalTriggerDemo({
  label,
  children,
}: {
  label: string;
  children: (api: { open: boolean; close: () => void }) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      {children({ open, close: () => setOpen(false) })}
    </>
  );
}

export function ModalBasicShowcase() {
  return (
    <ShowcaseCard title="Basic" description="基础对话框 · Esc / 遮罩关闭 · 圆角 6px">
      <ModalTriggerDemo label="打开 Basic Modal">
        {({ open, close }) => (
          <Modal
            open={open}
            onClose={close}
            size="md"
            title="基础对话框"
            maskClosable
            keyboard
            footer={<ModalFooter onCancel={close} onOk={close} />}
          >
            用于在当前页面之上展示需用户确认或操作的内容，风格与 Button / Input / Select / Tabs 一致。
          </Modal>
        )}
      </ModalTriggerDemo>
    </ShowcaseCard>
  );
}

export function ModalConfirmShowcase() {
  return (
    <ShowcaseCard title="Confirm" description="ConfirmModal · 双按钮确认">
      <ModalTriggerDemo label="打开 Confirm">
        {({ open, close }) => (
          <ConfirmModal
            open={open}
            onClose={close}
            type="info"
            title="提交审批"
            content="确定将当前采购申请提交至部门负责人吗？"
            showCancel
            onOk={close}
          />
        )}
      </ModalTriggerDemo>
    </ShowcaseCard>
  );
}

export function ModalSuccessShowcase() {
  return (
    <ShowcaseCard title="Success">
      <ScrollPreview minWidth={modalSizeSpecs.sm.width}>
        <ConfirmModal
          inline
          open
          type="success"
          title="保存成功"
          content="配置已更新，约 1 分钟内在全集群生效。"
          showCancel={false}
        />
      </ScrollPreview>
    </ShowcaseCard>
  );
}

export function ModalErrorShowcase() {
  return (
    <ShowcaseCard title="Error">
      <ModalTriggerDemo label="打开 Error Modal">
        {({ open, close }) => (
          <ConfirmModal
            open={open}
            onClose={close}
            type="error"
            title="删除记录"
            content={DELETE_MODAL_CONTENT}
            okText="删除"
            showCancel
            onOk={close}
          />
        )}
      </ModalTriggerDemo>
    </ShowcaseCard>
  );
}

export function ModalLoadingShowcase() {
  return (
    <ShowcaseCard title="Loading" description="内容区 loading 遮罩 + Footer 按钮 loading">
      <ScrollPreview minWidth={modalSizeSpecs.md.width}>
        <Modal
          inline
          open
          title="正在提交"
          loading
          footer={<ModalFooter loading okText="提交" onOk={() => undefined} onCancel={() => undefined} />}
        >
          请求处理中，请勿关闭窗口…
        </Modal>
      </ScrollPreview>
    </ShowcaseCard>
  );
}

export function ModalCustomFooterShowcase() {
  return (
    <ShowcaseCard title="Custom Footer">
      <ScrollPreview minWidth={modalSizeSpecs.md.width}>
        <Modal
          inline
          open
          title="发布配置"
          footer={
            <ModalFooter>
              <Button variant="outline" size="default">
                存草稿
              </Button>
              <Button variant="outline" size="default">
                预览
              </Button>
              <Button size="default">发布</Button>
            </ModalFooter>
          }
        >
          Footer 支持完全自定义按钮组合与顺序。
        </Modal>
      </ScrollPreview>
    </ShowcaseCard>
  );
}

export function ModalCustomHeaderShowcase() {
  return (
    <ShowcaseCard title="Custom Header" description="header 属性传入自定义标题区">
      <ScrollPreview minWidth={modalSizeSpecs.md.width}>
        <Modal
          inline
          open
          header={
            <ModalHeader showClose onClose={() => undefined}>
              <div className="flex w-full items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[color:var(--modal-title-color)]">
                    导入用户数据
                  </p>
                  <p className="text-xs text-[color:var(--modal-text-color)]">
                    步骤 2 / 3 · 字段映射
                  </p>
                </div>
                <span className="rounded-full bg-[color:var(--modal-slot-bg)] px-2 py-0.5 text-xs font-medium text-[color:var(--modal-info-color)]">
                  进行中
                </span>
              </div>
            </ModalHeader>
          }
          footer={<ModalFooter onCancel={() => undefined} onOk={() => undefined} okText="下一步" />}
        >
          通过 header 属性可插入步骤条、状态标签等自定义结构。
        </Modal>
      </ScrollPreview>
    </ShowcaseCard>
  );
}
