"use client";

import { toast } from "sonner";
import { TaskItem } from "@/components/task/task-item";
import { TaskInput } from "@/components/task/task-input";
import {
  useTodayTodos,
  useCreateTodo,
  useToggleTodo,
  useDeleteTodo,
} from "@/hooks/use-todos";

export function TodayTaskList() {
  const { data: todos, isLoading } = useTodayTodos();
  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  function handleCreate(title: string) {
    createMutation.mutate(
      { title, priority: "MEDIUM" },
      {
        onError: () => toast.error("Gagal menambahkan tugas"),
      },
    );
  }

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

  return (
    <section>
      <h2 className="mb-3 text-base font-semibold tracking-tight text-foreground">
        Tugas Hari Ini
      </h2>
      {isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse"
            />
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
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
          {todos?.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground/60">
              Belum ada tugas hari ini
            </p>
          )}
        </div>
      )}
      <div className="mt-3">
        <TaskInput
          placeholder="Tambah tugas..."
          onSubmit={handleCreate}
          isPending={createMutation.isPending}
        />
      </div>
    </section>
  );
}
