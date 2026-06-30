"use client";

import { cn } from "@/lib/utils";

interface TaskItemProps {
  title: string;
  done: boolean;
  priority: 1 | 2 | 3;
  className?: string;
}

const priorityDots = {
  1: "\u25CF",
  2: "\u25CF\u25CF",
  3: "\u25CF\u25CF\u25CF",
};

export function TaskItem({ title, done, priority, className }: TaskItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[10px] border border-border/60 bg-surface px-3.5 py-2.5 transition-all duration-150 hover:border-border hover:bg-muted/50",
        done && "border-success/20 bg-success/5 hover:border-success/30 hover:bg-success/10",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
          done
            ? "border-success bg-success text-white"
            : "border-muted-foreground/35 hover:border-primary/50",
        )}
      >
        {done && (
          <svg className="size-3" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        className={cn(
          "flex-1 text-sm transition-colors duration-150",
          done
            ? "text-muted-foreground line-through"
            : "text-foreground",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "text-xs tracking-wider transition-colors duration-150",
          priority === 3 && "text-primary",
          priority === 2 && "text-[#C49E3D]",
          priority === 1 && "text-muted-foreground/50",
        )}
      >
        {priorityDots[priority]}
      </span>
    </div>
  );
}
