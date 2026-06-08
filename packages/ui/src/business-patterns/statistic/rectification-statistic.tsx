"use client";

import { Statistic } from "../../components/statistic/statistic";
import type { RectificationStatisticProps } from "../../components/statistic/statistic.types";

export function RectificationStatistic({
  title = "待整改门店",
  precision = 0,
  ...props
}: RectificationStatisticProps) {
  return (
    <Statistic title={title} precision={precision} {...props} />
  );
}
