export type BusinessPatternNavItem = {
  href: string;
  label: string;
  labelZh: string;
  ready?: boolean;
};

export const businessPatternNavigation: BusinessPatternNavItem[] = [
  {
    href: "/business-patterns/certificate-management",
    label: "Certificate Management",
    labelZh: "证照管理",
    ready: true,
  },
];

export const readyBusinessPatternNavigation = businessPatternNavigation.filter(
  (item) => item.ready
);

export function formatBusinessPatternNavLabel(item: BusinessPatternNavItem) {
  return `${item.label} ${item.labelZh}`;
}

export function matchesBusinessPatternSearch(
  item: BusinessPatternNavItem,
  query: string
) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const slug = item.href.replace("/business-patterns/", "");
  return (
    item.label.toLowerCase().includes(q) ||
    item.labelZh.includes(query.trim()) ||
    slug.includes(q.replace(/\s+/g, "-"))
  );
}

export const businessPatternsEntryHref =
  "/business-patterns/certificate-management";
