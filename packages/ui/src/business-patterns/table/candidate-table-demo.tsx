"use client";

import { useMemo, useState } from "react";
import { Table, TableActionGroup, TableActionLink } from "../../components/table/table";
import type { TableColumn } from "../../components/table/table.types";

export type CandidateRecord = {
  key: string;
  storeName: string;
  owner: string;
  cycle: string;
  status: string;
  method: string;
};

const CANDIDATE_DATA: CandidateRecord[] = [
  {
    key: "1",
    storeName: "上海南京路旗舰店",
    owner: "张明",
    cycle: "每周一 / 周三",
    status: "进行中",
    method: "现场巡检",
  },
  {
    key: "2",
    storeName: "北京朝阳合生汇店",
    owner: "李华",
    cycle: "每月 1 日",
    status: "待开始",
    method: "视频巡检",
  },
  {
    key: "3",
    storeName: "深圳万象天地店",
    owner: "王芳",
    cycle: "双周",
    status: "已完成",
    method: "现场巡检",
  },
  {
    key: "4",
    storeName: "杭州西湖银泰店",
    owner: "赵强",
    cycle: "每周五",
    status: "已逾期",
    method: "现场巡检",
  },
  {
    key: "5",
    storeName: "成都太古里店",
    owner: "陈静",
    cycle: "每月 15 日",
    status: "进行中",
    method: "混合巡检",
  },
  {
    key: "6",
    storeName: "广州天河城店",
    owner: "刘洋",
    cycle: "每周二",
    status: "待开始",
    method: "视频巡检",
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  进行中: { bg: "rgba(22, 93, 255, 0.08)", color: "var(--table-action-color)" },
  待开始: { bg: "rgba(255, 125, 0, 0.08)", color: "var(--modal-warning-color)" },
  已完成: { bg: "rgba(0, 180, 42, 0.08)", color: "var(--modal-success-color)" },
  已逾期: { bg: "rgba(245, 63, 63, 0.08)", color: "var(--modal-error-color)" },
};

function StatusTag({ status }: { status: string }) {
  const style = STATUS_STYLE[status] ?? STATUS_STYLE["待开始"]!;
  return (
    <span
      className="inline-flex rounded-[var(--table-radius)] px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {status}
    </span>
  );
}

export interface CandidateTableDemoProps {
  className?: string;
  /** 是否展示内置搜索（Search Integration） */
  showSearch?: boolean;
  pagination?: boolean;
}

/** 门店巡检案例 — 验证真实业务场景 */
export function CandidateTableDemo({
  className,
  showSearch = true,
  pagination = true,
}: CandidateTableDemoProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const columns: TableColumn<CandidateRecord>[] = [
    { key: "storeName", title: "门店名称", dataIndex: "storeName", width: 200 },
    { key: "owner", title: "门店负责人", dataIndex: "owner", width: 120 },
    { key: "cycle", title: "执行周期", dataIndex: "cycle", width: 160 },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      width: 100,
      filters: [
        { text: "进行中", value: "进行中" },
        { text: "待开始", value: "待开始" },
        { text: "已完成", value: "已完成" },
        { text: "已逾期", value: "已逾期" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) => <StatusTag status={String(value)} />,
    },
    { key: "method", title: "巡检方式", dataIndex: "method", width: 120 },
    {
      key: "action",
      title: "操作",
      width: 140,
      fixed: "right",
      render: () => (
        <TableActionGroup>
          <TableActionLink>查看</TableActionLink>
          <TableActionLink>指派</TableActionLink>
        </TableActionGroup>
      ),
    },
  ];

  const filteredByStatus = useMemo(() => CANDIDATE_DATA, []);

  return (
    <Table<CandidateRecord>
      className={className}
      title="门店巡检任务"
      {...(showSearch
        ? { searchValue: search, onSearch: setSearch }
        : {})}
      searchPlaceholder="搜索门店 / 负责人"
      columns={columns}
      dataSource={filteredByStatus}
      striped
      rowSelection={{
        selectedRowKeys: selected,
        onChange: setSelected,
      }}
      scroll={{ x: 960 }}
      pagination={
        pagination
          ? {
              total: CANDIDATE_DATA.length,
              defaultPageSize: 10,
              showTotal: true,
            }
          : false
      }
    />
  );
}
