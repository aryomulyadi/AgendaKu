"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { cn, numToPriority, getTomorrowISO } from "@/lib/utils";
import { TaskItem } from "@/components/task/task-item";
import { TaskInput } from "@/components/task/task-input";
import { useBesokTodos, useCreateTodo, useToggleTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/use-todos";
import { useCategories } from "@/hooks/use-categories";

export default function BesokPage() {
  const { data: todos, isLoading, isError } = useBesokTodos();
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
          {(() => {
            const deadlineTasks = todos?.filter((t) => !t.carryOver) ?? [];
            const carryTasks = todos?.filter((t) => t.carryOver) ?? [];

            return (
              <>
                <AnimatePresence initial={false}>
                  {deadlineTasks.map((task) => (
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

                {carryTasks.length > 0 && (
                  <p className="pt-2 pb-0.5 text-[10px] font-medium text-muted-foreground/40 uppercase tracking-wide">
                    Tertunda
                  </p>
                )}
                <AnimatePresence initial={false}>
                  {carryTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.15 }}
                    >
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
                    </motion.div>
                  ))}
                </AnimatePresence>

                {todos?.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-8">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/30">
                      <CalendarDays className="size-5" />
                    </div>
                    <p className="text-sm text-muted-foreground/60">
                      Belum ada agenda untuk besok
                    </p>
                  </div>
                )}
              </>
            );
          })()}
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
