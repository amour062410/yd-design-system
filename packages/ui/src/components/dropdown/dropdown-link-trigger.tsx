"use client";

import { ChevronDown } from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type DropdownTriggerContextValue = {
  open: boolean;
  disabled: boolean;
};

const DropdownTriggerContext = createContext<DropdownTriggerContextValue>({
  open: false,
  disabled: false,
});

export function DropdownTriggerProvider({
  open,
  disabled,
  children,
}: {
  open: boolean;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <DropdownTriggerContext.Provider value={{ open, disabled }}>
      {children}
    </DropdownTriggerContext.Provider>
  );
}

export function useDropdownTriggerContext() {
  return useContext(DropdownTriggerContext);
}

/** Ant Design 基本用法：链接文案 + 下拉箭头 */
export function DropdownLinkTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, disabled } = useDropdownTriggerContext();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm transition-colors duration-150",
        disabled
          ? "cursor-not-allowed text-[color:var(--link-color-disabled)]"
          : "cursor-pointer text-[color:var(--link-color-default)] hover:text-[color:var(--link-color-hover)] hover:underline",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        size={16}
        strokeWidth={2}
        aria-hidden
        className={cn(
          "size-4 shrink-0 transition-transform duration-150",
          open && "rotate-180"
        )}
      />
    </span>
  );
}
