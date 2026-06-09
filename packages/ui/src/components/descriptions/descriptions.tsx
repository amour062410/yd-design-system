"use client";

import { Children, isValidElement, useId, useMemo, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import { DescriptionsContext } from "./descriptions-context";
import { collectItemsFromChildren, DescriptionsGroup, isDescriptionsGroupElement } from "./descriptions-group";
import { DescriptionsItem, isDescriptionsItemElement, renderDescriptionItems } from "./descriptions-item";
import {
  descriptionsExtraClass,
  descriptionsGridClass,
  descriptionsHeaderClass,
  descriptionsRootClass,
  descriptionsTitleClass,
  resolveLabelWidthStyle,
} from "./descriptions.styles";
import type { DescriptionsProps } from "./descriptions.types";

function DescriptionsRoot({
  title,
  extra,
  column = 3,
  bordered = false,
  size = "default",
  layout = "horizontal",
  labelWidth,
  colon = true,
  items,
  children,
  className,
  classNames,
  styles,
}: DescriptionsProps) {
  const id = useId();
  const contextValue = useMemo(
    () => ({
      column,
      bordered,
      size,
      layout,
      colon,
      labelWidth,
      classNames,
      styles,
    }),
    [column, bordered, size, layout, colon, labelWidth, classNames, styles]
  );

  const resolvedItems = useMemo(() => {
    if (items?.length) return items;
    if (children) return collectItemsFromChildren(children);
    return [];
  }, [items, children]);

  const hasGroups = useMemo(
    () =>
      Children.toArray(children).some(
        (child) => isValidElement(child) && isDescriptionsGroupElement(child)
      ),
    [children]
  );

  const renderedItems = renderDescriptionItems(resolvedItems, contextValue, id);

  const body =
    bordered && layout === "horizontal" ? (
      renderedItems
    ) : (
      <div
        role="list"
        className={descriptionsGridClass({ column, bordered, layout })}
        style={resolveLabelWidthStyle(labelWidth)}
        aria-label={typeof title === "string" ? title : "描述列表"}
      >
        {renderedItems}
      </div>
    );

  const groupedContent =
    hasGroups && children
      ? Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          if (isDescriptionsGroupElement(child)) {
            const groupItems = collectItemsFromChildren(child.props.children);
            return (
              <DescriptionsGroup
                key={child.key ?? undefined}
                title={child.props.title}
                className={child.props.className}
              >
                {bordered && layout === "horizontal" ? (
                  renderDescriptionItems(groupItems, contextValue, id)
                ) : (
                  <div
                    role="list"
                    className={descriptionsGridClass({ column, bordered, layout })}
                    style={resolveLabelWidthStyle(labelWidth)}
                  >
                    {renderDescriptionItems(groupItems, contextValue, id)}
                  </div>
                )}
              </DescriptionsGroup>
            );
          }
          if (isDescriptionsItemElement(child)) {
            return null;
          }
          return child;
        })
      : null;

  return (
    <DescriptionsContext.Provider value={contextValue}>
      <section
        data-descriptions="root"
        className={cn(descriptionsRootClass(), classNames?.root, className)}
        style={styles?.root}
      >
        {title || extra ? (
          <div
            data-descriptions="header"
            className={cn(descriptionsHeaderClass(), classNames?.header)}
            style={styles?.header}
          >
            {title ? (
              <h3
                data-descriptions="title"
                className={cn(descriptionsTitleClass(), classNames?.title)}
                style={styles?.title}
              >
                {title}
              </h3>
            ) : (
              <span />
            )}
            {extra ? (
              <div
                data-descriptions="extra"
                className={cn(descriptionsExtraClass(), classNames?.extra)}
                style={styles?.extra}
              >
                {extra}
              </div>
            ) : null}
          </div>
        ) : null}
        {hasGroups ? groupedContent : body}
      </section>
    </DescriptionsContext.Provider>
  );
}

export const Descriptions = Object.assign(DescriptionsRoot, {
  Item: DescriptionsItem,
  Group: DescriptionsGroup,
});
