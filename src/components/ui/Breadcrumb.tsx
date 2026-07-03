import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-[13px]" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <button
                onClick={() => onNavigate(item.href!)}
                className="text-ink-400 hover:text-ink-700 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? 'text-ink-800 font-medium' : 'text-ink-400'}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight size={13} className="text-ink-300" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
