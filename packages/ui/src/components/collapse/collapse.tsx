"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { cn } from "../../lib/utils";
import { CollapseContext } from "./collapse-context";
import { CollapseItem, CollapseItemDivider } from "./collapse-item";
import {
  getCollapseRootStyle,
  normalizeActiveKeys,
  toggleActiveKeys,
} from "./collapse.styles";
import type {
  CollapseItemInternalProps,
  CollapseItemProps,
  CollapseProps,
} from "./collapse.types";

function resolvePanelKey(
  child: ReactElement<CollapseItemProps>,
  index: number
): string {
  if (child.props.panelKey) return child.props.panelKey;
  if (child.key != null && child.key !== "") {
    const rawKey = String(child.key);
    return rawKey.startsWith(".") ? rawKey.slice(1).replace(/^\$/, "") : rawKey;
  }
  return `collapse-panel-${index}`;
}

export function Collapse({
  activeKey,
  defaultActiveKey,
  accordion = false,
  onChange,
  disabled = false,
  bordered = true,
  ghost = false,
  size = "md",
  expandIcon,
  expandIconPosition = "left",
  destroyInactivePanel = false,
  nested = false,
  className,
  style,
  children,
}: CollapseProps) {
  const collapseId = useId().replace(/:/g, "");
  const headerRegistry = useRef(new Map<string, HTMLButtonElement>());
  const headerOrder = useRef<string[]>([]);

  const isControlled = activeKey !== undefined;
  const [internalActiveKey, setInternalActiveKey] = useState<string[]>(() =>
    normalizeActiveKeys(defaultActiveKey)
  );

  const activeKeys = isControlled
    ? normalizeActiveKeys(activeKey)
    : internalActiveKey;

  const setActiveKeys = useCallback(
    (nextKeys: string[]) => {
      if (!isControlled) {
        setInternalActiveKey(nextKeys);
      }
      onChange?.(
        accordion ? (nextKeys[0] ?? ("" as const)) : nextKeys
      );
    },
    [accordion, isControlled, onChange]
  );

  const togglePanel = useCallback(
    (key: string) => {
      setActiveKeys(toggleActiveKeys(activeKeys, key, accordion));
    },
    [accordion, activeKeys, setActiveKeys]
  );

  const registerHeader = useCallback(
    (key: string, element: HTMLButtonElement | null) => {
      if (element) {
        headerRegistry.current.set(key, element);
        if (!headerOrder.current.includes(key)) {
          headerOrder.current.push(key);
        }
      } else {
        headerRegistry.current.delete(key);
        headerOrder.current = headerOrder.current.filter((item) => item !== key);
      }
    },
    []
  );

  const focusHeader = useCallback((key: string) => {
    headerRegistry.current.get(key)?.focus();
  }, []);

  const getHeaderKeys = useCallback(() => [...headerOrder.current], []);

  const contextValue = useMemo(
    () => ({
      activeKeys,
      togglePanel,
      registerHeader,
      focusHeader,
      getHeaderKeys,
      disabled,
      bordered: bordered && !ghost,
      ghost,
      size,
      expandIcon,
      expandIconPosition,
      destroyInactivePanel,
      nested,
      collapseId,
    }),
    [
      activeKeys,
      togglePanel,
      registerHeader,
      focusHeader,
      getHeaderKeys,
      disabled,
      bordered,
      ghost,
      size,
      expandIcon,
      expandIconPosition,
      destroyInactivePanel,
      nested,
      collapseId,
    ]
  );

  const resolvedBordered = bordered && !ghost;
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <CollapseContext.Provider value={contextValue}>
      <div
        className={cn("yd-collapse w-full", className)}
        style={{
          ...getCollapseRootStyle(resolvedBordered, ghost),
          ...(nested
            ? { paddingLeft: "var(--collapse-nested-indent, 24px)" }
            : undefined),
          ...style,
        }}
        data-bordered={resolvedBordered || undefined}
        data-ghost={ghost || undefined}
        data-nested={nested || undefined}
        data-size={size}
      >
        {items.map((child, index) => {
          const element = child as ReactElement<CollapseItemProps>;
          const panelKey = resolvePanelKey(element, index);
          const isLast = index === items.length - 1;

          return (
            <div key={panelKey} className="yd-collapse-item-wrapper">
              {cloneElement(element, {
                panelKey,
              })}
              <CollapseItemDivider
                isLast={isLast}
                bordered={resolvedBordered}
                ghost={ghost}
              />
            </div>
          );
        })}
      </div>
    </CollapseContext.Provider>
  );
}

export { CollapseItem };
