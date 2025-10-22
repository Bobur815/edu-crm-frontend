import type { Config } from "tailwindcss";


const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: "#ffb703",
                    dark: "#fb8500"
                }
            }
        }
    }
};
export default config;