export default function Loading() {
  return (
    <div className="mx-auto max-w-lg space-y-6 p-4 sm:p-6">
      <div className="space-y-1">
        <div className="h-6 w-32 rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-48 rounded-md bg-muted animate-pulse" />
      </div>
      <div className="h-[300px] rounded-[14px] bg-muted/30 animate-pulse" />
    </div>
  );
}
