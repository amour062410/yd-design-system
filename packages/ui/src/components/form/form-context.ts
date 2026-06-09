"use client";

import { createContext, useContext } from "react";
import type { FormContextValue, FormItemContextValue } from "./form.types";

export const FORM_DEFAULTS: FormContextValue = {
  layout: "vertical",
  labelAlign: "left",
  labelWidth: "80px",
  colon: false,
  requiredMark: true,
  disabled: false,
};

export const FormContext = createContext<FormContextValue>(FORM_DEFAULTS);

export function useFormContext(): FormContextValue {
  return useContext(FormContext);
}

const FormItemContext = createContext<FormItemContextValue | null>(null);

export const FormItemProvider = FormItemContext.Provider;

/** 控件可消费该上下文以获取 id / status / disabled，实现统一接管。 */
export function useFormItem(): FormItemContextValue | null {
  return useContext(FormItemContext);
}
