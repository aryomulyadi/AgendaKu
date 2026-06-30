"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn, numToPriority } from "@/lib/utils";
import { TaskItem } from "@/components/task/task-item";
import { TaskInput } from "@/components/task/task-input";
import {
  useTomorrowTodos,
  useCreateTodo,
  useToggleTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/hooks/use-todos";
import { useCategories } from "@/hooks/use-categories";

function getTomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function TomorrowPreview() {
  const { data: tasks, isLoading, isError } = useTomorrowTodos();
  const { data: categories } = useCategories();
  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  function handleCreate(title: string) {
    createMutation.mutate(
      { title, priority: "MEDIUM", deadline: getTomorrowISO(), categoryId: selectedCategoryId },
      { onError: () => toast.error("Gagal menambahkan agenda"), onSuccess: () => setSelectedCategoryId(null) },
    );
  }

  function handleToggle(id: string) {
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah agenda") });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, { onError: () => toast.error("Gagal menghapus agenda") });
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

  return (
    <section className="opacity-80">
      <div className="mb-3">
        <h3 className="text-[11px] font-medium tracking-wide text-muted-foreground/60 uppercase">
          Besok
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground/40">
          {isLoading ? "..." : `${tasks?.length ?? 0} agenda`}
        </p>
      </div>

      {isError ? (
        <p className="py-3 text-center text-xs text-muted-foreground/40">Gagal memuat agenda</p>
      ) : isLoading ? (
        <div className="space-y-1">
          {[1, 2].map((i) => (
            <div key={i} className="h-[34px] rounded-[10px] bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {tasks?.map((task) => (
            <div key={task.id}>
              {task.carryOver && (
                <p className="mb-0.5 text-[10px] font-medium text-muted-foreground/40 uppercase tracking-wide">
                  Tertunda
                </p>
              )}
              {task.carryOver ? (
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-[10px] border px-3.5 py-2",
                    "border-amber-200/30 bg-amber-50/20 dark:border-amber-700/20 dark:bg-amber-900/10",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(task.id)}
                    className={cn(
                      "size-4 shrink-0 rounded-full border-2 transition-all",
                      task.done ? "border-success bg-success" : "border-muted-foreground/15",
                    )}
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      task.done ? "text-muted-foreground/40 line-through" : "text-muted-foreground/70",
                    )}
                  >
                    {task.title}
                  </span>
                </div>
              ) : (
                <TaskItem
                  id={task.id}
                  title={task.title}
                  done={task.done}
                  priority={1}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
          ))}
          {tasks?.length === 0 && (
            <p className="py-3 text-center text-xs text-muted-foreground/40">
              Belum ada agenda untuk besok
            </p>
          )}
        </div>
      )}

      <div className="mt-3">
        <TaskInput
          placeholder="Rencanakan untuk besok..."
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
