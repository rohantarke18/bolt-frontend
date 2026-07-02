import { ExternalLink } from 'lucide-react';
import type { Tool } from '../lib/supabase';

interface ToolCardProps {
  tool: Tool;
}

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
          {tool.description}
        </p>
      </div>

      {/* Action */}
      {tool.website_url && (
        <a
          href={tool.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-2xs font-medium text-ink-700 bg-surface-2 border border-border rounded-md hover:bg-surface-3 hover:border-border-strong transition-all duration-150 shrink-0"
        >
          Visit
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
