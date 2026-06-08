import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Empty, EMPTY_TYPE_PRESETS } from "./index";

describe("Empty", () => {
  it("renders default preset", () => {
    render(<Empty />);
    expect(screen.getByText("暂无数据")).toBeTruthy();
    expect(screen.getByText("当前列表为空，请稍后再试")).toBeTruthy();
  });

  it("renders inspection type with preset copy", () => {
    render(<Empty type="inspection" />);
    expect(screen.getByText(EMPTY_TYPE_PRESETS.inspection.title)).toBeTruthy();
    expect(screen.getByText(EMPTY_TYPE_PRESETS.inspection.description)).toBeTruthy();
    expect(screen.getByRole("status").getAttribute("data-empty-type")).toBe("inspection");
  });

  it("allows overriding title and description", () => {
    render(
      <Empty
        type="search"
        title="自定义标题"
        description="自定义描述"
      />
    );
    expect(screen.getByText("自定义标题")).toBeTruthy();
    expect(screen.getByText("自定义描述")).toBeTruthy();
  });

  it("renders action slot", () => {
    render(
      <Empty type="error">
        <button type="button">重试</button>
      </Empty>
    );
    expect(screen.getByRole("button", { name: "重试" })).toBeTruthy();
  });
});
