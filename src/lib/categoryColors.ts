// Each featured category gets its own accent hue so the directory reads as
// a living, color-coded map of domains rather than one repeated gray tile.
// Colors are chosen to sit comfortably on the dark navy canvas (soft, not
// neon) while staying clearly distinct from one another at a glance.

export interface CategoryAccent {
  hex: string;
  soft: string; // ~12% alpha, for tinted backgrounds
  ring: string; // ~28% alpha, for borders/rings
}

const PALETTE: Record<string, string> = {
  writing: '#A78BFA', // violet
  'image-generation': '#F472B6', // pink
  video: '#FB7185', // rose
  coding: '#38BDF8', // sky
  design: '#FB923C', // orange
  productivity: '#A3E635', // lime
  marketing: '#34D399', // emerald
  'audio-music': '#2DD4BF', // teal
  research: '#22D3EE', // cyan
  business: '#FBBF24', // amber
  education: '#818CF8', // indigo
  chatbots: '#E879F9', // fuchsia
};

const FALLBACK = '#8A8F98';

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export function getCategoryAccent(slug: string): CategoryAccent {
  const hex = PALETTE[slug] ?? FALLBACK;
  const rgb = hexToRgb(hex);
  return {
    hex,
    soft: `rgba(${rgb}, 0.13)`,
    ring: `rgba(${rgb}, 0.32)`,
  };
}
