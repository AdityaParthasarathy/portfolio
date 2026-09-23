/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060404',
        surface: '#0f0a0a',
        'surface-2': '#170f0f',
        line: 'rgba(255,255,255,0.09)',
        accent: '#e5342a',
        accent2: '#ff6b5b',
        text: '#f5f1ee',
        muted: '#9a9096',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        script: ['"Caveat"', 'cursive'],
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
