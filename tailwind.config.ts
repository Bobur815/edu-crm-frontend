// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{ts,tsx,js,jsx}"],  // <— scan all your code
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: {
                        50: "#FFF3E7", 100: "#FFE3C2", 200: "#FFCD8A", 300: "#FFB657",
                        400: "#FF9E26", 500: "#F37F07", 600: "#D96606", 700: "#B34F05"
                    },
                    green: {
                        50: "#EEF8EE", 100: "#D7F0D8", 200: "#B8E4BA", 300: "#8FD590",
                        400: "#67C06A", 500: "#2F9E44", 600: "#257E36", 700: "#1C5F2A"
                    },
                    ink: "#0B0F0C",
                    bg: "#FFFFFF",
                    gray: { 100: "#F5F6F6", 200: "#E9ECEB", 300: "#D9DEDC", 400: "#B7C0BC", 500: "#8B9792", 600: "#5F6B66", 700: "#3A433F", 800: "#202623" }
                }
            },
            fontFamily: {
                luxury: ['"Old Standard TT"', 'Georgia', '"Times New Roman"', 'serif'],
                ui: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
                body: ['"Libre Baskerville"', 'Georgia', '"Times New Roman"', 'serif'],
            },
            letterSpacing: {
                tightish: "-0.01em",
                luxe: "0.02em",
            }
        }
    },
    plugins: []
} satisfies Config;
