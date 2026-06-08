"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import {
  CandidateTableDemo,
  InspectionStatusTag,
  InspectionTable,
  StoreInspectionDemo,
  Table,
  TableActionGroup,
  TableActionLink,
  type TableChangeFilters,
  type TableChangeSorter,
  type TableColumn,
} from "@yd-ds/ui/table";
import { tableSizeSpecs } from "@yd-ds/tokens";
import {
  BASIC_TABLE_DATA,
  EDITABLE_TABLE_INITIAL,
  FIXED_COLUMN_DATA,
  TABLE_DESIGN_SPEC_ROWS,
  type BasicEmployee,
  type EditableRow,
  type ScrollRow,
} from "@/lib/data/tableMock";

function ShowcaseCard({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      {title ? (
        <p className="mb-1 text-sm font-medium text-foreground">{title}</p>
      ) : null}
      {description ? (
        <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

function SpecTable({
  rows,
}: {
  rows: readonly { token: string; value: string; desc: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-[color:var(--table-border-color)]">
      <table className="w-full min-w-[480px] text-left text-[13px]">
        <thead>
          <tr
            className="border-b border-[color:var(--table-header-border-color)]"
            style={{ backgroundColor: "var(--table-header-bg)" }}
          >
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              Token
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              Value
            </th>
            <th className="px-4 py-3 font-medium text-[color:var(--color-text-secondary)]">
              说明
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.token}
              className="border-b border-[color:var(--table-border-color)] last:border-0"
            >
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--table-action-color)]">
                {row.token}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] text-[color:var(--color-text-secondary)]">
                {row.value}
              </td>
              <td className="px-4 py-3 text-[color:var(--color-text-secondary)]">
                {row.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const basicColumns: TableColumn<BasicEmployee>[] = [
  { key: "name", title: "姓名", dataIndex: "name" },
  { key: "dept", title: "部门", dataIndex: "dept" },
  { key: "role", title: "职位", dataIndex: "role" },
  { key: "status", title: "状态", dataIndex: "status" },
  { key: "createdAt", title: "创建时间", dataIndex: "createdAt" },
  {
    key: "action",
    title: "操作",
    render: () => (
      <TableActionGroup>
        <TableActionLink>查看</TableActionLink>
        <TableActionLink>编辑</TableActionLink>
      </TableActionGroup>
    ),
  },
];

export function TableBasicShowcase() {
  return (
    <ShowcaseCard description="默认表格 · 5 条示例数据 · 操作列含查看、编辑">
      <Table columns={basicColumns} dataSource={BASIC_TABLE_DATA} pagination={false} />
    </ShowcaseCard>
  );
}

export function TableStatesShowcase() {
  const stateCols = basicColumns.slice(0, 4);
  const oneRow = [BASIC_TABLE_DATA[0]!];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ShowcaseCard title="Default">
        <Table columns={stateCols} dataSource={oneRow} pagination={false} />
      </ShowcaseCard>
      <ShowcaseCard title="Hover Row">
        <Table
          columns={stateCols}
          dataSource={oneRow}
          showcaseRowState="hover"
          pagination={false}
        />
      </ShowcaseCard>
      <ShowcaseCard title="Selected Row">
        <Table
          columns={stateCols}
          dataSource={oneRow}
          showcaseRowState="selected"
          pagination={false}
        />
      </ShowcaseCard>
      <ShowcaseCard title="Loading">
        <Table columns={stateCols} dataSource={[]} loading pagination={false} />
      </ShowcaseCard>
      <div className="lg:col-span-2">
        <ShowcaseCard title="Empty">
          <Table columns={stateCols} dataSource={[]} pagination={false} />
        </ShowcaseCard>
      </div>
    </div>
  );
}

export function TableSizesShowcase() {
  const cols = basicColumns.slice(0, 5);
  const data = BASIC_TABLE_DATA.slice(0, 3);

  return (
    <div className="space-y-8">
      <ShowcaseCard
        title={`Medium · ${tableSizeSpecs.md.rowHeight} 行高`}
        description={tableSizeSpecs.md.label}
      >
        <Table size="md" columns={cols} dataSource={data} pagination={false} />
      </ShowcaseCard>
      <ShowcaseCard
        title={`Small · ${tableSizeSpecs.sm.rowHeight} 行高`}
        description={tableSizeSpecs.sm.label}
      >
        <Table size="sm" columns={cols} dataSource={data} pagination={false} />
      </ShowcaseCard>
    </div>
  );
}

export function TableSortShowcase() {
  const [sorterInfo, setSorterInfo] = useState<TableChangeSorter>({
    columnKey: "name",
    order: "ascend",
  });

  const sortCols: TableColumn<BasicEmployee>[] = [
    {
      key: "name",
      title: "姓名",
      dataIndex: "name",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.name.localeCompare(b.name, "zh"),
    },
    {
      key: "dept",
      title: "部门",
      dataIndex: "dept",
      sorter: (a, b) => a.dept.localeCompare(b.dept, "zh"),
    },
    {
      key: "createdAt",
      title: "创建时间",
      dataIndex: "createdAt",
      sorter: (a, b, sortOrder) => {
        void sortOrder;
        return a.createdAt.localeCompare(b.createdAt);
      },
      sortDirections: ["ascend", "descend", "ascend"],
    },
  ];

  return (
    <div className="space-y-8">
      <ShowcaseCard
        title="sorter 函数 + defaultSortOrder"
        description={`当前：${sorterInfo.columnKey || "—"} · ${sorterInfo.order ?? "默认"}。创建时间列使用 sortDirections={['ascend','descend','ascend']}，不回到未排序。`}
      >
        <Table
          columns={sortCols}
          dataSource={BASIC_TABLE_DATA}
          sortDirections={["ascend", "descend", null]}
          pagination={false}
          onChange={(_p, _f, sorter) => setSorterInfo(sorter)}
        />
      </ShowcaseCard>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="rounded-md border bg-muted/30 px-3 py-1.5">
          sorter(rowA, rowB, sortOrder?)
        </span>
        <span className="rounded-md border bg-muted/30 px-3 py-1.5">defaultSortOrder</span>
        <span className="rounded-md border bg-muted/30 px-3 py-1.5">sortDirections 表级 / 列级</span>
      </div>
    </div>
  );
}

export function TableFilterShowcase() {
  const [filterLog, setFilterLog] = useState<TableChangeFilters>({});

  const filterCols: TableColumn<BasicEmployee>[] = [
    { key: "name", title: "姓名", dataIndex: "name" },
    {
      key: "dept",
      title: "部门",
      dataIndex: "dept",
      filters: [
        { text: "研发一部", value: "研发一部" },
        { text: "研发二部", value: "研发二部" },
        { text: "产品部", value: "产品部" },
        { text: "运营部", value: "运营部" },
        { text: "设计部", value: "设计部" },
      ],
      onFilter: (value, record) => record.dept === value,
      filterMultiple: true,
      defaultFilteredValue: ["研发一部", "研发二部"],
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      filters: [
        { text: "在职", value: "在职" },
        { text: "休假", value: "休假" },
      ],
      onFilter: (value, record) => record.status === value,
      filterMultiple: false,
    },
    { key: "role", title: "职位", dataIndex: "role" },
    { key: "createdAt", title: "创建时间", dataIndex: "createdAt" },
  ];

  return (
    <div className="space-y-8">
      <ShowcaseCard
        title="filters + onFilter + defaultFilteredValue"
        description="部门多选（默认筛选项）、状态单选；点击表头筛选图标，确定后生效。"
      >
        <Table
          columns={filterCols}
          dataSource={BASIC_TABLE_DATA}
          pagination={false}
          onChange={(_p, filters) => setFilterLog(filters)}
        />
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          onChange filters: {JSON.stringify(filterLog)}
        </p>
      </ShowcaseCard>
      <ShowcaseCard
        title="filterOnClose"
        description="关闭筛选菜单时自动应用筛选（无需点确定）。"
      >
        <Table
          columns={filterCols}
          dataSource={BASIC_TABLE_DATA}
          filterOnClose
          pagination={false}
        />
      </ShowcaseCard>
    </div>
  );
}

export function TableSelectionShowcase() {
  const [selected, setSelected] = useState<string[]>(["2", "3"]);

  return (
    <ShowcaseCard description="Checkbox 批量选择 · 全选 · 部分选择 · 已选数量">
      <p className="mb-4 text-sm text-[color:var(--table-action-color)]">
        已选 {selected.length} 项
        {selected.length > 0 && selected.length < BASIC_TABLE_DATA.length
          ? "（部分选择）"
          : selected.length === BASIC_TABLE_DATA.length
            ? "（全选）"
            : ""}
      </p>
      <Table
        columns={basicColumns.slice(0, 5)}
        dataSource={BASIC_TABLE_DATA}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: setSelected,
        }}
        pagination={false}
      />
    </ShowcaseCard>
  );
}

export function TableFixedColumnsShowcase() {
  const columns: TableColumn<ScrollRow>[] = [
    { key: "name", title: "姓名", dataIndex: "name", fixed: "left", width: 120 },
    { key: "col2", title: "字段 B", dataIndex: "col2", width: 140 },
    { key: "col3", title: "字段 C", dataIndex: "col3", width: 140 },
    { key: "col4", title: "字段 D", dataIndex: "col4", width: 140 },
    { key: "col5", title: "字段 E", dataIndex: "col5", width: 140 },
    { key: "col6", title: "字段 F", dataIndex: "col6", width: 140 },
    {
      key: "action",
      title: "操作",
      fixed: "right",
      width: 120,
      render: () => (
        <TableActionGroup>
          <TableActionLink>编辑</TableActionLink>
        </TableActionGroup>
      ),
    },
  ];

  return (
    <ShowcaseCard description="左侧固定姓名 · 右侧固定操作 · 中间横向滚动">
      <Table
        columns={columns}
        dataSource={FIXED_COLUMN_DATA}
        scroll={{ x: 900 }}
        pagination={false}
      />
    </ShowcaseCard>
  );
}

export function TablePaginationShowcase() {
  return (
    <ShowcaseCard description="总数 · 页码 · 每页条数 · 跳转页">
      <Table
        size="sm"
        columns={basicColumns.slice(0, 4)}
        dataSource={BASIC_TABLE_DATA.slice(0, 3)}
        pagination={{
          total: 128,
          defaultCurrent: 1,
          defaultPageSize: 10,
          showTotal: true,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </ShowcaseCard>
  );
}

function EditableCell({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          onChange(draft);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(draft);
            setEditing(false);
          }
        }}
        className="w-full rounded-[var(--table-radius)] border border-[color:var(--table-action-color)] bg-[color:var(--table-bg)] px-2 py-1 text-[13px] outline-none"
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
      className="block min-h-[22px] cursor-text rounded px-1 transition-colors hover:bg-[color:var(--table-row-hover-bg)]"
      title="点击编辑"
    >
      {value || "—"}
    </span>
  );
}

