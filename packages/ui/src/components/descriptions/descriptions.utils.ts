import type { DescriptionsItemConfig, DescriptionsItemSpan } from "./descriptions.types";

export function normalizeItemSpan(
  span: DescriptionsItemSpan | undefined,
  column: number,
  spanUsed: number
): number {
  if (span === "filled") return Math.max(1, column - spanUsed);
  return Math.min(span ?? 1, column);
}

/** 按 column 将 items 分行，遵循 Ant Design 换行规则 */
export function packDescriptionRows(
  items: DescriptionsItemConfig[],
  column: number
): Array<Array<DescriptionsItemConfig & { span: number }>> {
  const rows: Array<Array<DescriptionsItemConfig & { span: number }>> = [];
  let row: Array<DescriptionsItemConfig & { span: number }> = [];
  let spanUsed = 0;

  for (const item of items) {
    let span = normalizeItemSpan(item.span, column, spanUsed);

    if (spanUsed + span > column) {
      if (row.length) rows.push(row);
      row = [];
      spanUsed = 0;
      span = normalizeItemSpan(item.span, column, 0);
    }

    row.push({ ...item, span });
    spanUsed += span;

    if (spanUsed >= column) {
      rows.push(row);
      row = [];
      spanUsed = 0;
    }
  }

  if (row.length) rows.push(row);
  return rows;
}

/** bordered 表格模式下 content 单元格 colspan */
export function getBorderedContentColSpan(
  row: Array<DescriptionsItemConfig & { span: number }>,
  itemIndex: number,
  column: number
) {
  const item = row[itemIndex];
  let span = item.span;

  const rowSpanTotal = row.reduce((sum, current) => sum + current.span, 0);
  if (itemIndex === row.length - 1 && rowSpanTotal < column) {
    span += column - rowSpanTotal;
  }

  return span * 2 - 1;
}
