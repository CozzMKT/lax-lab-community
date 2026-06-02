import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#4ac065",
          "green-hover": "#42b35c",
          dark: "#1a1d21",
          "dark-light": "#22262b",
          "dark-lighter": "#2a2f35",
          "dark-border": "#2e3339",
          "dark-hover": "#ffffff08",
        },
      },
      fontSize: {
        "2xs": ["10px", "14px"],
      },
      transitionDuration: {
        "150": "150ms",
      },
    },
  },
  plugins: [],
};
export default config;
