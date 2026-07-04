/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Neutral ramp — Linear's real dark-theme surface ladder
        // (canvas → surface-4, taken directly from linear.app's production tokens)
        surface: {
          0: '#010102',
          1: '#010102',
          2: '#0f1011',
          3: '#141516',
          4: '#18191a',
        },
        border: {
          DEFAULT: '#23252a',
          subtle: '#1c1d21',
          strong: '#34343a',
        },
        // Text ink ramp — inverted for dark canvas (900 = brightest/highest emphasis)
        ink: {
          900: '#f7f8f8',
          800: '#e4e6ea',
          700: '#d0d6e0',
          600: '#a7acb6',
          500: '#8a8f98',
          400: '#62666d',
          300: '#4a4d53',
          200: '#34363a',
        },
        // Primary — Linear's lavender-blue brand accent (#5e6ad2)
        primary: {
          50: 'rgba(94, 106, 210, 0.12)',
          100: 'rgba(94, 106, 210, 0.20)',
          200: 'rgba(94, 106, 210, 0.35)',
          300: '#a3aaf0',
          400: '#828fff',
          500: '#5e6ad2',
          600: '#4d58b8',
          700: '#3f4899',
          800: '#333a7a',
          900: '#2a3162',
        },
        // Accent — teal for the "Free Trial" badge only; tuned as a translucent dark-theme fill
        accent: {
          50: 'rgba(45, 212, 191, 0.14)',
          100: 'rgba(45, 212, 191, 0.22)',
          200: 'rgba(45, 212, 191, 0.35)',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#5eead4',
        },
        success: {
          50: 'rgba(39, 166, 68, 0.15)',
          500: '#27a644',
          600: '#33c157',
          700: '#3ecf62',
        },
        warning: {
          50: 'rgba(245, 158, 11, 0.15)',
          500: '#f59e0b',
          600: '#fbbf24',
        },
        error: {
          50: 'rgba(239, 68, 68, 0.15)',
          500: '#f87171',
          600: '#ef4444',
          700: '#fca5a5',
        },
        // Featured — warm gold, reserved for "Featured" badges and the
        // hero's signature highlight. The one deliberately warm note against
        // the cool navy canvas, used sparingly.
        featured: {
          50: 'rgba(245, 166, 35, 0.12)',
          400: '#f7b84b',
          500: '#f5a623',
          600: '#d98a12',
        },
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'md': '0 4px 16px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03)',
        'lg': '0 12px 32px -8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        'xl': '0 20px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glow': '0 0 0 1px rgba(94, 106, 210, 0.3), 0 4px 20px -2px rgba(94, 106, 210, 0.3)',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
      },
      maxWidth: {
        content: '48rem',
        shell: '72rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in': 'slideIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
