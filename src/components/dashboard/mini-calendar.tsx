"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarTasks } from "@/hooks/use-todos";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

interface MiniCalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
}

export function MiniCalendar({ selectedDate, onDateSelect }: MiniCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();

  const { data: taskDates, isLoading: calLoading } = useCalendarTasks(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else { setCurrentMonth((m) => m - 1); }
  }

  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else { setCurrentMonth((m) => m + 1); }
  }

  const cells = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const result: (number | null)[] = [];
    for (let i = offset - 1; i >= 0; i--) { result.push(daysInPrev - i); }
    for (let i = 1; i <= daysInMonth; i++) { result.push(i); }
    const remaining = 42 - result.length;
    for (let i = 0; i < remaining; i++) { result.push(null); }
    return result;
  }, [currentYear, currentMonth, daysInMonth, daysInPrev]);

  function isToday(day: number) {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  }

  function isCurrentMonth(day: number | null, idx: number) {
    if (day === null) return false;
    const firstIdx = cells.indexOf(1);
    return idx >= firstIdx && idx < firstIdx + daysInMonth;
  }

  function isSelected(day: number) {
    const ds = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return ds === selectedDate;
  }

  function hasTask(day: number): boolean {
    const ds = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return taskDates?.some((d) => d.date === ds) ?? false;
  }

  function handleDayClick(day: number, idx: number) {
    if (!isCurrentMonth(day, idx)) return;
    const ds = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelect(ds === selectedDate ? null : ds);
  }

  return (
    <div className="rounded-[14px] border border-border/60 bg-surface p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <button onClick={prevMonth} className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted/50">
          <ChevronLeft className="size-3.5 text-muted-foreground" />
        </button>
        <span className="text-xs font-medium text-foreground">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button onClick={nextMonth} className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted/50">
          <ChevronRight className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      {calLoading ? (
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 rounded-md bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-7 gap-px text-center">
        {dayNames.map((d) => (
          <div key={d} className="py-1 text-[10px] font-medium text-muted-foreground/50">{d}</div>
        ))}
        {cells.map((day, idx) => (
          <div
            key={idx}
            onClick={() => day !== null && handleDayClick(day, idx)}
            className={cn(
              "relative rounded-[6px] py-1 text-xs transition-colors duration-100",
              day === null && "pointer-events-none",
              day !== null && isToday(day) && !isSelected(day) && "bg-primary font-semibold text-primary-foreground",
              day !== null && isSelected(day) && "ring-2 ring-primary ring-offset-1 ring-offset-surface bg-primary/10 font-semibold text-primary",
              day !== null && !isToday(day) && !isSelected(day) && isCurrentMonth(day, idx) && "cursor-pointer text-foreground hover:bg-muted/50",
              day !== null && !isCurrentMonth(day, idx) && "text-muted-foreground/25",
            )}
          >
            {day ?? ""}
            {day !== null && hasTask(day) && !isToday(day) && !isSelected(day) && (
              <span className="absolute -right-0.5 -top-0.5 flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-primary/70" />
              </span>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
