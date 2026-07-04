import type { CSSProperties } from 'react';
import {
  Sparkles,
  ImagePlus,
  PenSquare,
  Copy,
  Wand2,
  Layers,
  Palette,
  Clapperboard,
  Film,
  Scissors,
  Mic,
  LayoutTemplate,
  PenTool,
  Mic2,
  Music2,
  Presentation,
  Bot,
  type LucideIcon,
} from 'lucide-react';
import { brandMarks } from '../lib/brandIcons';
import type { Tool } from '../lib/mockData';

interface FallbackBrand {
  icon: LucideIcon;
  bg: string;
  fg: string;
}

// Curated fallback tiles for brands without a free, trademark-safe SVG mark
// available. Colors are tuned to each brand's real-world identity so every
// tile still reads as intentional rather than a generic placeholder.
const fallbackBrands: Record<string, FallbackBrand> = {
  chatgpt: { icon: Sparkles, bg: '#10A37F', fg: '#FFFFFF' },
  dalle: { icon: ImagePlus, bg: '#0D0D0D', fg: '#FFFFFF' },
  jasper: { icon: PenSquare, bg: '#FA4515', fg: '#FFFFFF' },
  'copy-ai': { icon: Copy, bg: '#6C47FF', fg: '#FFFFFF' },
  midjourney: { icon: Wand2, bg: '#000000', fg: '#FFFFFF' },
  'stable-diffusion': { icon: Layers, bg: '#7C3AED', fg: '#FFFFFF' },
  'leonardo-ai': { icon: Palette, bg: '#14121C', fg: '#C79CFF' },
  runway: { icon: Clapperboard, bg: '#000000', fg: '#FFFFFF' },
  pika: { icon: Film, bg: '#7C6CFB', fg: '#FFFFFF' },
  capcut: { icon: Scissors, bg: '#000000', fg: '#FFFFFF' },
  descript: { icon: Mic, bg: '#6A5AE0', fg: '#FFFFFF' },
  'galileo-ai': { icon: LayoutTemplate, bg: '#7C5CFC', fg: '#FFFFFF' },
  uizard: { icon: PenTool, bg: '#FF4A81', fg: '#FFFFFF' },
  'otter-ai': { icon: Mic2, bg: '#1B9AAA', fg: '#FFFFFF' },
  udio: { icon: Music2, bg: '#141414', fg: '#FFFFFF' },
  gamma: { icon: Presentation, bg: '#141414', fg: '#FFFFFF' },
  'character-ai': { icon: Bot, bg: '#000000', fg: '#FFFFFF' },
};

interface ToolLogoProps {
  tool: Tool;
  size?: number;
  radius?: number;
}

export function ToolLogo({ tool, size = 48, radius = 12 }: ToolLogoProps) {
  const mark = brandMarks[tool.slug];
  const fallback = fallbackBrands[tool.slug];

  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    background: mark?.bg ?? fallback?.bg ?? '#23252a',
    flexShrink: 0,
  };

  if (mark) {
    return (
      <div
        className="flex items-center justify-center shadow-xs ring-1 ring-white/[0.04]"
        style={style}
      >
        <svg
          viewBox="0 0 24 24"
          width={size * 0.5}
          height={size * 0.5}
          fill={mark.fg}
          aria-hidden="true"
        >
          <path d={mark.path} />
        </svg>
      </div>
    );
  }

  if (fallback) {
    const Icon = fallback.icon;
    return (
      <div
        className="flex items-center justify-center shadow-xs ring-1 ring-white/[0.04]"
        style={style}
      >
        <Icon size={size * 0.46} color={fallback.fg} strokeWidth={2} />
      </div>
    );
  }

  // Last-resort fallback: initials on a neutral gradient tile.
  const initials = tool.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className="flex items-center justify-center text-white font-semibold shadow-xs ring-1 ring-white/[0.04] bg-gradient-to-br from-primary-500 to-primary-800"
      style={{ ...style, fontSize: size * 0.32 }}
    >
      {initials}
    </div>
  );
}
