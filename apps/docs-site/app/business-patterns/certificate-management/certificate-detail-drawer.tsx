"use client";

import { FileText, Paperclip } from "lucide-react";
import { Drawer, DrawerFooter } from "@yd-ds/ui/drawer";
import { Button } from "@yd-ds/ui/button";
import type { CertificateRecord as TableCertificateRecord } from "@yd-ds/ui/table";
import {
  CERTIFICATE_TABLE_DATA,
  getRiskStatusLabel,
  getRiskStatusTone,
  type CertificateRecord as DetailCertificateRecord,
} from "@/lib/data/certificateManagementMock";

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-[color:var(--drawer-title-color)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function DetailGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="flex gap-3 text-sm">
          <dt className="w-20 shrink-0 text-[color:var(--color-text-tertiary)]">
            {item.label}
          </dt>
          <dd className="min-w-0 font-medium text-[color:var(--drawer-title-color)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CertificateDetailDrawer({
  record,
  open,
  onClose,
}: {
  record: DetailCertificateRecord | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!record) return null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="lg"
      title={record.certificateName}
      description={`证照编号 ${record.certificateNo}`}
      status={getRiskStatusLabel(record.riskLevel)}
      statusTone={getRiskStatusTone(record.riskLevel)}
      footer={
        <DrawerFooter
          onCancel={onClose}
          onOk={onClose}
          okText="续期"
          cancelText="关闭"
        />
      }
    >
      <div className="space-y-6">
        <DetailSection title="证照详情">
          <DetailGrid
            items={[
              { label: "证照名称", value: record.certificateName },
              { label: "证照编号", value: record.certificateNo },
              { label: "分类", value: record.category },
              { label: "发证日期", value: record.issueDate },
              { label: "到期时间", value: record.expiryDate },
              { label: "剩余天数", value: record.remainingDaysText },
              { label: "负责人", value: `${record.owner} · ${record.ownerDept}` },
            ]}
          />
        </DetailSection>

        <DetailSection title="门店信息">
          <DetailGrid
            items={[
              { label: "门店名称", value: record.storeName },
              { label: "门店类型", value: record.storeType },
              { label: "门店编码", value: record.storeCode },
              { label: "所属区域", value: record.storeRegion },
            ]}
          />
        </DetailSection>

        <DetailSection title="上传附件">
          <ul className="space-y-2">
            {record.attachments.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between rounded-[8px] border border-[color:var(--drawer-border-color)] px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Paperclip
                    className="size-4 shrink-0 text-[color:var(--drawer-brand-color)]"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[color:var(--drawer-title-color)]">
                      {file.name}
                    </p>
                    <p className="text-xs text-[color:var(--color-text-tertiary)]">
                      {file.size} · {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="cursor-pointer text-[13px] text-[color:var(--drawer-brand-color)] transition-colors hover:underline"
                >
                  下载
                </button>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="default" className="mt-3 gap-1.5">
            <FileText className="size-4" />
            上传附件
          </Button>
        </DetailSection>

        <DetailSection title="操作记录">
          <ul className="divide-y divide-[color:var(--drawer-border-color)] rounded-[8px] border border-[color:var(--drawer-border-color)]">
            {record.operationLogs.map((log) => (
              <li
                key={`${log.time}-${log.action}`}
                className="flex items-start justify-between gap-4 px-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-[color:var(--drawer-title-color)]">
                    {log.action}
                  </p>
                  <p className="mt-0.5 text-[color:var(--color-text-tertiary)]">
                    {log.operator}
                  </p>
                </div>
                <span className="shrink-0 text-[13px] text-[color:var(--color-text-tertiary)]">
                  {log.time}
                </span>
              </li>
            ))}
          </ul>
        </DetailSection>
      </div>
    </Drawer>
  );
}

export function resolveCertificateDetail(
  row: TableCertificateRecord
): DetailCertificateRecord {
  const matched = CERTIFICATE_TABLE_DATA.find(
    (item) =>
      item.storeName === row.storeName &&
      item.certificateName === row.certificateName
  );
  if (matched) return matched;

  return {
    key: row.key,
    storeName: row.storeName,
    storeType: row.storeType as DetailCertificateRecord["storeType"],
    storeCode: "—",
    storeRegion: "—",
    certificateName: row.certificateName,
    certificateNo: "—",
    riskLevel: row.riskLevel,
    remainingDaysText: row.remainingDaysText,
    expiryDate: "—",
    issueDate: "—",
    category: row.category,
    tag: row.category,
    owner: "—",
    ownerDept: "—",
    statusFilterKey: row.statusFilterKey as DetailCertificateRecord["statusFilterKey"],
    attachments: [],
    operationLogs: [],
  };
}
