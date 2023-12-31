import type { Config } from "tailwindcss";
const config: Config = {
  jit: true,

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#eee",
        secondary: "#000000",
        backgroundGray: "#CCCACA",
        modalBackground: "#D9D9D9",
        buttonShadow: "#00000040",
      },
      blur: {
        "5": "blur(5px)",
      },
    },
    darkMode: "",
    screens: {
      xs: "320px", // Custom breakpoint for extra small screens
      sm: "640px", // Small screens (default)
      md: "768px", // Medium screens (default)
      lg: "1024px", // Large screens (default)
      xl: "1280px", // Extra-large screens (default)
      "2xl": "1440px", // Custom breakpoint for 2xl screens
      maxScreenWidth: "1900px",
    },
  },
  plugins: [],
};
export default config;
