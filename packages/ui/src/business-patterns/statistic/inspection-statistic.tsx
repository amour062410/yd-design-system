"use client";

import { Statistic } from "../../components/statistic/statistic";
import type { InspectionStatisticProps } from "../../components/statistic/statistic.types";

export function InspectionStatistic({
  title = "巡检完成率",
  precision = 0,
  suffix = "%",
  ...props
}: InspectionStatisticProps) {
  return (
    <Statistic
      title={title}
      precision={precision}
      suffix={suffix}
      {...props}
    />
  );
}
