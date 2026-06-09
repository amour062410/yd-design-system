"use client";

import type { MenuItemConfig } from "@yd-ds/ui/menu";
import {
  BarChart3,
  Building2,
  ClipboardList,
  Home,
  Settings,
  Shield,
  Store,
  Users,
} from "lucide-react";

export const TOP_NAV_ITEMS: MenuItemConfig[] = [
  { key: "home", label: "首页", icon: <Home size={16} /> },
  { key: "inspection", label: "巡检管理", icon: <ClipboardList size={16} /> },
  { key: "store", label: "门店管理", icon: <Store size={16} /> },
  { key: "report", label: "报表中心", icon: <BarChart3 size={16} /> },
  { key: "settings", label: "系统设置", icon: <Settings size={16} /> },
  { key: "extra-1", label: "权限中心", icon: <Shield size={16} /> },
  { key: "extra-2", label: "组织管理", icon: <Building2 size={16} /> },
  { key: "extra-3", label: "人员管理", icon: <Users size={16} /> },
];

export const SIDEBAR_INSPECTION_ITEMS: MenuItemConfig[] = [
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

export const SIDEBAR_STORE_ITEMS: MenuItemConfig[] = [
  { key: "store-list", label: "门店列表" },
  { key: "store-group", label: "门店分组" },
  { key: "store-config", label: "门店配置" },
];

export const PERMISSION_MENU_ITEMS: MenuItemConfig[] = [
  { key: "admin", label: "超级管理员", type: "group" },
  { key: "admin-dashboard", label: "控制台", icon: <Home size={16} /> },
  { key: "admin-settings", label: "系统设置", icon: <Settings size={16} /> },
  { key: "manager", label: "区域经理", type: "group" },
  { key: "manager-inspection", label: "巡检管理", icon: <ClipboardList size={16} /> },
  { key: "manager-store", label: "门店管理", icon: <Store size={16} /> },
  { key: "inspector", label: "巡检员", type: "group" },
  { key: "inspector-task", label: "我的任务", icon: <ClipboardList size={16} /> },
];

export const COLLAPSED_SIDEBAR_ITEMS: MenuItemConfig[] = [
  { key: "home", label: "首页", icon: <Home size={16} /> },
  { key: "inspection", label: "巡检管理", icon: <ClipboardList size={16} /> },
  { key: "store", label: "门店管理", icon: <Store size={16} /> },
  { key: "report", label: "报表中心", icon: <BarChart3 size={16} /> },
  { key: "settings", label: "系统设置", icon: <Settings size={16} /> },
];
