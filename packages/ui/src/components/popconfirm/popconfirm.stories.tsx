import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../button";
import { Popconfirm } from "./index";

export default {
  title: "YD Design System/Popconfirm",
  component: Popconfirm,
  parameters: { layout: "centered" },
};

export const Basic = {
  render: () => (
    <Popconfirm title="确认删除该员工？" onConfirm={() => {}}>
      <Button variant="destructive">删除</Button>
    </Popconfirm>
  ),
};

export const WithDescription = {
  render: () => (
    <Popconfirm
      title="确认删除该员工？"
      description="删除后无法恢复"
      onConfirm={() => {}}
    >
      <Button variant="destructive">删除</Button>
    </Popconfirm>
  ),
};

export const DangerMode = {
  render: () => (
    <Popconfirm title="确认删除？" description="此操作不可撤销" danger onConfirm={() => {}}>
      <Button variant="outline">危险确认</Button>
    </Popconfirm>
  ),
};

export const LoadingState = {
  render: () => (
    <Popconfirm title="提交中" loading onConfirm={() => {}}>
      <Button>Loading</Button>
    </Popconfirm>
  ),
};

export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popconfirm
        open={open}
        onOpenChange={setOpen}
        title="受控模式"
        description="open / onOpenChange"
        onConfirm={() => setOpen(false)}
      >
        <Button variant="secondary">受控 Popconfirm</Button>
      </Popconfirm>
    );
  },
};

export const PlacementShowcase = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-20">
      {(
        [
          "top",
          "bottom",
          "left",
          "right",
          "topLeft",
          "topRight",
          "bottomLeft",
          "bottomRight",
        ] as const
      ).map((placement) => (
        <Popconfirm
          key={placement}
          placement={placement}
          title={`Placement ${placement}`}
          onConfirm={() => {}}
        >
          <Button variant="secondary">{placement}</Button>
        </Popconfirm>
      ))}
    </div>
  ),
};

export const CustomIcon = {
  render: () => (
    <Popconfirm
      title="自定义图标"
      icon={<AlertTriangle size={18} className="text-primary" />}
      onConfirm={() => {}}
    >
      <Button variant="secondary">Custom Icon</Button>
    </Popconfirm>
  ),
};

export const Disabled = {
  render: () => (
    <Popconfirm title="不会弹出" disabled onConfirm={() => {}}>
      <Button disabled>Disabled</Button>
    </Popconfirm>
  ),
};

export const LongContent = {
  render: () => (
    <Popconfirm
      title="确认归档这批巡检记录？"
      description="归档后数据仍可在历史记录中查询，但不再出现在默认列表与统计看板中，请确认业务影响范围。"
      onConfirm={() => {}}
    >
      <Button variant="secondary">长文案</Button>
    </Popconfirm>
  ),
};

export const AsyncConfirm = {
  render: () => (
    <Popconfirm
      title="异步确认"
      description="点击确认后模拟 1.5s 请求"
      onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1500))}
    >
      <Button>Async Confirm</Button>
    </Popconfirm>
  ),
};
