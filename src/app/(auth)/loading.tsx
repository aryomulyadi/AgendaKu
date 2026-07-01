export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="size-9 rounded-md bg-muted animate-pulse" />
          <div className="h-5 w-24 rounded bg-muted animate-pulse" />
          <div className="h-4 w-44 rounded bg-muted animate-pulse" />
        </div>
        <div className="space-y-3 rounded-[14px] border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="h-10 rounded-[10px] bg-muted animate-pulse" />
          <div className="h-10 rounded-[10px] bg-muted animate-pulse" />
          <div className="h-10 rounded-[10px] bg-primary/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
