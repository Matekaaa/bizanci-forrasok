/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Alapnevek megtartva a meglévő komponensekhez
        'white': '#fdfbf7',       // Meleg pergamenfehér a hideg szürke helyett
        'black': '#1c1917',       // Mély tintafekete (warm stone)
        'black-light': '#292524', // Enyhén világosabb kőszürke
        'gray': '#e7e5e4',        // Meleg papírszürke
        
        // A "husl" nevet megtartottuk, de bizánci liturgikus színekre cseréltük (arany/vörös árnyalatok)
        'husl': {
          'main': '#b45309',      // Bizánci arany / meleg okker
          'dark': '#92400e',      // Sötétebb okker
          'darker': '#78350f',    // Mélybarna kontúr
          'darkest': '#451a03',   // Sötét földbarna
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}