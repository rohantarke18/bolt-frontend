import { useMemo, useState } from 'react';
import { fetchCategoryBySlug, fetchToolsForCategory } from '../lib/mockData';
import { useFetch } from '../lib/useFetch';
import { getIcon } from '../lib/icons';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { FilterChips } from '../components/ui/FilterChips';
import { ToolCard } from '../components/ToolCard';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonList } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

interface CategoryDetailsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

const pricingOptions = ['Free', 'Freemium', 'Paid', 'Free Trial'];

export function CategoryDetailsPage({ slug, onNavigate }: CategoryDetailsPageProps) {
  const [pricingFilter, setPricingFilter] = useState<string | null>(null);

  const { data: category, loading: catLoading } = useFetch(async () => {
    return fetchCategoryBySlug(slug);
  }, [slug]);

  const { data: tools, loading: toolsLoading, error } = useFetch(async () => {
    if (!category) return [];
    return fetchToolsForCategory(category.id);
  }, [category]);

  const allTools = tools ?? [];

  const filteredTools = useMemo(() => {
    if (!pricingFilter) return allTools;
    return allTools.filter((t) => t.pricing_type === pricingFilter);
  }, [allTools, pricingFilter]);

  const Icon = category ? getIcon(category.icon_name) : null;

  if (!catLoading && !category) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <EmptyState
          title="Category not found"
          description="This category may have been moved or deleted."
          action={
            <Button onClick={() => onNavigate('/categories')}>
              <ArrowLeft size={14} />
              Back to Categories
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category?.name ?? '...' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Category header */}
      {catLoading ? (
        <div className="space-y-3 mb-8">
          <div className="h-10 w-10 rounded-lg skeleton-shimmer" />
          <div className="h-7 w-48 rounded skeleton-shimmer" />
          <div className="h-4 w-72 rounded skeleton-shimmer" />
        </div>
      ) : (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-3 border border-border">
              {Icon && <Icon size={18} className="text-ink-600" />}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-ink-900 tracking-tight">
            {category?.name}
          </h1>
          <p className="text-sm text-ink-500 mt-1.5 max-w-xl leading-relaxed">
            {category?.description}
          </p>
          <p className="text-2xs text-ink-400 mt-3">
            {allTools.length} {allTools.length === 1 ? 'tool' : 'tools'} available
          </p>
        </div>
      )}

      {/* Filters */}
      {!toolsLoading && allTools.length > 0 && (
        <div className="mb-5">
          <FilterChips
            options={pricingOptions}
            selected={pricingFilter}
            onSelect={setPricingFilter}
          />
        </div>
      )}

      {/* Tool listing */}
      {toolsLoading ? (
        <SkeletonList count={5} variant="card" />
      ) : error ? (
        <EmptyState
          title="Failed to load tools"
          description={error}
          action={<Button onClick={() => window.location.reload()}>Retry</Button>}
        />
      ) : filteredTools.length === 0 ? (
        <EmptyState
          title="No tools found"
          description={
            pricingFilter
              ? `No ${pricingFilter} tools in this category yet.`
              : 'No tools have been added to this category yet.'
          }
          action={
            pricingFilter && (
              <Button variant="secondary" onClick={() => setPricingFilter(null)}>
                Clear filter
              </Button>
            )
          }
        />
      ) : (
        <div className="border border-border rounded-xl bg-surface-2 overflow-hidden">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
