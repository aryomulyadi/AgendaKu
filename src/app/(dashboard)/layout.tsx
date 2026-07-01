import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PageTransition } from "@/components/layout/page-transition";
import { QueryProvider } from "@/components/providers/query-provider";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <QueryProvider>
        <div className="flex min-h-screen flex-col lg:pl-56">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </QueryProvider>
    </div>
  );
}
