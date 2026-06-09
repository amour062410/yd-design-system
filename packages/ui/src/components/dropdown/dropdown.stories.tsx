import { Button } from "../button";
import { Dropdown, DropdownLink, type DropdownMenuItem } from "./index";
import { Edit, Trash2, User } from "lucide-react";

export default {
  title: "YD Design System/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
};

const basicMenu: DropdownMenuItem[] = [
  { key: "1", label: "第一项" },
  { key: "2", label: "第二项" },
  { key: "3", label: "第三项" },
];

const actionMenu: DropdownMenuItem[] = [
  { key: "edit", label: "编辑" },
  { key: "copy", label: "复制" },
  { key: "delete", label: "删除", danger: true },
];

/** Ant 基本：Link + 下拉箭头 */
export const LinkBasic = {
  render: () => (
    <DropdownLink menu={basicMenu}>Hover me</DropdownLink>
  ),
};

/** 1 基础 Dropdown（Button） */
export const Basic = {
  render: () => (
    <Dropdown trigger={<Button variant="secondary">更多操作</Button>} menu={actionMenu} />
  ),
};

/** 2 Hover 触发 */
export const HoverTrigger = {
  render: () => (
    <Dropdown
      trigger={<Button variant="secondary">悬停展开</Button>}
      menu={actionMenu}
      triggerEvent="hover"
    />
  ),
};

/** 3 Click 触发 */
export const ClickTrigger = {
  render: () => (
    <Dropdown
      trigger={<Button>点击展开</Button>}
      menu={actionMenu}
      triggerEvent="click"
    />
  ),
};

/** 4 带图标 */
export const WithIcons = {
  render: () => (
    <Dropdown
      trigger={<Button variant="secondary">带图标</Button>}
      menu={[
        { key: "profile", label: "个人中心", icon: <User size={14} /> },
        { key: "edit", label: "编辑", icon: <Edit size={14} /> },
      ]}
    />
  ),
};

/** 5 Danger Item */
export const DangerItem = {
  render: () => (
    <Dropdown
      trigger={<Button variant="secondary">危险操作</Button>}
      menu={[{ key: "delete", label: "删除", danger: true }]}
    />
  ),
};

/** 6 Divider */
export const Divider = {
  render: () => (
    <Dropdown
      trigger={<Button variant="secondary">分割线</Button>}
      menu={[
        { key: "edit", label: "编辑" },
        { type: "divider" },
        { key: "delete", label: "删除", danger: true },
      ]}
    />
  ),
};

/** 7 Disabled */
export const Disabled = {
  render: () => (
    <Dropdown
      trigger={<Button disabled>禁用</Button>}
      menu={actionMenu}
      disabled
    />
  ),
};

/** 8 Placement 展示 */
export const Placements = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-16">
      {(["bottomLeft", "bottomRight", "topLeft", "topRight"] as const).map(
        (placement) => (
          <Dropdown
            key={placement}
            placement={placement}
            trigger={<Button variant="secondary">{placement}</Button>}
            menu={actionMenu}
          />
        )
      )}
    </div>
  ),
};

/** 9 长菜单展示 */
export const LongMenu = {
  render: () => (
    <Dropdown
      trigger={<Button variant="secondary">长菜单</Button>}
      menu={Array.from({ length: 12 }, (_, index) => ({
        key: `item-${index + 1}`,
        label: `菜单项 ${index + 1}`,
      }))}
    />
  ),
};

/** 10 Table 行操作场景 —— 见 business-patterns/table */
export const TableRowActionHint = {
  render: () => (
    <div className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
      Table 行操作请使用{" "}
      <code className="text-foreground">RowActionDropdown</code>（
      <code>@yd-ds/ui/business-patterns/table</code>）。
    </div>
  ),
};
