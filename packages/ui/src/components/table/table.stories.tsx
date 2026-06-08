import { useState } from "react";
import { CandidateTableDemo } from "../../business-patterns/table/candidate-table-demo";
import { Table } from "./table";

export default {
  title: "YD Design System/Table",
  component: Table,
  parameters: { layout: "padded" },
};

const columns = [
  { key: "name", title: "姓名", dataIndex: "name", sorter: true },
  { key: "dept", title: "部门", dataIndex: "dept" },
];

const data = [
  { key: "1", name: "张明", dept: "研发" },
  { key: "2", name: "李华", dept: "产品" },
];

export const Basic = {
  render: () => <Table columns={columns} dataSource={data} pagination={false} />,
};

export const Sorting = {
  render: () => (
    <Table
      columns={[
        {
          key: "name",
          title: "姓名",
          dataIndex: "name",
          sorter: (a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name, "zh"),
        },
        { key: "dept", title: "部门", dataIndex: "dept" },
      ]}
      dataSource={data}
      pagination={false}
    />
  ),
};

export const Selection = {
  render: () => {
    const [keys, setKeys] = useState<string[]>([]);
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ selectedRowKeys: keys, onChange: setKeys }}
        pagination={false}
      />
    );
  },
};

export const Expandable = {
  render: () => (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      expandable={{
        expandedRowRender: (row) => (
          <p className="text-sm text-muted-foreground">扩展：{row.name}</p>
        ),
      }}
    />
  ),
};

export const FixedHeader = {
  render: () => (
    <Table
      columns={columns}
      dataSource={Array.from({ length: 12 }, (_, i) => ({
        key: String(i),
        name: `用户 ${i + 1}`,
        dept: "研发",
      }))}
      scroll={{ y: 280 }}
      pagination={false}
    />
  ),
};

export const Loading = {
  render: () => <Table columns={columns} dataSource={[]} loading pagination={false} />,
};

export const CandidateDemo = {
  render: () => <CandidateTableDemo />,
};
