import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx,md,mdx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#6b8bc6",
        primaryLight: "#cfdcee",
        primaryDark: "#272c44",
        secondary: "#6b69a7",
        secondaryLight: "#959ac5",
        secondaryDark: "#2e2c3f",
        danger: "#d42e2e",
        success: "#2fb845",
        bgDark: "#3b3b3e",
        bgLight: "#cfd0d2",
      },
    },
  },
} satisfies Config;

export default config;
