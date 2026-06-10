"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@yd-ds/ui";
import { Button } from "@yd-ds/ui/button";
import { SearchInput } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";
import {
  CertificateStatusTable,
  type CertificateRecord as TableCertificateRecord,
} from "@yd-ds/ui/table";
import {
  CertificateDetailDrawer,
  resolveCertificateDetail,
} from "./certificate-detail-drawer";
import type { CertificateRecord as DetailCertificateRecord } from "@/lib/data/certificateManagementMock";
import { CERTIFICATE_STATS } from "@/lib/data/certificateManagementMock";
import {
  CERTIFICATE_FILTER_CATEGORY_OPTIONS,
  CERTIFICATE_FILTER_STORE_OPTIONS,
  CERTIFICATE_FILTER_TAG_OPTIONS,
  CERTIFICATE_STATUS_ROWS,
  CERTIFICATE_STATUS_TABS,
} from "@/lib/data/tableBusinessMock";
import type { CertificateStatCardData } from "@/lib/data/certificateManagementMock";

const STAT_CARD_BACKGROUNDS: Record<CertificateStatCardData["tone"], string> = {
  expired: "/business-patterns/certificate-management/stat-expired.png",
  warning: "/business-patterns/certificate-management/stat-warning.png",
  normal: "/business-patterns/certificate-management/stat-normal.png",
  brand: "/business-patterns/certificate-management/stat-total.png",
};

const STAT_TONE_STYLES: Record<
  CertificateStatCardData["tone"],
  { color: string }
> = {
  expired: { color: "#F53F3F" },
  warning: { color: "#FF7D00" },
  normal: { color: "#00B42A" },
  brand: { color: "#165DFF" },
};

function CertificateStatCard({
  title,
  count,
  countUnit,
  metrics,
  tone,
}: Omit<CertificateStatCardData, "key">) {
  const styles = STAT_TONE_STYLES[tone];
  const backgroundSrc = STAT_CARD_BACKGROUNDS[tone];

  return (
    <Card className="relative min-h-[132px] overflow-hidden rounded-[8px] border border-[color:var(--table-border-color)] bg-transparent shadow-sm">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
        aria-hidden
      />
      <CardContent className="relative z-[1] p-4">
        <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
          {title}
        </p>
        <p className="mt-3 leading-none">
          <span
            className="text-[32px] font-bold tabular-nums"
            style={{ color: styles.color }}
          >
            {count}
          </span>
          <span className="ml-1.5 text-sm font-normal text-[color:var(--color-text-secondary)]">
            {countUnit}
          </span>
        </p>
        <ul className="mt-3 space-y-1">
          {metrics.map((line) => (
            <li
              key={line}
              className="text-xs leading-5 text-[color:var(--color-text-tertiary)]"
            >
              {line}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function CertificateManagementView() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [detailRecord, setDetailRecord] = useState<DetailCertificateRecord | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const handleView = (row: TableCertificateRecord) => {
    setDetailRecord(resolveCertificateDetail(row));
    setDetailOpen(true);
  };

  const filteredTableData = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return CERTIFICATE_STATUS_ROWS.filter((row) => {
      if (storeFilter !== "all" && row.storeName !== storeFilter) return false;
      if (tagFilter !== "all" && row.category !== tagFilter) return false;
      if (categoryFilter !== "all" && row.category !== categoryFilter) return false;
      if (
        q &&
        !row.storeName.toLowerCase().includes(q) &&
        !row.certificateName.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [storeFilter, tagFilter, categoryFilter, keyword]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 border-b border-[color:var(--table-border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            证照总览
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color-text-tertiary)]">
            全局风险总览，及时处理风险，确保证照合规
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="default">
            导出报表
          </Button>
          <Button size="default" className="gap-1.5">
            <Plus className="size-4" />
            新增证照
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CERTIFICATE_STATS.map(({ key: statKey, ...stat }) => (
          <CertificateStatCard key={statKey} {...stat} />
        ))}
      </div>

      <Card className="rounded-[8px] border shadow-sm">
        <div className="flex h-14 items-center gap-3 border-b border-[color:var(--table-border-color)] px-4">
          <Select
            size="sm"
            className="min-w-0 flex-1"
            options={CERTIFICATE_FILTER_STORE_OPTIONS}
            value={storeFilter}
            onChange={(v) => setStoreFilter(String(v))}
            placeholder="门店"
          />
          <Select
            size="sm"
            className="min-w-0 flex-1"
            options={CERTIFICATE_FILTER_TAG_OPTIONS}
            value={tagFilter}
            onChange={(v) => setTagFilter(String(v))}
            placeholder="标签"
          />
          <Select
            size="sm"
            className="min-w-0 flex-1"
            options={CERTIFICATE_FILTER_CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={(v) => setCategoryFilter(String(v))}
            placeholder="分类"
          />
          <div className="h-8 w-px shrink-0 bg-[color:var(--table-border-color)]" />
          <SearchInput
            variant="button-icon"
            className="w-[200px] shrink-0"
            placeholder="搜索门店 / 证照"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <CardContent className="p-4">
          <CertificateStatusTable
            dataSource={filteredTableData}
            statusTabItems={CERTIFICATE_STATUS_TABS}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onView={handleView}
            pagination={{
              total: filteredTableData.length,
              defaultCurrent: 1,
              defaultPageSize: 10,
              showTotal: true,
              showQuickJumper: true,
            }}
          />
        </CardContent>
      </Card>

      <CertificateDetailDrawer
        record={detailRecord}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setDetailRecord(null);
        }}
      />
    </div>
  );
}
