"use client";

import { useState, useRef, useEffect } from "react";
import { Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  id: string;
  title: string;
  done: boolean;
  priority: 1 | 2 | 3;
  deadline?: string | null;
  categoryColor?: string | null;
  categoryName?: string | null;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, data: { title?: string; priority?: number; deadline?: string | null }) => void;
  className?: string;
}

function nextPriority(p: 1 | 2 | 3): 1 | 2 | 3 {
  return p === 1 ? 3 : p === 3 ? 2 : 1;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);

  if (+target === +today) return "Hari ini";
  if (+target === +tomorrow) return "Besok";

  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function TaskItem({
  id,
  title,
  done,
  priority,
  deadline,
  categoryColor,
  categoryName,
  onToggle,
  onDelete,
  onUpdate,
  className,
}: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function handleDoubleClick() {
    if (done) return;
    setEditValue(title);
    setEditing(true);
  }

  function saveEdit() {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== title) {
      onUpdate?.(id, { title: trimmed });
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") setEditing(false);
  }

  function handlePriorityClick() {
    if (done) return;
    onUpdate?.(id, { priority: nextPriority(priority) });
  }

  function handleDeadlineChange(e: React.ChangeEvent<HTMLInputElement>) {
    onUpdate?.(id, { deadline: e.target.value || null });
  }

  const showBar = !done && priority >= 2;

  const showCategoryBar = !!categoryColor && !done;

  return (
    <div
      className={cn(
        "group flex-col rounded-[10px] border transition-all duration-150 hover:-translate-y-[1px] overflow-hidden",
        done
          ? "border-success/15 bg-success/5 hover:border-success/25 hover:bg-success/[0.07]"
          : "border-border/60 bg-surface hover:border-border hover:bg-white/[0.06]",
        className,
      )}
    >
      {showCategoryBar && (
        <div className="h-[3px] shrink-0" style={{ backgroundColor: categoryColor }} />
      )}
      <div className="flex flex-1">
        {showBar && (
          <button
            type="button"
            onClick={handlePriorityClick}
            className={cn(
              "w-[3px] shrink-0 cursor-pointer transition-colors duration-150",
              priority === 3 && "bg-primary hover:bg-primary/80",
              priority === 2 && "bg-[#F7D87F] hover:bg-[#F7D87F]/80",
            )}
            title={priority === 3 ? "Prioritas Tinggi" : "Prioritas Sedang"}
          />
        )}
        <div className="flex items-center gap-2.5 flex-1 px-3.5 py-2.5">
          {categoryColor && categoryName && !done && (
            <div
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium leading-none"
              style={{ backgroundColor: `${categoryColor}1A`, color: categoryColor }}
            >
              <div className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: categoryColor }} />
              {categoryName}
            </div>
          )}
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

          {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-md border border-primary/40 bg-background px-2 py-0.5 text-sm text-foreground outline-none ring-2 ring-primary/20"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={cn(
              "flex-1 text-sm transition-colors duration-150 cursor-default",
              done
                ? "text-muted-foreground/70 line-through"
                : "text-foreground",
            )}
          >
            {title}
          </span>
        )}

        {!done && deadline && (
          <span className="hidden shrink-0 items-center gap-1 text-[11px] text-muted-foreground/50 sm:flex">
            <Calendar className="size-3" />
            {formatDate(deadline)}
          </span>
        )}

        {!done && (
          <label className="shrink-0 opacity-0 transition-all duration-150 group-hover:opacity-100 hover:text-destructive cursor-pointer">
            <Calendar className="size-3.5 text-muted-foreground/40 hover:text-primary" />
            <input
              type="date"
              value={deadline ?? ""}
              onChange={handleDeadlineChange}
              className="hidden"
            />
          </label>
        )}

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
    </div>
  );
}
