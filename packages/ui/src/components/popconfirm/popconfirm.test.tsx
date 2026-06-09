import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import { Popconfirm } from "./index";

describe("Popconfirm", () => {
  it("opens on trigger click and confirms", async () => {
    const onConfirm = vi.fn();
    render(
      <Popconfirm title="确认删除？" onConfirm={onConfirm}>
        <Button>删除</Button>
      </Popconfirm>
    );

    fireEvent.click(screen.getByText("删除"));
    expect(await screen.findByRole("dialog")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "确认" }));
    expect(onConfirm).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("calls onCancel and closes", async () => {
    const onCancel = vi.fn();
    render(
      <Popconfirm title="确认？" onCancel={onCancel} onConfirm={() => {}}>
        <Button>操作</Button>
      </Popconfirm>
    );

    fireEvent.click(screen.getByText("操作"));
    fireEvent.click(await screen.findByRole("button", { name: "取消" }));
    expect(onCancel).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("closes on Escape", async () => {
    render(
      <Popconfirm title="确认？" onConfirm={() => {}}>
        <Button>操作</Button>
      </Popconfirm>
    );

    fireEvent.click(screen.getByText("操作"));
    expect(await screen.findByRole("dialog")).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("supports async confirm loading", async () => {
    render(
      <Popconfirm
        title="异步"
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 50))}
      >
        <Button>Async</Button>
      </Popconfirm>
    );

    fireEvent.click(screen.getByText("Async"));
    fireEvent.click(await screen.findByRole("button", { name: "确认" }));
    expect(await screen.findByRole("button", { name: "确认" })).toBeTruthy();
  });
});
