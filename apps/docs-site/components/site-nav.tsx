"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@yd-ds/ui";
import { siteNavigation } from "@/lib/site-navigation";

function isActive(pathname: string, href: string, match?: "exact" | "prefix") {
  if (href.startsWith("/#")) return false;
  if (match === "prefix") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href;
}

export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      aria-label="主导航"
    >
      {siteNavigation.map((item) => {
        const active = mounted && isActive(pathname, item.href, item.match);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
