"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function MiniCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  const cells: (number | null)[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push(daysInPrev - i);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push(i);
  }

  const remaining = 42 - cells.length;
  for (let i = 0; i < remaining; i++) {
    cells.push(null);
  }

  function isToday(day: number) {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  }

  function isCurrentMonth(day: number | null) {
    if (day === null) return false;
    const firstCellDay = cells.find((d) => d !== null && d === 1);
    if (!firstCellDay) return true;
    const firstIdx = cells.indexOf(1);
    const idx = cells.indexOf(day);
    return idx >= firstIdx && idx < firstIdx + daysInMonth;
  }

  return (
    <div className="rounded-[14px] border border-border/60 bg-surface p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted/50"
        >
          <ChevronLeft className="size-3.5 text-muted-foreground" />
        </button>
        <span className="text-xs font-medium text-foreground">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={nextMonth}
          className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted/50"
        >
          <ChevronRight className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px text-center">
        {dayNames.map((d) => (
          <div
            key={d}
            className="py-1 text-[10px] font-medium text-muted-foreground/50"
          >
            {d}
          </div>
        ))}
        {cells.map((day, idx) => (
          <div
            key={idx}
            className={cn(
              "rounded-[6px] py-1 text-xs transition-colors duration-100",
              day === null && "pointer-events-none",
              day !== null &&
                isToday(day) &&
                "bg-primary font-semibold text-primary-foreground",
              day !== null &&
                !isToday(day) &&
                isCurrentMonth(day) &&
                "cursor-pointer text-foreground hover:bg-muted/50",
              day !== null &&
                !isToday(day) &&
                !isCurrentMonth(day) &&
                "text-muted-foreground/25",
            )}
          >
            {day ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
