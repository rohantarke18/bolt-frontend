<<<<<<< HEAD
import { ExternalLink } from 'lucide-react';
=======
import { ArrowUpRight } from 'lucide-react';
import { ToolLogo } from './ToolLogo';
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
import type { Tool } from '../lib/mockData';

interface ToolCardProps {
  tool: Tool;
}

<<<<<<< HEAD
const pricingColors: Record<string, string> = {
  Free: 'bg-success-50 text-success-700',
  Freemium: 'bg-primary-50 text-primary-700',
  Paid: 'bg-warning-50 text-warning-600',
  'Free Trial': 'bg-accent-50 text-accent-700',
};

export function ToolCard({ tool }: ToolCardProps) {
  const initials = tool.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const pricingClass = pricingColors[tool.pricing_type] ?? 'bg-surface-3 text-ink-500';

  return (
    <div className="flex items-start gap-4 p-5 border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-surface-1">
      {/* Logo */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-800 text-white text-sm font-semibold shrink-0 shadow-sm">
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-ink-900">{tool.name}</h3>
          <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${pricingClass}`}>
            {tool.pricing_type}
          </span>
        </div>
        <p className="text-sm text-ink-400 mt-1 line-clamp-2">
=======
const pricingDot: Record<string, string> = {
  Free: 'bg-success-600',
  Freemium: 'bg-primary-400',
  Paid: 'bg-warning-600',
  'Free Trial': 'bg-accent-400',
};

const pricingText: Record<string, string> = {
  Free: 'text-success-600',
  Freemium: 'text-primary-300',
  Paid: 'text-warning-600',
  'Free Trial': 'text-accent-400',
};

export function ToolCard({ tool }: ToolCardProps) {
  const dotClass = pricingDot[tool.pricing_type] ?? 'bg-ink-400';
  const textClass = pricingText[tool.pricing_type] ?? 'text-ink-400';

  return (
    <div className="group relative flex items-start gap-4 px-5 py-[18px] border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-white/[0.025]">
      {/* Active-row accent bar */}
      <span className="absolute left-0 top-0 h-full w-0.5 scale-y-0 bg-primary-500 transition-transform duration-200 group-hover:scale-y-100" />

      <ToolLogo tool={tool} size={44} radius={11} />

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="text-[14px] font-semibold text-ink-900 tracking-[-0.006em]">
            {tool.name}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-ink-500">
            <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
            <span className={textClass}>{tool.pricing_type}</span>
          </span>
        </div>
        <p className="text-[13px] text-ink-400 mt-1 leading-relaxed line-clamp-2 max-w-xl">
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
          {tool.description}
        </p>
      </div>

      {/* Action */}
      {tool.website_url && (
        <a
          href={tool.website_url}
          target="_blank"
          rel="noopener noreferrer"
<<<<<<< HEAD
          className="inline-flex items-center gap-1.5 h-8 px-3 text-2xs font-medium text-ink-700 bg-surface-2 border border-border rounded-md hover:bg-surface-3 hover:border-border-strong transition-all duration-150 shrink-0"
        >
          Visit
          <ExternalLink size={12} />
=======
          className="inline-flex items-center gap-1 h-8 px-3 text-2xs font-medium text-ink-600 bg-surface-2 border border-border rounded-md transition-all duration-150 shrink-0 mt-0.5 group-hover:text-ink-900 group-hover:border-border-strong group-hover:bg-surface-3 active:scale-[0.97]"
        >
          Visit
          <ArrowUpRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
        </a>
      )}
    </div>
  );
}
