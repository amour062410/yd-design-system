"use client";

import { paginationJumperInputClass } from "./pagination.styles";
import type { PaginationJumperProps } from "./pagination.types";

export function PaginationJumper({
  value,
  disabled,
  size = "default",
  onChange,
  onJump,
}: PaginationJumperProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>跳至</span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        disabled={disabled}
        aria-label="跳转页码"
        className={paginationJumperInputClass(size)}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onJump();
          }
        }}
      />
      <span>页</span>
    </span>
  );
}
