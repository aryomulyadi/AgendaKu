"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-categories";

const presetColors = [
  "#BE1A1A",
  "#E85D3A",
  "#F7D87F",
  "#22C55E",
  "#2563EB",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
];

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#2563EB");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);

  function handleCreate() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    createMutation.mutate(
      { name: trimmed, color: newColor },
      {
        onSuccess: () => { setNewName(""); setNewColor("#2563EB"); toast.success("Kategori dibuat"); },
        onError: () => toast.error("Gagal membuat kategori"),
      },
    );
  }

  function handleStartEdit(cat: { id: string; name: string }) {
    setEditingId(cat.id);
    setEditName(cat.name);
  }

  function handleSaveEdit(id: string) {
    const trimmed = editName.trim();
    if (!trimmed) return;
    updateMutation.mutate(
      { id, data: { name: trimmed } },
      {
        onSuccess: () => { setEditingId(null); toast.success("Kategori diperbarui"); },
        onError: () => toast.error("Gagal memperbarui kategori"),
      },
    );
  }

  function handleColorChange(id: string, color: string) {
    updateMutation.mutate(
      { id, data: { color } },
      { onError: () => toast.error("Gagal mengubah warna") },
    );
  }

  function handleDelete(id: string) {
    setDeleteConfirm(null);
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Kategori dihapus"),
      onError: () => toast.error("Gagal menghapus kategori"),
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Kategori</h1>
        <p className="mt-0.5 text-sm text-muted-foreground/70">
          Atur dan kelompokkan tugas berdasarkan kategori
        </p>
      </div>

      <div className="rounded-[14px] border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Buat Kategori Baru</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
            placeholder="Nama kategori..."
            className="flex-1 rounded-[10px] border border-border/60 bg-surface px-3 py-2 text-sm text-foreground outline-none transition-all duration-150 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex items-center gap-1">
            {presetColors.slice(0, 4).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setNewColor(c)}
                className={cn(
                  "size-6 rounded-full border-2 transition-all duration-150",
                  newColor === c ? "border-foreground scale-110" : "border-transparent",
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!newName.trim() || createMutation.isPending}
            className="flex items-center gap-1.5 rounded-[10px] bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all duration-150 hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus className="size-4" />
            Buat
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        {isError ? (
          <p className="py-8 text-center text-sm text-muted-foreground/60">Gagal memuat kategori</p>
        ) : isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-[52px] rounded-[10px] bg-muted/50 animate-pulse" />
          ))
        ) : categories?.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground/60">
            Belum ada kategori. Buat kategori pertama Anda.
          </p>
        ) : (
          categories?.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-3 rounded-[10px] border border-border/60 bg-surface px-4 py-3 transition-all duration-150"
            >
              <div
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {editingId === cat.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(cat.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="flex-1 rounded-md border border-primary/40 bg-background px-2 py-0.5 text-sm text-foreground outline-none ring-2 ring-primary/20"
                />
              ) : (
                <span className="flex-1 text-sm text-foreground">{cat.name}</span>
              )}
              <span className="text-xs text-muted-foreground/50">{cat._count.todos} tugas</span>
              <div className="flex items-center gap-1">
                {presetColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleColorChange(cat.id, c)}
                    className={cn(
                      "size-4 rounded-full border transition-all duration-150 hover:scale-110",
                      cat.color === c ? "border-foreground scale-110" : "border-transparent",
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {editingId === cat.id ? (
                <>
                  <button type="button" onClick={() => handleSaveEdit(cat.id)} className="text-success hover:text-success/80 transition-colors">
                    <Check className="size-4" />
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="text-muted-foreground/50 hover:text-foreground transition-colors">
                    <X className="size-4" />
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => handleStartEdit(cat)} className="text-muted-foreground/50 hover:text-foreground transition-colors">
                    <Pencil className="size-3.5" />
                  </button>
                  <button type="button" onClick={() => setDeleteConfirm({ id: cat.id, name: cat.name })} className="text-muted-foreground/50 hover:text-destructive transition-colors">
                    <Trash2 className="size-3.5" />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-80 rounded-[14px] border border-border bg-card p-5 shadow-lg">
            <h3 className="text-sm font-semibold text-foreground">Hapus Kategori</h3>
            <p className="mt-2 text-sm text-muted-foreground/70">
              Yakin ingin menghapus <span className="font-medium text-foreground">{deleteConfirm.name}</span>?
              Tugas dalam kategori ini tidak akan terhapus, hanya kategorinya yang dihapus.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="rounded-[8px] border border-border/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted/50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirm.id)}
                disabled={deleteMutation.isPending}
                className="rounded-[8px] bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground transition-all hover:bg-destructive/90 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
