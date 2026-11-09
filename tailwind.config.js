/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1EA',
        bone: '#FBF8F3',
        beige: '#E8E0D4',
        sand: '#D8CBB9',
        charcoal: '#1B1A17',
        ink: '#0E0D0B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxurious: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
