import { fireEvent, render, screen } from "@testing-library/react";
import { Home, Settings } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "./menu";
import type { MenuItemConfig } from "./menu.types";

const verticalItems: MenuItemConfig[] = [
  {
    key: "home",
    label: "首页",
    icon: <Home data-testid="home-icon" size={16} />,
  },
  {
    key: "settings",
    label: "系统设置",
    icon: <Settings data-testid="settings-icon" size={16} />,
    children: [
      { key: "users", label: "用户管理" },
      { key: "roles", label: "角色权限" },
    ],
  },
];

describe("Menu", () => {
  it("renders vertical items and selects on click", () => {
    const onSelect = vi.fn();

    render(
      <Menu
        mode="vertical"
        items={verticalItems}
        defaultSelectedKeys={["home"]}
        onSelect={onSelect}
      />
    );

    expect(screen.getByRole("menuitem", { name: "首页" }).getAttribute("aria-current")).toBe("page");

    fireEvent.click(screen.getByRole("menuitem", { name: "系统设置" }));
    expect(screen.getByRole("menuitem", { name: "用户管理" })).toBeTruthy();

    fireEvent.click(screen.getByRole("menuitem", { name: "用户管理" }));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "users",
        selectedKeys: ["users"],
      })
    );
  });

  it("renders horizontal items with underline selection", () => {
    render(
      <Menu
        mode="horizontal"
        items={[
          { key: "home", label: "首页" },
          { key: "report", label: "报表中心" },
        ]}
        defaultSelectedKeys={["home"]}
      />
    );

    const report = screen.getByRole("menuitem", { name: "报表中心" });
    fireEvent.click(report);
    expect(report.getAttribute("aria-current")).toBe("page");
  });

  it("keeps icon visible in collapsed vertical mode", () => {
    render(
      <Menu
        mode="vertical"
        collapsed
        items={verticalItems}
        defaultSelectedKeys={["home"]}
      />
    );

    expect(screen.getByTestId("home-icon")).toBeTruthy();
  });
});
