interface FilterChipsProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        onClick={() => onSelect(null)}
        className={`h-7 px-3 text-2xs font-medium rounded-full border transition-all duration-150 active:scale-[0.96] ${
          selected === null
            ? 'bg-primary-600 text-white border-primary-600 shadow-[0_0_0_1px_rgba(94,106,210,0.3)]'
            : 'bg-surface-2 text-ink-500 border-border hover:border-border-strong hover:text-ink-700 hover:bg-surface-3'
        }`}
      >
        All
      </button>
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(isActive ? null : option)}
            className={`h-7 px-3 text-2xs font-medium rounded-full border transition-all duration-150 active:scale-[0.96] ${
              isActive
                ? 'bg-primary-600 text-white border-primary-600 shadow-[0_0_0_1px_rgba(94,106,210,0.3)]'
                : 'bg-surface-2 text-ink-500 border-border hover:border-border-strong hover:text-ink-700 hover:bg-surface-3'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
