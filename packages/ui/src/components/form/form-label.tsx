"use client";

import { HelpCircle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Tooltip } from "../tooltip/tooltip";
import type {
  FormLabelAlign,
  FormLayout,
  FormRequiredMark,
} from "./form.types";

export interface FormLabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  requiredMark?: FormRequiredMark;
  colon?: boolean;
  tooltip?: ReactNode;
  layout?: FormLayout;
  align?: FormLabelAlign;
  width?: number | string;
  className?: string;
}

export function FormLabel({
  htmlFor,
  children,
  required = false,
  requiredMark = true,
  colon = false,
  tooltip,
  layout = "vertical",
  align = "left",
  width = "80px",
  className,
}: FormLabelProps) {
  const showAsterisk = required && requiredMark === true;
  const showOptional = !required && requiredMark === "optional";
  const isHorizontal = layout === "horizontal";

  return (
    <label
      htmlFor={htmlFor}
      style={isHorizontal ? { width } : undefined}
      className={cn(
        "text-[13px] font-medium leading-5 text-text-primary",
        layout === "vertical" && "mb-2 block text-left",
        isHorizontal &&
          cn(
            "flex shrink-0 items-center gap-1 pt-1.5",
            align === "right" ? "justify-end text-right" : "justify-start text-left"
          ),
        layout === "inline" && "inline-flex items-center gap-1",
        className
      )}
    >
      {showAsterisk && (
        <span
          aria-hidden
          className="mr-0.5 select-none font-normal text-danger"
        >
          *
        </span>
      )}
      <span>{children}</span>
      {colon && <span className="text-text-tertiary">:</span>}
      {showOptional && (
        <span className="ml-1 text-[12px] font-normal text-text-tertiary">
          (可选)
        </span>
      )}
      {tooltip != null && (
        <Tooltip content={tooltip}>
          <span
            tabIndex={0}
            role="button"
            aria-label="字段说明"
            className="ml-1 inline-flex cursor-help rounded-sm text-text-tertiary outline-none transition-colors hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <HelpCircle size={13} />
          </span>
        </Tooltip>
      )}
    </label>
  );
}
