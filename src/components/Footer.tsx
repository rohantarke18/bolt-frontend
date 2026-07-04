import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface-1 mt-24">
      <div className="mx-auto max-w-shell px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br from-primary-400 to-primary-700">
              <Sparkles size={14} className="text-white" strokeWidth={2.25} />
            </div>
            <span className="font-display text-[13.5px] font-semibold text-ink-900 tracking-[-0.01em]">
              AI Discovery
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/categories')}
              className="text-sm text-ink-400 hover:text-ink-700 transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('/tasks')}
              className="text-sm text-ink-400 hover:text-ink-700 transition-colors"
            >
              Tasks
            </button>
          </nav>

          <p className="text-2xs text-ink-400">
            Discover the right AI for any task.
          </p>
        </div>
      </div>
    </footer>
  );
}
