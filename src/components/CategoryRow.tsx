<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const navLinks = [
    { label: 'Categories', path: '/categories' },
    { label: 'Tasks', path: '/tasks' },
  ];

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-surface-1/70 backdrop-blur-md border-b border-border-subtle'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-11 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-purple border border-white/10 shadow-xs group-hover:brightness-110 transition-all duration-150">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold text-ink-900 tracking-tight group-hover:text-white transition-colors">
              AI Discovery
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`h-7 px-2.5 text-[12px] font-medium rounded-md transition-all duration-150 ${
                  isActive(link.path)
                    ? 'text-ink-900 bg-surface-3 border border-border-subtle shadow-xs'
                    : 'text-ink-500 hover:text-ink-900 hover:bg-surface-2/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-7 w-7 items-center justify-center rounded-md text-ink-500 hover:text-ink-800 hover:bg-surface-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3 border-t border-border-subtle mt-1 pt-2 bg-surface-1 animate-fade-in">
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`h-8 px-3 text-[12px] font-medium rounded-md text-left transition-all duration-150 ${
                    isActive(link.path)
                      ? 'text-ink-900 bg-surface-2'
                      : 'text-ink-500 hover:text-ink-800 hover:bg-surface-1/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
=======
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../lib/icons';
import { getCategoryAccent } from '../lib/categoryColors';
import type { CategoryWithCount } from '../lib/mockData';

interface CategoryRowProps {
  category: CategoryWithCount;
  onNavigate: (path: string) => void;
}

export function CategoryRow({ category, onNavigate }: CategoryRowProps) {
  const Icon = getIcon(category.icon_name);
  const accent = getCategoryAccent(category.slug);

  return (
    <button
      onClick={() => onNavigate(`/categories/${category.slug}`)}
      className="group relative flex w-full items-center gap-3.5 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left border-b border-border-subtle last:border-b-0 transition-colors duration-150 hover:bg-white/[0.025]"
    >
      <span
        className="absolute left-0 top-0 h-full w-0.5 scale-y-0 transition-transform duration-200 group-hover:scale-y-100"
        style={{ background: accent.hex }}
      />

      <div
        className="flex h-10 w-10 items-center justify-center rounded-[10px] shrink-0 transition-colors duration-150"
        style={{ background: accent.soft, border: `1px solid ${accent.ring}` }}
      >
        <Icon size={17} strokeWidth={1.9} style={{ color: accent.hex }} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-semibold text-ink-900 truncate tracking-[-0.006em]">
          {category.name}
        </h3>
        <p className="text-[13px] text-ink-400 truncate mt-0.5">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-2xs font-medium text-ink-500 px-2 py-0.5 rounded-full bg-surface-3 border border-border-subtle">
          {category.tool_count} {category.tool_count === 1 ? 'tool' : 'tools'}
        </span>
        <ArrowRight
          size={15}
          className="text-ink-300 group-hover:text-ink-700 group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </button>
  );
}
>>>>>>> 13f8c418c1a9242f2843cd0d2f2bb11057b1a58f
