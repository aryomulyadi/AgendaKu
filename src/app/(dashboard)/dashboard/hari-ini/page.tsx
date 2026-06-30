"use client";

import { useMemo } from "react";
import { TodaySummary } from "@/components/dashboard/today-summary";
import { TodayTaskList } from "@/components/dashboard/today-task-list";
import { getTodayISO } from "@/lib/utils";

export default function HariIniPage() {
  const today = useMemo(() => getTodayISO(), []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <TodaySummary />
      <TodayTaskList selectedDate={today} />
    </div>
  );
}
