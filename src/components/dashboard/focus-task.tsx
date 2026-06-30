"use client";

import { Crosshair } from "lucide-react";
import { TaskItem } from "@/components/task/task-item";
import { useFocusTask, useToggleTodo, useDeleteTodo } from "@/hooks/use-todos";
import { toast } from "sonner";

export function FocusTask() {
  const { data: task, isLoading } = useFocusTask();
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  function handleToggle(id: string) {
    toggleMutation.mutate(id, {
      onError: () => toast.error("Gagal mengubah tugas"),
    });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onError: () => toast.error("Gagal menghapus tugas"),
    });
  }

  if (isLoading) {
    return (
      <section className="rounded-[14px] border border-primary/15 bg-primary/[0.03] p-4">
        <div className="mb-3 flex items-center gap-2">
          <Crosshair className="size-4 shrink-0 text-primary" />
          <h2 className="text-xs font-semibold tracking-wide text-primary uppercase">
            Fokus Hari Ini
          </h2>
        </div>
        <div className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
      </section>
    );
  }

  if (!task) return null;

  return (
    <section className="rounded-[14px] border border-primary/15 bg-primary/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2">
        <Crosshair className="size-4 shrink-0 text-primary" />
        <h2 className="text-xs font-semibold tracking-wide text-primary uppercase">
          Fokus Hari Ini
        </h2>
      </div>
      <TaskItem
        id={task.id}
        title={task.title}
        done={task.done}
        priority={task.priority}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </section>
  );
}
