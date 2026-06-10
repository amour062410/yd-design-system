import { redirect } from "next/navigation";
import { businessShowcaseEntryHref } from "@/lib/business-showcase-navigation";

export default function BusinessShowcaseIndexPage() {
  redirect(businessShowcaseEntryHref);
}
