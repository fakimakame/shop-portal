/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './apps/**/*.{js,jsx,ts,tsx}', // Adjust based on your project structure
    './libs/**/*.{js,jsx,ts,tsx}',
    // "./apps/shop/src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./libs/src/**/*.{js,ts,jsx,tsx,html}",
    // "./apps/shop/src/index.html"
  ],
  // purge: [
  //   "./apps/shop/src/**/*.{js,ts,jsx,tsx,html}",
  //   "./libs/src/**/*.{js,ts,jsx,tsx,html}",
  //   "./apps/shop/src/index.html"
  // ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

