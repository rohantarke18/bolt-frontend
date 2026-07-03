import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className="group relative w-full">
      <Search
        size={16}
        strokeWidth={2.25}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none transition-colors duration-150 group-focus-within:text-primary-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full h-10 pl-10 pr-9 text-sm bg-surface-2 border border-border rounded-lg text-ink-800 placeholder:text-ink-400 transition-all duration-150 focus:outline-none focus:bg-surface-3 focus:border-primary-500/50 focus:ring-[3px] focus:ring-primary-500/15"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded text-ink-400 hover:text-ink-800 hover:bg-surface-4 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
