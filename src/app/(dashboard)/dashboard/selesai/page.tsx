"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
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
    toggleMutation.mutate(id, { onError: () => toast.error("Gagal mengubah agenda") });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, { onError: () => toast.error("Gagal menghapus agenda") });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Agenda Selesai</h1>
        <p className="mt-0.5 text-sm text-muted-foreground/60">
          {isLoading ? "..." : `${total} agenda selesai${data?.hasMore ? " (menampilkan 200 terbaru)" : ""}`}
        </p>
      </div>

      {isError ? (
        <p className="py-8 text-center text-sm text-muted-foreground/60">Gagal memuat agenda</p>
      ) : isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {todos?.map((task) => (
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
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {todos?.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/30">
                <CheckCheck className="size-5" />
              </div>
              <p className="text-sm text-muted-foreground/60">
                Belum ada agenda yang selesai
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
