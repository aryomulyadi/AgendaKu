"use client";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/10">
          <span className="text-xl">!</span>
        </div>
        <h2 className="text-base font-semibold text-foreground">Terjadi Kesalahan</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gagal memuat halaman. Silakan coba lagi.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-[10px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
