/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#125566",
        "primary-2": "#106D78",
        "secondary-1": "#0CA5A3",
        "secondary-2": "#00BAB8",
        "secondary-3": "#D07D9B",
        "accent-1": "#FF0000",
        "accent-2": "#23A26D",
        "dark": "#253334",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
