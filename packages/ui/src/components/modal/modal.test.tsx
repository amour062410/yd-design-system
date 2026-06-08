import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmModal, Modal, ModalFooter } from "./modal";

describe("Modal", () => {
  it("renders title when open", () => {
    render(
      <Modal open title="测试标题" inline>
        内容
      </Modal>
    );
    expect(screen.getByRole("heading", { name: "测试标题" })).toBeTruthy();
  });

  it("calls onClose when mask is clicked and maskClosable", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose} maskClosable title="A" inline={false}>
        body
      </Modal>
    );
    const overlay = container.ownerDocument.body.querySelector(
      '[role="presentation"]'
    );
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose on mask when maskClosable is false", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose} maskClosable={false} title="A">
        body
      </Modal>
    );
    const overlay = container.ownerDocument.body.querySelector(
      '[role="presentation"]'
    );
    fireEvent.click(overlay!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on Escape when keyboard is enabled", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} keyboard title="A" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("shows loading overlay when loading", () => {
    render(
      <Modal open loading title="加载" inline>
        内容
      </Modal>
    );
    expect(screen.getByLabelText("加载中")).toBeTruthy();
  });

  it("renders custom header", () => {
    render(
      <Modal open header={<div data-testid="custom-header">自定义头</div>} inline />
    );
    expect(screen.getByTestId("custom-header")).toBeTruthy();
  });
});

describe("ConfirmModal", () => {
  it("renders error type title", () => {
    render(<ConfirmModal open type="error" inline />);
    expect(screen.getByText("弹窗错误标题")).toBeTruthy();
  });
});

describe("ModalFooter", () => {
  it("renders ok and cancel buttons", () => {
    render(<ModalFooter onCancel={vi.fn()} onOk={vi.fn()} />);
    expect(screen.getByRole("button", { name: "取消" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "确定" })).toBeTruthy();
  });
});
