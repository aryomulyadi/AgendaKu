export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="h-5 w-32 rounded bg-muted animate-pulse" />
      <div className="rounded-[14px] border border-border/60 bg-surface p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="size-8 rounded-[8px] bg-muted animate-pulse" />
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="size-8 rounded-[8px] bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-7 gap-px">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="flex min-h-[56px] items-center justify-center rounded-[8px] sm:min-h-[72px]">
              <div className="size-4 rounded bg-muted/30 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
