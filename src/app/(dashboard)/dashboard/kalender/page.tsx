"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { cn, numToPriority } from "@/lib/utils";
import { TaskItem } from "@/components/task/task-item";
import { useCalendarTasks, useDateTodos, useToggleTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/use-todos";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function KalenderPage() {
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const { data: taskDates, isLoading: calLoading } = useCalendarTasks(year, month);
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const selectedDateStr = selectedDay !== null
    ? `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : null;

  const { data: selectedTodos, isLoading: todosLoading, isError: todosError } = useDateTodos(selectedDateStr);

  const firstDay = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = useMemo(() => {
    const result: (number | null)[] = [];
    for (let i = 0; i < adjustedFirstDay; i++) result.push(null);
    for (let i = 1; i <= daysInMonth; i++) result.push(i);
    while (result.length % 7 !== 0) result.push(null);
    return result;
  }, [adjustedFirstDay, daysInMonth]);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelectedDay(null);
  }

  function isToday(day: number) {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  }

  function isSelected(day: number) {
    return day === selectedDay;
  }

  function getTaskCount(day: number) {
    const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return taskDates?.find((d) => d.date === ds)?.count ?? 0;
  }

  function handleToggle(id: string) {
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah agenda") });
  }

  function handleUpdate(id: string, data: { title?: string; priority?: number; deadline?: string | null }) {
    const payload: { title?: string; priority?: "LOW" | "MEDIUM" | "HIGH"; deadline?: string | null } = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.priority !== undefined) payload.priority = numToPriority(data.priority);
    if (data.deadline !== undefined) payload.deadline = data.deadline;
    updateMutation.mutate(
      { id, data: payload },
      { onError: () => toast.error("Gagal memperbarui agenda") },
    );
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, { onError: () => toast.error("Gagal menghapus agenda") });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-lg font-semibold tracking-tight text-foreground">Kalender</h1>

      <div className="rounded-[14px] border border-border/60 bg-surface p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} aria-label="Bulan sebelumnya" className="flex size-8 items-center justify-center rounded-[8px] transition-colors hover:bg-muted/50">
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground">
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} aria-label="Bulan berikutnya" className="flex size-8 items-center justify-center rounded-[8px] transition-colors hover:bg-muted/50">
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </div>

        {calLoading ? (
          <div className="grid grid-cols-7 gap-px">
            {dayNames.map((d) => (
              <div key={d} className="py-2 text-center text-[11px] font-medium text-muted-foreground/50">
                {d}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="flex min-h-[56px] items-center justify-center rounded-[8px] sm:min-h-[72px]">
                <div className="size-4 rounded bg-muted/30 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-7 gap-px">
          {dayNames.map((d) => (
            <div key={d} className="py-2 text-center text-[11px] font-medium text-muted-foreground/50">
              {d}
            </div>
          ))}
          {cells.map((day, idx) => {
            const count = day !== null ? getTaskCount(day) : 0;
            return (
              <div
                key={idx}
                onClick={() => day !== null && setSelectedDay(day)}
                className={cn(
                  "relative flex min-h-[56px] cursor-pointer flex-col items-center justify-start rounded-[8px] px-1 py-1.5 text-xs transition-colors duration-100 hover:bg-muted/30 sm:min-h-[72px]",
                  day === null && "pointer-events-none",
                  day !== null && isToday(day) && !isSelected(day) && "bg-primary/10 font-semibold text-primary",
                  day !== null && isSelected(day) && "ring-2 ring-primary ring-offset-2 ring-offset-surface bg-primary/[0.08]",
                  day !== null && !isToday(day) && !isSelected(day) && "text-foreground",
                )}
              >
                <span className={cn(
                  "text-xs leading-none",
                  day !== null && isToday(day) && !isSelected(day) && "text-primary",
                )}>
                  {day ?? ""}
                </span>
                {day !== null && count > 0 && (
                  <span className="mt-1 flex flex-wrap justify-center gap-0.5">
                    {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                      <span key={i} className="size-1 rounded-full bg-primary/60" />
                    ))}
                    {count > 3 && (
                      <span className="text-[9px] leading-none text-muted-foreground/50">+{count - 3}</span>
                    )}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>

      {selectedDateStr && (
        <section>
          <h2 className="mb-3 text-sm font-semibold tracking-tight text-foreground">
            {selectedDay} {monthNames[month]} {year}
          </h2>
          {todosError ? (
            <p className="py-4 text-center text-sm text-muted-foreground/60">Gagal memuat agenda</p>
          ) : todosLoading ? (
            <div className="space-y-1">
              {[1, 2].map((i) => (
                <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <AnimatePresence initial={false} mode="popLayout">
                {selectedTodos?.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.15 }}
                  >
                    <TaskItem
                      id={task.id}
                      title={task.title}
                      done={task.done}
                      priority={task.priority}
                      deadline={task.deadline}
                      categoryColor={task.categoryColor}
                      categoryName={task.categoryName}
                      onToggle={handleToggle}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      timePickerDate={selectedDateStr}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {selectedTodos?.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-8">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/30">
                    <Inbox className="size-5" />
                  </div>
                  <p className="text-sm text-muted-foreground/60">
                    Tidak ada agenda di tanggal ini
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
