import Link from "next/link";
import { Github } from "lucide-react";
import { DocsSearch } from "./docs-search";
import { SiteLogo } from "./site-logo";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <SiteLogo priority variant="header" />

        <SiteNav className="hidden justify-center md:flex" />

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <DocsSearch />
          <ThemeToggle />
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </Link>
        </div>
        </div>
        <SiteNav className="-mx-1 flex gap-0.5 overflow-x-auto border-t border-border/30 py-2 md:hidden" />
      </div>
    </header>
  );
}
