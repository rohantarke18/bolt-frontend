import React from 'react';

interface AIToolIconProps {
  name: string;
  size?: 'sm' | 'md';
}

export function AIToolIcon({ name, size = 'md' }: AIToolIconProps) {
  const normalized = name.toLowerCase().trim();
  const dimensions = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const containerDimensions = size === 'sm' ? 'w-6 h-6' : 'w-7 h-7';

  return (
    <div className={`flex items-center justify-center ${containerDimensions} bg-surface-3 border border-border-subtle rounded-md group-hover:border-border-strong transition-all duration-150 shadow-xs shrink-0`}>
      <img
        src={`https://www.google.com/s2/favicons?sz=128&domain=${
          normalized.includes('openai') || normalized.includes('chat') ? 'openai.com' :
          normalized.includes('claude') || normalized.includes('anthropic') ? 'anthropic.com' :
          normalized.includes('gemini') || normalized.includes('google') ? 'gemini.google.com' :
          normalized.includes('midjourney') ? 'midjourney.com' : 'github.com'
        }`}
        alt={`${name} icon`}
        className={`${dimensions} object-contain`}
        onError={(e) => {
          e.currentTarget.src = `https://www.google.com/s2/favicons?sz=128&domain=github.com`;
        }}
      />
    </div>
  );
}