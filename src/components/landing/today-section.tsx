"use client";

import { TaskItem } from "@/components/task/task-item";

const todayTasks = [
  { id: "demo-1", title: "Review desain halaman utama", done: false, priority: 2 as const },
  { id: "demo-2", title: "Meeting tim produk", done: true, priority: 3 as const },
  { id: "demo-3", title: "Revisi komponen Navbar", done: false, priority: 1 as const },
];

export function TodaySection() {
  const total = todayTasks.length;
  const completed = todayTasks.filter((t) => t.done).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Selamat pagi.
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {total} tugas hari ini
        </p>
      </div>

      <div className="space-y-1">
        {todayTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            done={task.done}
            priority={task.priority}
          />
        ))}
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="text-xs text-muted-foreground/70">
          {completed} dari {total} tugas selesai
        </p>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </section>
  );
}
