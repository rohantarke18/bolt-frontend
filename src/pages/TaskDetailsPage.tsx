import { useMemo, useState } from 'react';
import { supabase, type Task, type Tool } from '../lib/supabase';
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
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data as Task | null;
  }, [slug]);

  const { data: tools, loading: toolsLoading, error } = useFetch(async () => {
    if (!task) return [];

    const { data: joins } = await supabase
      .from('tool_tasks')
      .select('tool_id')
      .eq('task_id', task.id);

    if (!joins || joins.length === 0) return [];

    const toolIds = joins.map((j) => j.tool_id);

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .in('id', toolIds)
      .order('name');

    if (error) throw error;
    return (data ?? []) as Tool[];
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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-6">
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
        <div className="space-y-3 mb-8">
          <div className="h-7 w-48 rounded skeleton-shimmer" />
          <div className="h-4 w-72 rounded skeleton-shimmer" />
        </div>
      ) : (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ink-900 tracking-tight">
            {task?.name}
          </h1>
          <p className="text-sm text-ink-500 mt-1.5 max-w-xl leading-relaxed">
            {task?.description}
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
        <div className="border border-border rounded-xl bg-white overflow-hidden">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
