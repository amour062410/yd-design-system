"use client";

import { useCallback, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "../../lib/utils";
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationNavButton,
} from "./pagination-item";
import { PaginationJumper } from "./pagination-jumper";
import {
  PaginationSizeChanger,
  PaginationTotal,
} from "./pagination-size-changer";
import {
  paginationControlsClass,
  paginationRootClass,
  paginationSimpleTextClass,
} from "./pagination.styles";
import type { PaginationProps } from "./pagination.types";
import {
  calcTotalPages,
  clampPage,
  getPaginationPages,
} from "./pagination.utils";

export function Pagination({
  current: controlledCurrent,
  defaultCurrent = 1,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  total = 0,
  disabled = false,
  size = "default",
  simple = false,
  showTotal = false,
  showQuickJumper = false,
  showSizeChanger = false,
  hideOnSinglePage = false,
  pageSizeOptions = [10, 20, 50, 100],
  onChange,
  onShowSizeChange,
  className,
}: PaginationProps) {
  const [innerPage, setInnerPage] = useState(defaultCurrent);
  const [innerPageSize, setInnerPageSize] = useState(defaultPageSize);
  const [jumpValue, setJumpValue] = useState("");

  const current = controlledCurrent ?? innerPage;
  const pageSize = controlledPageSize ?? innerPageSize;
  const totalPages = useMemo(
    () => calcTotalPages(total, pageSize),
    [total, pageSize]
  );
  const pages = useMemo(
    () => getPaginationPages(current, totalPages),
    [current, totalPages]
  );

  const update = useCallback(
    (nextPage: number, nextPageSize: number) => {
      const page = clampPage(nextPage, calcTotalPages(total, nextPageSize));
      if (controlledCurrent === undefined) setInnerPage(page);
      if (controlledPageSize === undefined) setInnerPageSize(nextPageSize);
      onChange?.(page, nextPageSize);
    },
    [controlledCurrent, controlledPageSize, onChange, total]
  );

  const handlePageSizeChange = useCallback(
    (nextPageSize: number) => {
      const nextPage = 1;
      if (controlledPageSize === undefined) setInnerPageSize(nextPageSize);
      if (controlledCurrent === undefined) setInnerPage(nextPage);
      onShowSizeChange?.(nextPage, nextPageSize);
      onChange?.(nextPage, nextPageSize);
    },
    [controlledCurrent, controlledPageSize, onChange, onShowSizeChange]
  );

  const handleJump = useCallback(() => {
    const parsed = parseInt(jumpValue, 10);
    if (Number.isNaN(parsed)) return;
    update(parsed, pageSize);
    setJumpValue("");
  }, [jumpValue, pageSize, update]);

  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  const isPrevDisabled = disabled || current <= 1;
  const isNextDisabled = disabled || current >= totalPages;

  const handleNavKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    if (event.key === "ArrowLeft" && !isPrevDisabled) {
      event.preventDefault();
      update(current - 1, pageSize);
    }
    if (event.key === "ArrowRight" && !isNextDisabled) {
      event.preventDefault();
      update(current + 1, pageSize);
    }
  };

  if (simple) {
    return (
      <nav
        aria-label="分页"
        className={cn(paginationRootClass(className), "justify-end")}
        onKeyDown={handleNavKeyDown}
      >
        <div className={paginationControlsClass()}>
          <PaginationNavButton
            direction="prev"
            size={size}
            disabled={isPrevDisabled}
            onClick={() => update(current - 1, pageSize)}
          />
          <span className={paginationSimpleTextClass()}>
            {current} / {totalPages}
          </span>
          <PaginationNavButton
            direction="next"
            size={size}
            disabled={isNextDisabled}
            onClick={() => update(current + 1, pageSize)}
          />
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="分页"
      className={paginationRootClass(className)}
      onKeyDown={handleNavKeyDown}
    >
      {showTotal ? <PaginationTotal total={total} /> : <span className="flex-1" />}

      <div className={paginationControlsClass()}>
        <PaginationNavButton
          direction="prev"
          size={size}
          disabled={isPrevDisabled}
          onClick={() => update(current - 1, pageSize)}
        />

        {pages.map((page, index) =>
          page === "..." ? (
            <PaginationEllipsis key={`ellipsis-${index}`} size={size} />
          ) : (
            <PaginationItem
              key={page}
              page={page}
              size={size}
              active={current === page}
              disabled={disabled}
              onClick={(next) => update(next, pageSize)}
            />
          )
        )}

        <PaginationNavButton
          direction="next"
          size={size}
          disabled={isNextDisabled}
          onClick={() => update(current + 1, pageSize)}
        />

        {showSizeChanger ? (
          <PaginationSizeChanger
            value={pageSize}
            options={pageSizeOptions}
            size={size}
            disabled={disabled}
            onChange={handlePageSizeChange}
          />
        ) : null}

        {showQuickJumper ? (
          <PaginationJumper
            value={jumpValue}
            size={size}
            disabled={disabled}
            onChange={setJumpValue}
            onJump={handleJump}
          />
        ) : null}
      </div>
    </nav>
  );
}
