import { ArrowRight, Sparkles, Layers, ListChecks } from 'lucide-react';
import {
  type Category,
  type Task,
  fetchFeaturedCategories,
  fetchPopularTasks,
  fetchTotalToolsCount,
  countToolsForCategory,
  countToolsForTask,
} from '../lib/mockData';
import { useFetch } from '../lib/useFetch';
import { getIcon } from '../lib/icons';
import { Button } from '../components/ui/Button';
import { SkeletonGrid } from '../components/ui/Skeleton';

interface HomepageProps {
  onNavigate: (path: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const { data: featuredCategories, loading: catLoading } = useFetch(async () => {
    const data = await fetchFeaturedCategories();
    const counts = data.map((c) => ({ ...c, tool_count: countToolsForCategory(c.id) }));
    return counts.sort((a, b) => b.tool_count - a.tool_count);
  });

  const { data: popularTasks, loading: taskLoading } = useFetch(async () => {
    const data = await fetchPopularTasks();
    const counts = data.map((t) => ({ ...t, tool_count: countToolsForTask(t.id) }));
    return counts.sort((a, b) => b.tool_count - a.tool_count);
  });

  const { data: totalTools } = useFetch(async () => {
    return fetchTotalToolsCount();
  });

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #f7f8f8 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 800px 420px at 20% -10%, rgba(94,106,210,0.16), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-shell px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-border bg-surface-2/80 backdrop-blur text-2xs font-medium text-ink-500 mb-7 animate-fade-in-up">
              <Sparkles size={12} className="text-primary-400" />
              {totalTools ?? '—'} AI tools and counting
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold text-ink-900 tracking-[-0.03em] leading-[1.06] animate-fade-in-up">
              Find the right AI
              <br />
              for any task.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-500 leading-relaxed max-w-xl animate-fade-in-up">
              A curated directory of AI tools organized by category and task.
              Discover, compare, and choose the perfect tool for your workflow.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-in-up">
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
      <section className="mx-auto max-w-shell px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-[17px] font-semibold text-ink-900 tracking-[-0.01em]">Featured Categories</h2>
            <p className="text-[13.5px] text-ink-400 mt-1">Explore tools by domain</p>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="group text-[13.5px] font-medium text-ink-500 hover:text-ink-800 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>

        {catLoading ? (
          <SkeletonGrid count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {(featuredCategories ?? []).map((cat) => {
              const Icon = getIcon((cat as Category).icon_name);
              return (
                <button
                  key={(cat as Category).id}
                  onClick={() => onNavigate(`/categories/${(cat as Category).slug}`)}
                  className="group p-5 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-surface-3 border border-border group-hover:bg-primary-500/10 group-hover:border-primary-500/30 transition-colors duration-200 mb-3.5">
                    <Icon size={18} strokeWidth={1.9} className="text-ink-600 group-hover:text-primary-300 transition-colors duration-200" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">
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
      <section className="mx-auto max-w-shell px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-[17px] font-semibold text-ink-900 tracking-[-0.01em]">Popular Tasks</h2>
            <p className="text-[13.5px] text-ink-400 mt-1">Find tools for what you need to do</p>
          </div>
          <button
            onClick={() => onNavigate('/tasks')}
            className="group text-[13.5px] font-medium text-ink-500 hover:text-ink-800 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>

        {taskLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl skeleton-shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(popularTasks ?? []).map((task) => (
              <button
                key={(task as Task).id}
                onClick={() => onNavigate(`/tasks/${(task as Task).slug}`)}
                className="group flex items-center justify-between p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
              >
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold text-ink-900 truncate tracking-[-0.006em]">
                    {(task as Task).name}
                  </h3>
                  <p className="text-2xs text-ink-400 mt-1">
                    {(task as { tool_count: number }).tool_count} tools
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-ink-300 group-hover:text-ink-700 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 ml-3"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Platform intro */}
      <section className="mx-auto max-w-shell px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-6 border border-border rounded-xl bg-surface-2 transition-all duration-200 hover:border-border-strong">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-surface-3 border border-border mb-[18px]">
              <Layers size={18} strokeWidth={1.9} className="text-primary-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">Organized by category</h3>
            <p className="text-[13.5px] text-ink-400 mt-2 leading-relaxed">
              Browse tools across writing, coding, design, video, and more.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-surface-2 transition-all duration-200 hover:border-border-strong">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-surface-3 border border-border mb-[18px]">
              <ListChecks size={18} strokeWidth={1.9} className="text-primary-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">Task-driven discovery</h3>
            <p className="text-[13.5px] text-ink-400 mt-2 leading-relaxed">
              Know what you need to do? Find the right tool for the job.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-surface-2 transition-all duration-200 hover:border-border-strong">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-surface-3 border border-border mb-[18px]">
              <Sparkles size={18} strokeWidth={1.9} className="text-primary-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">Curated and current</h3>
            <p className="text-[13.5px] text-ink-400 mt-2 leading-relaxed">
              A growing directory of the best AI tools, regularly updated.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
