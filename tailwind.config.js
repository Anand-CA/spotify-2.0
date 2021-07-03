module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "spotify-black": "#191414",
        "spotify-green": "#1DB954",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
