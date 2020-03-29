import * as path from "path";
import * as webpack from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as LoadablePlugin from "@loadable/webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import { alias } from "./common.config";

export default {
  name: "client",
  mode: "production",
  devtool: false,
  entry: path.resolve("app/index.tsx"),
  output: {
    publicPath: "/",
    path: path.resolve("dist"),
    filename: "[name]-[contenthash].js",
    chunkFilename: "[name]-[contenthash].js"
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    //new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: { alias, extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.js|tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  require("@babel/preset-env"),
                  {
                    corejs: 3,
                    modules: false,
                    useBuiltIns: "usage",
                    targets: {
                      esmodules: true
                    }
                  }
                ],
                require("@babel/preset-typescript"),
                [
                  require("@babel/preset-react"),
                  {
                    development: false
                  }
                ]
              ]
              //plugins: ["@loadable/babel-plugin"]
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //'postcss-loader',
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};
