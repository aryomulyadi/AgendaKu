"use client";

import { useTomorrowTodos } from "@/hooks/use-todos";

export function TomorrowPreview() {
  const { data: tasks, isLoading } = useTomorrowTodos();

  return (
    <section className="opacity-80">
      <div className="mb-3">
        <h3 className="text-[11px] font-medium tracking-wide text-muted-foreground/60 uppercase">
          Besok
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground/40">
          {isLoading ? "..." : `${tasks?.length ?? 0} tugas`}
        </p>
      </div>
      {isLoading ? (
        <div className="space-y-1">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[34px] rounded-[10px] bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-[10px] border border-border/30 bg-surface/40 px-3.5 py-2"
            >
              <div
                className={`size-4 shrink-0 rounded-full border-2 ${
                  task.done
                    ? "border-success bg-success"
                    : "border-muted-foreground/15"
                }`}
              />
              <span
                className={`flex-1 text-sm ${
                  task.done
                    ? "text-muted-foreground/40 line-through"
                    : "text-muted-foreground/60"
                }`}
              >
                {task.title}
              </span>
            </div>
          ))}
          {tasks?.length === 0 && (
            <p className="py-3 text-center text-xs text-muted-foreground/40">
              Tidak ada tugas untuk besok
            </p>
          )}
        </div>
      )}
    </section>
  );
}
