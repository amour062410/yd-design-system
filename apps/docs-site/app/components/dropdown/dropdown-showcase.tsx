"use client";

import { useState } from "react";
import { Button } from "@yd-ds/ui/button";
import {
  Dropdown,
  DropdownLink,
  type DropdownMenuItem,
  type DropdownPlacement,
} from "@yd-ds/ui/dropdown";
import { RowActionDropdown } from "@yd-ds/ui/business-patterns/table";
import { Edit, Trash2, User } from "lucide-react";
import {
  DROPDOWN_PLACEMENTS,
  DROPDOWN_TYPE_LABELS,
} from "@/lib/data/dropdownMock";

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

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-6 py-6 md:px-8">
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function DropdownTypesShowcase() {
  const [lastKey, setLastKey] = useState("—");

  return (
    <div className="space-y-6">
      <DemoCard
        title={DROPDOWN_TYPE_LABELS[0].label}
        description={DROPDOWN_TYPE_LABELS[0].description}
      >
        <DropdownLink menu={basicMenu} onMenuClick={(key) => setLastKey(key)}>
          Hover me
        </DropdownLink>
      </DemoCard>

      <DemoCard
        title={DROPDOWN_TYPE_LABELS[1].label}
        description={DROPDOWN_TYPE_LABELS[1].description}
      >
        <Dropdown
          trigger={<Button variant="secondary">更多操作</Button>}
          menu={actionMenu}
          onMenuClick={(key) => setLastKey(key)}
        />
      </DemoCard>

      <DemoCard
        title={DROPDOWN_TYPE_LABELS[2].label}
        description={DROPDOWN_TYPE_LABELS[2].description}
      >
        <Dropdown
          trigger={<Button variant="secondary">悬停展开</Button>}
          menu={actionMenu}
          triggerEvent="hover"
        />
      </DemoCard>

      <DemoCard title="Click Trigger" description="默认 click 触发">
        <Dropdown
          trigger={<Button>点击展开</Button>}
          menu={actionMenu}
          triggerEvent="click"
        />
      </DemoCard>

      <DemoCard
        title={DROPDOWN_TYPE_LABELS[3].label}
        description={DROPDOWN_TYPE_LABELS[3].description}
      >
        <Dropdown
          trigger={<Button variant="secondary">带图标</Button>}
          menu={[
            { key: "profile", label: "个人中心", icon: <User size={14} /> },
            { key: "edit", label: "编辑", icon: <Edit size={14} /> },
          ]}
        />
      </DemoCard>

      <DemoCard
        title={DROPDOWN_TYPE_LABELS[4].label}
        description={DROPDOWN_TYPE_LABELS[4].description}
      >
        <Dropdown
          trigger={<Button variant="secondary">危险操作</Button>}
          menu={[{ key: "delete", label: "删除", icon: <Trash2 size={14} />, danger: true }]}
        />
      </DemoCard>

      <DemoCard
        title={DROPDOWN_TYPE_LABELS[5].label}
        description={DROPDOWN_TYPE_LABELS[5].description}
      >
        <Dropdown
          trigger={<Button variant="secondary">分割线</Button>}
          menu={[
            { key: "edit", label: "编辑" },
            { type: "divider" },
            { key: "delete", label: "删除", danger: true },
          ]}
        />
      </DemoCard>

      <DemoCard
        title={DROPDOWN_TYPE_LABELS[6].label}
        description={DROPDOWN_TYPE_LABELS[6].description}
      >
        <Dropdown
          disabled
          trigger={<Button disabled>禁用</Button>}
          menu={actionMenu}
        />
      </DemoCard>

      <p className="text-xs text-muted-foreground">最近点击：{lastKey}</p>
    </div>
  );
}

export function DropdownPlacementShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-6 text-xs text-muted-foreground">四向弹出 · bottomLeft / bottomRight / topLeft / topRight</p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {DROPDOWN_PLACEMENTS.map((placement) => (
          <div key={placement} className="flex flex-col items-center gap-2">
            <Dropdown
              placement={placement as DropdownPlacement}
              trigger={<Button variant="secondary">{placement}</Button>}
              menu={actionMenu}
            />
            <span className="text-[11px] text-muted-foreground">{placement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DropdownLongMenuShowcase() {
  return (
    <DemoCard title="Long Menu" description="长列表滚动由视口自动约束">
      <Dropdown
        trigger={<Button variant="secondary">长菜单</Button>}
        menu={Array.from({ length: 12 }, (_, index) => ({
          key: `item-${index + 1}`,
          label: `菜单项 ${index + 1}`,
        }))}
      />
    </DemoCard>
  );
}

export function DropdownTableRowShowcase() {
  return (
    <DemoCard
      title="Table Row Action"
      description="业务封装 RowActionDropdown · 表格操作列「更多」+ 16×16 下拉箭头 · 查看 / 编辑 / 删除（删除默认 danger）"
    >
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">门店名称</th>
              <th className="px-4 py-2.5 font-medium">状态</th>
              <th className="px-4 py-2.5 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3">西湖银泰店</td>
              <td className="px-4 py-3 text-muted-foreground">营业中</td>
              <td className="px-4 py-3">
                <RowActionDropdown
                  onView={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DemoCard>
  );
}
