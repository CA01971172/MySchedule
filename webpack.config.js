// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

// PWAの設定
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const outputPath = path.resolve(__dirname, "dist");
const WebpackPwaManifest = require('webpack-pwa-manifest');

const isProduction = process.env.NODE_ENV == "production";

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.tsx'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist"),
    publicPath: '',
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8090,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      title: 'MySchedule',
      favicon: './favicon.svg',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    //new FixStyleOnlyEntriesPlugin(),

    // PWAの設定
    new WebpackPwaManifest({
      short_name: "MySchedule",
      name: "MySchedule",
      display: "standalone",
      start_url: "index.html",
      background_color: "#0d6efd",
      theme_color: "#0d6efd",
      icons: [{
        src: path.resolve("dist/MySchedule.png"),
        sizes: [96, 128, 192, 256, 384, 512],
      }]
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: outputPath + "/service-worker.js",
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MBまでキャッシュする
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          // inject CSS to page
          'style-loader',
          // convert CSS to JS module
          'css-loader',
          // compile SCSS to CSS
          'sass-loader'
        ]
      },
      {
        test: /bootstrap\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
};