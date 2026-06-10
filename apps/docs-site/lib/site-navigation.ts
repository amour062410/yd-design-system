export type SiteNavItem = {
  href: string;
  label: string;
  /** Match pathname prefix, e.g. /components */
  match?: "exact" | "prefix";
};

export const siteNavigation: SiteNavItem[] = [
  { href: "/", label: "首页", match: "exact" },
  { href: "/components", label: "组件", match: "prefix" },
  { href: "/business-components", label: "业务组件", match: "prefix" },
  { href: "/business-showcase", label: "业务展示", match: "prefix" },
  { href: "/foundations/tokens", label: "基础规范", match: "prefix" },
  { href: "/#features", label: "资源", match: "exact" },
  { href: "/#about", label: "关于", match: "exact" },
];

export const componentsEntryHref = "/components";
export const businessComponentsEntryHref = "/business-components";
export const businessShowcaseEntryHref = "/business-showcase";
