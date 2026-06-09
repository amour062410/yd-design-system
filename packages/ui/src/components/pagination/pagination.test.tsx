import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./index";
import { calcTotalPages, getPaginationPages } from "./pagination.utils";

describe("pagination.utils", () => {
  it("shows all pages when totalPages <= 7", () => {
    expect(getPaginationPages(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("folds pages for large datasets", () => {
    expect(getPaginationPages(1, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
    expect(getPaginationPages(10, 20)).toEqual([1, "...", 9, 10, 11, "...", 20]);
    expect(getPaginationPages(18, 20)).toEqual([
      1,
      "...",
      16,
      17,
      18,
      19,
      20,
    ]);
  });

  it("calculates total pages", () => {
    expect(calcTotalPages(500, 10)).toBe(50);
    expect(calcTotalPages(0, 10)).toBe(1);
  });
});

describe("Pagination", () => {
  it("renders basic pagination", () => {
    render(<Pagination total={500} defaultCurrent={1} defaultPageSize={10} />);
    expect(screen.getByRole("navigation", { name: "分页" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "第 1 页" }).getAttribute("aria-current")).toBe(
      "page"
    );
  });

  it("calls onChange when page clicked", () => {
    const onChange = vi.fn();
    render(
      <Pagination total={500} defaultCurrent={1} defaultPageSize={10} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole("button", { name: "第 2 页" }));
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it("renders simple mode", () => {
    render(<Pagination total={500} defaultCurrent={1} defaultPageSize={10} simple />);
    expect(screen.getByText("1 / 50")).toBeTruthy();
  });

  it("hides on single page when hideOnSinglePage", () => {
    const { container } = render(
      <Pagination total={5} defaultPageSize={10} hideOnSinglePage />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows total text", () => {
    render(<Pagination total={500} showTotal />);
    expect(screen.getByText(/共/)).toBeTruthy();
    expect(screen.getByText("500")).toBeTruthy();
  });

  it("supports quick jumper", () => {
    const onChange = vi.fn();
    render(
      <Pagination
        total={500}
        defaultCurrent={1}
        defaultPageSize={10}
        showQuickJumper
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getByLabelText("跳转页码"), { target: { value: "5" } });
    fireEvent.keyDown(screen.getByLabelText("跳转页码"), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(5, 10);
  });
});
