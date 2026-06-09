"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { createSelectInfo, MenuContext, type MenuContextValue } from "./menu-context";
import { MenuGroup } from "./menu-group";
import { MenuItem } from "./menu-item";
import { MenuSubMenu } from "./menu-sub-menu";
import {
  menuCssVars,
  menuOverflowItemClass,
  menuOverflowPanelClass,
  menuOverflowTriggerClass,
  menuRootClass,
} from "./menu.tokens";
import type { MenuItemConfig, MenuProps } from "./menu.types";

function resolveItemType(item: MenuItemConfig): "item" | "group" | "subMenu" {
  if (item.type) return item.type;
  if (item.children?.length) return "subMenu";
  return "item";
}

function renderVerticalItems(
  items: MenuItemConfig[],
  level = 0,
  keyPath: string[] = []
): ReactNode {
  return items.map((item) => {
    const type = resolveItemType(item);
    const nextPath = [...keyPath, item.key];

    if (type === "group") {
      return <MenuGroup key={item.key} title={item.label} />;
    }

    if (type === "subMenu" && item.children?.length) {
      return (
        <MenuSubMenu
          key={item.key}
          itemKey={item.key}
          label={item.label}
          icon={item.icon}
          disabled={item.disabled}
          level={level}
        >
          {renderVerticalItems(item.children, level + 1, nextPath)}
        </MenuSubMenu>
      );
    }

    return (
      <MenuItem
        key={item.key}
        itemKey={item.key}
        label={item.label}
        icon={item.icon}
        disabled={item.disabled}
        level={level}
        keyPath={nextPath}
      />
    );
  });
}

