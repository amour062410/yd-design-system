import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  FilterBar,
  FilterField,
  FilterActions,
  FilterExtra,
  FilterSummary,
  FilterCount,
} from "./index";
import { Input } from "../../components/input";
import { Select } from "../../components/select";

describe("FilterBar", () => {
  it("renders fields and default actions", () => {
    render(
      <FilterBar>
        <FilterField label="关键词">
          <Input placeholder="请输入" />
        </FilterField>
        <FilterField label="状态">
          <Select options={[{ label: "全部", value: "all" }]} value="all" />
        </FilterField>
      </FilterBar>
    );

    expect(screen.getByText("关键词")).toBeTruthy();
    expect(screen.getByText("状态")).toBeTruthy();
    expect(screen.getByRole("button", { name: "查询" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "重置" })).toBeTruthy();
  });

  it("calls onSearch and onReset", () => {
    const onSearch = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar onSearch={onSearch} onReset={onReset}>
        <FilterField label="关键词">
          <Input />
        </FilterField>
      </FilterBar>
    );

    fireEvent.click(screen.getByRole("button", { name: "查询" }));
    fireEvent.click(screen.getByRole("button", { name: "重置" }));
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("hides extra fields when expandable and collapsed", () => {
    render(
      <FilterBar expandable maxVisibleFields={2}>
        <FilterField label="字段1">
          <Input />
        </FilterField>
        <FilterField label="字段2">
          <Input />
        </FilterField>
        <FilterField label="字段3">
          <Input />
        </FilterField>
      </FilterBar>
    );

    expect(screen.getByText("字段1")).toBeTruthy();
    expect(screen.getByText("字段2")).toBeTruthy();
    const field3 = screen.getByText("字段3").closest("[data-filter-field]");
    expect(field3?.className).toContain("hidden");
    expect(screen.getByRole("button", { name: /展开/ })).toBeTruthy();
  });

  it("expands hidden fields", () => {
    render(
      <FilterBar expandable maxVisibleFields={1}>
        <FilterField label="字段1">
          <Input />
        </FilterField>
        <FilterField label="字段2">
          <Input />
        </FilterField>
      </FilterBar>
    );

    fireEvent.click(screen.getByRole("button", { name: /展开/ }));
    expect(screen.getByText("字段2")).toBeTruthy();
  });

  it("renders summary and count", () => {
    render(
      <>
        <FilterSummary
          items={[
            { key: "status", label: "状态", value: "正常" },
            { key: "owner", label: "负责人", value: "张三" },
          ]}
        />
        <FilterCount count={125} />
      </>
    );

    expect(screen.getByText(/已筛选/)).toBeTruthy();
    expect(screen.getByText("状态=正常")).toBeTruthy();
    expect(screen.getByText(/125/)).toBeTruthy();
  });

  it("renders business variant with primary and secondary rows", () => {
    render(
      <FilterBar variant="business" onSearch={() => undefined} onReset={() => undefined}>
        <FilterField label="关键词" priority="primary">
          <Input placeholder="关键词" />
        </FilterField>
        <FilterField label="任务状态" priority="secondary">
          <Select options={[{ label: "全部", value: "all" }]} value="all" />
        </FilterField>
      </FilterBar>
    );

    expect(document.querySelector('[data-filter-bar="primary"]')).toBeTruthy();
    expect(document.querySelector('[data-filter-bar="secondary"]')).toBeTruthy();
    expect(document.querySelector('[data-variant="business"]')).toBeTruthy();
  });

  it("collapses secondary fields in business variant and places expand in actions", () => {
    render(
      <FilterBar
        variant="business"
        expandable
        maxVisibleFields={2}
        onSearch={() => undefined}
        onReset={() => undefined}
      >
        <FilterField label="关键词" priority="primary">
          <Input />
        </FilterField>
        <FilterField label="状态" priority="secondary">
          <Input />
        </FilterField>
        <FilterField label="负责人" priority="secondary">
          <Input />
        </FilterField>
        <FilterField label="部门" priority="secondary">
          <Input />
        </FilterField>
      </FilterBar>
    );

    expect(screen.getByText("关键词")).toBeTruthy();
    expect(screen.getByText("状态")).toBeTruthy();
    expect(screen.getByText("负责人")).toBeTruthy();
    const department = screen.getByText("部门").closest("[data-filter-field]");
    expect(department?.className).toContain("hidden");

    const actions = document.querySelector('[data-filter-bar="actions"]');
    expect(actions?.querySelector('[aria-expanded="false"]')).toBeTruthy();
  });

  it("renders filter operations in order: expand, reset, search", () => {
    render(
      <FilterBar
        variant="business"
        expandable
        maxVisibleFields={1}
        onSearch={() => undefined}
        onReset={() => undefined}
      >
        <FilterField label="关键词" priority="primary">
          <Input />
        </FilterField>
        <FilterField label="状态" priority="secondary">
          <Input />
        </FilterField>
        <FilterField label="负责人" priority="secondary">
          <Input />
        </FilterField>
      </FilterBar>
    );

    const actions = document.querySelector('[data-filter-bar="actions"]');
    const buttons = actions?.querySelectorAll("button");
    expect(buttons?.[0]?.textContent).toMatch(/展开/);
    expect(buttons?.[1]?.textContent).toBe("重置");
    expect(buttons?.[2]?.textContent).toBe("查询");
  });

  it("renders business extra actions in toolbar", () => {
    render(
      <FilterBar variant="business" title="业务筛选栏">
        <FilterExtra>
          <button type="button">导出</button>
        </FilterExtra>
        <FilterField label="关键词" priority="primary">
          <Input />
        </FilterField>
      </FilterBar>
    );

    expect(screen.getByText("业务筛选栏")).toBeTruthy();
    expect(document.querySelector('[data-filter-bar="toolbar"]')).toBeTruthy();
    expect(document.querySelector('[data-filter-bar="extra"]')).toBeTruthy();
    expect(screen.getByRole("button", { name: "导出" })).toBeTruthy();
  });

  it("supports custom actions", () => {
    render(
      <FilterBar>
        <FilterField label="关键词">
          <Input />
        </FilterField>
        <FilterActions>
          <button type="button">导出</button>
        </FilterActions>
      </FilterBar>
    );

    expect(screen.queryByRole("button", { name: "查询" })).toBeNull();
    expect(screen.getByRole("button", { name: "导出" })).toBeTruthy();
  });
});
