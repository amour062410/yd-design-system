"use client";

import { useState } from "react";
import { Button } from "@yd-ds/ui/button";
import { Menu } from "@yd-ds/ui/menu";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import {
  MENU_DEMO_CODES,
} from "@/lib/data/menuMock";
import {
  COLLAPSED_SIDEBAR_ITEMS,
  PERMISSION_MENU_ITEMS,
  SIDEBAR_INSPECTION_ITEMS,
  SIDEBAR_STORE_ITEMS,
  TOP_NAV_ITEMS,
} from "@/lib/data/menuMockData";

const DEMO_FRAME =
  "overflow-hidden rounded-lg border border-[color:var(--menu-color-border,#f0f0f0)] bg-[var(--menu-color-bg,#fff)]";

export function MenuHorizontalShowcase() {
  const [selectedKey, setSelectedKey] = useState("home");

  return (
    <ComponentDemoBlock
      title="顶部导航"
      description="Horizontal 一级模块切换，选中 2px 下划线，项过多自动折叠为 ··· 溢出菜单。"
      code={MENU_DEMO_CODES.horizontal}
    >
      <div className={DEMO_FRAME}>
        <Menu
          mode="horizontal"
          items={TOP_NAV_ITEMS}
          selectedKeys={[selectedKey]}
          onSelect={(info) => setSelectedKey(info.key)}
        />
      </div>
    </ComponentDemoBlock>
  );
}

export function MenuVerticalShowcase() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["assign"]);
  const [openKeys, setOpenKeys] = useState<string[]>(["records"]);
  const [module, setModule] = useState<"inspection" | "store">("inspection");

  const items = module === "inspection" ? SIDEBAR_INSPECTION_ITEMS : SIDEBAR_STORE_ITEMS;

  return (
    <ComponentDemoBlock
      title="侧边栏导航"
      description="Vertical 二级功能导航，左侧 3px 选中指示条，子菜单缩进 24px。"
      code={MENU_DEMO_CODES.vertical}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button
            variant={module === "inspection" ? "default" : "secondary"}
            onClick={() => {
              setModule("inspection");
              setSelectedKeys(["assign"]);
              setOpenKeys(["records"]);
            }}
          >
            巡检管理
          </Button>
          <Button
            variant={module === "store" ? "default" : "secondary"}
            onClick={() => {
              setModule("store");
              setSelectedKeys(["store-list"]);
              setOpenKeys([]);
            }}
          >
            门店管理
          </Button>
        </div>
        <div className={`${DEMO_FRAME} max-w-[240px]`}>
          <Menu
            mode="vertical"
            items={items}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onSelect={(info) => setSelectedKeys(info.selectedKeys)}
            onOpenChange={setOpenKeys}
          />
        </div>
      </div>
    </ComponentDemoBlock>
  );
}

export function MenuCollapsedShowcase() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["inspection"]);

  return (
    <ComponentDemoBlock
      title="收缩侧边栏"
      description="collapsed 模式仅显示图标，hover 通过 Tooltip 展示完整菜单名。"
      code={MENU_DEMO_CODES.collapsed}
    >
      <div className="flex items-start gap-4">
        <div className={`${DEMO_FRAME} shrink-0`}>
          <Menu
            mode="vertical"
            collapsed={collapsed}
            items={COLLAPSED_SIDEBAR_ITEMS}
            selectedKeys={selectedKeys}
            onSelect={(info) => setSelectedKeys(info.selectedKeys)}
          />
        </div>
        <Button variant="secondary" onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? "展开侧边栏" : "收缩侧边栏"}
        </Button>
      </div>
    </ComponentDemoBlock>
  );
}

export function MenuBusinessShowcase() {
  const [collapsed, setCollapsed] = useState(false);
  const [topKey, setTopKey] = useState("inspection");
  const [sidebarKeys, setSidebarKeys] = useState<string[]>(["assign"]);
  const [openKeys, setOpenKeys] = useState<string[]>(["records"]);

  const sidebarItems =
    topKey === "store" ? SIDEBAR_STORE_ITEMS : SIDEBAR_INSPECTION_ITEMS;

  return (
    <ComponentDemoBlock
      title="云盯巡检后台布局"
      description="顶部一级模块 + 左侧二级功能 + 权限分组菜单，模拟真实后台导航密度。"
      code={MENU_DEMO_CODES.business}
    >
      <div className={`${DEMO_FRAME} overflow-hidden`}>
        <Menu
          mode="horizontal"
          items={TOP_NAV_ITEMS.slice(0, 5)}
          selectedKeys={[topKey]}
          onSelect={(info) => {
            setTopKey(info.key);
            setSidebarKeys(info.key === "store" ? ["store-list"] : ["assign"]);
            setOpenKeys(info.key === "store" ? [] : ["records"]);
          }}
        />
        <div className="flex min-h-[360px] border-t border-[color:var(--menu-color-border,#f0f0f0)]">
          <div className="shrink-0 border-r border-[color:var(--menu-color-border,#f0f0f0)]">
            <Menu
              mode="vertical"
              collapsed={collapsed}
              items={sidebarItems}
              selectedKeys={sidebarKeys}
              openKeys={openKeys}
              onSelect={(info) => setSidebarKeys(info.selectedKeys)}
              onOpenChange={setOpenKeys}
            />
          </div>
          <div className="min-w-0 flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h4 className="text-[15px] font-semibold text-[color:var(--menu-color-text,#1d2129)]">
                  内容区域
                </h4>
                <p className="mt-1 text-[13px] text-[color:var(--menu-color-text-secondary,#86909c)]">
                  当前模块：{topKey} / {sidebarKeys[0]}
                </p>
              </div>
              <Button variant="secondary" onClick={() => setCollapsed((prev) => !prev)}>
                {collapsed ? "展开" : "收缩"}
              </Button>
            </div>
            <div className="max-w-[320px]">
              <p className="mb-3 text-[13px] font-medium text-[color:var(--menu-color-text,#1d2129)]">
                权限菜单预览
              </p>
              <Menu
                mode="vertical"
                items={PERMISSION_MENU_ITEMS}
                defaultSelectedKeys={["admin-dashboard"]}
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentDemoBlock>
  );
}

export function MenuShowcaseGrid() {
  return (
    <div className="flex flex-col gap-12">
      <MenuHorizontalShowcase />
      <MenuVerticalShowcase />
      <MenuCollapsedShowcase />
      <MenuBusinessShowcase />
    </div>
  );
}
