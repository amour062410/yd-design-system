export type ShowcaseNavItem = {
  href: string;
  label: string;
  labelZh: string;
  ready?: boolean;
};

export const showcaseNavigation: ShowcaseNavItem[] = [
  {
    href: "/showcase/store-management",
    label: "Store Management",
    labelZh: "区域门店管理",
    ready: true,
  },
  {
    href: "/showcase/inspection-rule-config",
    label: "Inspection Rule Config",
    labelZh: "巡检规则配置",
    ready: true,
  },
];

export const showcaseEntryHref = "/showcase/store-management";

export function formatShowcaseNavLabel(item: ShowcaseNavItem) {
  return `${item.label} ${item.labelZh}`;
}
