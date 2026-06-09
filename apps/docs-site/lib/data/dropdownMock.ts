import { dropdownUsageTokenNames } from "@yd-ds/tokens";

export const DROPDOWN_INTRO =
  "Dropdown（下拉菜单）用于收纳一组操作或导航项，常见于表格行操作、工具栏「更多」等场景。组件对齐云盯真实业务场景：click / hover 触发、四向 placement、图标 / 分割线 / 危险项，键盘 ↑↓ Enter Esc 导航；视觉复用 YD Popover 阴影与 Select 选项态。";

export const DROPDOWN_TYPE_LABELS = [
  { key: "link", label: "Link Trigger", description: "Ant 基本用法：链接 + 下拉箭头，默认 hover 触发" },
  { key: "basic", label: "Basic", description: "Button 触发，默认 click 弹出" },
  { key: "hover", label: "Hover", description: "悬停触发，适合工具栏快捷操作" },
  { key: "icons", label: "With Icons", description: "菜单项前置图标" },
  { key: "danger", label: "Danger", description: "危险操作项使用 danger 色" },
  { key: "divider", label: "Divider", description: "type: divider 分割线" },
  { key: "disabled", label: "Disabled", description: "禁用整个 Dropdown" },
] as const;

export const DROPDOWN_PLACEMENTS = [
  "bottomLeft",
  "bottomRight",
  "topLeft",
  "topRight",
] as const;

export const DROPDOWN_CODE_EXAMPLE = `import { Dropdown, DropdownLink } from "@yd-ds/ui/dropdown";

// Ant 基本：Link + 下拉箭头（默认 hover）
<DropdownLink
  menu={[
    { key: "1", label: "第一项" },
    { key: "2", label: "第二项" },
    { key: "3", label: "第三项" },
  ]}
>
  Hover me
</DropdownLink>

// 或组合 DropdownLinkTrigger
import { DropdownLinkTrigger } from "@yd-ds/ui/dropdown";

<Dropdown
  trigger={<DropdownLinkTrigger>Hover me</DropdownLinkTrigger>}
  triggerEvent="hover"
  menu={[...]}
/>

// Button 触发
import { Button } from "@yd-ds/ui/button";

<Dropdown
  trigger={<Button variant="secondary">更多操作</Button>}
  menu={[
    { key: "edit", label: "编辑" },
    { type: "divider" },
    { key: "delete", label: "删除", danger: true },
  ]}
/>`;

export const ROW_ACTION_CODE_EXAMPLE = `import { RowActionDropdown } from "@yd-ds/ui/business-patterns/table";

// 表格操作列规范：「更多」文案 + 16×16 下拉箭头，点击展开菜单
<RowActionDropdown
  onView={() => {}}
  onEdit={() => {}}
  onDelete={() => {}}
/>`;

export { dropdownUsageTokenNames as DROPDOWN_USAGE_TOKEN_NAMES };
