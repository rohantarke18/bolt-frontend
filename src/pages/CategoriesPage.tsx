import { useMemo, useState } from 'react';
import { supabase, type Category } from '../lib/supabase';
import { useFetch } from '../lib/useFetch';
import { getIcon } from '../lib/icons';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterChips } from '../components/ui/FilterChips';
import { CategoryRow } from '../components/CategoryRow';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonList } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

interface CategoriesPageProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNavigate: (path: string) => void;
}

export function CategoriesPage({ search, onSearchChange, onNavigate }: CategoriesPageProps) {
  const { data: categories, loading, error } = useFetch(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (error) throw error;

    const withCounts = await Promise.all(
      (data ?? []).map(async (c) => {
        const { count } = await supabase
          .from('tool_categories')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', c.id);
        return { ...c, tool_count: count ?? 0 };
      })
    );

    return withCounts.sort((a, b) => b.tool_count - a.tool_count);
  });

  const allCategories = (categories ?? []) as (Category & { tool_count: number })[];

  // Popular = top 6 by tool count
  const popularCategories = useMemo(
    () => allCategories.slice(0, 6),
    [allCategories]
  );

  // Filter chips: categories with > 3 tools
  const filterOptions = useMemo(
    () =>
      allCategories
        .filter((c) => c.tool_count > 3)
        .map((c) => c.name)
        .slice(0, 8),
    [allCategories]
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = allCategories;
    if (activeFilter) {
      result = result.filter((c) => c.name === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [allCategories, activeFilter, search]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <EmptyState
          title="Failed to load categories"
          description={error}
          action={<Button onClick={() => window.location.reload()}>Retry</Button>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-900 tracking-tight">Categories</h1>
        <p className="text-sm text-ink-400 mt-1.5">
          Browse AI tools organized by domain and use case.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search categories..."
        />
      </div>

      {/* Filter chips */}
      {!loading && filterOptions.length > 0 && (
        <div className="mb-6">
          <FilterChips
            options={filterOptions}
            selected={activeFilter}
            onSelect={setActiveFilter}
          />
        </div>
      )}

      {/* Popular Categories (grid) */}
      {!loading && !search && !activeFilter && popularCategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-ink-800 mb-3">Popular</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularCategories.map((cat) => {
              const Icon = getIcon(cat.icon_name);
              return (
                <button
                  key={cat.id}
                  onClick={() => onNavigate(`/categories/${cat.slug}`)}
                  className="group p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-3 border border-border group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors duration-200 mb-2.5">
                    <Icon size={16} className="text-ink-600 group-hover:text-primary-600 transition-colors duration-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900 truncate">{cat.name}</h3>
                  <p className="text-2xs text-ink-400 mt-0.5">{cat.tool_count} tools</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category List */}
      {!loading && !search && !activeFilter && (
        <h2 className="text-sm font-semibold text-ink-800 mb-3">All Categories</h2>
      )}

      {loading ? (
        <SkeletonList count={8} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Try adjusting your search or filters."
          action={
            search && (
              <Button variant="secondary" onClick={() => onSearchChange('')}>
                Clear search
              </Button>
            )
          }
        />
      ) : (
        <div className="border border-border rounded-xl bg-surface-2 overflow-hidden">
          {filtered.map((cat) => (
            <CategoryRow key={cat.id} category={cat} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
