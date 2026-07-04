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
          ? 'bg-surface-1/75 backdrop-blur-xl border-b border-border'
          : 'bg-surface-1/0 border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-shell px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br from-primary-400 to-primary-700 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
              <Sparkles size={14} className="text-white" strokeWidth={2.25} />
            </div>
            <span className="font-display text-[13.5px] font-semibold text-ink-900 tracking-[-0.01em]">
              AI Discovery
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 p-0.5 rounded-lg bg-surface-2/60 border border-border-subtle">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`relative h-7 px-3.5 text-[13px] font-medium rounded-md transition-all duration-150 ${
                  isActive(link.path)
                    ? 'text-ink-900 bg-surface-3 shadow-xs'
                    : 'text-ink-500 hover:text-ink-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-ink-600 hover:bg-surface-2 active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`h-9 px-3 text-sm font-medium rounded-md text-left transition-all duration-150 ${
                    isActive(link.path)
                      ? 'text-ink-900 bg-surface-2'
                      : 'text-ink-500 hover:text-ink-800 hover:bg-surface-1'
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
