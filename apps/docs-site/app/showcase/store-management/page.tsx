import type { Metadata } from "next";
import { StoreManagementShowcaseView } from "./store-management-showcase-view";

export const metadata: Metadata = {
  title: "区域门店管理 | Showcase",
  description: "Tree + FilterBar + Table + Drawer + Card 组合 Showcase",
};

export default function StoreManagementShowcasePage() {
  return <StoreManagementShowcaseView />;
}
