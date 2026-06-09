import { paginationUsageTokenNames } from "@yd-ds/tokens";

export const PAGINATION_INTRO =
  "Pagination（分页器）用于大数据量列表的分页导航，组件对齐云盯真实业务场景，优先服务 Table / Dashboard 等后台列表，支持快速跳转、页容量切换、简洁模式与受控用法。";

export const PAGINATION_TYPE_LABELS = [
  { key: "basic", label: "Basic", description: "基础页码 + 上一页 / 下一页" },
  { key: "controlled", label: "Controlled", description: "current / pageSize 受控" },
  { key: "small", label: "Small", description: "紧凑尺寸，适合 Dashboard" },
  { key: "simple", label: "Simple", description: "简洁模式 `< 1 / 50 >`" },
  { key: "jumper", label: "Quick Jumper", description: "跳至指定页" },
  { key: "size", label: "Size Changer", description: "10 / 20 / 50 / 100 条/页" },
  { key: "total", label: "Show Total", description: "展示共 N 条" },
  { key: "large", label: "Large Dataset", description: "10000+ 数据量页码折叠" },
] as const;

export const PAGINATION_CODE_EXAMPLE = `import { Pagination } from "@yd-ds/ui/pagination";

<Pagination
  total={500}
  current={1}
  pageSize={10}
  showTotal
  showSizeChanger
  showQuickJumper
  onChange={(page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  }}
/>`;

export const TABLE_PAGINATION_CODE = `import { Table } from "@yd-ds/ui/table";

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
/>`;

export const STANDARD_TABLE_PAGINATION_CODE = `import { StandardTablePagination } from "@yd-ds/ui/business-patterns/navigation";

<StandardTablePagination
  total={500}
  current={page}
  pageSize={pageSize}
  onChange={(p, ps) => {
    setPage(p);
    setPageSize(ps);
  }}
/>`;

export const COMPACT_PAGINATION_CODE = `import { CompactPagination } from "@yd-ds/ui/business-patterns/navigation";

<CompactPagination total={128} defaultCurrent={2} showTotal />`;

export const MOBILE_PAGINATION_CODE = `import { MobilePagination } from "@yd-ds/ui/business-patterns/navigation";

<MobilePagination total={500} defaultCurrent={12} />`;

export const PAGINATION_USAGE_TOKEN_NAMES = [...paginationUsageTokenNames];
