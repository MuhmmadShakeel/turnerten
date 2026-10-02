import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotateX(12deg) rotateY(-16deg) translateY(0)' },
          '50%': { transform: 'rotateX(9deg) rotateY(-11deg) translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
