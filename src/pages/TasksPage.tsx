import { useMemo, useState } from 'react';
import { type Task, fetchAllTasks, countToolsForTask } from '../lib/mockData';
import { useFetch } from '../lib/useFetch';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterChips } from '../components/ui/FilterChips';
import { TaskRow } from '../components/TaskRow';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonList } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

interface TasksPageProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNavigate: (path: string) => void;
}

export function TasksPage({ search, onSearchChange, onNavigate }: TasksPageProps) {
  const { data: tasks, loading, error } = useFetch(async () => {
    const data = await fetchAllTasks();
    const withCounts = data.map((t) => ({ ...t, tool_count: countToolsForTask(t.id) }));
    return withCounts.sort((a, b) => b.tool_count - a.tool_count);
  });

  const allTasks = (tasks ?? []) as (Task & { tool_count: number })[];

  // Popular = top 6 by tool count
  const popularTasks = useMemo(
    () => allTasks.slice(0, 6),
    [allTasks]
  );

  // Filter chips: tasks with > 3 tools
  const filterOptions = useMemo(
    () =>
      allTasks
        .filter((t) => t.tool_count > 3)
        .map((t) => t.name)
        .slice(0, 8),
    [allTasks]
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = allTasks;
    if (activeFilter) {
      result = result.filter((t) => t.name === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          (t.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [allTasks, activeFilter, search]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <EmptyState
          title="Failed to load tasks"
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
        <h1 className="text-2xl font-bold text-ink-900 tracking-tight">Tasks</h1>
        <p className="text-sm text-ink-400 mt-1.5">
=======
    <div className="mx-auto max-w-content px-4 sm:px-6 py-10 sm:py-12 animate-fade-in">
      {/* Page heading */}
      <div className="mb-9">
        <h1 className="font-display text-[26px] sm:text-[28px] font-bold text-ink-900 tracking-[-0.02em]">Tasks</h1>
        <p className="text-[14px] text-ink-400 mt-2 leading-relaxed">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          Find the right AI tool for what you need to get done.
        </p>
      </div>

      {/* Search */}
<<<<<<< HEAD
      <div className="mb-5">
=======
      <div className="mb-6">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search tasks..."
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

      {/* Popular Tasks (grid) */}
      {!loading && !search && !activeFilter && popularTasks.length > 0 && (
<<<<<<< HEAD
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-ink-800 mb-3">Popular</h2>
=======
        <div className="mb-9">
          <h2 className="text-[12px] font-semibold text-ink-600 uppercase tracking-[0.04em] mb-3.5">Popular</h2>
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onNavigate(`/tasks/${task.slug}`)}
<<<<<<< HEAD
                className="group p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 hover:border-border-strong hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-ink-900 truncate">{task.name}</h3>
                <p className="text-2xs text-ink-400 mt-0.5">{task.tool_count} tools</p>
=======
                className="group p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
              >
                <h3 className="text-[13.5px] font-semibold text-ink-900 truncate tracking-[-0.006em]">{task.name}</h3>
                <p className="text-2xs text-ink-400 mt-1">{task.tool_count} tools</p>
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Task List */}
      {!loading && !search && !activeFilter && (
<<<<<<< HEAD
        <h2 className="text-sm font-semibold text-ink-800 mb-3">All Tasks</h2>
=======
        <h2 className="text-[12px] font-semibold text-ink-600 uppercase tracking-[0.04em] mb-3.5">All Tasks</h2>
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
      )}

      {loading ? (
        <SkeletonList count={8} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No tasks found"
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
          {filtered.map((task) => (
            <TaskRow key={task.id} task={task} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
