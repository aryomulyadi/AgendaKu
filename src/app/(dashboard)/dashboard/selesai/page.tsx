"use client";

import { toast } from "sonner";
import { TaskItem } from "@/components/task/task-item";
import { useCompletedTodos, useToggleTodo, useDeleteTodo } from "@/hooks/use-todos";

export default function SelesaiPage() {
  const { data, isLoading, isError } = useCompletedTodos();
  const todos = data?.todos;
  const total = data?.total ?? 0;
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  function handleToggle(id: string) {
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah tugas") });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, { onError: () => toast.error("Gagal menghapus tugas") });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Tugas Selesai</h1>
        <p className="mt-0.5 text-sm text-muted-foreground/60">
          {isLoading ? "..." : `${total} tugas selesai${data?.hasMore ? " (menampilkan 200 terbaru)" : ""}`}
        </p>
      </div>

      {isError ? (
        <p className="py-8 text-center text-sm text-muted-foreground/60">Gagal memuat tugas</p>
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
              onDelete={handleDelete}
            />
          ))}
          {todos?.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground/60">
              Belum ada tugas yang selesai
            </p>
          )}
        </div>
      )}
    </div>
  );
}
