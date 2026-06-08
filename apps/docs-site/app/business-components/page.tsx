import { redirect } from "next/navigation";
import { businessComponentsEntryHref } from "@/lib/business-components-navigation";

export default function BusinessComponentsPage() {
  redirect(businessComponentsEntryHref);
}
