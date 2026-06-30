"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

interface TaskInputProps {
  placeholder?: string;
  onSubmit?: (title: string) => void;
  isPending?: boolean;
  className?: string;
}

export function TaskInput({
  placeholder = "Tambah tugas...",
  onSubmit,
  isPending,
  className,
}: TaskInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isPending) return;
    onSubmit?.(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-[10px] border border-border/60 bg-surface px-4 py-3 transition-all duration-150 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 hover:border-border",
          isPending && "opacity-60 pointer-events-none",
        )}
      >
        <div className="size-5 shrink-0 rounded-full border-2 border-muted-foreground/25" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={isPending}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed"
        />
      </div>
    </form>
  );
}
