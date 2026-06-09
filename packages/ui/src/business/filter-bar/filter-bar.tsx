"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";
import { FilterActions, isFilterActionsElement } from "./filter-actions";
import { FilterBarContext } from "./filter-bar-context";
import { FilterExtra, isFilterExtraElement } from "./filter-extra";
import { FilterTextButton } from "./filter-text-button";
import { FilterCount, FilterSummary } from "./filter-summary";
import { FilterBarItem, FilterField, isFilterFieldElement } from "./filter-field";
import {
  filterBarBusinessBodyClass,
  filterBarBusinessPrimaryRowClass,
  filterBarBusinessSecondaryRowClass,
  filterBarContainerClass,
  filterBarGridClass,
  filterBarOperationsRowClass,
  filterBarTitleClass,
  filterBarToolbarClass,
  filterSummaryClass,
} from "./filter-bar.styles";
import type { FilterBarProps, FilterBarVariant, FilterFieldProps } from "./filter-bar.types";

function renderFields(
  fields: ReactElement<FilterFieldProps>[],
  expanded: boolean,
  maxVisibleFields: number,
  expandable: boolean
) {
  return fields.map((field, index) => {
    const hidden = expandable && !expanded && index >= maxVisibleFields;
    return cloneElement(field, { key: field.key ?? index, hidden });
  });
}

function partitionBusinessFields(fields: ReactElement<FilterFieldProps>[]) {
  const explicitPrimary = fields.filter((field) => field.props.priority === "primary");
  const explicitSecondary = fields.filter((field) => field.props.priority === "secondary");

  if (explicitPrimary.length > 0 || explicitSecondary.length > 0) {
    const primary = explicitPrimary;
    const secondary = fields.filter((field) => field.props.priority !== "primary");
    return { primary, secondary };
  }

  if (fields.length === 0) {
    return { primary: [], secondary: [] };
  }

  return {
    primary: [fields[0]],
    secondary: fields.slice(1),
  };
}

function applyBusinessExpandable(
  primary: ReactElement<FilterFieldProps>[],
  secondary: ReactElement<FilterFieldProps>[],
  expanded: boolean,
  maxVisibleSecondary: number,
  shouldExpand: boolean
) {
  if (!shouldExpand) {
    return { primary, secondary, hiddenCount: 0 };
  }

  const hiddenCount = Math.max(0, secondary.length - maxVisibleSecondary);
  const nextSecondary = secondary.map((field, index) =>
    cloneElement(field, {
      key: field.key ?? `secondary-${index}`,
      hidden: !expanded && index >= maxVisibleSecondary,
    })
  );

  return { primary, secondary: nextSecondary, hiddenCount };
}

function FilterToolbar({
  title,
  extra,
}: {
  title?: ReactNode;
  extra?: ReactNode;
}) {
  if (!title && !extra) return null;

  return (
    <div className={filterBarToolbarClass()} data-filter-bar="toolbar">
      {title ? (
        <div className={filterBarTitleClass()} data-filter-bar="title">
          {title}
        </div>
      ) : null}
      {extra}
    </div>
  );
}

function FilterOperationsRow({
  showActions,
  shouldExpand,
  actions,
  searchText,
  resetText,
}: {
  showActions: boolean;
  shouldExpand: boolean;
  actions: ReactNode;
  searchText?: string;
  resetText?: string;
}) {
  if (!showActions && !shouldExpand) return null;

  return (
    <div className={filterBarOperationsRowClass()} data-filter-bar="actions">
      {actions ?? <FilterActions searchText={searchText} resetText={resetText} />}
    </div>
  );
}

function BusinessFilterLayout({
  primaryFields,
  secondaryFields,
  actions,
  showActions,
  searchText,
  resetText,
  shouldExpand,
}: {
  primaryFields: ReactElement<FilterFieldProps>[];
  secondaryFields: ReactElement<FilterFieldProps>[];
  actions: ReactNode;
  showActions: boolean;
  searchText?: string;
  resetText?: string;
  shouldExpand: boolean;
}) {
  return (
    <>
      <div className={filterBarBusinessBodyClass()} data-filter-bar="header">
        {primaryFields.length > 0 ? (
          <div className={filterBarBusinessPrimaryRowClass()} data-filter-bar="primary">
            {primaryFields}
          </div>
        ) : null}

        {secondaryFields.length > 0 ? (
          <div className={filterBarBusinessSecondaryRowClass()} data-filter-bar="secondary">
            {secondaryFields}
          </div>
        ) : null}
      </div>

      <FilterOperationsRow
        showActions={showActions}
        shouldExpand={shouldExpand}
        actions={actions}
        searchText={searchText}
        resetText={resetText}
      />
    </>
  );
}

