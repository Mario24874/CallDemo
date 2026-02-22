/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1B3A5C',
          dark: '#0F2540',
          accent: '#2E9DD8',
          light: '#E8F4FD',
          charcoal: '#32373C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(27, 58, 92, 0.12)',
        'brand-lg': '0 8px 40px rgba(27, 58, 92, 0.18)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1B3A5C 0%, #2E9DD8 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #F7FAFC 0%, #EBF4FF 100%)',
      },
    },
  },
  plugins: [],
}
