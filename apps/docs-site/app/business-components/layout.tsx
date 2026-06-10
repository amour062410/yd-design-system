import { BusinessComponentsSidebar } from "@/components/business-components-sidebar";

export default function BusinessComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-[1400px] px-4 py-10 md:px-6">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <BusinessComponentsSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
