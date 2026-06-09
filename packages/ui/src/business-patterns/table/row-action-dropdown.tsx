"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import {
  Dropdown,
  DropdownTableActionTrigger,
  type DropdownMenuItem,
} from "../../components/dropdown";

export type RowActionDropdownProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  /** 触发器文案，默认「更多」 */
  label?: string;
};

export function RowActionDropdown({
  onView,
  onEdit,
  onDelete,
  disabled,
  label = "更多",
}: RowActionDropdownProps) {
  const menu: DropdownMenuItem[] = [
    onView
      ? {
          key: "view",
          label: "查看",
          icon: <Eye size={14} />,
          onClick: onView,
        }
      : null,
    onEdit
      ? {
          key: "edit",
          label: "编辑",
          icon: <Edit size={14} />,
          onClick: onEdit,
        }
      : null,
    onView || onEdit ? { type: "divider", key: "actions-divider" } : null,
    onDelete
      ? {
          key: "delete",
          label: "删除",
          icon: <Trash2 size={14} />,
          danger: true,
          onClick: onDelete,
        }
      : null,
  ].filter(Boolean) as DropdownMenuItem[];

  if (!menu.length) return null;

  return (
    <Dropdown
      trigger={<DropdownTableActionTrigger>{label}</DropdownTableActionTrigger>}
      menu={menu}
      placement="bottomRight"
      disabled={disabled}
    />
  );
}
