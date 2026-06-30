"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useSearchTodos } from "@/hooks/use-todos";
import { getProfile } from "@/lib/actions/settings";

const dayNames = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
];

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 17) return "Selamat malam";
  if (hour >= 15) return "Selamat sore";
  if (hour >= 11) return "Selamat siang";
  return "Selamat pagi";
}

function getFormattedDate(): string {
  const now = new Date();
  return `${dayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}

export function DashboardHeader() {
  const greeting = getGreeting();
  const dateStr = getFormattedDate();
  const [userName, setUserName] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: results, isFetching } = useSearchTodos(searchQuery);

  useEffect(() => {
    getProfile().then((u) => { if (u?.name) setUserName(u.name); }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  function handleFocus() {
    if (query.length >= 2) setOpen(true);
  }

  function handleChange(value: string) {
    setQuery(value);
    if (value.length >= 2) setOpen(true);
    else setOpen(false);
  }

  function handleClear() {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          {greeting}{userName ? `, ${userName}` : ""}
        </h1>
        <span className="hidden text-sm text-muted-foreground sm:block">
          {dateStr}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <div
            className={cn(
              "flex items-center gap-2 rounded-[10px] border bg-surface px-3 py-1.5 transition-all duration-150",
              open
                ? "border-primary/40 ring-2 ring-primary/20"
                : "border-border/60",
            )}
          >
            <Search className="size-4 shrink-0 text-muted-foreground/60" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={handleFocus}
              onKeyDown={(e) => {
                if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
              }}
              placeholder="Cari tugas..."
              className="w-40 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            />
            {query && (
              <button type="button" onClick={handleClear} className="text-muted-foreground/40 hover:text-foreground transition-colors">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          {open && (
            <div className="absolute right-0 top-full z-50 mt-1.5 w-80 rounded-[14px] border border-border bg-card p-1 shadow-lg">
              {isFetching ? (
                <div className="space-y-1 p-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[36px] rounded-[8px] bg-muted/50 animate-pulse" />
                  ))}
                </div>
              ) : results?.length === 0 ? (
                <p className="p-3 text-center text-sm text-muted-foreground/60">
                  Tidak ditemukan
                </p>
              ) : (
                results?.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-muted/50"
                  >
                    {task.categoryColor && (
                      <div className="size-2 shrink-0 rounded-full" style={{ backgroundColor: task.categoryColor }} />
                    )}
                    <span className={cn("flex-1 truncate", task.done && "text-muted-foreground/50 line-through")}>
                      {task.title}
                    </span>
                    <span className="text-xs text-muted-foreground/50">
                      {task.priority === 3 ? "Tinggi" : task.priority === 2 ? "Sedang" : "Rendah"}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
