"use client";

import { useMemo } from "react";
import { cn } from "../../lib/utils";
import { FormContext } from "./form-context";
import { FormItem } from "./form-item";
import type { FormContextValue, FormProps } from "./form.types";

function FormRoot({
  layout = "vertical",
  labelAlign = "left",
  labelWidth = "80px",
  colon = false,
  requiredMark = true,
  disabled = false,
  className,
  children,
  onSubmit,
  ...rest
}: FormProps) {
  const contextValue = useMemo<FormContextValue>(
    () => ({ layout, labelAlign, labelWidth, colon, requiredMark, disabled }),
    [layout, labelAlign, labelWidth, colon, requiredMark, disabled]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form
        onSubmit={onSubmit}
        className={cn(
          layout === "inline"
            ? "flex flex-wrap items-center gap-x-4 gap-y-3"
            : "flex flex-col gap-5",
          className
        )}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export const Form = Object.assign(FormRoot, { Item: FormItem });
