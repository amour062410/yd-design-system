import type { Meta, StoryObj } from "@storybook/react";
import { BarChart3, Home, Settings, Store } from "lucide-react";
import { Menu } from "./menu";

const horizontalItems = [
  { key: "home", label: "首页", icon: <Home size={16} /> },
  { key: "inspection", label: "巡检管理", icon: <Store size={16} /> },
  { key: "store", label: "门店管理" },
  { key: "report", label: "报表中心", icon: <BarChart3 size={16} /> },
  { key: "settings", label: "系统设置", icon: <Settings size={16} /> },
];

const verticalItems = [
  { key: "assign", label: "任务分配" },
  { key: "plan", label: "巡检计划" },
  {
    key: "records",
    label: "巡检记录",
    children: [
      { key: "daily", label: "日常巡检" },
      { key: "special", label: "专项巡检" },
    ],
  },
  { key: "issue", label: "问题整改" },
];

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  args: {
    items: verticalItems,
    defaultSelectedKeys: ["assign"],
    defaultOpenKeys: ["records"],
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Vertical: Story = {
  args: {
    mode: "vertical",
  },
};

export const Horizontal: Story = {
  args: {
    mode: "horizontal",
    items: horizontalItems,
    defaultSelectedKeys: ["home"],
  },
};

export const Collapsed: Story = {
  args: {
    mode: "vertical",
    collapsed: true,
    items: verticalItems,
    defaultSelectedKeys: ["assign"],
  },
};

export const DarkTheme: Story = {
  args: {
    mode: "vertical",
    theme: "dark",
  },
  decorators: [
    (Story) => (
      <div className="dark rounded-lg bg-[#020817] p-4">
        <Story />
      </div>
    ),
  ],
};
