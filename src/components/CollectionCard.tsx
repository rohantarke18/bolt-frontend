import { ArrowRight } from 'lucide-react';
import { ToolLogoStack } from './ToolLogoStack';
import { getCategoryAccent } from '../lib/categoryColors';
import type { Tool } from '../lib/mockData';

interface CollectionCardProps {
  title: string;
  description: string;
  slug: string;
  categorySlug: string;
  tools: Tool[];
  toolCount: number;
  featured?: boolean;
  onNavigate: (path: string) => void;
}

export function CollectionCard({
  title,
  description,
  slug,
  categorySlug,
  tools,
  toolCount,
  featured = false,
  onNavigate,
}: CollectionCardProps) {
  const accent = getCategoryAccent(categorySlug);

  return (
    <button
      onClick={() => onNavigate(`/categories/${slug}`)}
      className="group relative flex flex-col text-left p-5 rounded-2xl border border-border bg-surface-2 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lg overflow-hidden w-full"
      style={{ ['--accent' as string]: accent.hex }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent.ring;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
      }}
    >
      {/* Ambient accent glow, revealed on hover */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: accent.hex }}
      />

      <div className="relative flex items-center justify-between mb-4">
        <ToolLogoStack tools={tools} />
        {featured && (
          <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-featured-500/15 border border-featured-500/30 text-2xs font-semibold text-featured-400 tracking-[-0.01em] shrink-0">
            Featured
          </span>
        )}
      </div>

      <h3
        className="relative text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200"
        style={{ color: 'var(--accent)' }}
      >
        {title}
      </h3>
      <p className="relative text-[13px] text-ink-400 mt-1.5 leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="relative mt-auto pt-4 flex items-center justify-between">
        <span className="text-2xs font-medium text-ink-500">
          {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
        </span>
        <span className="inline-flex items-center gap-1 text-2xs font-medium text-ink-500 group-hover:text-ink-800 transition-colors duration-200">
          View collection
          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}
