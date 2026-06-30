"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn, numToPriority } from "@/lib/utils";
import { Search } from "lucide-react";
import { TaskItem } from "@/components/task/task-item";
import {
  useAllTodos,
  useToggleTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/hooks/use-todos";

type Filter = "all" | "active" | "done";

export default function SemuaTugasPage() {
  const { data: todos, isLoading, isError } = useAllTodos();
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  function handleToggle(id: string) {
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah tugas") });
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
  }).filter((t) => {
    if (!searchQuery.trim()) return true;
    return t.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalCount = todos?.length ?? 0;
  const activeCount = todos?.filter((t) => !t.done).length ?? 0;
  const doneCount = todos?.filter((t) => t.done).length ?? 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Semua Tugas</h1>
        <p className="mt-0.5 text-sm text-muted-foreground/60">
          {isLoading ? "..." : `${totalCount} tugas — ${activeCount} aktif, ${doneCount} selesai`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-[10px] border border-border/60 bg-surface px-3.5 py-2.5 transition-all duration-150 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="size-4 shrink-0 text-muted-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-[8px] px-2.5 py-1.5 text-xs font-medium transition-all duration-150",
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
        <p className="py-8 text-center text-sm text-muted-foreground/60">Gagal memuat tugas</p>
      ) : isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map((task) => (
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
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground/60">
              {searchQuery
                ? "Tidak ada tugas yang cocok"
                : filter === "all"
                  ? "Belum ada tugas"
                  : `Tidak ada tugas ${filter === "active" ? "aktif" : "selesai"}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
