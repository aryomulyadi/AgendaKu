export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-8">
      <div className="space-y-3">
        <div className="h-4 w-48 rounded bg-muted animate-pulse" />
        <div className="h-8 w-full rounded-[14px] bg-muted/50 animate-pulse" />
      </div>
      <div className="space-y-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
