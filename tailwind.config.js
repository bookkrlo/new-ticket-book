// tailwind.config.js
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    100: '#f5ffe3',
                    200: '#e2ffaa',
                    300: '#ceff71',
                    400: '#baff39',
                    500: '#a7ff00',
                    600: '#82c600',
                    700: '#5d8e00',
                    800: '#385500',
                    900: '#131c00',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                marquee: 'marquee 10s linear infinite',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
