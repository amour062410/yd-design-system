export const MENU_INTRO =
  "Menu（导航菜单）用于企业后台的一级/二级页面导航，支持 Horizontal 顶部导航与 Vertical 侧边栏两种模式，提供子菜单展开、侧边栏收缩与水平溢出折叠能力。";

export const MENU_OVERVIEW_POINTS = [
  "Horizontal：一级模块切换，选中下划线高亮，项过多自动折叠",
  "Vertical：二级功能导航，左侧选中指示条 + 子菜单缩进",
  "collapsed：收缩为图标模式，hover 展示 Tooltip",
  "items 配置驱动，适用于云盯巡检后台导航场景",
];

export const MENU_CODE_EXAMPLE = `import { Menu } from "@yd-ds/ui/menu";

<Menu
  mode="vertical"
  items={[
    { key: "assign", label: "任务分配" },
    {
      key: "records",
      label: "巡检记录",
      children: [
        { key: "daily", label: "日常巡检" },
        { key: "special", label: "专项巡检" },
      ],
    },
  ]}
  selectedKeys={selectedKeys}
  openKeys={openKeys}
  onSelect={(info) => setSelectedKeys(info.selectedKeys)}
  onOpenChange={setOpenKeys}
/>`;

export const MENU_USAGE_TOKEN_NAMES = [
  "menu-item-height",
  "menu-item-padding-inline",
  "menu-icon-size",
  "menu-collapsed-width",
  "menu-highlight-color",
  "menu-highlight-bg",
  "menu-hover-bg",
  "menu-active-bar-width-vertical",
  "menu-active-bar-width-horizontal",
  "menu-sub-menu-inline-indent",
];

export const MENU_DEMO_CODES = {
  horizontal: `import { Menu } from "@yd-ds/ui/menu";

<Menu
  mode="horizontal"
  items={topNavItems}
  selectedKeys={[activeModule]}
  onSelect={(info) => setActiveModule(info.key)}
/>`,
  vertical: `import { Menu } from "@yd-ds/ui/menu";

<Menu
  mode="vertical"
  items={sidebarItems}
  selectedKeys={selectedKeys}
  openKeys={openKeys}
  onSelect={(info) => setSelectedKeys(info.selectedKeys)}
  onOpenChange={setOpenKeys}
/>`,
  collapsed: `import { Menu } from "@yd-ds/ui/menu";

<Menu
  mode="vertical"
  collapsed
  items={sidebarItems}
  selectedKeys={selectedKeys}
  onSelect={(info) => setSelectedKeys(info.selectedKeys)}
/>`,
  business: `import { Menu } from "@yd-ds/ui/menu";

<div className="flex min-h-[420px]">
  <Menu mode="vertical" collapsed={collapsed} items={sidebarItems} ... />
  <main>...</main>
</div>`,
};
