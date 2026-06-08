import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Drawer, DrawerFooter, DrawerPushContainer } from "./drawer";

describe("Drawer", () => {
  it("renders title when open inline", () => {
    render(
      <Drawer open inline title="抽屉标题">
        内容
      </Drawer>
    );
    expect(screen.getByRole("heading", { name: "抽屉标题" })).toBeTruthy();
  });

  it("calls onClose on mask click when maskClosable", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Drawer open onClose={onClose} maskClosable title="A">
        body
      </Drawer>
    );
    const mask = container.ownerDocument.body.querySelector('[role="presentation"]');
    expect(mask).toBeTruthy();
    fireEvent.click(mask!);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose on Escape when keyboard enabled", () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} keyboard title="A" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("renders custom header", () => {
    render(
      <Drawer open inline header={<div data-testid="custom-header">头</div>} />
    );
    expect(screen.getByTestId("custom-header")).toBeTruthy();
  });

  it("shows loading overlay", () => {
    render(
      <Drawer open inline loading title="加载">
        内容
      </Drawer>
    );
    expect(screen.getByLabelText("加载中")).toBeTruthy();
  });

  it("supports placement left", () => {
    render(
      <Drawer open inline placement="left" title="左侧">
        内容
      </Drawer>
    );
    expect(screen.getByText("左侧")).toBeTruthy();
  });
});

describe("DrawerPushContainer", () => {
  it("renders children", () => {
    render(
      <DrawerPushContainer>
        <main>页面内容</main>
      </DrawerPushContainer>
    );
    expect(screen.getByText("页面内容")).toBeTruthy();
  });
});

describe("DrawerFooter", () => {
  it("renders cancel and ok", () => {
    render(<DrawerFooter onCancel={vi.fn()} onOk={vi.fn()} />);
    expect(screen.getByRole("button", { name: "取消" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "保存" })).toBeTruthy();
  });
});
