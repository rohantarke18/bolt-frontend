import { ArrowRight, Sparkles, Layers, ListChecks } from 'lucide-react';
import { supabase, type Category, type Task } from '../lib/supabase';
import { useFetch } from '../lib/useFetch';
import { getIcon } from '../lib/icons';
import { Button } from '../components/ui/Button';
import { SkeletonGrid } from '../components/ui/Skeleton';

interface HomepageProps {
  onNavigate: (path: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const { data: featuredCategories, loading: catLoading } = useFetch(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*, tool_categories!inner(category_id)')
      .eq('is_featured', true)
      .order('sort_order');
    if (error) throw error;

    // Count tools per category
    const counts = await Promise.all(
      (data ?? []).map(async (c) => {
        const { count } = await supabase
          .from('tool_categories')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', c.id);
        return { ...c, tool_count: count ?? 0 };
      })
    );
    return counts.sort((a, b) => b.tool_count - a.tool_count);
  });

  const { data: popularTasks, loading: taskLoading } = useFetch(async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, tool_tasks!inner(task_id)')
      .eq('is_popular', true)
      .order('sort_order');
    if (error) throw error;

    const counts = await Promise.all(
      (data ?? []).map(async (t) => {
        const { count } = await supabase
          .from('tool_tasks')
          .select('*', { count: 'exact', head: true })
          .eq('task_id', t.id);
        return { ...t, tool_count: count ?? 0 };
      })
    );
    return counts.sort((a, b) => b.tool_count - a.tool_count);
  });

  const { data: totalTools } = useFetch(async () => {
    const { count } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true });
    return count ?? 0;
  });

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #0a0a0b 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-border bg-white text-2xs font-medium text-ink-500 mb-6 animate-fade-in-up">
              <Sparkles size={12} className="text-primary-500" />
              {totalTools ?? '—'} AI tools and counting
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-[1.1] animate-fade-in-up">
              Find the right AI
              <br />
              for any task.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-ink-500 leading-relaxed max-w-xl animate-fade-in-up">
              A curated directory of AI tools organized by category and task.
              Discover, compare, and choose the perfect tool for your workflow.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-in-up">
              <Button
                size="lg"
                onClick={() => onNavigate('/categories')}
              >
                Browse Categories
                <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('/tasks')}
              >
                Explore Tasks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Featured Categories</h2>
            <p className="text-sm text-ink-400 mt-1">Explore tools by domain</p>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-sm text-ink-500 hover:text-ink-800 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight size={14} />
          </button>
        </div>

        {catLoading ? (
          <SkeletonGrid count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(featuredCategories ?? []).map((cat) => {
              const Icon = getIcon((cat as Category).icon_name);
              return (
                <button
                  key={(cat as Category).id}
                  onClick={() => onNavigate(`/categories/${(cat as Category).slug}`)}
                  className="group p-5 border border-border rounded-xl bg-white text-left transition-all duration-200 hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors duration-200 mb-3">
                    <Icon size={18} className="text-ink-600 group-hover:text-primary-600 transition-colors duration-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">
                    {(cat as Category).name}
                  </h3>
                  <p className="text-2xs text-ink-400 mt-1">
                    {(cat as { tool_count: number }).tool_count} tools
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Popular Tasks */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Popular Tasks</h2>
            <p className="text-sm text-ink-400 mt-1">Find tools for what you need to do</p>
          </div>
          <button
            onClick={() => onNavigate('/tasks')}
            className="text-sm text-ink-500 hover:text-ink-800 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight size={14} />
          </button>
        </div>

        {taskLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl skeleton-shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(popularTasks ?? []).map((task) => (
              <button
                key={(task as Task).id}
                onClick={() => onNavigate(`/tasks/${(task as Task).slug}`)}
                className="group flex items-center justify-between p-4 border border-border rounded-xl bg-white text-left transition-all duration-200 hover:border-border-strong hover:shadow-md"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-ink-900 truncate">
                    {(task as Task).name}
                  </h3>
                  <p className="text-2xs text-ink-400 mt-0.5">
                    {(task as { tool_count: number }).tool_count} tools
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-ink-300 group-hover:text-ink-600 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 ml-3"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Platform intro */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border border-border rounded-xl bg-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border mb-4">
              <Layers size={18} className="text-ink-600" />
            </div>
            <h3 className="text-sm font-semibold text-ink-900">Organized by category</h3>
            <p className="text-sm text-ink-400 mt-1.5 leading-relaxed">
              Browse tools across writing, coding, design, video, and more.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border mb-4">
              <ListChecks size={18} className="text-ink-600" />
            </div>
            <h3 className="text-sm font-semibold text-ink-900">Task-driven discovery</h3>
            <p className="text-sm text-ink-400 mt-1.5 leading-relaxed">
              Know what you need to do? Find the right tool for the job.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border mb-4">
              <Sparkles size={18} className="text-ink-600" />
            </div>
            <h3 className="text-sm font-semibold text-ink-900">Curated and current</h3>
            <p className="text-sm text-ink-400 mt-1.5 leading-relaxed">
              A growing directory of the best AI tools, regularly updated.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
