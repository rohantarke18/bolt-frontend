import { ArrowRight } from 'lucide-react';
import { getIcon } from '../lib/icons';
import { getCategoryAccent } from '../lib/categoryColors';
import type { CategoryWithCount } from '../lib/mockData';

interface CategoryRowProps {
  category: CategoryWithCount;
  onNavigate: (path: string) => void;
}

export function CategoryRow({ category, onNavigate }: CategoryRowProps) {
  const Icon = getIcon(category.icon_name);
  const accent = getCategoryAccent(category.slug);

  return (
    <button
      onClick={() => onNavigate(`/categories/${category.slug}`)}
      className="group relative flex w-full items-center gap-3.5 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-white/[0.025]"
    >
      <span
        className="absolute left-0 top-0 h-full w-0.5 scale-y-0 transition-transform duration-200 group-hover:scale-y-100"
        style={{ background: accent.hex }}
      />

      <div
        className="flex h-10 w-10 items-center justify-center rounded-[10px] shrink-0 transition-colors duration-150"
        style={{ background: accent.soft, border: `1px solid ${accent.ring}` }}
      >
        <Icon size={17} strokeWidth={1.9} style={{ color: accent.hex }} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-semibold text-ink-900 truncate tracking-[-0.006em]">
          {category.name}
        </h3>
        <p className="text-[13px] text-ink-400 truncate mt-0.5">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-2xs font-medium text-ink-500 px-2 py-0.5 rounded-full bg-surface-3 border border-border-subtle">
          {category.tool_count} {category.tool_count === 1 ? 'tool' : 'tools'}
        </span>
        <ArrowRight
          size={15}
          className="text-ink-300 group-hover:text-ink-700 group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </button>
  );
}
