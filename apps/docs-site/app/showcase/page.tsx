import { redirect } from "next/navigation";
import { showcaseEntryHref } from "@/lib/showcase-navigation";

export default function ShowcaseIndexPage() {
  redirect(showcaseEntryHref);
}
