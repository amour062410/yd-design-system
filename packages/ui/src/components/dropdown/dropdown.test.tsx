import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import { Dropdown, DropdownLink } from "./index";

describe("Dropdown", () => {
  it("opens on click and selects item", async () => {
    const onMenuClick = vi.fn();

    render(
      <Dropdown
        trigger={<Button>操作</Button>}
        menu={[
          { key: "edit", label: "编辑" },
          { key: "delete", label: "删除", danger: true },
        ]}
        onMenuClick={onMenuClick}
      />
    );

    fireEvent.click(screen.getByText("操作"));
    expect(await screen.findByRole("menu")).toBeTruthy();

    fireEvent.click(screen.getByRole("menuitem", { name: "编辑" }));
    expect(onMenuClick).toHaveBeenCalledWith("edit", expect.objectContaining({ key: "edit" }));
    await waitFor(() => {
      expect(screen.queryByRole("menu")).toBeNull();
    });
  });

  it("closes on Escape", async () => {
    render(
      <Dropdown
        trigger={<Button>操作</Button>}
        menu={[{ key: "edit", label: "编辑" }]}
      />
    );

    fireEvent.click(screen.getByText("操作"));
    expect(await screen.findByRole("menu")).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("menu")).toBeNull();
    });
  });

  it("renders divider", async () => {
    render(
      <Dropdown
        trigger={<Button>操作</Button>}
        menu={[
          { key: "edit", label: "编辑" },
          { type: "divider" },
          { key: "delete", label: "删除", danger: true },
        ]}
      />
    );

    fireEvent.click(screen.getByText("操作"));
    expect(await screen.findByRole("menu")).toBeTruthy();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("does not open when disabled", () => {
    render(
      <Dropdown
        disabled
        trigger={<Button>操作</Button>}
        menu={[{ key: "edit", label: "编辑" }]}
      />
    );

    fireEvent.click(screen.getByText("操作"));
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens link trigger on hover", async () => {
    render(
      <DropdownLink menu={[{ key: "1", label: "第一项" }]}>Hover me</DropdownLink>
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    expect(await screen.findByRole("menu")).toBeTruthy();
  });
});
