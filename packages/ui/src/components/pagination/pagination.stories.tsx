import { useState } from "react";
import { Table } from "../table";
import { Pagination } from "./index";

const columns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "部门", dataIndex: "dept", key: "dept" },
];

const data = Array.from({ length: 8 }, (_, i) => ({
  key: String(i + 1),
  name: `员工 ${i + 1}`,
  dept: "运营部",
}));

export default {
  title: "YD Design System/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
};

export const Basic = {
  render: () => <Pagination total={500} defaultCurrent={1} defaultPageSize={10} />,
};

export const Controlled = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        total={500}
        current={current}
        pageSize={pageSize}
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
    );
  },
};

export const Small = {
  render: () => (
    <Pagination total={200} defaultCurrent={3} size="small" />
  ),
};

export const Simple = {
  render: () => (
    <Pagination total={500} defaultCurrent={1} defaultPageSize={10} simple />
  ),
};

export const QuickJumper = {
  render: () => (
    <Pagination total={500} defaultCurrent={1} showQuickJumper />
  ),
};

export const SizeChanger = {
  render: () => (
    <Pagination total={500} defaultCurrent={1} showSizeChanger />
  ),
};

export const ShowTotal = {
  render: () => (
    <Pagination total={500} defaultCurrent={1} showTotal />
  ),
};

export const LargeDataset = {
  render: () => (
    <Pagination
      total={10000}
      defaultCurrent={50}
      defaultPageSize={20}
      showTotal
      showSizeChanger
      showQuickJumper
    />
  ),
};

export const TableIntegration = {
  render: () => (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current: 1,
        pageSize: 20,
        total: 500,
        showTotal: true,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  ),
};

export const Disabled = {
  render: () => (
    <Pagination total={500} defaultCurrent={3} disabled showTotal showSizeChanger />
  ),
};

export const MobileMode = {
  render: () => (
    <Pagination total={500} defaultCurrent={12} simple size="small" />
  ),
};

export const DashboardMode = {
  render: () => (
    <Pagination
      total={128}
      defaultCurrent={2}
      size="small"
      showTotal
      showSizeChanger={false}
      showQuickJumper={false}
    />
  ),
};
