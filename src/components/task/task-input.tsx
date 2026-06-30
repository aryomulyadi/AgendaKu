"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";

interface TaskInputProps {
  placeholder?: string;
  onSubmit?: (title: string) => void;
  isPending?: boolean;
  categories?: { id: string; name: string; color: string }[];
  selectedCategoryId?: string | null;
  onCategoryChange?: (id: string | null) => void;
  className?: string;
}

export function TaskInput({
  placeholder = "Tambah tugas...",
  onSubmit,
  isPending,
  categories = [],
  selectedCategoryId,
  onCategoryChange,
  className,
}: TaskInputProps) {
  const [value, setValue] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  const selectedCat = categories.find((c) => c.id === selectedCategoryId);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="relative" ref={catRef}>
          <button
            type="button"
            onClick={() => setCatOpen((o) => !o)}
            className={cn(
              "flex items-center gap-1.5 rounded-[6px] px-1.5 py-1 text-xs font-medium transition-all duration-150",
              selectedCategoryId
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/50",
            )}
          >
            {selectedCategoryId && selectedCat ? (
              <>
                <div className="size-2 rounded-full" style={{ backgroundColor: selectedCat.color }} />
                <span className="max-w-[80px] truncate">{selectedCat.name}</span>
              </>
            ) : (
              <Tag className="size-3.5" />
            )}
          </button>
          {catOpen && (
            <div className="absolute right-0 top-full z-50 mt-1.5 w-48 rounded-[10px] border border-border bg-card p-1 shadow-lg">
              {selectedCategoryId && (
                <button
                  type="button"
                  onClick={() => { onCategoryChange?.(null); setCatOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50"
                >
                  Hapus kategori
                </button>
              )}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => { onCategoryChange?.(cat.id); setCatOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted/50",
                    cat.id === selectedCategoryId ? "text-primary font-medium" : "text-foreground",
                  )}
                >
                  <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </button>
              ))}
              {categories.length === 0 && !selectedCategoryId && (
                <p className="px-2.5 py-3 text-center text-xs text-muted-foreground/50">
                  Belum ada kategori
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
