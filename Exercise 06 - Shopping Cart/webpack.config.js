const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devServer: {
    static: "./dist",
    hot: true,
    port: 8080,
    open: true, // 自动打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/, // 匹配字体文件
        type: "asset/resource", // 使用内置的 asset/resource 处理
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, // 匹配图片文件
        type: "asset/resource", // 使用内置的 asset/resource 处理
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
