"use client";

import { Tag } from "lucide-react";
import { TodaySection } from "@/components/landing/today-section";
import { TomorrowPreview } from "@/components/landing/tomorrow-preview";

export function AppPreview() {
  return (
    <div className="w-full rounded-[14px] border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] pointer-events-none">
      <div className="p-5 sm:p-6">
        <TodaySection />
        <div className="mt-4">
          <div className="flex items-center gap-3 rounded-[10px] border border-border/60 bg-surface px-4 py-3">
            <div className="size-5 shrink-0 rounded-full border-2 border-muted-foreground/25" />
            <span className="flex-1 text-sm text-muted-foreground/60">
              Tambah agenda hari ini
            </span>
            <Tag className="size-3.5 text-muted-foreground/40" />
          </div>
        </div>
        <div className="my-4 border-t border-border/50" />
        <TomorrowPreview />
      </div>
    </div>
  );
}
