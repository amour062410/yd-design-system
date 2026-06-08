import type { Metadata } from "next";
import { CertificateManagementView } from "./certificate-management-view";

export const metadata: Metadata = {
  title: "证照管理",
  description:
    "证照管理业务案例 — 门店证照风险总览、筛选运营与详情处理，基于 YD Design System 组合实现。",
};

export default function CertificateManagementPage() {
  return <CertificateManagementView />;
}
