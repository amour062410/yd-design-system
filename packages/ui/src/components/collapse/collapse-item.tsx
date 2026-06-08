"use client";

import { ChevronDown } from "lucide-react";
import type { KeyboardEvent } from "react";
import { cn } from "../../lib/utils";
import { useCollapseContext } from "./collapse-context";
import {
  getCollapseItemDividerStyle,
  getContentInnerStyle,
  getContentStyle,
  getContentWrapperStyle,
  getExpandIconStyle,
  getHeaderStyle,
  getSubtitleStyle,
  getTitleStyle,
  resolveHeaderIconButtonClassName,
  resolveHeaderToggleClassName,
  resolveHeaderWrapperClassName,
} from "./collapse.styles";
import type { CollapseItemProps } from "./collapse.types";

export function CollapseItem({
  panelKey = "",
  title,
  subtitle,
  extra,
  disabled: itemDisabled = false,
  children,
  className,
}: CollapseItemProps) {
  const context = useCollapseContext();

  if (!panelKey) {
    throw new Error("CollapseItem requires panelKey or a React key when used inside Collapse.");
  }
  const headerId = `${context.collapseId}-header-${panelKey}`;
  const panelId = `${context.collapseId}-panel-${panelKey}`;
  const isActive = context.activeKeys.includes(panelKey);
  const isDisabled = context.disabled || itemDisabled;
  const iconOnLeft = context.expandIconPosition === "left";

  const handleToggle = () => {
    if (isDisabled) return;
    context.togglePanel(panelKey);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    const keys = context.getHeaderKeys();
    const currentIndex = keys.indexOf(panelKey);

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextKey = keys[currentIndex + 1] ?? keys[0];
      context.focusHeader(nextKey);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevKey = keys[currentIndex - 1] ?? keys[keys.length - 1];
      context.focusHeader(prevKey);
    }
  };

  const iconNode = context.expandIcon ? (
    context.expandIcon({ isActive, disabled: isDisabled })
  ) : (
    <ChevronDown
      aria-hidden
      style={getExpandIconStyle(isActive, context.size, isDisabled)}
    />
  );

  const titleBlock = (
    <div
      className="flex min-w-0 flex-1 flex-col"
      style={{ gap: "var(--collapse-title-gap)" }}
    >
      {title != null ? (
        <span
          className="truncate"
          style={{
            ...getTitleStyle(context.size, context.nested),
            color: isDisabled
              ? "var(--collapse-color-disabled)"
              : "var(--collapse-color-title)",
          }}
        >
          {title}
        </span>
      ) : null}
      {subtitle != null ? (
        <span className="truncate" style={getSubtitleStyle(context.size)}>
          {subtitle}
        </span>
      ) : null}
    </div>
  );

  const iconOnRightWithExtra = !iconOnLeft && Boolean(extra);

  return (
    <div
      className={cn("yd-collapse-item", className)}
      data-active={isActive || undefined}
      data-disabled={isDisabled || undefined}
    >
      <div
        className={resolveHeaderWrapperClassName({
          isActive,
          disabled: isDisabled,
        })}
        style={getHeaderStyle(context.size)}
      >
        <button
          id={headerId}
          type="button"
          aria-expanded={isActive}
          aria-controls={panelId}
          aria-disabled={isDisabled || undefined}
          disabled={isDisabled}
          className={resolveHeaderToggleClassName({ disabled: isDisabled })}
          style={{ gap: "var(--collapse-header-gap)" }}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          ref={(element) => context.registerHeader(panelKey, element)}
          tabIndex={isDisabled ? -1 : 0}
        >
          {iconOnLeft ? iconNode : null}
          {titleBlock}
          {!iconOnLeft && !iconOnRightWithExtra ? iconNode : null}
        </button>
        {extra ? (
          <div
            className="ml-2 inline-flex shrink-0 items-center"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {extra}
          </div>
        ) : null}
        {iconOnRightWithExtra ? (
          <button
            type="button"
            aria-label={isActive ? "收起面板" : "展开面板"}
            aria-expanded={isActive}
            aria-controls={panelId}
            disabled={isDisabled}
            className={resolveHeaderIconButtonClassName({ disabled: isDisabled })}
            tabIndex={-1}
            onClick={handleToggle}
          >
            {iconNode}
          </button>
        ) : null}
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isActive}
        className="yd-collapse-content"
        style={getContentWrapperStyle(isActive)}
      >
        <div style={getContentInnerStyle()}>
          {isActive || !context.destroyInactivePanel ? (
            <div style={getContentStyle(context.size)}>{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CollapseItemDivider({
  isLast,
  bordered,
  ghost,
}: {
  isLast: boolean;
  bordered: boolean;
  ghost: boolean;
}) {
  const style = getCollapseItemDividerStyle(isLast, bordered, ghost);
  if (!style) return null;
  return <div aria-hidden style={style} />;
}
