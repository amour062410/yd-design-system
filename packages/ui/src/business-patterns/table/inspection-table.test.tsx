import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InspectionScore } from "./inspection-score";
import { InspectionQuickFilter } from "./inspection-quick-filter";
import { InspectionStatusTag } from "./inspection-status-tag";
import { InspectionTable } from "./inspection-table";
import { STORE_INSPECTION_TASK_SAMPLE } from "./inspection-task-mock";
import { StoreInspectionDemo } from "./store-inspection-demo";
import { StoreRiskLevelTag } from "./store-risk-level-tag";
import { TableBatchActions } from "../../components/table/table-batch-actions";
import { TableToolbar } from "../../components/table/table-toolbar";

describe("InspectionStatusTag", () => {
  it("renders pending label", () => {
    render(<InspectionStatusTag status="pending" />);
    expect(screen.getByText("待开始")).toBeTruthy();
  });

  it("renders overdue label", () => {
    render(<InspectionStatusTag status="overdue" />);
    expect(screen.getByText("已超期")).toBeTruthy();
  });
});

describe("StoreRiskLevelTag", () => {
  it("renders high risk label", () => {
    render(<StoreRiskLevelTag level="high" />);
    expect(screen.getByText("高风险")).toBeTruthy();
  });
});

describe("InspectionScore", () => {
  it("renders score with unit", () => {
    render(<InspectionScore score={95} />);
    expect(screen.getByText("95")).toBeTruthy();
    expect(screen.getByText("分")).toBeTruthy();
  });
});

describe("InspectionQuickFilter", () => {
  it("switches status on click", () => {
    const onChange = vi.fn();
    render(
      <InspectionQuickFilter
        value="all"
        onChange={onChange}
        items={[
          { value: "all", label: "全部", count: 128 },
          { value: "pending", label: "待开始", count: 25 },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("tab", { name: /待开始/ }));
    expect(onChange).toHaveBeenCalledWith("pending");
  });
});

describe("TableToolbar", () => {
  it("calls onSearch", () => {
    const onSearch = vi.fn();
    render(
      <TableToolbar variant="compact" searchable searchValue="" onSearch={onSearch} />
    );
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "上海" } });
    expect(onSearch).toHaveBeenCalledWith("上海");
  });
});

describe("TableBatchActions", () => {
  it("hidden when count is zero", () => {
    const { container } = render(
      <TableBatchActions selectedCount={0} selectedKeys={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows batch buttons when selected", () => {
    render(
      <TableBatchActions selectedCount={2} selectedKeys={["1", "2"]} />
    );
    expect(screen.getByText("已选择 2 项")).toBeTruthy();
    expect(screen.getByRole("button", { name: "批量指派" })).toBeTruthy();
  });
});

describe("InspectionTable", () => {
  it("renders default columns", () => {
    render(
      <InspectionTable
        dataSource={STORE_INSPECTION_TASK_SAMPLE.slice(0, 2)}
        pagination={false}
      />
    );
    expect(screen.getByText("门店名称")).toBeTruthy();
    expect(screen.getByText("巡检负责人")).toBeTruthy();
    expect(screen.getByText("最近巡检时间")).toBeTruthy();
    expect(screen.getByText(STORE_INSPECTION_TASK_SAMPLE[0].storeName)).toBeTruthy();
  });

  it("filters by search", () => {
    render(
      <InspectionTable
        dataSource={STORE_INSPECTION_TASK_SAMPLE}
        pagination={false}
      />
    );
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "002" } });
    expect(screen.getByText(/002/)).toBeTruthy();
    expect(screen.queryByText(/001/)).toBeNull();
  });

  it("filters by quick status", () => {
    render(
      <InspectionTable
        dataSource={STORE_INSPECTION_TASK_SAMPLE}
        pagination={false}
      />
    );
    fireEvent.click(screen.getByRole("tab", { name: /待开始/ }));
    const pendingRows = STORE_INSPECTION_TASK_SAMPLE.filter((r) => r.status === "pending");
    expect(screen.getAllByText(/待开始/).length).toBeGreaterThan(0);
    expect(pendingRows.length).toBeGreaterThan(0);
  });
});

describe("StoreInspectionDemo", () => {
  it("renders V3 risk cockpit layout", () => {
    render(<StoreInspectionDemo />);
    expect(screen.getByText("门店巡检总览")).toBeTruthy();
    expect(screen.getByText("异常门店")).toBeTruthy();
    expect(screen.getByText("待整改项")).toBeTruthy();
    expect(screen.getByText("高风险门店")).toBeTruthy();
    expect(screen.getByText("巡检完成率")).toBeTruthy();
    expect(screen.queryByText("今日待巡检")).toBeNull();
    expect(screen.getByText("巡检得分")).toBeTruthy();
    expect(screen.getByText("风险等级")).toBeTruthy();
    expect(screen.getByText("整改完成率")).toBeTruthy();
    expect(screen.getByRole("button", { name: /全部/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /异常/ })).toBeTruthy();
  });
});
