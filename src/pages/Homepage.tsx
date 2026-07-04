import { ArrowRight, Sparkles, Layers, ListChecks } from 'lucide-react';
import {
  type Category,
  type Task,
  type Tool,
  fetchFeaturedCategories,
  fetchPopularTasks,
  fetchTotalToolsCount,
  fetchToolsForCategory,
  countToolsForCategory,
  countToolsForTask,
} from '../lib/mockData';
import { useFetch } from '../lib/useFetch';
import { getCategoryAccent } from '../lib/categoryColors';
import { Button } from '../components/ui/Button';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { CollectionCard } from '../components/CollectionCard';
import { ToolLogo } from '../components/ToolLogo';

interface HomepageProps {
  onNavigate: (path: string) => void;
}

type CategoryWithCount = Category & { tool_count: number };
type CollectionData = CategoryWithCount & { tools: Tool[] };

// Decorative brand tiles floating in the hero — real tools from the
// catalog, not generic shapes, so the texture is grounded in the content.
const heroTiles: { name: string; slug: string; size: number; className: string; delay: string }[] = [
  { name: 'ChatGPT', slug: 'chatgpt', size: 52, className: 'top-16 right-14 rotate-[-8deg]', delay: '80ms' },
  { name: 'Midjourney', slug: 'midjourney', size: 40, className: 'top-40 right-40 rotate-[6deg]', delay: '160ms' },
  { name: 'Cursor', slug: 'cursor', size: 44, className: 'top-8 right-56 rotate-[10deg]', delay: '240ms' },
  { name: 'Runway', slug: 'runway', size: 36, className: 'top-56 right-8 rotate-[-4deg]', delay: '320ms' },
];

export function Homepage({ onNavigate }: HomepageProps) {
  const { data: collections, loading: catLoading } = useFetch(async () => {
    const cats = await fetchFeaturedCategories();
    const withCounts = cats.map((c) => ({ ...c, tool_count: countToolsForCategory(c.id) }));
    const sorted = withCounts.sort((a, b) => b.tool_count - a.tool_count);
    const withTools = await Promise.all(
      sorted.map(async (c) => ({ ...c, tools: await fetchToolsForCategory(c.id) }))
    );
    return withTools as CollectionData[];
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
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #f7f8f8 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 800px 420px at 20% -10%, rgba(94,106,210,0.16), transparent 60%), radial-gradient(ellipse 500px 300px at 95% 5%, rgba(245,166,35,0.10), transparent 60%)',
          }}
        />

        <div className="relative mx-auto max-w-shell px-4 sm:px-6 pt-20 pb-14 sm:pt-32 sm:pb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-border bg-surface-2/80 backdrop-blur text-2xs font-medium text-ink-500 mb-7 animate-fade-in-up">
              <Sparkles size={12} className="text-featured-500" />
              {totalTools ?? '—'} AI tools and counting
            </div>

            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.5rem] font-bold text-ink-900 tracking-[-0.03em] leading-[1.08] animate-fade-in-up">
              Find the right <span className="text-gradient-warm">AI</span>
              <br />
              for any task.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-500 leading-relaxed max-w-xl animate-fade-in-up">
              A curated directory of AI tools organized by category and task.
              Discover, compare, and choose the perfect tool for your workflow.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade-in-up">
              <Button size="lg" onClick={() => onNavigate('/categories')}>
                Browse Categories
                <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => onNavigate('/tasks')}>
                Explore Tasks
              </Button>
            </div>
          </div>

          {/* Decorative floating brand tiles — hidden below lg to keep mobile calm */}
          <div className="hidden lg:block pointer-events-none absolute inset-0">
            {heroTiles.map((t) => (
              <div key={t.slug} className={`absolute ${t.className} animate-fade-in-up`} style={{ animationDelay: t.delay }}>
                <ToolLogo
                  tool={{ id: t.slug, name: t.name, slug: t.slug, description: '', website_url: '', logo_url: null, pricing_type: 'Freemium', created_at: '' }}
                  size={t.size}
                  radius={t.size > 44 ? 14 : 12}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category pill nav — quick jump, mobile-first horizontal scroll */}
      <section className="mx-auto max-w-shell px-4 sm:px-6 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => onNavigate('/categories')}
            className="shrink-0 h-8 px-3.5 rounded-full bg-primary-600 text-white text-[13px] font-medium transition-colors hover:bg-primary-700"
          >
            All
          </button>
          {(collections ?? []).map((cat) => {
            const accent = getCategoryAccent(cat.slug);
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/categories/${cat.slug}`)}
                className="shrink-0 h-8 px-3.5 rounded-full border text-[13px] font-medium text-ink-500 bg-surface-2 transition-all duration-150 hover:text-ink-800"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent.ring)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Curated Collections */}
      <section className="mx-auto max-w-shell px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-end justify-between mb-6 sm:mb-7">
          <div>
            <h2 className="font-display text-[18px] sm:text-[19px] font-semibold text-ink-900 tracking-[-0.01em]">
              Curated Collections
            </h2>
            <p className="text-[13.5px] text-ink-400 mt-1">Hand-grouped tools by domain, ready to compare</p>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="group hidden sm:flex text-[13.5px] font-medium text-ink-500 hover:text-ink-800 transition-colors items-center gap-1 shrink-0"
          >
            View all
            <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>

        {catLoading ? (
          <SkeletonGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(collections ?? []).map((cat, i) => (
              <CollectionCard
                key={cat.id}
                title={`Best AI for ${cat.name}`}
                description={cat.description}
                slug={cat.slug}
                categorySlug={cat.slug}
                tools={cat.tools}
                toolCount={cat.tool_count}
                featured={i < 2}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </section>

      {/* Popular Tasks */}
      <section className="mx-auto max-w-shell px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-end justify-between mb-6 sm:mb-7">
          <div>
            <h2 className="font-display text-[18px] sm:text-[19px] font-semibold text-ink-900 tracking-[-0.01em]">Popular Tasks</h2>
            <p className="text-[13.5px] text-ink-400 mt-1">Find tools for what you need to do</p>
          </div>
          <button
            onClick={() => onNavigate('/tasks')}
            className="group hidden sm:flex text-[13.5px] font-medium text-ink-500 hover:text-ink-800 transition-colors items-center gap-1 shrink-0"
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
      <section className="mx-auto max-w-shell px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-6 border border-border rounded-xl bg-surface-2 transition-all duration-200 hover:border-border-strong">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] mb-[18px]" style={{ background: 'rgba(167,139,250,0.13)', border: '1px solid rgba(167,139,250,0.28)' }}>
              <Layers size={18} strokeWidth={1.9} style={{ color: '#A78BFA' }} />
            </div>
            <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">Organized by category</h3>
            <p className="text-[13.5px] text-ink-400 mt-2 leading-relaxed">
              Browse tools across writing, coding, design, video, and more.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-surface-2 transition-all duration-200 hover:border-border-strong">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] mb-[18px]" style={{ background: 'rgba(45,212,191,0.13)', border: '1px solid rgba(45,212,191,0.28)' }}>
              <ListChecks size={18} strokeWidth={1.9} style={{ color: '#2DD4BF' }} />
            </div>
            <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">Task-driven discovery</h3>
            <p className="text-[13.5px] text-ink-400 mt-2 leading-relaxed">
              Know what you need to do? Find the right tool for the job.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-surface-2 transition-all duration-200 hover:border-border-strong">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] mb-[18px]" style={{ background: 'rgba(245,166,35,0.13)', border: '1px solid rgba(245,166,35,0.28)' }}>
              <Sparkles size={18} strokeWidth={1.9} className="text-featured-500" />
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
