"use client";

import { TaskItem } from "@/components/task/task-item";

const todayTasks = [
  { title: "Review desain halaman utama", done: false, priority: 2 as const },
  { title: "Meeting tim produk", done: true, priority: 3 as const },
  { title: "Revisi komponen Navbar", done: false, priority: 1 as const },
];

export function TodaySection() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Selamat pagi.
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          3 tugas hari ini
        </p>
      </div>

      <div className="space-y-1">
        {todayTasks.map((task) => (
          <TaskItem
            key={task.title}
            title={task.title}
            done={task.done}
            priority={task.priority}
          />
        ))}
      </div>
    </section>
  );
}
