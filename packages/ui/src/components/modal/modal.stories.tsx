import { useState } from "react";
import { Button } from "../button";
import {
  ConfirmModal,
  Modal,
  ModalFooter,
  ModalHeader,
} from "./modal";

export default {
  title: "YD Design System/Modal",
  component: Modal,
  parameters: { layout: "padded" },
};

function Demo({ children }: { children: (api: { open: boolean; setOpen: (v: boolean) => void }) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开</Button>
      {children({ open, setOpen })}
    </>
  );
}

export const Basic = {
  render: () => (
    <Demo>
      {({ open, setOpen }) => (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="基础对话框"
          footer={
            <ModalFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
          }
        >
          用于确认操作或展示简短信息，支持 Esc 与遮罩关闭。
        </Modal>
      )}
    </Demo>
  ),
};

export const Confirm = {
  render: () => (
    <Demo>
      {({ open, setOpen }) => (
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          type="warning"
          content="确定要提交当前审批吗？"
          onOk={() => setOpen(false)}
        />
      )}
    </Demo>
  ),
};

export const Success = {
  render: () => (
    <ConfirmModal inline open type="success" title="操作成功" content="数据已保存。" />
  ),
};

export const Error = {
  render: () => (
    <ConfirmModal inline open type="error" content="删除后不可恢复，请确认。" />
  ),
};

export const Loading = {
  render: () => (
    <Modal
      inline
      open
      title="提交中"
      loading
      footer={<ModalFooter loading okText="提交" />}
    >
      正在处理请求，请稍候…
    </Modal>
  ),
};

export const CustomFooter = {
  render: () => (
    <Modal
      inline
      open
      title="自定义 Footer"
      footer={
        <ModalFooter>
          <Button variant="outline">草稿</Button>
          <Button variant="outline">预览</Button>
          <Button>发布</Button>
        </ModalFooter>
      }
    >
      Footer 可完全自定义按钮组合。
    </Modal>
  ),
};

export const CustomHeader = {
  render: () => (
    <Modal
      inline
      open
      header={
        <ModalHeader showClose onClose={() => undefined}>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-semibold text-[color:var(--modal-info-color)]">
              自定义 Header
            </span>
            <span className="text-xs text-muted-foreground">步骤 2 / 3</span>
          </div>
        </ModalHeader>
      }
      footer={<ModalFooter onCancel={() => undefined} onOk={() => undefined} />}
    >
      通过 header 属性传入任意 React 节点。
    </Modal>
  ),
};
