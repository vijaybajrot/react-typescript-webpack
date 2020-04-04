import * as path from "path";
import * as nodeExternals from "webpack-node-externals";
import * as webpack from "webpack";

import { alias, cacheLoader, postCssLoader } from "./common.config";

export default {
  name: "server",
  target: "node",
  mode: "development",
  entry: path.resolve("server/index.tsx"),
  devtool: "source-map",
  output: {
    publicPath: "/dist/",
    path: path.resolve("build"),
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    libraryTarget: "commonjs2",
  },
  resolve: { alias, extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.js|tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          cacheLoader(),
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
                      node: "current",
                    },
                  },
                ],
                require("@babel/preset-typescript"),
                [
                  require("@babel/preset-react"),
                  {
                    development: true,
                  },
                ],
              ],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-export-namespace-from",
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          cacheLoader(),
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
              onlyLocals: true,
            },
          },
          postCssLoader(),
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          emitFile: false,
        },
      },
    ],
  },
  externals: ["@loadable/component", nodeExternals()],
  node: {
    __filename: true,
    __dirname: true,
  },
};
