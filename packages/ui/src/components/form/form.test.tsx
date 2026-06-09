import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Form } from "./index";

describe("Form", () => {
  it("renders label and associates it with the control via generated id", () => {
    render(
      <Form>
        <Form.Item label="项目名称">
          <input placeholder="名称" />
        </Form.Item>
      </Form>
    );

    const input = screen.getByPlaceholderText("名称");
    const label = screen.getByText("项目名称");
    expect(input.id).toBeTruthy();
    expect(label.closest("label")?.getAttribute("for")).toBe(input.id);
  });

  it("respects an explicit control id", () => {
    render(
      <Form>
        <Form.Item label="名称">
          <input id="custom-id" placeholder="名称" />
        </Form.Item>
      </Form>
    );
    expect(screen.getByPlaceholderText("名称").id).toBe("custom-id");
    expect(screen.getByText("名称").closest("label")?.getAttribute("for")).toBe(
      "custom-id"
    );
  });

  it("shows a required asterisk when required", () => {
    render(
      <Form>
        <Form.Item label="必填项" required>
          <input />
        </Form.Item>
      </Form>
    );
    expect(screen.getByText("*")).toBeTruthy();
  });

  it("renders help text and links it via aria-describedby", () => {
    render(
      <Form>
        <Form.Item label="字段" help="帮助说明">
          <input placeholder="f" />
        </Form.Item>
      </Form>
    );
    const help = screen.getByText("帮助说明");
    const input = screen.getByPlaceholderText("f");
    expect(input.getAttribute("aria-describedby")).toBe(help.id);
  });

  it("prioritizes the error message and sets aria-invalid when status=error", () => {
    render(
      <Form>
        <Form.Item label="字段" status="error" error="出错了" help="帮助">
          <input placeholder="f" />
        </Form.Item>
      </Form>
    );
    expect(screen.getByText("出错了")).toBeTruthy();
    expect(screen.queryByText("帮助")).toBeNull();
    expect(screen.getByPlaceholderText("f").getAttribute("aria-invalid")).toBe(
      "true"
    );
  });

  it("does not show error text when status is not error", () => {
    render(
      <Form>
        <Form.Item label="字段" error="不应展示" help="帮助">
          <input placeholder="f" />
        </Form.Item>
      </Form>
    );
    expect(screen.queryByText("不应展示")).toBeNull();
    expect(screen.getByText("帮助")).toBeTruthy();
  });

  it("propagates disabled from Form to controls", () => {
    render(
      <Form disabled>
        <Form.Item label="字段">
          <input placeholder="f" />
        </Form.Item>
      </Form>
    );
    expect(
      (screen.getByPlaceholderText("f") as HTMLInputElement).disabled
    ).toBe(true);
  });

  it("applies inline layout container classes", () => {
    const { container } = render(
      <Form layout="inline">
        <Form.Item label="门店">
          <input />
        </Form.Item>
      </Form>
    );
    const form = container.querySelector("form");
    expect(form?.className).toContain("flex-wrap");
  });

  it("renders a horizontal label column with a fixed width", () => {
    render(
      <Form layout="horizontal" labelWidth={120}>
        <Form.Item label="联系人">
          <input />
        </Form.Item>
      </Form>
    );
    const label = screen.getByText("联系人").closest("label");
    expect(label?.style.width).toBe("120px");
  });
});
