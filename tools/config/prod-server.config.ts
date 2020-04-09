import * as path from "path";
import * as webpack from "webpack";
import * as nodeExternals from "webpack-node-externals";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";

import { alias, cacheLoader, postCssLoader } from "./common.config";

export default {
  name: "server",
  target: "node",
  mode: "production",
  entry: path.resolve("server/index.tsx"),
  devtool: false,
  output: {
    publicPath: "/dist/",
    path: path.resolve("build"),
    filename: "[name].js",
    chunkFilename: "[name]-[contenthash].js",
    libraryTarget: "commonjs2",
  },
  plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],
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
                    development: false,
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
        oneOf: [
          {
            test: /app.scss/,
            use: "null-loader",
          },
          {
            use: [
              cacheLoader(),
              {
                loader: "css-loader",
                options: {
                  onlyLocals: true,
                  modules: {
                    localIdentName: "[hash:base64:5]",
                  },
                },
              },
              postCssLoader(),
              "sass-loader",
            ],
          },
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
