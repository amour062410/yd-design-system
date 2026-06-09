"use client";

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { descriptionsGroupClass, descriptionsGroupTitleClass } from "./descriptions.styles";
import type { DescriptionsGroupProps, DescriptionsItemConfig } from "./descriptions.types";
import { DescriptionsItem, isDescriptionsItemElement } from "./descriptions-item";

export function DescriptionsGroup({ title, children, className }: DescriptionsGroupProps) {
  return (
    <div className={descriptionsGroupClass(className)}>
      {title ? <div className={descriptionsGroupTitleClass()}>{title}</div> : null}
      {children}
    </div>
  );
}

DescriptionsGroup.displayName = "DescriptionsGroup";

export function isDescriptionsGroupElement(
  child: unknown
): child is ReactElement<DescriptionsGroupProps> {
  return (
    isValidElement(child) &&
    (child.type as { displayName?: string }).displayName === "DescriptionsGroup"
  );
}

export function collectItemsFromChildren(children: ReactNode): DescriptionsItemConfig[] {
  const items: DescriptionsItemConfig[] = [];

  const walk = (nodes: ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) return;
      if (isDescriptionsItemElement(child)) {
        items.push({
          label: child.props.label,
          children: child.props.children,
          span: child.props.span,
          tooltip: child.props.tooltip,
          copyable: child.props.copyable,
          key: child.key != null ? String(child.key) : undefined,
        });
        return;
      }
      if (isDescriptionsGroupElement(child)) {
        walk(child.props.children);
      }
    });
  };

  walk(children);
  return items;
}
