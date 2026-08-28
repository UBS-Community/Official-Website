/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#F6EFD5',
          200: '#ECDDAA',
          300: '#E2C779',
          400: '#D4AF37', // UBS Core Gold
          500: '#C29A26',
          600: '#A47E1B',
          700: '#835E17',
          800: '#694B18',
          900: '#563D18',
          950: '#32200A',
        },
        obsidian: {
          800: '#141824',
          850: '#0E131F',
          900: '#0A0E17',
          950: '#05070B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 40px -5px rgba(212, 175, 55, 0.45)',
        'inner-gold': 'inset 0 1px 1px 0 rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
