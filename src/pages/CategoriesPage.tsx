import { useMemo, useState } from 'react';
import { type Category, fetchAllCategories, countToolsForCategory } from '../lib/mockData';
import { useFetch } from '../lib/useFetch';
import { getIcon } from '../lib/icons';
<<<<<<< HEAD
=======
import { getCategoryAccent } from '../lib/categoryColors';
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
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
    const data = await fetchAllCategories();
    const withCounts = data.map((c) => ({ ...c, tool_count: countToolsForCategory(c.id) }));
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
<<<<<<< HEAD
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-900 tracking-tight">Categories</h1>
        <p className="text-sm text-ink-400 mt-1.5">
=======
    <div className="mx-auto max-w-content px-4 sm:px-6 py-8 sm:py-12 animate-fade-in">
      {/* Page heading */}
      <div className="mb-7 sm:mb-9">
        <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-ink-900 tracking-[-0.02em]">Categories</h1>
        <p className="text-[14px] text-ink-400 mt-2 leading-relaxed">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          Browse AI tools organized by domain and use case.
        </p>
      </div>

      {/* Search */}
<<<<<<< HEAD
      <div className="mb-5">
=======
      <div className="mb-5 sm:mb-6">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search categories..."
        />
      </div>

<<<<<<< HEAD
      {/* Filter chips */}
      {!loading && filterOptions.length > 0 && (
        <div className="mb-6">
=======
      {/* Filter chips — horizontal scroll on mobile so nothing wraps awkwardly */}
      {!loading && filterOptions.length > 0 && (
        <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          <FilterChips
            options={filterOptions}
            selected={activeFilter}
            onSelect={setActiveFilter}
          />
        </div>
      )}

      {/* Popular Categories (grid) */}
      {!loading && !search && !activeFilter && popularCategories.length > 0 && (
<<<<<<< HEAD
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-ink-800 mb-3">Popular</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularCategories.map((cat) => {
              const Icon = getIcon(cat.icon_name);
=======
        <div className="mb-9">
          <h2 className="text-[12px] font-semibold text-ink-600 uppercase tracking-[0.04em] mb-3.5">Popular</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularCategories.map((cat) => {
              const Icon = getIcon(cat.icon_name);
              const accent = getCategoryAccent(cat.slug);
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
              return (
                <button
                  key={cat.id}
                  onClick={() => onNavigate(`/categories/${cat.slug}`)}
<<<<<<< HEAD
                  className="group p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-3 border border-border group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors duration-200 mb-2.5">
                    <Icon size={16} className="text-ink-600 group-hover:text-primary-600 transition-colors duration-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900 truncate">{cat.name}</h3>
                  <p className="text-2xs text-ink-400 mt-0.5">{cat.tool_count} tools</p>
=======
                  className="group p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-lg"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent.ring)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-[10px] mb-3 transition-colors duration-200"
                    style={{ background: accent.soft, border: `1px solid ${accent.ring}` }}
                  >
                    <Icon size={16} strokeWidth={1.9} style={{ color: accent.hex }} />
                  </div>
                  <h3 className="text-[13.5px] font-semibold text-ink-900 truncate tracking-[-0.006em]">{cat.name}</h3>
                  <p className="text-2xs text-ink-400 mt-1">{cat.tool_count} tools</p>
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category List */}
      {!loading && !search && !activeFilter && (
<<<<<<< HEAD
        <h2 className="text-sm font-semibold text-ink-800 mb-3">All Categories</h2>
=======
        <h2 className="text-[12px] font-semibold text-ink-600 uppercase tracking-[0.04em] mb-3.5">All Categories</h2>
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
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
<<<<<<< HEAD
        <div className="border border-border rounded-xl bg-surface-2 overflow-hidden">
=======
        <div className="border border-border rounded-xl bg-surface-2/60 overflow-hidden">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          {filtered.map((cat) => (
            <CategoryRow key={cat.id} category={cat} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
