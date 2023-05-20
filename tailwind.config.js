/** @type {import('tailwindcss').Config} */
const {slate, green} = require("tailwindcss/colors");
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: green,
                slate: slate,
                background: "#e5e5e5",
                surface: "#ffffff"
            },
            spacing: {
                100: '34rem',
                120: '42rem',
                140: '58rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

