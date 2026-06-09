import { popconfirmUsageTokenNames } from "@yd-ds/tokens";

export const POPCONFIRM_INTRO =
  "Popconfirm（气泡确认框）用于轻量级二次确认，替代低价值 Modal，常见于删除、状态切换、批量操作等云盯后台场景。组件对齐云盯真实业务场景，支持 placement、danger、loading、受控模式与 async confirm。";

export const POPCONFIRM_TYPE_LABELS = [
  { key: "basic", label: "Basic", description: "最简 title + 确认 / 取消" },
  { key: "description", label: "With Description", description: "标题 + 描述文案" },
  { key: "danger", label: "Danger", description: "危险确认，确认按钮 danger 风格" },
  { key: "loading", label: "Loading", description: "确认中 loading，防重复点击" },
  { key: "controlled", label: "Controlled", description: "open / onOpenChange 受控" },
] as const;

export const POPCONFIRM_PLACEMENTS = [
  "top",
  "bottom",
  "left",
  "right",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
] as const;

export const POPCONFIRM_CODE_EXAMPLE = `import { Popconfirm } from "@yd-ds/ui/popconfirm";
import { Button } from "@yd-ds/ui/button";

<Popconfirm
  title="确认删除该员工？"
  description="删除后无法恢复"
  danger
  onConfirm={handleDelete}
  onCancel={handleCancel}
>
  <Button variant="destructive">删除</Button>
</Popconfirm>`;

export const DELETE_CONFIRM_CODE = `import { DeleteConfirm } from "@yd-ds/ui/business-patterns/feedback";

<DeleteConfirm onConfirm={deleteUser}>
  <Button variant="destructive">删除</Button>
</DeleteConfirm>`;

export const STATUS_SWITCH_CODE = `import { StatusSwitchConfirm } from "@yd-ds/ui/business-patterns/feedback";

<StatusSwitchConfirm action="disable" onConfirm={handleDisable}>
  <Button variant="outline">禁用</Button>
</StatusSwitchConfirm>`;

export const BATCH_ACTION_CODE = `import { BatchActionConfirm } from "@yd-ds/ui/business-patterns/feedback";

<BatchActionConfirm count={25} actionLabel="删除" danger onConfirm={batchDelete}>
  <Button variant="destructive">批量删除</Button>
</BatchActionConfirm>`;

export { popconfirmUsageTokenNames as POPCONFIRM_USAGE_TOKEN_NAMES };
