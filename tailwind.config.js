const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.js",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            backgroundSize: {
                auto: "auto",
                cover: "cover",
                contain: "contain",
                "50%": "50%",
                10: "2.5rem",
            },
            backgroundImage: {
                "project-pattern": "url('/icons/project.svg')",
                hero: "url('/images/hero-bg.jpg')",
            },
            fontFamily: {
                sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
