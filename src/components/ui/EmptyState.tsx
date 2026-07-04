import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-3 mb-4">
        <SearchX size={20} className="text-ink-400" />
      </div>
      <h3 className="text-sm font-semibold text-ink-800">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-ink-400 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
=======
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-3 border border-border mb-4">
        <SearchX size={19} strokeWidth={1.75} className="text-ink-400" />
      </div>
      <h3 className="text-[15px] font-semibold text-ink-800 tracking-[-0.01em]">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-ink-400 max-w-sm leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
    </div>
  );
}
