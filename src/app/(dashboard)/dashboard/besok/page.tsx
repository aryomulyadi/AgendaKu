"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { numToPriority, getTomorrowISO } from "@/lib/utils";
import { TaskItem } from "@/components/task/task-item";
import { TaskInput } from "@/components/task/task-input";
import { useDateTodos, useCreateTodo, useToggleTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/use-todos";
import { useCategories } from "@/hooks/use-categories";

export default function BesokPage() {
  const tomorrow = useMemo(() => getTomorrowISO(), []);
  const { data: todos, isLoading, isError } = useDateTodos(tomorrow);
  const { data: categories } = useCategories();
  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  function handleCreate(title: string) {
    createMutation.mutate(
      { title, priority: "MEDIUM", deadline: tomorrow, categoryId: selectedCategoryId },
      { onError: () => toast.error("Gagal menambahkan agenda"), onSuccess: () => setSelectedCategoryId(null) },
    );
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

  const activeCount = todos?.filter((t) => !t.done).length ?? 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Agenda Besok</h1>
        <p className="mt-0.5 text-sm text-muted-foreground/60">
          {isLoading ? "..." : `${todos?.length ?? 0} agenda — ${activeCount} tersisa`}
        </p>
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
          {todos?.map((task) => (
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
          {todos?.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground/60">
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
    </div>
  );
}
