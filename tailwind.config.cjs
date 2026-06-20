module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB'
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '16px'
                },
                screens: {
                    '2xl': '1440px'
                }
            },
            borderRadius: {
                xl2: '1rem'
            }
        }
    },
    plugins: []
};
