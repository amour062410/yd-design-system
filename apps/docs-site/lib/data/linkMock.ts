import type { LinkState, LinkStatus } from "@yd-ds/ui/link";

export const LINK_USAGE_TEXT = "链接的基本样式。";

export const LINK_STATUSES: { status: LinkStatus; label: string }[] = [
  { status: "default", label: "品牌蓝" },
  { status: "warning", label: "警告橙" },
  { status: "danger", label: "危险红" },
  { status: "success", label: "成功绿" },
];

export const LINK_STATES: { state: LinkState; label: string }[] = [
  { state: "default", label: "选中" },
  { state: "hover", label: "Hover" },
  { state: "active", label: "点击" },
  { state: "disabled", label: "禁用" },
];

export const LINK_GROUPS = [
  { key: "basic", title: "基础文字链接", showIcon: false, iconPosition: "right" as const },
  { key: "left", title: "icon + 文字（前置）", showIcon: true, iconPosition: "left" as const },
  { key: "right", title: "icon + 文字（后置）", showIcon: true, iconPosition: "right" as const },
];

export const LINK_CODE_EXAMPLE = `import { Link } from "@yd-ds/ui/link";

<Link href="#">
  Link Text
</Link>`;
