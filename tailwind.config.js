module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "spotify-black": "#191414",
        "spotify-green": "#1DB954",
        "transparent-rgba": "rgba(0,0,0,0.7)",
        "transparent-rgba2": "rgba(0,0,0,0.8)",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
