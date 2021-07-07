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
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-in",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      backgroundColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
