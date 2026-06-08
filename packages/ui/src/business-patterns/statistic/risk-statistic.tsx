"use client";

import { Statistic } from "../../components/statistic/statistic";
import type { RiskStatisticProps } from "../../components/statistic/statistic.types";

export function RiskStatistic({
  title = "高风险门店",
  precision = 0,
  valueStyle,
  ...props
}: RiskStatisticProps) {
  return (
    <Statistic
      title={title}
      precision={precision}
      valueStyle={{
        color: "var(--statistic-trend-down, #F53F3F)",
        ...valueStyle,
      }}
      {...props}
    />
  );
}