function HorizontalOverflowMenu({
  items,
  selectedKeys,
  onSelect,
  overflowedIndicator,
}: {
  items: MenuItemConfig[];
  selectedKeys: string[];
  onSelect: (item: MenuItemConfig, keyPath: string[]) => void;
  overflowedIndicator?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowRef = useRef<HTMLDivElement>(null);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerWidth = container.clientWidth;
    const children = Array.from(measure.children) as HTMLElement[];

    if (containerWidth === 0) {
      setVisibleCount(items.length);
      return;
    }

    const overflowWidth = 48;
    let used = 0;
    let count = 0;

    for (let index = 0; index < children.length; index += 1) {
      const nextWidth = used + children[index].offsetWidth;
      const reserve = index < children.length - 1 ? overflowWidth : 0;
      if (nextWidth + reserve > containerWidth) break;
      used = nextWidth;
      count = index + 1;
    }

    if (count === 0 && items.length > 0) {
      count = 1;
    }

    setVisibleCount(count);
  }, [items.length]);

  useLayoutEffect(() => {
    recompute();
  }, [items, recompute]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => recompute());
    observer.observe(container);
    return () => observer.disconnect();
  }, [recompute]);

  useEffect(() => {
    if (!overflowOpen) return undefined;
    const handlePointer = (event: MouseEvent) => {
      if (!overflowRef.current?.contains(event.target as Node)) {
        setOverflowOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [overflowOpen]);

  const visibleItems = items.slice(0, visibleCount);
  const overflowItems = items.slice(visibleCount);

  return (
    <div ref={containerRef} className="relative flex min-w-0 flex-1 items-stretch">
      <ul role="menubar" className="flex min-w-0 flex-1 items-stretch">
        {visibleItems.map((item) => {
          const selected = selectedKeys.includes(item.key);
          return (
            <li key={item.key} role="none" className="shrink-0">
              <button
                type="button"
                role="menuitem"
                aria-current={selected ? "page" : undefined}
                disabled={item.disabled}
                className={cn(
                  "relative flex h-[var(--menu-item-height,40px)] shrink-0 cursor-pointer items-center border-0 bg-transparent px-[var(--menu-item-padding-inline,16px)] text-[length:var(--menu-font-size,14px)] outline-none transition-colors duration-[var(--menu-motion-duration,200ms)]",
                  item.disabled
                    ? "cursor-not-allowed opacity-50"
                    : selected
                      ? "font-medium text-[color:var(--menu-highlight-color,#165dff)]"
                      : "text-[color:var(--menu-color-text,#1d2129)] hover:text-[color:var(--menu-highlight-color,#165dff)]"
                )}
                onClick={() => {
                  if (item.disabled) return;
                  onSelect(item, [item.key]);
                }}
              >
                {item.icon ? (
                  <span className="mr-[var(--menu-icon-margin-inline-end,8px)] inline-flex [&_svg]:size-[var(--menu-icon-size,16px)]">
                    {item.icon}
                  </span>
                ) : null}
                {item.label}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-[var(--menu-item-padding-inline,16px)] bottom-0 h-[var(--menu-active-bar-width-horizontal,2px)] rounded-full bg-[var(--menu-highlight-color,#165dff)] transition-opacity",
                    selected ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
        {overflowItems.length > 0 ? (
          <li role="none" className="relative shrink-0">
            <div ref={overflowRef} className="relative">
              <button
                type="button"
                className={menuOverflowTriggerClass()}
                aria-haspopup="menu"
                aria-expanded={overflowOpen}
                onClick={() => setOverflowOpen((prev) => !prev)}
                onMouseEnter={() => setOverflowOpen(true)}
              >
                {overflowedIndicator ?? <MoreHorizontal className="size-4" strokeWidth={2} />}
              </button>
              {overflowOpen ? (
                <div
                  role="menu"
                  className={menuOverflowPanelClass()}
                  onMouseLeave={() => setOverflowOpen(false)}
                >
                  {overflowItems.map((item) => {
                    const selected = selectedKeys.includes(item.key);
                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="menuitem"
                        disabled={item.disabled}
                        className={menuOverflowItemClass(selected)}
                        onClick={() => {
                          if (item.disabled) return;
                          onSelect(item, [item.key]);
                          setOverflowOpen(false);
                        }}
                      >
                        {item.icon ? (
                          <span className="mr-2 inline-flex [&_svg]:size-[var(--menu-icon-size,16px)]">
                            {item.icon}
                          </span>
                        ) : null}
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </li>
        ) : null}
      </ul>

      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex whitespace-nowrap"
      >
        {items.map((item) => (
          <span
            key={item.key}
            className="inline-flex h-[var(--menu-item-height,40px)] items-center px-[var(--menu-item-padding-inline,16px)] text-[length:var(--menu-font-size,14px)]"
          >
            {item.icon ? (
              <span className="mr-[var(--menu-icon-margin-inline-end,8px)] inline-flex [&_svg]:size-[var(--menu-icon-size,16px)]">
                {item.icon}
              </span>
            ) : null}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Menu({
  mode = "vertical",
  items = [],
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  onSelect,
  onOpenChange,
  collapsed = false,
  onCollapse,
  collapsedWidth = 48,
  expandIcon,
  overflowedIndicator,
  theme = "light",
  className,
  style,
}: MenuProps) {
  const selectedControlled = controlledSelectedKeys !== undefined;
  const openControlled = controlledOpenKeys !== undefined;

  const [internalSelectedKeys, setInternalSelectedKeys] = useState(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState(defaultOpenKeys);

  const selectedKeys = selectedControlled ? controlledSelectedKeys : internalSelectedKeys;
  const openKeys = openControlled ? controlledOpenKeys : internalOpenKeys;

  const flatHorizontalItems = useMemo(
    () =>
      items.flatMap((item) => {
        const type = resolveItemType(item);
        if (type === "group") return [];
        if (mode === "horizontal" && type === "subMenu") {
          return [{ ...item, children: undefined, type: "item" as const }];
        }
        return [item];
      }),
    [items, mode]
  );

  const handleSelect = useCallback(
    (item: MenuItemConfig, keyPath: string[]) => {
      const nextKeys = [item.key];
      if (!selectedControlled) {
        setInternalSelectedKeys(nextKeys);
      }
      onSelect?.(createSelectInfo(item, keyPath, nextKeys));
    },
    [onSelect, selectedControlled]
  );

  const onSelectItem = useCallback(
    (item: MenuItemConfig, keyPath: string[]) => {
      handleSelect(item, keyPath);
    },
    [handleSelect]
  );

  const onToggleSubMenu = useCallback(
    (key: string) => {
      const nextKeys = openKeys.includes(key)
        ? openKeys.filter((item) => item !== key)
        : [...openKeys, key];
      if (!openControlled) {
        setInternalOpenKeys(nextKeys);
      }
      onOpenChange?.(nextKeys);
    },
    [openControlled, openKeys, onOpenChange]
  );

  const contextValue = useMemo<MenuContextValue>(
    () => ({
      mode,
      theme,
      selectedKeys,
      openKeys,
      collapsed: mode === "vertical" ? collapsed : false,
      collapsedWidth,
      expandIcon,
      onSelectItem,
      onToggleSubMenu,
      isSelected: (key: string) => selectedKeys.includes(key),
      isOpen: (key: string) => openKeys.includes(key),
    }),
    [
      mode,
      theme,
      selectedKeys,
      openKeys,
      collapsed,
      collapsedWidth,
      expandIcon,
      onSelectItem,
      onToggleSubMenu,
    ]
  );

  const rootStyle: CSSProperties = {
    ...menuCssVars,
    ...(mode === "vertical" && collapsed
      ? { width: collapsedWidth, ["--menu-collapsed-width" as string]: `${collapsedWidth}px` }
      : undefined),
    ...style,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <nav
        className={menuRootClass({ mode, theme, collapsed: mode === "vertical" && collapsed, className })}
        style={rootStyle}
        data-theme={theme}
        data-collapsed={collapsed || undefined}
      >
        {mode === "horizontal" ? (
          <HorizontalOverflowMenu
            items={flatHorizontalItems.filter((item) => resolveItemType(item) !== "group")}
            selectedKeys={selectedKeys}
            onSelect={handleSelect}
            overflowedIndicator={overflowedIndicator}
          />
        ) : (
          <ul role="menu" className="m-0 w-full list-none p-0">
            {renderVerticalItems(items)}
          </ul>
        )}
      </nav>
      {onCollapse ? (
        <span className="sr-only" aria-live="polite">
          {collapsed ? "menu collapsed" : "menu expanded"}
        </span>
      ) : null}
    </MenuContext.Provider>
  );
}

export { MenuItem } from "./menu-item";
export { MenuSubMenu } from "./menu-sub-menu";
export { MenuGroup } from "./menu-group";
