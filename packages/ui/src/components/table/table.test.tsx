import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CandidateTableDemo } from "../../business-patterns/table/candidate-table-demo";
import { Table } from "./table";

type Row = { key: string; name: string; dept: string };

const data: Row[] = [
  { key: "1", name: "张明", dept: "研发" },
  { key: "2", name: "李华", dept: "产品" },
];

const columns = [
  { key: "name", title: "姓名", dataIndex: "name" },
  { key: "dept", title: "部门", dataIndex: "dept" },
];

describe("Table", () => {
  it("renders data rows", () => {
    render(<Table columns={columns} dataSource={data} pagination={false} />);
    expect(screen.getByText("张明")).toBeTruthy();
    expect(screen.getByText("李华")).toBeTruthy();
  });

  it("shows empty state", () => {
    render(<Table columns={columns} dataSource={[]} pagination={false} />);
    expect(screen.getByText("暂无数据")).toBeTruthy();
  });

  it("shows loading skeleton", () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} loading pagination={false} />
    );
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });

  it("filters via search integration", () => {
    const onSearch = vi.fn();
    render(
      <Table
        columns={columns}
        dataSource={data}
        searchValue=""
        onSearch={onSearch}
        pagination={false}
      />
    );
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "李" } });
    expect(onSearch).toHaveBeenCalledWith("李");
  });

  it("expands row when expandable configured", () => {
    render(
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <div>详情：{String(record.name)}</div>
          ),
        }}
      />
    );
    const expandBtn = screen.getAllByLabelText("展开")[0];
    fireEvent.click(expandBtn);
    expect(screen.getByText("详情：张明")).toBeTruthy();
  });
});

describe("CandidateTableDemo", () => {
  it("renders store inspection columns", () => {
    render(<CandidateTableDemo pagination={false} />);
    expect(screen.getByText("门店名称")).toBeTruthy();
    expect(screen.getByText("门店负责人")).toBeTruthy();
    expect(screen.getByText("执行周期")).toBeTruthy();
    expect(screen.getByText("巡检方式")).toBeTruthy();
    expect(screen.getByText("上海南京路旗舰店")).toBeTruthy();
  });
});
