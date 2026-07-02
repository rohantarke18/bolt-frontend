interface FilterChipsProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`h-7 px-3 text-2xs font-medium rounded-full border transition-all duration-150 ${
          selected === null
            ? 'bg-ink-900 text-white border-ink-900'
            : 'bg-white text-ink-500 border-border hover:border-border-strong hover:text-ink-700'
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
            className={`h-7 px-3 text-2xs font-medium rounded-full border transition-all duration-150 ${
              isActive
                ? 'bg-ink-900 text-white border-ink-900'
                : 'bg-white text-ink-500 border-border hover:border-border-strong hover:text-ink-700'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
