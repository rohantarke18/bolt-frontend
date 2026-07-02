import { ArrowRight } from 'lucide-react';
import { getIcon } from '../lib/icons';
import type { CategoryWithCount } from '../lib/supabase';

interface CategoryRowProps {
  category: CategoryWithCount;
  onNavigate: (path: string) => void;
}

export function CategoryRow({ category, onNavigate }: CategoryRowProps) {
  const Icon = getIcon(category.icon_name);

  return (
    <button
      onClick={() => onNavigate(`/categories/${category.slug}`)}
      className="group flex w-full items-center gap-4 px-4 py-4 text-left border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-surface-1"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-3 border border-border group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors duration-150 shrink-0">
        <Icon size={18} className="text-ink-600 group-hover:text-primary-600 transition-colors duration-150" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-ink-900 truncate">
          {category.name}
        </h3>
        <p className="text-sm text-ink-400 truncate mt-0.5">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-2xs font-medium text-ink-400 px-2 py-0.5 rounded-full bg-surface-3">
          {category.tool_count} {category.tool_count === 1 ? 'tool' : 'tools'}
        </span>
        <ArrowRight
          size={16}
          className="text-ink-300 group-hover:text-ink-600 group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </button>
  );
}
