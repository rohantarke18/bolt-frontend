export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-4 border-b border-border-subtle">
      <div className="h-10 w-10 rounded-lg skeleton-shimmer shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 rounded skeleton-shimmer" />
        <div className="h-3 w-64 rounded skeleton-shimmer" />
      </div>
      <div className="h-6 w-20 rounded-full skeleton-shimmer shrink-0" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex items-start gap-4 p-5 border-b border-border-subtle">
      <div className="h-12 w-12 rounded-xl skeleton-shimmer shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 w-40 rounded skeleton-shimmer" />
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-3/4 rounded skeleton-shimmer" />
      </div>
      <div className="h-8 w-28 rounded-lg skeleton-shimmer shrink-0" />
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 border border-border rounded-xl bg-surface-2">
          <div className="h-10 w-10 rounded-lg skeleton-shimmer mb-3" />
          <div className="h-4 w-24 rounded skeleton-shimmer mb-2" />
          <div className="h-3 w-16 rounded skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonList({ count = 6, variant = 'row' }: { count?: number; variant?: 'row' | 'card' }) {
  return (
    <div className="border border-border rounded-xl bg-surface-2 overflow-hidden">
      {Array.from({ length: count }).map((_, i) =>
        variant === 'row' ? <SkeletonRow key={i} /> : <SkeletonCard key={i} />
      )}
    </div>
  );
}
