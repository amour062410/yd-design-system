import type { Metadata } from "next";
import { StoreManagementView } from "./store-management-view";

export const metadata: Metadata = {
  title: "门店管理 | Business Patterns",
  description: "云盯门店管理场景：FilterBar + StoreTree + Table",
};

export default function StoreManagementPage() {
  return <StoreManagementView />;
}
