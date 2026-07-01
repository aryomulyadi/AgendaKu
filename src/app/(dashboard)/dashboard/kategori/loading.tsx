export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      <div className="space-y-1">
        <div className="h-5 w-32 rounded bg-muted animate-pulse" />
        <div className="h-4 w-48 rounded bg-muted/50 animate-pulse" />
      </div>
      <div className="rounded-[14px] border border-border bg-card p-4">
        <div className="h-4 w-36 rounded bg-muted animate-pulse" />
        <div className="mt-3 h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
      </div>
      <div className="space-y-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[52px] rounded-[10px] bg-muted/50 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
