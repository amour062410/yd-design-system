"use client";

import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
} from "react";
import { cn } from "../../lib/utils";
import { FormItemProvider, useFormContext } from "./form-context";
import { FormLabel } from "./form-label";
import { FormMessage } from "./form-message";
import type { FormItemProps, FormItemStatus } from "./form.types";

const STATUS_FIELD_CLASS: Record<FormItemStatus, string> = {
  default: "",
  success:
    "[&_input]:!border-success [&_textarea]:!border-success [&_:where(input,textarea)]:!border-success",
  warning:
    "[&_input]:!border-warning [&_textarea]:!border-warning [&_:where(input,textarea)]:!border-warning",
  error:
    "[&_input]:!border-danger [&_textarea]:!border-danger [&_:where(input,textarea)]:!border-danger",
};

type InjectableProps = {
  id?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export function FormItem({
  label,
  htmlFor,
  required = false,
  tooltip,
  extra,
  help,
  error,
  status = "default",
  layout: layoutProp,
  labelAlign: labelAlignProp,
  labelWidth: labelWidthProp,
  colon: colonProp,
  disabled: disabledProp,
  className,
  children,
  ...rest
}: FormItemProps) {
  const form = useFormContext();
  const layout = layoutProp ?? form.layout;
  const labelAlign = labelAlignProp ?? form.labelAlign;
  const labelWidth = labelWidthProp ?? form.labelWidth;
  const colon = colonProp ?? form.colon;
  const disabled = disabledProp ?? form.disabled;

  const autoId = useId();
  const childWithProps =
    isValidElement(children) &&
    typeof (children as ReactElement<InjectableProps>).props.id === "string"
      ? (children as ReactElement<InjectableProps>).props.id
      : undefined;
  const controlId = htmlFor ?? childWithProps ?? `form-item-${autoId}`;
  const messageId = `${controlId}-message`;

  const hasMessage =
    (status === "error" && error != null && error !== "") ||
    (help != null && help !== "");

  let control = children;
  if (isValidElement(children)) {
    const element = children as ReactElement<InjectableProps>;
    const injected: InjectableProps = {
      id: element.props.id ?? controlId,
      disabled: disabled ? true : element.props.disabled,
      "aria-invalid": status === "error" ? true : element.props["aria-invalid"],
      "aria-describedby": hasMessage
        ? [element.props["aria-describedby"], messageId]
            .filter(Boolean)
            .join(" ")
        : element.props["aria-describedby"],
    };
    control = cloneElement(element, injected);
  }

  const labelNode = label != null && (
    <FormLabel
      htmlFor={controlId}
      required={required}
      requiredMark={form.requiredMark}
      colon={colon}
      tooltip={tooltip}
      layout={layout}
      align={labelAlign}
      width={labelWidth}
    >
      {label}
    </FormLabel>
  );

  const fieldSlot = (
    <div className={cn("min-w-0", STATUS_FIELD_CLASS[status])}>{control}</div>
  );

  const messageNode = (
    <FormMessage id={messageId} error={error} help={help} status={status} />
  );

  const labelRow =
    labelNode && (extra != null || layout === "vertical") ? (
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          layout !== "vertical" && "mb-0"
        )}
      >
        {labelNode}
        {extra != null && (
          <span className="text-[12px] text-text-tertiary">{extra}</span>
        )}
      </div>
    ) : (
      labelNode
    );

  const itemContext = {
    id: controlId,
    describedById: hasMessage ? messageId : undefined,
    status,
    required,
    disabled,
  };

  // —— Inline 布局：标签与控件水平排布，作为查询条等紧凑场景 ——
  if (layout === "inline") {
    return (
      <FormItemProvider value={itemContext}>
        <div
          className={cn("flex items-center gap-2", className)}
          data-status={status}
          {...rest}
        >
          {labelNode}
          <div className="flex flex-col">
            {fieldSlot}
            {messageNode}
          </div>
        </div>
      </FormItemProvider>
    );
  }

  // —— Horizontal 布局：标签列 + 右侧控件列 ——
  if (layout === "horizontal") {
    return (
      <FormItemProvider value={itemContext}>
        <div
          className={cn("flex items-start gap-3", className)}
          data-status={status}
          {...rest}
        >
          {labelRow}
          <div className="flex min-w-0 flex-1 flex-col">
            {fieldSlot}
            {messageNode}
          </div>
        </div>
      </FormItemProvider>
    );
  }

  // —— Vertical 布局（默认）：标签在上，控件在下 ——
  return (
    <FormItemProvider value={itemContext}>
      <div
        className={cn("flex flex-col", className)}
        data-status={status}
        {...rest}
      >
        {labelRow}
        {fieldSlot}
        {messageNode}
      </div>
    </FormItemProvider>
  );
}
