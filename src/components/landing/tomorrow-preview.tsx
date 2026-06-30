"use client";

const tomorrowTasks = [
  { title: "Siapkan presentasi", done: false },
  { title: "Review dokumen API", done: false },
];

export function TomorrowPreview() {
  return (
    <section className="opacity-80">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground/60 uppercase">
          Besok
        </span>
        <span className="text-xs text-muted-foreground/25">&middot;</span>
        <span className="text-[11px] text-muted-foreground/40">2 agenda</span>
      </div>

      <div className="space-y-1">
        {tomorrowTasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center gap-3 rounded-[10px] border border-border/30 bg-surface/40 px-3.5 py-2"
          >
            <div className="size-4 shrink-0 rounded-full border-2 border-muted-foreground/15" />
            <span className="flex-1 text-sm text-muted-foreground/60">
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
