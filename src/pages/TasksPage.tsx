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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-900 tracking-tight">Tasks</h1>
        <p className="text-sm text-ink-400 mt-1.5">
          Find the right AI tool for what you need to get done.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
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
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-ink-800 mb-3">Popular</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onNavigate(`/tasks/${task.slug}`)}
                className="group p-4 border border-border rounded-xl bg-surface-2 text-left transition-all duration-200 hover:border-border-strong hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-ink-900 truncate">{task.name}</h3>
                <p className="text-2xs text-ink-400 mt-0.5">{task.tool_count} tools</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Task List */}
      {!loading && !search && !activeFilter && (
        <h2 className="text-sm font-semibold text-ink-800 mb-3">All Tasks</h2>
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
        <div className="border border-border rounded-xl bg-surface-2 overflow-hidden">
          {filtered.map((task) => (
            <TaskRow key={task.id} task={task} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
