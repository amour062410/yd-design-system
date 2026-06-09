import type { CSSProperties, ReactNode } from "react";

export type CardVariant = "default" | "statistics" | "overview" | "dashboard" | "compact";
export type CardStatus = "success" | "warning" | "danger" | "processing" | "offline";
export type CardPriority = "high" | "medium" | "low";
export type TrendDirection = "up" | "down" | "flat";

export type CardProps = {
  title?: ReactNode;
  subTitle?: ReactNode;
  extra?: ReactNode;
  footer?: ReactNode;
  cover?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  variant?: CardVariant;
  hoverable?: boolean;
  loading?: boolean;
  clickable?: boolean;
  status?: CardStatus;
  priority?: CardPriority;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type StatisticsCardProps = {
  title: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  trend?: ReactNode;
  trendDirection?: TrendDirection;
  loading?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type OverviewCardItem = {
  label: ReactNode;
  value: ReactNode;
};

export type OverviewCardProps = {
  title: ReactNode;
  status?: ReactNode;
  statusLabel?: ReactNode;
  items?: OverviewCardItem[];
  extra?: ReactNode;
  size?: "small" | "medium";
  loading?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type DashboardCardProps = {
  title?: ReactNode;
  extra?: ReactNode;
  header?: ReactNode;
  content?: ReactNode;
  chart?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type StoreInspectionCardProps = {
  storeName: ReactNode;
  score: number | string;
  inspector: ReactNode;
  inspectionTime: ReactNode;
  /** small：280px 紧凑卡片，适合并排展示 */
  size?: "small" | "medium";
  loading?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type StoreStatusType = "open" | "closed" | "rectifying" | "pending";

export type StoreStatusCardProps = {
  storeName: ReactNode;
  status: StoreStatusType;
  statusText?: ReactNode;
  description?: ReactNode;
  loading?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type AlertLevel = "high" | "medium" | "low";

export type AlertCardProps = {
  alertName: ReactNode;
  level?: AlertLevel;
  levelText?: ReactNode;
  occurredAt: ReactNode;
  processStatus: ReactNode;
  size?: "small" | "medium";
  loading?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};
