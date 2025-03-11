module.exports = {
    globDirectory: "build/",
    globPatterns: ["**/*.{html,js,css,png,jpg,svg,ico}"],
    swSrc: 'public/service-worker.js',
    swDest: "build/service-worker.js",
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 10MB
  };
  