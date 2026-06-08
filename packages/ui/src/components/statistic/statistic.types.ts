import type { CSSProperties, ReactNode } from "react";

export type StatisticTrend = "up" | "down";

export type StatisticGroupColumns = 2 | 3 | 4;

export interface StatisticProps {
  title?: ReactNode;
  value?: string | number;
  precision?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  valueStyle?: CSSProperties;
  trend?: StatisticTrend;
  /** 趋势数值，如 12.5 展示为 ↑ 12.5% */
  trendValue?: string | number;
  className?: string;
}

export interface StatisticGroupProps {
  columns?: StatisticGroupColumns;
  className?: string;
  children?: ReactNode;
}

export type RectificationStatisticProps = Omit<
  StatisticProps,
  "title" | "suffix"
> & {
  title?: ReactNode;
};

export type RiskStatisticProps = Omit<StatisticProps, "title"> & {
  title?: ReactNode;
};

export type InspectionStatisticProps = Omit<StatisticProps, "title"> & {
  title?: ReactNode;
  /** 完成率 0–100 */
  value?: number;
  suffix?: ReactNode;
};

export type StoreStatisticProps = Omit<StatisticProps, "title"> & {
  title?: ReactNode;
};

export type StatisticCardStatus = "success" | "warning" | "danger" | "primary";

export interface StatisticCardProps {
  title?: ReactNode;
  value?: string | number;
  precision?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  trend?: StatisticTrend;
  /** 趋势数值，如 12.5 展示为 ↑12.5% */
  trendValue?: string | number;
  /** 辅助说明，如「较上月新增28家」 */
  description?: ReactNode;
  status?: StatisticCardStatus;
  icon?: ReactNode;
  className?: string;
}

export interface StatisticCardGroupProps {
  columns?: StatisticGroupColumns;
  className?: string;
  children?: ReactNode;
}
