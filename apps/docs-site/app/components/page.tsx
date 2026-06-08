import { redirect } from "next/navigation";
import { readyComponentNavigation } from "@/lib/component-navigation";

export default function ComponentsIndexPage() {
  const first =
    readyComponentNavigation[0]?.href ?? "/components/button";
  redirect(first);
}
