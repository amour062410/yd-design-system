import { useState } from "react";
import { Button } from "../button";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerPushContainer,
  NestedUserDrawerFlow,
} from "./drawer";

export default {
  title: "YD Design System/Drawer",
  component: Drawer,
  parameters: { layout: "padded" },
};

export const Basic = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开抽屉</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="基础抽屉"
          footer={
            <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
          }
        >
          右侧滑出，支持 Esc 与遮罩关闭。
        </Drawer>
      </>
    );
  },
};

export const Placement = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["right", "left", "top", "bottom"] as const).map((p) => (
        <Drawer key={p} inline open placement={p} title={p} size="sm">
          {p} placement
        </Drawer>
      ))}
    </div>
  ),
};

export const Nested = {
  render: () => <NestedUserDrawerFlow />,
};

export const Loading = {
  render: () => (
    <Drawer inline open title="提交中" loading footer={<DrawerFooter loading />}>
      处理中…
    </Drawer>
  ),
};

export const CustomFooter = {
  render: () => (
    <Drawer
      inline
      open
      title="发布"
      footer={
        <DrawerFooter>
          <Button variant="outline">草稿</Button>
          <Button>发布</Button>
        </DrawerFooter>
      }
    >
      自定义 Footer 按钮。
    </Drawer>
  ),
};

export const Push = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <DrawerPushContainer className="rounded-md border bg-muted/30 p-6">
        <p className="mb-4 text-sm">主内容区在抽屉打开时向右推开（push）。</p>
        <Button onClick={() => setOpen(true)}>Push 打开</Button>
        <Drawer
          open={open}
          push
          onClose={() => setOpen(false)}
          title="Push 模式"
          size="md"
          footer={
            <DrawerFooter onCancel={() => setOpen(false)} onOk={() => setOpen(false)} />
          }
        >
          与 Ant Design push 行为一致。
        </Drawer>
      </DrawerPushContainer>
    );
  },
};

export const CustomHeader = {
  render: () => (
    <Drawer
      inline
      open
      header={
        <DrawerHeader showClose onClose={() => undefined}>
          <div className="flex w-full items-center justify-between">
            <span className="font-semibold">自定义 Header</span>
            <span className="text-xs text-muted-foreground">步骤 1/3</span>
          </div>
        </DrawerHeader>
      }
      footer={<DrawerFooter onCancel={() => undefined} onOk={() => undefined} />}
    >
      header 属性可完全自定义标题区。
    </Drawer>
  ),
};
