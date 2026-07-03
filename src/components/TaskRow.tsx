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
      className="group relative flex w-full items-center gap-4 px-5 py-4 text-left border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-white/[0.025]"
    >
      <span className="absolute left-0 top-0 h-full w-0.5 scale-y-0 bg-primary-500 transition-transform duration-200 group-hover:scale-y-100" />

      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-semibold text-ink-900 truncate tracking-[-0.006em]">
          {task.name}
        </h3>
        <p className="text-[13px] text-ink-400 truncate mt-0.5">
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-2xs font-medium text-ink-500 px-2 py-0.5 rounded-full bg-surface-3 border border-border-subtle">
          {task.tool_count} {task.tool_count === 1 ? 'tool' : 'tools'}
        </span>
        <ArrowRight
          size={15}
          className="text-ink-300 group-hover:text-ink-700 group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </button>
  );
}
