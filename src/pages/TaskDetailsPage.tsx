import { useMemo, useState } from 'react';
import { fetchTaskBySlug, fetchToolsForTask } from '../lib/mockData';
import { useFetch } from '../lib/useFetch';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { FilterChips } from '../components/ui/FilterChips';
import { ToolCard } from '../components/ToolCard';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonList } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

interface TaskDetailsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

const pricingOptions = ['Free', 'Freemium', 'Paid', 'Free Trial'];

export function TaskDetailsPage({ slug, onNavigate }: TaskDetailsPageProps) {
  const [pricingFilter, setPricingFilter] = useState<string | null>(null);

  const { data: task, loading: taskLoading } = useFetch(async () => {
    return fetchTaskBySlug(slug);
  }, [slug]);

  const { data: tools, loading: toolsLoading, error } = useFetch(async () => {
    if (!task) return [];
    return fetchToolsForTask(task.id);
  }, [task]);

  const allTools = tools ?? [];

  const filteredTools = useMemo(() => {
    if (!pricingFilter) return allTools;
    return allTools.filter((t) => t.pricing_type === pricingFilter);
  }, [allTools, pricingFilter]);

  if (!taskLoading && !task) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <EmptyState
          title="Task not found"
          description="This task may have been moved or deleted."
          action={
            <Button onClick={() => onNavigate('/tasks')}>
              <ArrowLeft size={14} />
              Back to Tasks
            </Button>
          }
        />
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-6">
=======
    <div className="mx-auto max-w-content px-4 sm:px-6 py-10 sm:py-12 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-7">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tasks', href: '/tasks' },
            { label: task?.name ?? '...' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Task header */}
      {taskLoading ? (
<<<<<<< HEAD
        <div className="space-y-3 mb-8">
=======
        <div className="space-y-3 mb-9">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          <div className="h-7 w-48 rounded skeleton-shimmer" />
          <div className="h-4 w-72 rounded skeleton-shimmer" />
        </div>
      ) : (
<<<<<<< HEAD
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ink-900 tracking-tight">
            {task?.name}
          </h1>
          <p className="text-sm text-ink-500 mt-1.5 max-w-xl leading-relaxed">
            {task?.description}
          </p>
          <p className="text-2xs text-ink-400 mt-3">
=======
        <div className="mb-9">
          <h1 className="font-display text-[26px] sm:text-[28px] font-bold text-ink-900 tracking-[-0.02em]">
            {task?.name}
          </h1>
          <p className="text-[14px] text-ink-500 mt-2 max-w-xl leading-relaxed">
            {task?.description}
          </p>
          <p className="text-2xs font-medium text-ink-500 mt-3.5">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
            {allTools.length} {allTools.length === 1 ? 'tool' : 'tools'} available
          </p>
        </div>
      )}

      {/* Filters */}
      {!toolsLoading && allTools.length > 0 && (
<<<<<<< HEAD
        <div className="mb-5">
=======
        <div className="mb-6">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
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
              ? `No ${pricingFilter} tools for this task yet.`
              : 'No tools have been linked to this task yet.'
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
<<<<<<< HEAD
        <div className="border border-border rounded-xl bg-surface-2 overflow-hidden">
=======
        <div className="border border-border rounded-xl bg-surface-2/60 overflow-hidden">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
