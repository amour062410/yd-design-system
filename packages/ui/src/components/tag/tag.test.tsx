import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tag, TagGroup } from "../tag";
import { InspectionStatusTag } from "../../business-patterns/tag/inspection-status-tag";
import { RiskLevelTag } from "../../business-patterns/tag/risk-level-tag";
import { StoreStatusTag } from "../../business-patterns/tag/store-status-tag";

describe("Tag", () => {
  it("renders outline by default", () => {
    const { container } = render(<Tag>标签</Tag>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.border).toContain("1px solid");
    expect(screen.getByText("标签")).toBeTruthy();
  });

  it("renders light variant", () => {
    const { container } = render(
      <Tag variant="light" status="primary">
        进行中
      </Tag>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.backgroundColor).toBeTruthy();
  });
});

describe("TagGroup segmented", () => {
  it("switches single selection", () => {
    const onChange = vi.fn();
    render(
      <TagGroup
        mode="segmented"
        value="all"
        onChange={onChange}
        items={[
          { value: "all", label: "全部", count: 10 },
          { value: "abnormal", label: "异常", count: 3 },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("tab", { name: /异常/ }));
    expect(onChange).toHaveBeenCalledWith("abnormal");
  });

  it("supports keyboard navigation", () => {
    const onChange = vi.fn();
    render(
      <TagGroup
        mode="segmented"
        value="all"
        onChange={onChange}
        items={[
          { value: "all", label: "全部" },
          { value: "done", label: "已完成" },
        ]}
      />
    );
    const tablist = screen.getByRole("tablist");
    fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith("done");
  });
});

describe("Tag presets", () => {
  it("InspectionStatusTag uses light", () => {
    render(<InspectionStatusTag status="pending" />);
    expect(screen.getByText("待开始")).toBeTruthy();
  });

  it("RiskLevelTag renders high", () => {
    render(<RiskLevelTag level="high" />);
    expect(screen.getByText("高风险")).toBeTruthy();
  });

  it("StoreStatusTag renders open", () => {
    render(<StoreStatusTag status="open" />);
    expect(screen.getByText("营业中")).toBeTruthy();
  });
});
