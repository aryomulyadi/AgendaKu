"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  id: string;
  title: string;
  done: boolean;
  priority: 1 | 2 | 3;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function TaskItem({
  id,
  title,
  done,
  priority,
  onToggle,
  onDelete,
  className,
}: TaskItemProps) {
  return (
    <div
      className={cn(
        "group flex rounded-[10px] overflow-hidden border transition-all duration-150 hover:-translate-y-[1px]",
        done
          ? "border-success/15 bg-success/5 hover:border-success/25 hover:bg-success/[0.07]"
          : "border-border/60 bg-surface hover:border-border hover:bg-white/[0.06]",
        className,
      )}
    >
      {!done && priority >= 2 && (
        <div
          className={cn(
            "w-[3px] shrink-0",
            priority === 3 && "bg-primary",
            priority === 2 && "bg-[#F7D87F]",
          )}
        />
      )}
      <div className="flex items-center gap-3 flex-1 px-3.5 py-2.5">
        <button
          type="button"
          onClick={() => onToggle?.(id)}
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150 active:scale-90",
            done
              ? "border-success bg-success text-white"
              : "border-muted-foreground/35 group-hover:border-primary/50",
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
        </button>
        <span
          className={cn(
            "flex-1 text-sm transition-colors duration-150",
            done
              ? "text-muted-foreground/70 line-through"
              : "text-foreground",
          )}
        >
          {title}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="shrink-0 opacity-0 transition-all duration-150 group-hover:opacity-100 hover:text-destructive"
          >
            <Trash2 className="size-3.5 text-muted-foreground/40 hover:text-destructive" />
          </button>
        )}
      </div>
    </div>
  );
}
