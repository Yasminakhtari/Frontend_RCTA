const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new GenerateSW({
      swSrc: './public/service-worker.js',
      swDest: 'service-worker.js',
    }),
  ],
};
