"use client";

import { cn } from "@/lib/utils";

interface TaskInputProps {
  placeholder?: string;
  className?: string;
}

export function TaskInput({
  placeholder = "Apa tugas pertamamu hari ini?",
  className,
}: TaskInputProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[10px] border border-border bg-surface px-4 py-3 transition-all duration-150 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
        className,
      )}
    >
      <div className="size-5 shrink-0 rounded-full border-2 border-muted-foreground/25" />
      <span className="flex-1 text-sm text-muted-foreground/70">
        {placeholder}
      </span>
    </div>
  );
}
