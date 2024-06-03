import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./ui/_shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/nextjs/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/nextjs/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [],
};
export default config;
