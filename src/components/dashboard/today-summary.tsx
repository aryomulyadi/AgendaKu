"use client";

import { useTodayStats } from "@/hooks/use-todos";

export function TodaySummary() {
  const { data: stats, isLoading } = useTodayStats();

  if (isLoading || !stats) {
    return (
      <section className="space-y-2">
        <div className="h-4 w-40 rounded bg-muted/50 animate-pulse" />
        <div className="h-1 w-full rounded-full bg-muted/50 animate-pulse" />
      </section>
    );
  }

  const { total, completed } = stats;
  const remaining = total - completed;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="space-y-2">
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-medium text-foreground">
          {completed}
        </span>
        <span className="text-sm text-muted-foreground">
          dari {total} tugas selesai
        </span>
        {total > 0 && (
          <>
            <span className="text-xs text-muted-foreground/50">&middot;</span>
            <span className="text-xs text-muted-foreground/70">
              {remaining} tersisa
            </span>
          </>
        )}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
