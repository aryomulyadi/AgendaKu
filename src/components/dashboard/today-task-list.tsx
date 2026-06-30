"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TaskItem } from "@/components/task/task-item";
import { TaskInput } from "@/components/task/task-input";
import {
  useTodayTodos,
  useDateTodos,
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
  const todayQuery = useTodayTodos();
  const dateQuery = useDateTodos(selectedDate ?? null);
  const { data: categories } = useCategories();
  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const isLoading = selectedDate ? dateQuery.isLoading : todayQuery.isLoading;
  const todos = selectedDate ? dateQuery.data : todayQuery.data;

  const [filter, setFilter] = useState<Filter>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  function handleCreate(title: string) {
    createMutation.mutate(
      { title, priority: "MEDIUM", categoryId: selectedCategoryId },
      {
        onSuccess: () => setSelectedCategoryId(null),
        onError: () => toast.error("Gagal menambahkan tugas"),
      },
    );
  }

  function handleToggle(id: string) {
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah tugas") });
  }

  function handleUpdate(id: string, data: { title?: string; priority?: number; deadline?: string | null }) {
    const payload: { title?: string; priority?: "LOW" | "MEDIUM" | "HIGH"; deadline?: string | null } = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.priority !== undefined) {
      payload.priority = data.priority === 3 ? "HIGH" : data.priority === 2 ? "MEDIUM" : "LOW";
    }
    if (data.deadline !== undefined) payload.deadline = data.deadline;
    updateMutation.mutate(
      { id, data: payload },
      { onError: () => toast.error("Gagal memperbarui tugas") },
    );
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, { onError: () => toast.error("Gagal menghapus tugas") });
  }

  const filtered = (todos ?? []).filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const activeCount = todos?.filter((t) => !t.done).length ?? 0;
  const title = selectedDate ? formatDateHeader(selectedDate) : "Tugas Hari Ini";

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

      {isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {filtered?.map((task) => (
            <TaskItem
              key={task.id}
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
          ))}
          {activeCount === 0 && filter === "all" && (
            <p className="py-4 text-center text-sm text-muted-foreground/60">
              {selectedDate ? "Tidak ada tugas di tanggal ini" : "Semua tugas selesai! 🎉"}
            </p>
          )}
          {filtered?.length === 0 && filter !== "all" && (
            <p className="py-4 text-center text-sm text-muted-foreground/60">
              Tidak ada tugas {filter === "active" ? "aktif" : "selesai"}
            </p>
          )}
        </div>
      )}

      <div className="mt-3">
        <TaskInput
          placeholder="Tambah tugas..."
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
