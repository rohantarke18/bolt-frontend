/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          0: '#010102',
          1: '#050507',
          2: '#0f1011',
          3: '#141516',
          4: '#18191a',
        },
        bg: {
          canvas: '#010102',
          surface: '#0f1011',
          elevated: '#18191a',
        },
        border: {
          DEFAULT: '#23252a',
          subtle: 'rgba(255, 255, 255, 0.06)',
          muted: 'rgba(255, 255, 255, 0.12)',
          strong: '#34343a',
          focus: 'rgba(110, 89, 243, 0.4)',
        },
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
        brand: {
          purple: '#5e4be2',
          purpleMuted: 'rgba(94, 75, 226, 0.15)',
        },
        primary: {
          500: '#5e6ad2',
        }
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'premium': '0 1px 2px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};