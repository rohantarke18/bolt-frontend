import { ArrowRight } from 'lucide-react';
import type { TaskWithCount } from '../lib/mockData';

interface TaskRowProps {
  task: TaskWithCount;
  onNavigate: (path: string) => void;
}

export function TaskRow({ task, onNavigate }: TaskRowProps) {
  return (
    <button
      onClick={() => onNavigate(`/tasks/${task.slug}`)}
      className="group flex w-full items-center gap-4 px-4 py-4 text-left border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-surface-1"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-ink-900 truncate">
          {task.name}
        </h3>
        <p className="text-sm text-ink-400 truncate mt-0.5">
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-2xs font-medium text-ink-400 px-2 py-0.5 rounded-full bg-surface-3">
          {task.tool_count} {task.tool_count === 1 ? 'tool' : 'tools'}
        </span>
        <ArrowRight
          size={16}
          className="text-ink-300 group-hover:text-ink-600 group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </button>
  );
}
