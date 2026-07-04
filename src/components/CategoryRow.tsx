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