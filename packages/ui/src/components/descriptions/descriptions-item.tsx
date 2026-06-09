"use client";

import { isValidElement, type ReactElement } from "react";
import { DescriptionsBorderedTable } from "./descriptions-bordered-table";
import { DescriptionsItemView } from "./descriptions-item-view";
import type {
  DescriptionsContextValue,
  DescriptionsItemConfig,
  DescriptionsItemProps,
} from "./descriptions.types";

export { DescriptionsItemView, type DescriptionsItemViewProps } from "./descriptions-item-view";

export function renderDescriptionItems(
  items: DescriptionsItemConfig[],
  context: DescriptionsContextValue,
  idPrefix: string
) {
  if (context.bordered && context.layout === "horizontal") {
    return <DescriptionsBorderedTable items={items} context={context} idPrefix={idPrefix} />;
  }

  return (
    <>
      {items.map((item, index) => {
        const valueId = `${idPrefix}-value-${item.key ?? index}`;
        return (
          <DescriptionsItemView
            key={String(item.key ?? index)}
            label={item.label}
            value={item.value ?? item.children}
            span={item.span}
            tooltip={item.tooltip}
            copyable={item.copyable}
            context={context}
            valueId={valueId}
          />
        );
      })}
    </>
  );
}

export function DescriptionsItem(_props: DescriptionsItemProps) {
  return null;
}

DescriptionsItem.displayName = "DescriptionsItem";

export function isDescriptionsItemElement(
  child: unknown
): child is ReactElement<DescriptionsItemProps> {
  return (
    isValidElement(child) &&
    (child.type as { displayName?: string }).displayName === "DescriptionsItem"
  );
}
