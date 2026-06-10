import type { Metadata } from "next";
import { StoreManagementView } from "@/app/business-showcase/patterns/store-management/store-management-view";

export const metadata: Metadata = {
  title: "Store Tree | Business Patterns",
  description: "云盯门店管理：PageHeader + FilterBar + StoreTree + Table",
};

export default function BusinessStoreTreePage() {
  return <StoreManagementView />;
}
