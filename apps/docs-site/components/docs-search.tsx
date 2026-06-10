"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@yd-ds/ui";
import {
  formatBusinessShowcaseNavLabel,
  businessShowcaseNavigation,
} from "@/lib/business-showcase-navigation";
import {
  formatComponentNavLabel,
  matchesComponentSearch,
  readyComponentNavigation,
} from "@/lib/component-navigation";
import {
  formatBusinessComponentNavLabel,
  matchesBusinessComponentSearch,
  readyBusinessComponentsNavigation,
} from "@/lib/business-components-navigation";
import {
  formatFoundationNavLabel,
  matchesFoundationSearch,
  readyFoundationNavigation,
} from "@/lib/foundation-navigation";

type SearchResult = {
  href: string;
  label: string;
  group: "组件" | "业务组件" | "业务展示" | "基础规范";
};

function buildSearchCatalog(): SearchResult[] {
  return [
    ...readyComponentNavigation.map((item) => ({
      href: item.href,
      label: formatComponentNavLabel(item),
      group: "组件" as const,
    })),
    ...readyBusinessComponentsNavigation.map((item) => ({
      href: item.href,
      label: formatBusinessComponentNavLabel(item),
      group: "业务组件" as const,
    })),
    ...businessShowcaseNavigation
      .filter((item) => item.ready !== false)
      .map((item) => ({
        href: item.href,
        label: formatBusinessShowcaseNavLabel(item),
        group: "业务展示" as const,
      })),
    ...readyFoundationNavigation.map((item) => ({
      href: item.href,
      label: formatFoundationNavLabel(item),
      group: "基础规范" as const,
    })),
  ];
}

function matchesSearchItem(item: SearchResult, query: string) {
  if (!query.trim()) return true;
  const componentItem = readyComponentNavigation.find((c) => c.href === item.href);
  if (componentItem) return matchesComponentSearch(componentItem, query);
  const businessComponentItem = readyBusinessComponentsNavigation.find(
    (c) => c.href === item.href
  );
  if (businessComponentItem) return matchesBusinessComponentSearch(businessComponentItem, query);
  const showcaseItem = businessShowcaseNavigation.find((p) => p.href === item.href);
  if (showcaseItem) return item.label.toLowerCase().includes(query.trim().toLowerCase());
  const foundationItem = readyFoundationNavigation.find((f) => f.href === item.href);
  if (foundationItem) return matchesFoundationSearch(foundationItem, query);
  return item.label.toLowerCase().includes(query.trim().toLowerCase());
}

export function DocsSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const catalog = useMemo(() => buildSearchCatalog(), []);

  const results = useMemo(() => {
    const list = catalog.filter((item) => matchesSearchItem(item, query));
    return query.trim() ? list : catalog;
  }, [catalog, query]);

  const navigateTo = useCallback(
    (item: SearchResult) => {
      router.push(item.href);
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
    },
    [router]
  );

  const openSearch = useCallback(() => {
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSearch]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, closeSearch]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev === 0 ? Math.max(results.length - 1, 0) : prev - 1
      );
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      navigateTo(results[activeIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          "flex h-9 items-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-3 transition-all duration-200",
          open
            ? "w-[220px] border-primary/30 bg-background shadow-sm sm:w-[280px]"
            : "w-auto hover:border-primary/30 hover:bg-muted/70"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索页面…"
            className="min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-sm leading-5 outline-none placeholder:text-muted-foreground"
            aria-label="搜索文档"
            aria-expanded={open}
            aria-controls="docs-search-results"
            role="combobox"
            aria-autocomplete="list"
          />
        ) : (
          <button
            type="button"
            onClick={openSearch}
            className="flex min-w-0 flex-1 items-center gap-2 text-sm leading-5 text-muted-foreground hover:text-foreground"
            aria-label="搜索文档"
          >
            <span className="hidden sm:inline">搜索</span>
            <kbd className="hidden rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">
              ⌘K
            </kbd>
          </button>
        )}
      </div>

      {open ? (
        <ul
          id="docs-search-results"
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[320px] w-[220px] overflow-y-auto rounded-lg bg-background p-1.5 shadow-panel sm:w-[280px]"
        >
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              未找到匹配页面
            </li>
          ) : (
            results.map((item, index) => (
              <li key={item.href} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => navigateTo(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                    index === activeIndex
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  <span className="min-w-0 truncate">{item.label}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.group}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
