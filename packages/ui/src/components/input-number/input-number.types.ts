import type { CSSProperties, ReactNode } from "react";

export type InputNumberSize = "small" | "default" | "large";
export type InputNumberStatus = "error" | "warning";

export interface InputNumberProps {
  value?: number | null;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  readOnly?: boolean;
  status?: InputNumberStatus;
  size?: InputNumberSize;
  prefix?: ReactNode;
  suffix?: ReactNode;
  unit?: string;
  placeholder?: string;
  controls?: boolean;
  formatter?: (value: number | undefined) => string;
  parser?: (displayValue: string | undefined) => number | undefined;
  onChange?: (value: number | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  style?: CSSProperties;
  id?: string;
  name?: string;
}

export type InspectionScoreInputProps = Omit<
  InputNumberProps,
  "min" | "max" | "step" | "unit" | "precision"
>;

export type RectificationDeadlineInputProps = Omit<
  InputNumberProps,
  "min" | "max" | "step" | "unit" | "precision"
>;

export type AlertThresholdInputProps = Omit<
  InputNumberProps,
  "min" | "max" | "step" | "precision"
>;

export type DeviceCountInputProps = Omit<
  InputNumberProps,
  "min" | "step" | "unit" | "precision"
>;

export type BusinessHoursInputProps = Omit<
  InputNumberProps,
  "min" | "max" | "step" | "unit" | "precision"
>;
