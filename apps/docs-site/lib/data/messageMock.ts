export const MESSAGE_INTRO =
  "Message 用于轻量级全局反馈，在页面顶部或角落以浮层形式短暂展示操作结果，不打断用户当前任务流。";

export const MESSAGE_USAGE =
  "通过 message.success / info / warning / error / loading 或 message.open 触发；需在应用根节点挂载 MessageProvider。";

export const MESSAGE_WHEN_TO_USE = [
  "保存、提交、删除等操作成功反馈",
  "表单校验失败或接口错误提示",
  "网络异常、权限不足等系统级告警",
  "后台任务处理中（loading）",
] as const;

export const MESSAGE_TYPE_SAMPLES = [
  {
    type: "success" as const,
    content: "保存成功",
    color: "#00B42A",
    iconLabel: "✓",
  },
  {
    type: "info" as const,
    content: "系统正在处理中",
    color: "#165DFF",
    iconLabel: "i",
  },
  {
    type: "warning" as const,
    content: "部分数据未填写",
    color: "#FF7D00",
    iconLabel: "⚠",
  },
  {
    type: "error" as const,
    content: "提交失败，请重试",
    color: "#F53F3F",
    iconLabel: "✕",
  },
] as const;

export const MESSAGE_POSITION_OPTIONS = [
  { position: "top" as const, label: "Top" },
  { position: "topLeft" as const, label: "Top Left" },
  { position: "topRight" as const, label: "Top Right" },
  { position: "bottom" as const, label: "Bottom" },
  { position: "bottomRight" as const, label: "Bottom Right" },
  { position: "bottomLeft" as const, label: "Bottom Left" },
] as const;

export const MESSAGE_LONG_CONTENT = {
  title: "同步任务已完成",
  content: "共处理 128 条门店证照记录",
  description: "其中 3 条因图片模糊需人工复核，可在证照管理中查看详情。",
  actionLabel: "查看详情",
} as const;

export const MESSAGE_LOADING_COPY = "正在上传文件...";

export const MESSAGE_CODE_EXAMPLE = `import { message } from "@yd-ds/ui/message";

// 成功
message.success("保存成功");

// 带位置与关闭
message.error("提交失败，请重试", {
  position: "topRight",
  closable: true,
  duration: 5000,
});

// 长内容
message.open({
  type: "info",
  title: "同步任务已完成",
  content: "共处理 128 条记录",
  description: "3 条需人工复核",
  action: <a href="/detail">查看详情</a>,
});

// 加载（需手动 message.close）
const id = message.loading("正在上传文件...");
message.close(id);`;

export const MESSAGE_USAGE_TOKEN_NAMES = [
  "message-min-height",
  "message-max-width",
  "message-radius",
  "message-shadow",
  "message-padding-x",
  "message-padding-y",
  "message-icon-size",
] as const;
