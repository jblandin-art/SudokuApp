/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables so the hue can be changed at runtime
        primary: 'hsl(var(--h) var(--s) var(--l))',
      },
    },
  },
  plugins: [],
};
