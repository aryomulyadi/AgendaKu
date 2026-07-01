import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
        404
      </div>
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        Halaman tidak ditemukan
      </h1>
      <p className="text-sm text-muted-foreground">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        href="/dashboard"
        className="mt-2 inline-flex h-10 items-center justify-center rounded-[10px] bg-primary px-5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-primary/90 active:translate-y-px"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
