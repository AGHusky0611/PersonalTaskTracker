// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        foreground: "#C9D1D9",
        card: "#161B22",
        border: "#30363D",
        primary: "#58A6FF", // Blue accent
        muted: "#8B949E",
        success: "#238636", // GitHub green
      },
    },
  },
  plugins: [],
};
export default config;