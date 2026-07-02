import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-xs',
  secondary:
    'bg-surface-2 text-ink-800 border border-border hover:bg-surface-3 hover:border-border-strong shadow-xs',
  ghost:
    'text-ink-600 hover:text-ink-900 hover:bg-surface-2',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-2xs font-medium rounded-md gap-1.5',
  md: 'h-9 px-3.5 text-sm font-medium rounded-md gap-1.5',
  lg: 'h-11 px-5 text-sm font-medium rounded-lg gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-1 focus-visible:ring-offset-surface-1 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
