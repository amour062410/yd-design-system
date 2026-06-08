import { fireEvent, render, screen } from "@testing-library/react";
import { ChevronRight } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import { Collapse, CollapseItem } from "./index";

describe("Collapse", () => {
  it("expands and collapses a panel", () => {
    render(
      <Collapse defaultActiveKey="1">
        <CollapseItem key="1" title="面板一">
          内容一
        </CollapseItem>
        <CollapseItem key="2" title="面板二">
          内容二
        </CollapseItem>
      </Collapse>
    );

    const headerOne = screen.getByRole("button", { name: /面板一/ });
    const headerTwo = screen.getByRole("button", { name: /面板二/ });
    const panelOne = document.getElementById(
      headerOne.getAttribute("aria-controls")!
    );

    expect(headerOne.getAttribute("aria-expanded")).toBe("true");
    expect(panelOne?.getAttribute("aria-hidden")).toBe("false");
    expect(headerTwo.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(headerOne);
    expect(headerOne.getAttribute("aria-expanded")).toBe("false");
    expect(panelOne?.getAttribute("aria-hidden")).toBe("true");

    fireEvent.click(headerTwo);
    expect(headerTwo.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("内容二")).toBeTruthy();
  });

  it("supports accordion mode", () => {
    render(
      <Collapse accordion defaultActiveKey="1">
        <CollapseItem key="1" title="面板一">
          内容一
        </CollapseItem>
        <CollapseItem key="2" title="面板二">
          内容二
        </CollapseItem>
      </Collapse>
    );

    const headerOne = screen.getByRole("button", { name: /面板一/ });
    const headerTwo = screen.getByRole("button", { name: /面板二/ });

    expect(headerOne.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(headerTwo);
    expect(headerOne.getAttribute("aria-expanded")).toBe("false");
    expect(headerTwo.getAttribute("aria-expanded")).toBe("true");
  });

  it("does not toggle disabled panels", () => {
    render(
      <Collapse defaultActiveKey="1">
        <CollapseItem key="1" title="面板一">
          内容一
        </CollapseItem>
        <CollapseItem key="2" title="禁用面板" disabled>
          禁用内容
        </CollapseItem>
      </Collapse>
    );

    const disabledHeader = screen.getByRole("button", { name: /禁用面板/ });
    const disabledPanel = document.getElementById(
      disabledHeader.getAttribute("aria-controls")!
    );

    expect((disabledHeader as HTMLButtonElement).disabled).toBe(true);
    expect(disabledHeader.getAttribute("aria-expanded")).toBe("false");
    expect(disabledPanel?.getAttribute("aria-hidden")).toBe("true");

    fireEvent.click(disabledHeader);
    expect(disabledHeader.getAttribute("aria-expanded")).toBe("false");
  });

  it("supports keyboard toggle and navigation", () => {
    render(
      <Collapse defaultActiveKey="1">
        <CollapseItem key="1" title="面板一">
          内容一
        </CollapseItem>
        <CollapseItem key="2" title="面板二">
          内容二
        </CollapseItem>
      </Collapse>
    );

    const headerOne = screen.getByRole("button", { name: /面板一/ });
    const headerTwo = screen.getByRole("button", { name: /面板二/ });

    headerOne.focus();
    fireEvent.keyDown(headerOne, { key: " " });
    expect(headerOne.getAttribute("aria-expanded")).toBe("false");

    fireEvent.keyDown(headerOne, { key: "Enter" });
    expect(headerOne.getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(headerOne, { key: "ArrowDown" });
    expect(document.activeElement).toBe(headerTwo);

    fireEvent.keyDown(headerTwo, { key: "ArrowUp" });
    expect(document.activeElement).toBe(headerOne);
  });

  it("renders custom expand icon", () => {
    render(
      <Collapse
        defaultActiveKey="1"
        expandIcon={({ isActive }) => (
          <ChevronRight
            data-testid="custom-icon"
            style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        )}
      >
        <CollapseItem key="1" title="自定义图标">
          内容
        </CollapseItem>
      </Collapse>
    );

    expect(screen.getAllByTestId("custom-icon").length).toBeGreaterThan(0);
  });

  it("supports nested collapse", () => {
    render(
      <Collapse defaultActiveKey="outer">
        <CollapseItem key="outer" title="外层">
          <Collapse defaultActiveKey="inner">
            <CollapseItem key="inner" title="内层">
              嵌套内容
            </CollapseItem>
          </Collapse>
        </CollapseItem>
      </Collapse>
    );

    expect(screen.getByText("嵌套内容")).toBeTruthy();
  });

  it("calls onChange when toggled", () => {
    const onChange = vi.fn();

    render(
      <Collapse defaultActiveKey="1" onChange={onChange}>
        <CollapseItem key="1" title="面板一">
          内容一
        </CollapseItem>
        <CollapseItem key="2" title="面板二">
          内容二
        </CollapseItem>
      </Collapse>
    );

    fireEvent.click(screen.getByRole("button", { name: /面板二/ }));
    expect(onChange).toHaveBeenCalled();
  });

  it("renders extra actions outside the header toggle button", () => {
    render(
      <Collapse defaultActiveKey="1">
        <CollapseItem
          key="1"
          title="带操作区"
          extra={<Button size="sm">编辑</Button>}
        >
          内容
        </CollapseItem>
      </Collapse>
    );

    const toggleButton = screen.getByRole("button", { name: /带操作区/ });
    const actionButton = screen.getByRole("button", { name: /编辑/ });

    expect(toggleButton.contains(actionButton)).toBe(false);
    fireEvent.click(actionButton);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
  });

  it("unmounts inactive panel when destroyInactivePanel is enabled", () => {
    render(
      <Collapse defaultActiveKey="1" destroyInactivePanel>
        <CollapseItem key="1" title="面板一">
          内容一
        </CollapseItem>
        <CollapseItem key="2" title="面板二">
          内容二
        </CollapseItem>
      </Collapse>
    );

    expect(screen.getByText("内容一")).toBeTruthy();
    expect(screen.queryByText("内容二")).toBeNull();
  });
});
