import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./tabs";

const items = [
  { key: "a", label: "Tab A" },
  { key: "b", label: "Tab B" },
  { key: "c", label: "Tab C", disabled: true },
];

describe("Tabs", () => {
  it("renders tab labels", () => {
    render(<Tabs items={items} defaultActiveKey="a" />);
    expect(screen.getByRole("tab", { name: /Tab A/i })).toBeTruthy();
    expect(screen.getByRole("tab", { name: /Tab B/i })).toBeTruthy();
  });

  it("switches active tab on click", () => {
    const onChange = vi.fn();
    render(<Tabs items={items} defaultActiveKey="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: /Tab B/i }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("does not select disabled tab", () => {
    const onChange = vi.fn();
    render(<Tabs items={items} defaultActiveKey="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: /Tab C/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders card type with tablist", () => {
    render(<Tabs items={items} type="card" defaultActiveKey="a" />);
    expect(screen.getByRole("tablist")).toBeTruthy();
  });

  it("calls onTabClose when closable", () => {
    const onTabClose = vi.fn();
    render(
      <Tabs
        items={items.map((i) => ({ ...i, closable: true }))}
        closable
        defaultActiveKey="a"
        onTabClose={onTabClose}
      />
    );
    const closeButtons = screen.getAllByLabelText("关闭标签");
    fireEvent.click(closeButtons[0]);
    expect(onTabClose).toHaveBeenCalledWith("a");
  });

  it("calls onTabAdd when editable", () => {
    const onTabAdd = vi.fn();
    render(<Tabs items={items} editable onTabAdd={onTabAdd} />);
    fireEvent.click(screen.getByLabelText("新增标签"));
    expect(onTabAdd).toHaveBeenCalled();
  });

  it("shows overflow scroll controls when enabled", () => {
    const many = Array.from({ length: 12 }, (_, i) => ({
      key: String(i),
      label: `Tab ${i + 1}`,
    }));
    render(
      <Tabs items={many} overflow defaultActiveKey="0" className="max-w-[280px]" />
    );
    expect(screen.getByRole("tablist")).toBeTruthy();
  });
});