export function FilterBar({
  children,
  variant = "default",
  title,
  onSearch,
  onReset,
  expandable = false,
  maxVisibleFields = 4,
  layout = "responsive",
  sticky = false,
  showActions = true,
  searchText,
  resetText,
  className,
  style,
  extra,
  actions,
  summary,
  count,
}: FilterBarProps) {
  const [expanded, setExpanded] = useState(false);

  const parsed = useMemo(() => {
    const items = Children.toArray(children);
    const fields: ReactElement<FilterFieldProps>[] = [];
    let customActions: ReactNode = actions ?? null;
    let customExtra: ReactNode = extra ?? null;
    let customSummary: ReactNode = summary ?? null;

    for (const child of items) {
      if (!isValidElement(child)) continue;
      if (isFilterFieldElement(child)) {
        fields.push(child as ReactElement<FilterFieldProps>);
        continue;
      }
      if (isFilterActionsElement(child)) {
        customActions = child;
        continue;
      }
      if (isFilterExtraElement(child)) {
        customExtra = child;
        continue;
      }
      if ((child.type as { displayName?: string }).displayName === "FilterSummary") {
        customSummary = child;
      }
    }

    return { fields, customActions, customExtra, customSummary };
  }, [children, actions, extra, summary]);

  const partitionedForExpand = useMemo(
    () => partitionBusinessFields(parsed.fields),
    [parsed.fields]
  );

  const hiddenCount = expandable
    ? Math.max(0, parsed.fields.length - maxVisibleFields)
    : 0;
  const shouldExpand = expandable && hiddenCount > 0;
  const isBusiness = variant === "business";
  const businessHiddenCount = expandable
    ? Math.max(0, partitionedForExpand.secondary.length - maxVisibleFields)
    : 0;
  const businessShouldExpand = expandable && businessHiddenCount > 0;
  const activeHiddenCount = isBusiness ? businessHiddenCount : hiddenCount;
  const activeShouldExpand = isBusiness ? businessShouldExpand : shouldExpand;

  const businessFields = useMemo(() => {
    if (!isBusiness) return null;

    if (businessShouldExpand) {
      return applyBusinessExpandable(
        partitionedForExpand.primary,
        partitionedForExpand.secondary,
        expanded,
        maxVisibleFields,
        true
      );
    }

    return { ...partitionedForExpand, hiddenCount: 0 };
  }, [
    isBusiness,
    partitionedForExpand,
    expanded,
    maxVisibleFields,
    businessShouldExpand,
  ]);

  const contextValue = useMemo(
    () => ({
      onSearch,
      onReset,
      expanded,
      setExpanded,
      expandable: activeShouldExpand,
      hiddenCount: activeHiddenCount,
      maxVisibleFields,
      variant: variant as FilterBarVariant,
    }),
    [
      onSearch,
      onReset,
      expanded,
      activeShouldExpand,
      activeHiddenCount,
      maxVisibleFields,
      variant,
    ]
  );

  return (
    <FilterBarContext.Provider value={contextValue}>
      <section
        className={filterBarContainerClass({ sticky, className, variant })}
        style={
          {
            ["--filterbar-max-visible-fields" as string]: String(maxVisibleFields),
            ["--filterbar-control-height" as string]: isBusiness ? "40px" : "32px",
            ["--filterbar-row-gap" as string]: isBusiness ? "16px" : "12px",
            ...style,
          } as React.CSSProperties
        }
        data-filter-bar="root"
        data-variant={variant}
      >
        <FilterToolbar title={title} extra={parsed.customExtra} />

        {isBusiness && businessFields ? (
          <BusinessFilterLayout
            primaryFields={businessFields.primary}
            secondaryFields={businessFields.secondary}
            actions={parsed.customActions}
            showActions={showActions}
            searchText={searchText}
            resetText={resetText}
            shouldExpand={businessShouldExpand}
          />
        ) : (
          <>
            <div
              className={cn(filterBarGridClass(layout), "items-center")}
              data-filter-bar="header"
            >
              {renderFields(parsed.fields, expanded, maxVisibleFields, shouldExpand)}
            </div>

            <FilterOperationsRow
              showActions={showActions}
              shouldExpand={shouldExpand}
              actions={parsed.customActions}
              searchText={searchText}
              resetText={resetText}
            />
          </>
        )}

        {typeof count === "number" ? (
          <FilterCount count={count} className="mt-3" />
        ) : null}

        {parsed.customSummary ? (
          <div className={filterSummaryClass()}>{parsed.customSummary}</div>
        ) : null}
      </section>
    </FilterBarContext.Provider>
  );
}

FilterBar.Field = FilterField;
FilterBar.Item = FilterBarItem;
FilterBar.Actions = FilterActions;
FilterBar.Extra = FilterExtra;
FilterBar.TextButton = FilterTextButton;
FilterBar.Summary = FilterSummary;
