"use client";

import { motion } from "framer-motion";
import { useTodayStats } from "@/hooks/use-todos";

export function TodaySummary() {
  const { data: stats, isLoading, isError } = useTodayStats();

  if (isError) {
    return (
      <section className="space-y-2">
        <p className="text-sm text-muted-foreground/60">Gagal memuat ringkasan</p>
      </section>
    );
  }

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
          dari {total} agenda selesai
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
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>
    </section>
  );
}
