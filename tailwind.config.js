export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'neon-blue': '0 0 10px #00f, 0 0 20px #00f, 0 0 40px #00f',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #00f' },
          '50%': { boxShadow: '0 0 20px #00f, 0 0 40px #00f' },
        },
      },
      animation: {
        glow: 'glow 1.5s infinite alternate',
      },
    },
  },
  plugins: [],
};