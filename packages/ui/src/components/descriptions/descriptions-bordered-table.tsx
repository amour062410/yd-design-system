"use client";

import { DescriptionsItemView, type DescriptionsItemViewProps } from "./descriptions-item-view";
import {
  descriptionsTableClass,
  resolveLabelWidthStyle,
  resolveMaxColumn,
} from "./descriptions.styles";
import type { DescriptionsContextValue, DescriptionsItemConfig } from "./descriptions.types";
import { getBorderedContentColSpan, packDescriptionRows } from "./descriptions.utils";

export function DescriptionsBorderedTable({
  items,
  context,
  idPrefix,
}: {
  items: DescriptionsItemConfig[];
  context: DescriptionsContextValue;
  idPrefix: string;
}) {
  const column = resolveMaxColumn(context.column);
  const rows = packDescriptionRows(items, column);

  return (
    <table
      className={descriptionsTableClass()}
      style={resolveLabelWidthStyle(context.labelWidth)}
    >
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item, itemIndex) => {
              const valueId = `${idPrefix}-value-${item.key ?? `${rowIndex}-${itemIndex}`}`;
              const contentColSpan = getBorderedContentColSpan(row, itemIndex, column);
              const cellProps: DescriptionsItemViewProps = {
                label: item.label,
                value: item.value ?? item.children,
                tooltip: item.tooltip,
                copyable: item.copyable,
                context,
                valueId,
                contentColSpan,
                showColon: false,
              };
              return <DescriptionsItemView key={valueId} {...cellProps} />;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
