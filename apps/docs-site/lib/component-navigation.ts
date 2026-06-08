export type ComponentNavItem = {
  href: string;
  label: string;
  labelZh: string;
  /** Set false until the component is migrated */
  ready?: boolean;
};

export const componentNavigation: ComponentNavItem[] = [
  { href: "/components/date-picker", label: "Date Picker", labelZh: "日期选择器", ready: true },
  { href: "/components/time-picker", label: "Time Picker", labelZh: "时间选择器", ready: true },
  { href: "/components/button", label: "Button", labelZh: "按钮", ready: true },
  { href: "/components/link", label: "Link", labelZh: "链接", ready: true },
  { href: "/components/select", label: "Select", labelZh: "选择器", ready: true },
  { href: "/components/input", label: "Input", labelZh: "输入框", ready: true },
  { href: "/components/radio", label: "Radio", labelZh: "单选框", ready: true },
  { href: "/components/checkbox", label: "Checkbox", labelZh: "复选框", ready: true },
  { href: "/components/switch", label: "Switch", labelZh: "开关", ready: true },
  { href: "/components/tabs", label: "Tabs", labelZh: "标签页", ready: true },
  { href: "/components/tag", label: "Tag", labelZh: "标签", ready: true },
  { href: "/components/badge", label: "Badge", labelZh: "徽标", ready: true },
  { href: "/components/progress", label: "Progress", labelZh: "进度条", ready: true },
  { href: "/components/statistic", label: "Statistic", labelZh: "统计数值", ready: true },
  { href: "/components/empty", label: "Empty", labelZh: "空状态", ready: true },
  { href: "/components/steps", label: "Steps", labelZh: "步骤条", ready: true },
  { href: "/components/collapse", label: "Collapse", labelZh: "折叠面板", ready: true },
  { href: "/components/cascader", label: "Cascader", labelZh: "级联选择", ready: false },
  { href: "/components/upload", label: "Upload", labelZh: "上传", ready: true },
  { href: "/components/table", label: "Table", labelZh: "表格", ready: true },
  { href: "/components/modal", label: "Modal", labelZh: "对话框", ready: true },
  { href: "/components/drawer", label: "Drawer", labelZh: "抽屉", ready: true },
  { href: "/components/message", label: "Message", labelZh: "消息提示", ready: true },
  { href: "/components/card", label: "Card", labelZh: "卡片", ready: true },
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
