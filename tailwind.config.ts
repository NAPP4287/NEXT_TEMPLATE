import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#ffffff",
        black: "#1a1a1a",
        red: {
          main: "#d65c2f",
          light: "#ff8f66",
          med: "#eb6434",
        },
        green: {
          main: "#00bd48",
          light: "#6ee69c",
          med: "#3ac26e",
        },
        primay: {
          // 프로젝트별 primary 색상
          main: "",
          sub: "",
        },
        gray: {
          light: "#dedede",
          med: "#8c8c8c",
          dark: "#4f4f4f",
        },
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      padding: {
        sm: "8px",
        md: "12px",
        df: "16px",
        lg: "20px",
        xlg: "36px",
      },
      fontSize: {
        sm: "0.6rem",
        md: "0.8rem",
        df: "1rem",
        lg: "1.4rem",
        xlg: "1.6rem",
      },
    },
  },
  plugins: [],
};
export default config;
