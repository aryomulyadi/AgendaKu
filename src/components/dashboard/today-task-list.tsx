"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { toast } from "sonner";
import { cn, numToPriority } from "@/lib/utils";
import { TaskItem } from "@/components/task/task-item";
import { TaskInput } from "@/components/task/task-input";
import { getTodayTodos, getDateTodos } from "@/lib/actions/todo";
import {
  useCreateTodo,
  useToggleTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/hooks/use-todos";
import { useCategories } from "@/hooks/use-categories";

type Filter = "all" | "active" | "done";

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

function formatDateHeader(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${dayNames[date.getDay()]}, ${d} ${monthNames[date.getMonth()]} ${y}`;
}

interface TodayTaskListProps {
  selectedDate?: string | null;
}

export function TodayTaskList({ selectedDate }: TodayTaskListProps) {
  const { isLoading, isError, data: todos } = useQuery({
    queryKey: selectedDate ? ["todos", "date", selectedDate] : ["todos", "today"],
    queryFn: () => (selectedDate ? getDateTodos(selectedDate) : getTodayTodos()),
  });
  const { data: categories } = useCategories();
  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const [filter, setFilter] = useState<Filter>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  function handleCreate(title: string) {
    createMutation.mutate(
      { title, priority: "MEDIUM", deadline: selectedDate, categoryId: selectedCategoryId },
      {
        onSuccess: () => setSelectedCategoryId(null),
        onError: () => toast.error("Gagal menambahkan agenda"),
      },
    );
  }

  function handleToggle(id: string) {
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah agenda") });
  }

  function handleUpdate(id: string, data: { title?: string; priority?: number; deadline?: string | null }) {
    const payload: { title?: string; priority?: "LOW" | "MEDIUM" | "HIGH"; deadline?: string | null } = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.priority !== undefined) {
      payload.priority = numToPriority(data.priority);
    }
    if (data.deadline !== undefined) payload.deadline = data.deadline;
    updateMutation.mutate(
      { id, data: payload },
      { onError: () => toast.error("Gagal memperbarui agenda") },
    );
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, { onError: () => toast.error("Gagal menghapus agenda") });
  }

  const filtered = (todos ?? []).filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const activeCount = todos?.filter((t) => !t.done).length ?? 0;
  const title = selectedDate ? formatDateHeader(selectedDate) : "Agenda Hari Ini";

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="flex items-center gap-1">
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-[8px] px-2.5 py-1 text-xs font-medium transition-all duration-150",
                filter === f
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50",
              )}
            >
              {f === "all" ? "Semua" : f === "active" ? "Aktif" : "Selesai"}
            </button>
          ))}
        </div>
      </div>

      {isError ? (
        <p className="py-4 text-center text-sm text-muted-foreground/60">Gagal memuat agenda</p>
      ) : isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {filtered?.map((task) => (
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
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {activeCount === 0 && filter === "all" && (
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/30">
                <Inbox className="size-5" />
              </div>
              <p className="text-sm text-muted-foreground/60">
                {selectedDate ? "Tidak ada agenda di tanggal ini" : "Semua agenda selesai! 🎉"}
              </p>
            </div>
          )}
          {filtered?.length === 0 && filter !== "all" && (
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/30">
                <Inbox className="size-5" />
              </div>
              <p className="text-sm text-muted-foreground/60">
                Tidak ada agenda {filter === "active" ? "aktif" : "selesai"}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-3">
        <TaskInput
          placeholder="Tambah agenda..."
          onSubmit={handleCreate}
          isPending={createMutation.isPending}
          categories={categories ?? []}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />
      </div>
    </section>
  );
}
