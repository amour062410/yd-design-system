import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  OrganizationTree,
  PermissionTree,
  STORE_TREE_DATA,
  StoreTree,
  Tree,
} from "./index";

describe("Tree", () => {
  it("renders store tree nodes", () => {
    render(<Tree treeData={STORE_TREE_DATA} defaultExpandedKeys={["nation", "chengdu"]} />);
    expect(screen.getByText("全国门店")).toBeTruthy();
    expect(screen.getByText("万象城店")).toBeTruthy();
  });

  it("selects node on click", () => {
    const onSelect = vi.fn();
    render(
      <Tree
        treeData={STORE_TREE_DATA}
        defaultExpandedKeys={["nation", "chengdu"]}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByText("万象城店"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("filters nodes when searchable", () => {
    render(<StoreTree searchable defaultExpandedKeys={["nation"]} />);
    const input = screen.getByPlaceholderText("搜索门店 / 区域");
    fireEvent.change(input, { target: { value: "IFS" } });
    expect(document.querySelector('[data-tree-node="cd-ifs"]')).toBeTruthy();
  });

  it("renders business trees", () => {
    render(<OrganizationTree />);
    expect(screen.getByText("运营中心")).toBeTruthy();

    render(<PermissionTree checkable />);
    expect(screen.getByText("巡检管理")).toBeTruthy();
  });
});