export function TableEditableAddShowcase() {
  const [rows, setRows] = useState<EditableRow[]>(EDITABLE_TABLE_INITIAL);

  const columns: TableColumn<EditableRow>[] = [
    {
      key: "field1",
      title: "对接项",
      render: (_, record) => (
        <EditableCell
          value={record.field1}
          onChange={(v) =>
            setRows((prev) =>
              prev.map((r) => (r.key === record.key ? { ...r, field1: v } : r))
            )
          }
        />
      ),
    },
    {
      key: "field2",
      title: "说明",
      render: (_, record) => (
        <EditableCell
          value={record.field2}
          onChange={(v) =>
            setRows((prev) =>
              prev.map((r) => (r.key === record.key ? { ...r, field2: v } : r))
            )
          }
        />
      ),
    },
    {
      key: "field3",
      title: "备注",
      render: (_, record) => (
        <EditableCell
          value={record.field3}
          onChange={(v) =>
            setRows((prev) =>
              prev.map((r) => (r.key === record.key ? { ...r, field3: v } : r))
            )
          }
        />
      ),
    },
  ];

  const addRow = () => {
    const id = String(Date.now());
    setRows((prev) => [
      ...prev,
      { key: id, field1: "", field2: "", field3: "" },
    ]);
  };

  return (
    <ShowcaseCard description="点击添加按钮新增行 · 单元格 hover/点击可编辑">
      <Table columns={columns} dataSource={rows} pagination={false} />
      <button
        type="button"
        onClick={addRow}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--table-radius)] border border-dashed border-[color:var(--table-action-color)] py-3 text-sm text-[color:var(--table-action-color)] transition-colors hover:bg-[color:var(--table-row-selected-bg)]"
      >
        <Plus className="size-4" />
        添加对接项
      </button>
    </ShowcaseCard>
  );
}

