/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        // Desktopový layout až od 1024px — tablety na výšku zobrazují mobilní verzi
        md: '1024px',
        '3xl': '1800px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0A0A0A',
          white: '#FAFAFA',
          gray: '#6B6B6B',
          blue: '#2D62FC',
          accent: '#2D62FC',
        }
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['12rem', { lineHeight: '0.85' }],
      }
    },
  },
  plugins: [],
};
