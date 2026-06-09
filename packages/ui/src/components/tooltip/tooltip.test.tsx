import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tooltip } from "./index";

function getWrapper(label: string) {
  return screen.getByText(label).parentElement as HTMLElement;
}

describe("Tooltip", () => {
  it("shows content on hover and hides on leave", async () => {
    render(
      <Tooltip content="提示内容" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <button>trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole("tooltip")).toBeNull();

    fireEvent.mouseEnter(getWrapper("trigger"));
    await waitFor(() =>
      expect(screen.getByRole("tooltip").textContent).toContain("提示内容")
    );

    fireEvent.mouseLeave(getWrapper("trigger"));
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  });

  it("does not show when disabled", async () => {
    render(
      <Tooltip content="提示内容" disabled mouseEnterDelay={0}>
        <button>trigger</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(getWrapper("trigger"));
    await new Promise((r) => setTimeout(r, 30));
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("does not show when content is empty", async () => {
    render(
      <Tooltip content="" mouseEnterDelay={0}>
        <button>trigger</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(getWrapper("trigger"));
    await new Promise((r) => setTimeout(r, 30));
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("renders when controlled open is true", () => {
    render(
      <Tooltip content="受控提示" open>
        <button>trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip").textContent).toContain("受控提示");
  });

  it("toggles via click trigger and fires onOpenChange", async () => {
    const onOpenChange = vi.fn();
    render(
      <Tooltip content="点击提示" trigger="click" onOpenChange={onOpenChange}>
        <button>trigger</button>
      </Tooltip>
    );
    fireEvent.click(getWrapper("trigger"));
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeNull());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
