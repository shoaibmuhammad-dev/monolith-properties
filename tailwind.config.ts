import type { Config } from "tailwindcss";

/**
 * This file only tells Tailwind which files to scan.
 * There are no custom colors, sizes or fonts here.
 * Edit styles directly on each element (className) or in app/globals.css.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {},
  plugins: [],
};

export default config;
