import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("Select", () => {
  it("renders placeholder when empty", () => {
    render(<Select options={options} placeholder="Pick fruit" />);
    expect(screen.getByText("Pick fruit")).toBeTruthy();
  });

  it("opens panel and selects single option", () => {
    const onChange = vi.fn();
    render(
      <Select options={options} placeholder="Pick" onChange={onChange} />
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Banana" }));
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("supports multiple selection", () => {
    const onChange = vi.fn();
    render(
      <Select
        mode="multiple"
        options={options}
        onChange={onChange}
        defaultValue={[]}
      />
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Apple" }));
    fireEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining(["apple", "cherry"])
    );
  });

  it("respects disabled state", () => {
    render(<Select options={options} disabled placeholder="Off" />);
    const combobox = screen.getByRole("combobox");
    expect(combobox.getAttribute("aria-disabled")).toBe("true");
  });

  it("renders option groups", () => {
    render(
      <Select
        options={[
          {
            label: "Group A",
            options: [{ label: "One", value: "1" }],
          },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Group A")).toBeTruthy();
    expect(screen.getByRole("option", { name: "One" })).toBeTruthy();
  });

  it("filters options when showSearch is enabled", () => {
    render(<Select options={options} showSearch />);
    fireEvent.click(screen.getByRole("combobox"));
    const search = screen.getByLabelText("请搜索");
    fireEvent.change(search, { target: { value: "cher" } });
    expect(screen.getByRole("option", { name: "Cherry" })).toBeTruthy();
    expect(screen.queryByRole("option", { name: "Apple" })).toBeNull();
  });
});
