"use client";

import { Statistic } from "../../components/statistic/statistic";
import type { StoreStatisticProps } from "../../components/statistic/statistic.types";

export function StoreStatistic({
  title = "门店总数",
  precision = 0,
  ...props
}: StoreStatisticProps) {
  return (
    <Statistic title={title} precision={precision} {...props} />
  );
}
