/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fusion: {
          bg: "#060713",
          surface: "rgba(18, 16, 38, 0.7)",
          card: "rgba(25, 20, 52, 0.6)",
          border: "rgba(168, 85, 247, 0.2)",
          gold: "#F5BE47",
          amber: "#D97706",
          purple: "#A855F7",
          indigo: "#6366F1",
          cyan: "#38BDF8",
          pink: "#EC4899",
        },
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(245, 190, 71, 0.6))' },
        },
      },
    },
  },
  plugins: [],
}
