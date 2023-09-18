/** @type {import('next').NextConfig} */
const nextConfig = {}
// next.config.js
// next.config.js
const withGoogleFonts = require('Nunito');

module.exports = withGoogleFonts()({
  googleFonts: {
    fonts: [
      {
        family: 'Nunito',
        variants: ['400', '500', '700'],
      },
      // Add more fonts as needed
    ],
  },
  // Your other Next.js configuration options
});


module.exports = nextConfig
