export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-1">
        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
        <div className="h-4 w-32 rounded bg-muted/50 animate-pulse" />
      </div>
      <div className="space-y-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[42px] rounded-[10px] bg-muted/50 animate-pulse" />
        ))}
      </div>
      <div className="h-[42px] rounded-[10px] bg-muted/30 animate-pulse" />
    </div>
  );
}
