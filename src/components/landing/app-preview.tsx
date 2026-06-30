"use client";

import { TodaySection } from "@/components/landing/today-section";
import { TomorrowPreview } from "@/components/landing/tomorrow-preview";
import { TaskInput } from "@/components/task/task-input";

export function AppPreview() {
  return (
    <div className="w-full rounded-[14px] border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="p-5 sm:p-6">
        <TodaySection />
        <div className="mt-4">
          <TaskInput placeholder="Tambah tugas hari ini" />
        </div>
        <div className="my-4 border-t border-border/50" />
        <TomorrowPreview />
      </div>
    </div>
  );
}