export function TableFixedHeaderShowcase() {
  const cols = basicColumns.slice(0, 4);
  const many = Array.from({ length: 16 }, (_, i) => ({
    ...BASIC_TABLE_DATA[i % BASIC_TABLE_DATA.length]!,
    key: String(i + 1),
    name: `${BASIC_TABLE_DATA[i % BASIC_TABLE_DATA.length]!.name} (${i + 1})`,
  }));

  return (
    <ShowcaseCard title="Fixed Header" description="scroll.y + sticky 表头 · 圆角 6px">
      <Table columns={cols} dataSource={many} scroll={{ y: 320 }} pagination={false} striped />
    </ShowcaseCard>
  );
}

export function TableExpandableShowcase() {
  return (
    <ShowcaseCard title="Expandable" description="expandable.expandedRowRender · 行内展开详情">
      <Table
        columns={basicColumns.slice(0, 4)}
        dataSource={BASIC_TABLE_DATA.slice(0, 3)}
        pagination={false}
        expandable={{
          defaultExpandedRowKeys: ["1"],
          expandedRowRender: (record) => (
            <div className="space-y-2 text-sm text-[color:var(--color-text-secondary)]">
              <p>
                <strong className="text-[color:var(--color-text-primary)]">
                  {String(record.name)}
                </strong>{" "}
                · {String(record.dept)} · {String(record.role)}
              </p>
              <p>创建时间：{String(record.createdAt)} · 状态：{String(record.status)}</p>
            </div>
          ),
        }}
      />
    </ShowcaseCard>
  );
}

