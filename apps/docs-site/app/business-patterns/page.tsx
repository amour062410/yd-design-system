import { redirect } from "next/navigation";
import { businessPatternsEntryHref } from "@/lib/business-patterns-navigation";

export default function BusinessPatternsIndexPage() {
  redirect(businessPatternsEntryHref);
}
