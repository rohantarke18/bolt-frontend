import type { CSSProperties } from 'react';
import { ToolLogo } from './ToolLogo';
import type { Tool } from '../lib/mockData';

interface ToolLogoStackProps {
  tools: Tool[];
  max?: number;
  size?: number;
}

export function ToolLogoStack({ tools, max = 4, size = 36 }: ToolLogoStackProps) {
  const shown = tools.slice(0, max);
  const overflow = tools.length - shown.length;

  return (
    <div className="logo-stack flex items-center">
      {shown.map((tool, i) => (
        <div
          key={tool.id}
          className="logo-stack-item rounded-[10px] ring-2 ring-surface-2 transition-transform duration-300 ease-out-expo"
          style={{ marginLeft: i === 0 ? 0 : -size * 0.32, zIndex: shown.length - i, ['--i' as string]: i } as CSSProperties}
        >
          <ToolLogo tool={tool} size={size} radius={10} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="flex items-center justify-center rounded-[10px] ring-2 ring-surface-2 bg-surface-4 text-2xs font-semibold text-ink-500 shrink-0"
          style={{ width: size, height: size, marginLeft: -size * 0.32 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
