const CopyPlugin = require("copy-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/js/app.js",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          globOptions: {
            ignore: ["**/sw-original.js"],
          },
        },
      ],
    }),

    new InjectManifest({
      swSrc: "./public/sw-original.js",
      swDest: "./service-worker.js",
      exclude: [/^((?!no-track).)*\.(?:jpg|gif|png|webp)$/, /\.(?:mp3)$/],
    }),
  ],
};
