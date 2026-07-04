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
<<<<<<< HEAD
    <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1">
=======
    <nav className="flex items-center gap-1.5 text-[13px]" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
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
<<<<<<< HEAD
              <ChevronRight size={14} className="text-ink-300" />
=======
              <ChevronRight size={13} className="text-ink-300" />
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
            )}
          </div>
        );
      })}
    </nav>
  );
}
