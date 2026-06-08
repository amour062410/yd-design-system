import {
  tableDesignSpecRows,
  tableSizeSpecs,
  tableTokens,
  tableUsageTokenNames,
} from "@yd-ds/tokens";

export const TABLE_INTRO =
  "用于展示结构化数据，支持排序、筛选、固定列、批量操作等企业后台场景。品牌色 #165DFF，圆角 6px，遵循 8px 间距网格。";

export const TABLE_CODE_EXAMPLE = `import { Table } from "@yd-ds/ui/table";

const columns = [
  {
    key: "name",
    title: "姓名",
    dataIndex: "name",
    sorter: (a, b, order) =>
      a.name.localeCompare(b.name, "zh") * (order === "descend" ? -1 : 1),
    defaultSortOrder: "ascend",
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
    defaultFilteredValue: ["在职"],
    filterMultiple: true,
  },
];

export function Demo() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      filterOnClose={false}
      sortDirections={["ascend", "descend", "ascend"]}
      onChange={(pagination, filters, sorter) => {
        console.log(filters, sorter);
      }}
    />
  );
}`;

export { tableUsageTokenNames as TABLE_USAGE_TOKEN_NAMES };
export { tableDesignSpecRows as TABLE_DESIGN_SPEC_ROWS };
export { tableTokens, tableSizeSpecs };

export type BasicEmployee = {
  key: string;
  name: string;
  dept: string;
  role: string;
  status: string;
  createdAt: string;
};

export const BASIC_TABLE_DATA: BasicEmployee[] = [
  {
    key: "1",
    name: "张明",
    dept: "研发一部",
    role: "前端工程师",
    status: "在职",
    createdAt: "2024-03-12",
  },
  {
    key: "2",
    name: "李华",
    dept: "研发二部",
    role: "后端工程师",
    status: "在职",
    createdAt: "2024-05-08",
  },
  {
    key: "3",
    name: "王芳",
    dept: "产品部",
    role: "产品经理",
    status: "休假",
    createdAt: "2023-11-20",
  },
  {
    key: "4",
    name: "赵强",
    dept: "运营部",
    role: "运营专员",
    status: "在职",
    createdAt: "2024-01-15",
  },
  {
    key: "5",
    name: "陈静",
    dept: "设计部",
    role: "UI 设计师",
    status: "在职",
    createdAt: "2024-07-02",
  },
];

export const STATUS_FILTER_OPTIONS = [
  { label: "全部状态", value: "all" },
  { label: "在职", value: "active" },
  { label: "休假", value: "leave" },
];

export const DEPT_FILTER_OPTIONS = [
  { label: "全部部门", value: "all" },
  { label: "研发一部", value: "rd1" },
  { label: "研发二部", value: "rd2" },
  { label: "产品部", value: "product" },
  { label: "运营部", value: "ops" },
  { label: "设计部", value: "design" },
];

export type ScrollRow = {
  key: string;
  name: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
};

export const FIXED_COLUMN_DATA: ScrollRow[] = Array.from({ length: 5 }).map((_, i) => ({
  key: String(i + 1),
  name: `用户 ${i + 1}`,
  col2: `字段 B-${i + 1}`,
  col3: `字段 C-${i + 1}`,
  col4: `字段 D-${i + 1}`,
  col5: `字段 E-${i + 1}`,
  col6: `字段 F-${i + 1}`,
}));

export type EditableRow = {
  key: string;
  field1: string;
  field2: string;
  field3: string;
};

export const EDITABLE_TABLE_INITIAL: EditableRow[] = [
  { key: "1", field1: "对接项 A", field2: "说明一", field3: "备注一" },
  { key: "2", field1: "对接项 B", field2: "说明二", field3: "备注二" },
];
