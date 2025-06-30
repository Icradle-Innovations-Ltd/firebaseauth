/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-white',
    'bg-blue-600',
    'bg-gray-800',
    'text-white',
    'text-gray-700',
    'border-gray-300',
    'animate-spin',
    'bg-indigo-600',
    'hover:bg-indigo-700',
    'bg-emerald-600',
    'hover:bg-emerald-700',
    'text-red-700',
    'bg-red-100',
    'border-red-400'
  ]
}
