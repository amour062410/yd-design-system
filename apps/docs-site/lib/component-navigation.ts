export type ComponentCategory =
  | "general"
  | "layout"
  | "navigation"
  | "data-entry"
  | "data-display"
  | "feedback"
  | "business";

export type ComponentNavItem = {
  href: string;
  label: string;
  labelZh: string;
  /** Set false until the component is migrated */
  ready?: boolean;
  /** Category grouping (referencing Ant Design classification) */
  category: ComponentCategory;
};

export const componentCategoryOrder: ComponentCategory[] = [
  "general",
  "layout",
  "navigation",
  "data-entry",
  "data-display",
  "feedback",
  "business",
];

export const componentCategoryLabels: Record<ComponentCategory, string> = {
  general: "通用",
  layout: "布局",
  navigation: "导航",
  "data-entry": "数据录入",
  "data-display": "数据展示",
  feedback: "反馈",
  business: "业务组件",
};

export const componentNavigation: ComponentNavItem[] = [
  // ── 通用 ──
  { href: "/components/button", label: "Button", labelZh: "按钮", ready: true, category: "general" },
  { href: "/components/link", label: "Link", labelZh: "链接", ready: true, category: "general" },

  // ── 布局 ──
  { href: "/components/divider", label: "Divider", labelZh: "分割线", ready: true, category: "layout" },
  { href: "/components/card", label: "Card", labelZh: "卡片", ready: true, category: "layout" },
  { href: "/components/dashboard-section", label: "DashboardSection", labelZh: "仪表盘分区", ready: true, category: "layout" },

  // ── 导航 ──
  { href: "/components/menu", label: "Menu", labelZh: "导航菜单", ready: true, category: "navigation" },
  { href: "/components/dropdown", label: "Dropdown", labelZh: "下拉菜单", ready: true, category: "navigation" },
  { href: "/components/pagination", label: "Pagination", labelZh: "分页", ready: true, category: "navigation" },
  { href: "/components/steps", label: "Steps", labelZh: "步骤条", ready: true, category: "navigation" },
  { href: "/components/tabs", label: "Tabs", labelZh: "标签页", ready: true, category: "navigation" },

  // ── 数据录入 ──
  { href: "/components/input", label: "Input", labelZh: "输入框", ready: true, category: "data-entry" },
  { href: "/components/input-number", label: "InputNumber", labelZh: "数字输入框", ready: true, category: "data-entry" },
  { href: "/components/select", label: "Select", labelZh: "选择器", ready: true, category: "data-entry" },
  { href: "/components/cascader", label: "Cascader", labelZh: "级联选择", ready: true, category: "data-entry" },
  { href: "/components/checkbox", label: "Checkbox", labelZh: "复选框", ready: true, category: "data-entry" },
  { href: "/components/radio", label: "Radio", labelZh: "单选框", ready: true, category: "data-entry" },
  { href: "/components/switch", label: "Switch", labelZh: "开关", ready: true, category: "data-entry" },
  { href: "/components/date-picker", label: "DatePicker", labelZh: "日期选择器", ready: true, category: "data-entry" },
  { href: "/components/time-picker", label: "TimePicker", labelZh: "时间选择器", ready: true, category: "data-entry" },
  { href: "/components/upload", label: "Upload", labelZh: "上传", ready: true, category: "data-entry" },
  { href: "/components/form", label: "Form", labelZh: "表单", ready: true, category: "data-entry" },
  { href: "/components/transfer", label: "Transfer", labelZh: "穿梭框", ready: true, category: "data-entry" },
  { href: "/components/transfer-pro", label: "TransferPro", labelZh: "企业穿梭系统", ready: true, category: "data-entry" },

  // ── 数据展示 ──
  { href: "/components/table", label: "Table", labelZh: "表格", ready: true, category: "data-display" },
  { href: "/components/descriptions", label: "Descriptions", labelZh: "描述列表", ready: true, category: "data-display" },
  { href: "/components/tree", label: "Tree", labelZh: "树形控件", ready: true, category: "data-display" },
  { href: "/components/tag", label: "Tag", labelZh: "标签", ready: true, category: "data-display" },
  { href: "/components/badge", label: "Badge", labelZh: "徽标", ready: true, category: "data-display" },
  { href: "/components/statistic", label: "Statistic", labelZh: "统计数值", ready: true, category: "data-display" },
  { href: "/components/empty", label: "Empty", labelZh: "空状态", ready: true, category: "data-display" },
  { href: "/components/collapse", label: "Collapse", labelZh: "折叠面板", ready: true, category: "data-display" },
  { href: "/components/progress", label: "Progress", labelZh: "进度条", ready: true, category: "data-display" },
  { href: "/components/tooltip", label: "Tooltip", labelZh: "文字提示", ready: true, category: "data-display" },

  // ── 反馈 ──
  { href: "/components/modal", label: "Modal", labelZh: "对话框", ready: true, category: "feedback" },
  { href: "/components/drawer", label: "Drawer", labelZh: "抽屉", ready: true, category: "feedback" },
  { href: "/components/message", label: "Message", labelZh: "消息提示", ready: true, category: "feedback" },
  { href: "/components/popconfirm", label: "Popconfirm", labelZh: "气泡确认", ready: true, category: "feedback" },

  // ── 业务组件 ──
  { href: "/components/filter-bar", label: "FilterBar", labelZh: "业务筛选栏", ready: true, category: "business" },
];

export const readyComponentNavigation = componentNavigation.filter(
  (item) => item.ready
);

export function formatComponentNavLabel(item: ComponentNavItem) {
  return `${item.label} ${item.labelZh}`;
}

export function matchesComponentSearch(item: ComponentNavItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const slug = item.href.replace("/components/", "");
  return (
    item.label.toLowerCase().includes(q) ||
    item.labelZh.includes(query.trim()) ||
    slug.includes(q.replace(/\s+/g, "-"))
  );
}
