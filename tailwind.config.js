/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#06070a',
          900: '#0c0e14',
          850: '#12151f',
          800: '#181c2a',
          700: '#23293d',
          600: '#323a54',
        },
        brand: {
          violet: '#8b5cf6',
          purple: '#a855f7',
          cyan: '#06b6d4',
          pink: '#f43f5e',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}

