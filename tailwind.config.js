/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'light-background': '#2D2D2D',
        'medium-bacground': '#0D0D0D',
        'standard-background': '#4D4D4D',
        'action': '#F2CB05',
        'highlight': '#088C7F',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ['rounded']
}
}

