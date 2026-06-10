import { BusinessShowcaseSidebar } from "@/components/business-showcase-sidebar";

export default function BusinessShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-[1400px] px-4 py-10 md:px-6">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10">
        <BusinessShowcaseSidebar />
        <div className="min-w-0 w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
