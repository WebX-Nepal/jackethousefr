import type { Config } from "tailwindcss";
const config: Config = {
  jit: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#eee",
        secondary: "#000000",
        backgroundGray: "#CCCACA",
        modalBackground: "#D9D9D9",
      },
      blur: {
        "5": "blur(5px)",
      },
    },
  },
  plugins: [],
};
export default config;
