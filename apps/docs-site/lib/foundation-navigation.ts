export type FoundationNavItem = {
  href: string;
  label: string;
  labelZh: string;
  ready?: boolean;
};

export const foundationNavigation: FoundationNavItem[] = [
  { href: "/foundations/colors", label: "Colors", labelZh: "色彩", ready: true },
  { href: "/foundations/text", label: "Text", labelZh: "文字", ready: true },
  { href: "/foundations/container", label: "Container", labelZh: "容器", ready: true },
  { href: "/foundations/grid", label: "Grid", labelZh: "栅格", ready: true },
  { href: "/foundations/tokens", label: "Design Tokens", labelZh: "设计令牌", ready: true },
];

export const readyFoundationNavigation = foundationNavigation.filter(
  (item) => item.ready
);

export function formatFoundationNavLabel(item: FoundationNavItem) {
  return `${item.label} ${item.labelZh}`;
}

export function matchesFoundationSearch(item: FoundationNavItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const slug = item.href.replace("/foundations/", "");
  return (
    item.label.toLowerCase().includes(q) ||
    item.labelZh.includes(query.trim()) ||
    slug.includes(q.replace(/\s+/g, "-"))
  );
}
