import { InputNumber } from "./input-number";
import type {
  AlertThresholdInputProps,
  BusinessHoursInputProps,
  DeviceCountInputProps,
  InspectionScoreInputProps,
  RectificationDeadlineInputProps,
} from "./input-number.types";

export function InspectionScoreInput(props: InspectionScoreInputProps) {
  return <InputNumber min={0} max={100} step={1} unit="分" {...props} />;
}

export function RectificationDeadlineInput(props: RectificationDeadlineInputProps) {
  return <InputNumber min={1} max={30} step={1} unit="天" {...props} />;
}

export function AlertThresholdInput(props: AlertThresholdInputProps) {
  return <InputNumber min={0} max={100} step={0.1} precision={1} {...props} />;
}

export function DeviceCountInput(props: DeviceCountInputProps) {
  return <InputNumber min={0} step={1} unit="台" {...props} />;
}

export function BusinessHoursInput(props: BusinessHoursInputProps) {
  return <InputNumber min={0} max={24} step={0.5} unit="小时" {...props} />;
}