export function TableLoadingShowcase() {
  return (
    <ShowcaseCard title="Loading">
      <Table columns={basicColumns.slice(0, 4)} dataSource={[]} loading pagination={false} />
    </ShowcaseCard>
  );
}

export function TableEmptyShowcase() {
  return (
    <ShowcaseCard title="Empty">
      <Table columns={basicColumns.slice(0, 4)} dataSource={[]} pagination={false} />
    </ShowcaseCard>
  );
}

export function TableCandidateDemoShowcase() {
  return (
    <ShowcaseCard
      title="CandidateTableDemo · 门店巡检（旧）"
      description="已由 InspectionTable / StoreInspectionDemo 替代"
    >
      <CandidateTableDemo />
    </ShowcaseCard>
  );
}

export function InspectionStatusTagShowcase() {
  return (
    <ShowcaseCard title="InspectionStatusTag" description="业务状态统一映射 · 禁止页面自行写 Tag">
      <div className="flex flex-wrap gap-2">
        <InspectionStatusTag status="pending" />
        <InspectionStatusTag status="in_progress" />
        <InspectionStatusTag status="completed" />
        <InspectionStatusTag status="overdue" />
        <InspectionStatusTag status="cancelled" />
      </div>
    </ShowcaseCard>
  );
}

export function StoreInspectionDemoShowcase() {
  return (
    <ShowcaseCard
      title="StoreInspectionDemo V3 · 云盯门店巡检"
      description="风险驾驶舱 Overview Cards · 证照管理式业务筛选 · StatusTabs 整改状态 · InspectionRiskTable"
    >
      <StoreInspectionDemo />
    </ShowcaseCard>
  );
}

export function InspectionTableShowcase() {
  return (
    <ShowcaseCard title="InspectionTable" description="内置搜索 / 筛选 / 分页 / 行选择 / 工具栏">
      <InspectionTable
        dataSource={[
          {
            key: "1",
            storeName: "演示门店 A",
            owner: "张明",
            cycle: "每周一",
            method: "现场巡检",
            status: "in_progress",
            lastInspectionAt: "2026-05-30",
          },
        ]}
        pagination={false}
      />
    </ShowcaseCard>
  );
}

export function TableDesignSpecShowcase() {
  return (
    <ShowcaseCard title="设计规范 Design Tokens" description="Header / Row / Border / States">
      <SpecTable rows={TABLE_DESIGN_SPEC_ROWS} />
    </ShowcaseCard>
  );
}
