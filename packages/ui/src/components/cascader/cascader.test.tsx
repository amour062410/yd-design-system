import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  findOptionPath,
  formatPathLabels,
  getColumnsFromPath,
  isSelectableNode,
  movePanelFocus,
  normalizeCascaderOptions,
  pathsEqual,
  searchCascaderOptions,
} from "./cascader-utils";
import { Cascader, DEFAULT_CASCADER_OPTIONS } from "./index";

describe("cascader utils", () => {
  const options = normalizeCascaderOptions(DEFAULT_CASCADER_OPTIONS);

  it("finds option path by value array", () => {
    const path = findOptionPath(options, ["zhejiang", "hangzhou", "xihu"]);
    expect(formatPathLabels(path)).toBe("浙江省 / 杭州市 / 西湖区");
  });

  it("builds columns from active path", () => {
    const columns = getColumnsFromPath(options, ["zhejiang", "hangzhou"]);
    expect(columns).toHaveLength(3);
    expect(columns[2]?.map((item) => item.label)).toEqual(["西湖区", "滨江区"]);
  });

  it("searches leaf paths", () => {
    const results = searchCascaderOptions(options, "鼓楼");
    expect(results[0]?.labels).toBe("江苏省 / 南京市 / 鼓楼区");
  });

  it("supports custom filter", () => {
    const results = searchCascaderOptions(
      options,
      "x",
      (_input, path) => path.at(-1)?.value === "xihu"
    );
    expect(results).toHaveLength(1);
  });

  it("treats isLeaf nodes as selectable", () => {
    expect(
      isSelectableNode({ label: "A", value: "a", isLeaf: true, children: [] })
    ).toBe(true);
  });

  it("moves keyboard focus within column", () => {
    const columns = getColumnsFromPath(options, []);
    const next = movePanelFocus(columns, { column: 0, index: 0 }, "ArrowDown");
    expect(next.index).toBe(1);
  });

  it("compares paths", () => {
    expect(pathsEqual(["a", "b"], ["a", "b"])).toBe(true);
    expect(pathsEqual(["a"], ["a", "b"])).toBe(false);
  });
});

describe("Cascader", () => {
  it("renders placeholder when empty", () => {
    render(
      <Cascader options={DEFAULT_CASCADER_OPTIONS} placeholder="Pick region" />
    );
    expect(screen.getByText("Pick region")).toBeTruthy();
  });

  it("opens panel and selects leaf path", () => {
    const onChange = vi.fn();
    render(
      <Cascader
        options={DEFAULT_CASCADER_OPTIONS}
        onChange={onChange}
        placeholder="Pick"
      />
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "浙江省" }));
    fireEvent.click(screen.getByRole("option", { name: "杭州市" }));
    fireEvent.click(screen.getByRole("option", { name: "西湖区" }));
    expect(onChange).toHaveBeenCalledWith(
      ["zhejiang", "hangzhou", "xihu"],
      expect.any(Array)
    );
  });

  it("supports changeOnSelect for parent nodes", () => {
    const onChange = vi.fn();
    render(
      <Cascader
        options={DEFAULT_CASCADER_OPTIONS}
        changeOnSelect
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "浙江省" }));
    expect(onChange).toHaveBeenCalledWith(["zhejiang"], expect.any(Array));
  });

  it("supports displayRender", () => {
    render(
      <Cascader
        options={DEFAULT_CASCADER_OPTIONS}
        defaultValue={["zhejiang", "hangzhou", "xihu"]}
        displayRender={(labels) => labels.join(" > ")}
      />
    );
    expect(screen.getByText("浙江省 > 杭州市 > 西湖区")).toBeTruthy();
  });

  it("supports controlled open state", () => {
    const onOpenChange = vi.fn();
    render(
      <Cascader
        options={DEFAULT_CASCADER_OPTIONS}
        open
        onOpenChange={onOpenChange}
      />
    );
    expect(screen.getAllByRole("listbox").length).toBeGreaterThan(0);
  });

  it("supports multiple selection", () => {
    const onChange = vi.fn();
    render(
      <Cascader
        multiple
        options={DEFAULT_CASCADER_OPTIONS}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "浙江省" }));
    fireEvent.click(screen.getByRole("option", { name: "杭州市" }));
    fireEvent.click(screen.getByRole("option", { name: "西湖区" }));
    expect(onChange).toHaveBeenCalledWith(
      [["zhejiang", "hangzhou", "xihu"]],
      expect.any(Array)
    );
  });

  it("respects disabled state", () => {
    render(<Cascader options={DEFAULT_CASCADER_OPTIONS} disabled />);
    expect(screen.getByRole("combobox").getAttribute("aria-disabled")).toBe(
      "true"
    );
  });

  it("clears selected value", () => {
    const onChange = vi.fn();
    render(
      <Cascader
        options={DEFAULT_CASCADER_OPTIONS}
        allowClear
        defaultValue={["zhejiang", "hangzhou", "xihu"]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText("清空"));
    expect(onChange).toHaveBeenCalledWith([], []);
  });
});
