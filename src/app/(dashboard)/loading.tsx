import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
          <div className="size-7 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-20 rounded bg-muted animate-pulse" />
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[36px] rounded-[10px] bg-muted/50 animate-pulse" />
          ))}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col lg:pl-56">
        <header className="flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-5 w-48 rounded bg-muted animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-40 rounded-[10px] bg-muted animate-pulse" />
            <div className="size-8 rounded-[10px] bg-muted animate-pulse" />
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
          <Loader2 className="size-6 animate-spin text-muted-foreground/40" />
        </main>
      </div>
    </div>
  );
}
