import type { ReactNode } from "react";
import type { TagSizeKey } from "@yd-ds/tokens";

export type TagVariant = "solid" | "light" | "outline";

export type TagStatus =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  status?: TagStatus;
  size?: TagSizeKey;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
}

export interface TagGroupItem {
  value: string;
  label: ReactNode;
  count?: number;
  status?: TagStatus;
  disabled?: boolean;
}

export type TagGroupMode = "none" | "single" | "multiple" | "segmented";

export interface TagGroupProps {
  items: TagGroupItem[];
  mode?: TagGroupMode;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  size?: TagSizeKey;
  scrollable?: boolean;
  className?: string;
  "aria-label"?: string;
}
