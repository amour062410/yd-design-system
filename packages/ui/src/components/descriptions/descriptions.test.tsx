import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Descriptions } from "./index";

describe("Descriptions", () => {
  it("renders items prop", () => {
    render(
      <Descriptions
        items={[
          { label: "姓名", value: "张三" },
          { label: "部门", value: "产品部" },
        ]}
      />
    );
    expect(screen.getByText("姓名")).toBeTruthy();
    expect(screen.getByText("张三")).toBeTruthy();
  });

  it("renders children Items", () => {
    render(
      <Descriptions title="员工信息">
        <Descriptions.Item label="姓名">李四</Descriptions.Item>
        <Descriptions.Item label="工号">YD-001</Descriptions.Item>
      </Descriptions>
    );
    expect(screen.getByText("员工信息")).toBeTruthy();
    expect(screen.getByText("李四")).toBeTruthy();
  });

  it("shows empty placeholder", () => {
    render(<Descriptions items={[{ label: "备注", value: "" }]} />);
    expect(screen.getByText("--")).toBeTruthy();
  });

  it("renders bordered title and extra", () => {
    render(
      <Descriptions
        title="详情"
        extra={<button type="button">编辑</button>}
        bordered
        items={[{ label: "姓名", value: "王五" }]}
      />
    );
    expect(screen.getByText("详情")).toBeTruthy();
    expect(screen.getByRole("button", { name: "编辑" })).toBeTruthy();
  });

  it("supports copyable values", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(
      <Descriptions items={[{ label: "编号", value: "YD-1024", copyable: true }]} />
    );
    fireEvent.click(screen.getByRole("button", { name: "复制" }));
    expect(writeText).toHaveBeenCalledWith("YD-1024");
  });

  it("renders bordered horizontal layout as table", () => {
    const { container } = render(
      <Descriptions
        bordered
        column={2}
        items={[
          { label: "门店名称", value: "云盯杭州西湖旗舰店" },
          { label: "巡检员", value: "张明" },
        ]}
      />
    );
    expect(container.querySelector("table")).toBeTruthy();
    expect(container.querySelector("th")).toBeTruthy();
    expect(container.querySelector("td")).toBeTruthy();
  });
});
