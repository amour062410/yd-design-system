"use client";

import { Check, Copy, HelpCircle } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Tooltip } from "../tooltip";
import {
  descriptionsItemClass,
  descriptionsLabelClass,
  descriptionsTableContentClass,
  descriptionsTableLabelClass,
  descriptionsValueClass,
  resolveItemGridColumn,
  resolveLabelWidthStyle,
  resolveMaxColumn,
} from "./descriptions.styles";
import type { DescriptionsContextValue, DescriptionsItemSpan } from "./descriptions.types";

const EMPTY_PLACEHOLDER = "--";

function isEmptyValue(value: ReactNode): boolean {
  if (value === null || value === undefined || value === false) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

function getCopyText(value: ReactNode): string | null {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return null;
}

export type DescriptionsItemViewProps = {
  label: ReactNode;
  value?: ReactNode;
  tooltip?: ReactNode;
  copyable?: boolean;
  context: DescriptionsContextValue;
  valueId: string;
  contentColSpan?: number;
  showColon?: boolean;
  className?: string;
  span?: DescriptionsItemSpan;
};

export function DescriptionsItemView({
  label,
  value,
  tooltip,
  copyable,
  context,
  valueId,
  contentColSpan,
  span = 1,
  showColon = context.colon && !context.bordered && context.layout === "horizontal",
  className,
}: DescriptionsItemViewProps) {
  const content = value ?? null;
  const display = isEmptyValue(content) ? EMPTY_PLACEHOLDER : content;
  const copyText = copyable ? getCopyText(content) : null;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [copyText]);

  const labelNode = (
    <span className="inline-flex items-center gap-1">
      {label}
      {showColon ? (
        <span
          aria-hidden
          className="ms-[var(--descriptions-colon-margin-left,0px)] me-[var(--descriptions-colon-margin-right,8px)]"
        >
          :
        </span>
      ) : null}
      {tooltip ? (
        <Tooltip content={tooltip}>
          <button
            type="button"
            className="inline-flex text-[color:var(--descriptions-text-secondary,#4e5969)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--descriptions-text-primary,#1d2129)]"
            aria-label="字段说明"
          >
            <HelpCircle className="size-3.5" aria-hidden />
          </button>
        </Tooltip>
      ) : null}
    </span>
  );

  const valueNode = (
    <span className="inline-flex items-center gap-2">
      <span>{display}</span>
      {copyable && copyText ? (
        <button
          type="button"
          className="inline-flex text-[color:var(--descriptions-text-secondary,#4e5969)] transition-colors hover:text-[color:var(--descriptions-text-primary,#1d2129)]"
          aria-label={copied ? "已复制" : "复制"}
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="size-3.5 text-green-600" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
        </button>
      ) : null}
    </span>
  );

  if (context.bordered && context.layout === "horizontal" && contentColSpan !== undefined) {
    return (
      <>
        <th
          id={`${valueId}-label`}
          data-descriptions="label"
          className={cn(
            descriptionsTableLabelClass(context.size),
            context.classNames?.label
          )}
          style={context.styles?.label}
        >
          {labelNode}
        </th>
        <td
          id={valueId}
          data-descriptions="content"
          colSpan={contentColSpan}
          className={cn(
            descriptionsTableContentClass(context.size),
            context.classNames?.content,
            className
          )}
          style={context.styles?.content}
          aria-labelledby={`${valueId}-label`}
        >
          {valueNode}
        </td>
      </>
    );
  }

  const maxColumn = resolveMaxColumn(context.column);
  const gridColumn = resolveItemGridColumn(span, maxColumn);

  return (
    <div
      role="listitem"
      className={cn(
        descriptionsItemClass({
          bordered: context.bordered,
          layout: context.layout,
          size: context.size,
        }),
        className
      )}
      style={{ gridColumn }}
    >
      <span
        id={`${valueId}-label`}
        data-descriptions="label"
        className={cn(
          descriptionsLabelClass({
            bordered: context.bordered,
            layout: context.layout,
            labelWidth: context.labelWidth,
          }),
          context.classNames?.label
        )}
        style={{ ...resolveLabelWidthStyle(context.labelWidth), ...context.styles?.label }}
      >
        {labelNode}
      </span>
      <span
        id={valueId}
        data-descriptions="content"
        className={cn(
          descriptionsValueClass({
            bordered: context.bordered,
            layout: context.layout,
          }),
          context.classNames?.content
        )}
        style={context.styles?.content}
        aria-labelledby={`${valueId}-label`}
      >
        {valueNode}
      </span>
    </div>
  );
}
