/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8a2be2",
        bgprimary: "#13141c",
        bgsecondary: "#1e202b",
        darkoverlay: "rgba(1,1,1,0.5)",
      },
    },
  },
  plugins: [],
};
