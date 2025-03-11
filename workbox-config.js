module.exports = {
    globDirectory: "build/",
    globPatterns: ["**/*.{html,js,css,png,jpg,svg,ico,woff2}"],
    swDest: "build/service-worker.js",
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 ,
    mode:'production'
  };
  