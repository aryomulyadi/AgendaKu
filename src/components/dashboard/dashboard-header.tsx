"use client";

import { Search, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

const dayNames = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
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

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          {greeting}
        </h1>
        <span className="hidden text-sm text-muted-foreground sm:block">
          {dateStr}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-[10px] border border-border/60 bg-surface px-3 py-1.5 transition-all duration-150 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 sm:flex">
          <Search className="size-4 shrink-0 text-muted-foreground/60" />
          <span className="text-sm text-muted-foreground/60">
            Cari tugas...
          </span>
        </div>
        <Button
          variant="default"
          size="icon"
          className="rounded-[10px]"
        >
          <Plus className="size-4" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
