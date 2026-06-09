"use client";

import { paginationSizeSelectClass } from "./pagination.styles";
import type { PaginationSizeChangerProps } from "./pagination.types";

export function PaginationSizeChanger({
  value,
  options,
  disabled,
  size = "default",
  onChange,
}: PaginationSizeChangerProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      aria-label="每页条数"
      className={paginationSizeSelectClass(size)}
      onChange={(event) => onChange(Number(event.target.value))}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option} 条/页
        </option>
      ))}
    </select>
  );
}

export function PaginationTotal({ total }: { total: number }) {
  return (
    <span>
      共{" "}
      <strong className="font-medium text-[color:var(--pagination-text-primary,#1d2129)]">
        {total}
      </strong>{" "}
      条
    </span>
  );
}
