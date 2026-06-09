"use client";

import type { ReactNode } from "react";
import { Dropdown } from "./dropdown";
import { DropdownLinkTrigger } from "./dropdown-link-trigger";
import type { DropdownProps } from "./dropdown.types";

export type DropdownLinkProps = Omit<DropdownProps, "trigger"> & {
  children: ReactNode;
};

/**
 * Ant Design 基本用法：链接文案 + 下拉箭头，默认 hover 触发。
 */
export function DropdownLink({
  children,
  triggerEvent = "hover",
  ...props
}: DropdownLinkProps) {
  return (
    <Dropdown
      {...props}
      triggerEvent={triggerEvent}
      trigger={<DropdownLinkTrigger>{children}</DropdownLinkTrigger>}
    />
  );
}
