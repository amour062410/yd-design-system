"use client";

import { useState } from "react";
import {
  CompactPagination,
  MobilePagination,
  StandardTablePagination,
} from "@yd-ds/ui/business-patterns/navigation";
import { Pagination } from "@yd-ds/ui/pagination";
import { Table } from "@yd-ds/ui/table";
import { PAGINATION_TYPE_LABELS } from "@/lib/data/paginationMock";

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-6 py-6 md:px-8">
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

const tableColumns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "部门", dataIndex: "dept", key: "dept" },
];

const tableData = Array.from({ length: 6 }, (_, i) => ({
  key: String(i + 1),
  name: `员工 ${i + 1}`,
  dept: "运营部",
}));

export function PaginationTypesShowcase() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="space-y-6">
      <DemoCard
        title={PAGINATION_TYPE_LABELS[0].label}
        description={PAGINATION_TYPE_LABELS[0].description}
      >
        <Pagination total={500} defaultCurrent={1} defaultPageSize={10} />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[1].label}
        description={PAGINATION_TYPE_LABELS[1].description}
      >
        <Pagination
          total={500}
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page);
            setPageSize(size);
          }}
        />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[2].label}
        description={PAGINATION_TYPE_LABELS[2].description}
      >
        <Pagination total={200} defaultCurrent={3} size="small" />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[3].label}
        description={PAGINATION_TYPE_LABELS[3].description}
      >
        <Pagination total={500} defaultCurrent={12} defaultPageSize={10} simple />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[4].label}
        description={PAGINATION_TYPE_LABELS[4].description}
      >
        <Pagination total={500} defaultCurrent={1} showQuickJumper />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[5].label}
        description={PAGINATION_TYPE_LABELS[5].description}
      >
        <Pagination total={500} defaultCurrent={1} showSizeChanger />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[6].label}
        description={PAGINATION_TYPE_LABELS[6].description}
      >
        <Pagination total={500} defaultCurrent={1} showTotal />
      </DemoCard>

      <DemoCard
        title={PAGINATION_TYPE_LABELS[7].label}
        description={PAGINATION_TYPE_LABELS[7].description}
      >
        <Pagination
          total={10000}
          defaultCurrent={50}
          defaultPageSize={20}
          showTotal
          showSizeChanger
          showQuickJumper
        />
      </DemoCard>
    </div>
  );
}

export function PaginationTableShowcase() {
  return (
    <DemoCard title="Table Integration" description="Table pagination prop 自动挂载 Pagination">
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={{
          current: 1,
          pageSize: 20,
          total: 500,
          showTotal: true,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </DemoCard>
  );
}

export function PaginationStateShowcase() {
  return (
    <div className="space-y-6">
      <DemoCard title="Disabled" description="禁用态 opacity 40%">
        <Pagination total={500} defaultCurrent={3} disabled showTotal showSizeChanger />
      </DemoCard>

      <DemoCard title="Mobile Mode" description="MobilePagination — simple + small">
        <MobilePagination total={500} defaultCurrent={12} />
      </DemoCard>

      <DemoCard title="Dashboard Mode" description="CompactPagination — 紧凑 + 总数">
        <CompactPagination total={128} defaultCurrent={2} showTotal />
      </DemoCard>
    </div>
  );
}

export function PaginationBusinessShowcase() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  return (
    <DemoCard
      title="StandardTablePagination"
      description="员工 / 项目 / 客户 / 订单 / 任务管理 — 总条数 + 分页 + 页容量 + 跳转"
    >
      <StandardTablePagination
        total={500}
        current={page}
        pageSize={pageSize}
        onChange={(p, ps) => {
          setPage(p);
          setPageSize(ps);
        }}
      />
    </DemoCard>
  );
}
