import * as path from "path";
import * as webpack from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";

import { alias, cacheLoader, postCssLoader } from "./common.config";

export function createConfig(browser: boolean) {
  return {
    name: "client",
    mode: "production",
    entry: path.resolve("app/index.tsx"),
    devtool: false,
    output: {
      publicPath: "/dist/",
      path: path.resolve("dist"),
      filename: "[name]-[contenthash].js",
      chunkFilename: "[name]-[contenthash].js",
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: "[contenthash].css",
        chunkFilename: "[contenthash].css",
      }),
      new OptimizeCSSAssetsPlugin(),
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
                    browser
                      ? {
                          corejs: 3,
                          modules: false,
                          useBuiltIns: "usage",
                          targets: {
                            esmodules: true,
                          },
                        }
                      : {
                          corejs: 3,
                          modules: false,
                          useBuiltIns: "usage",
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
              use: [
                MiniCssExtractPlugin.loader,
                cacheLoader(),
                "css-loader",
                postCssLoader(),
                "sass-loader",
              ],
            },
            {
              use: [
                MiniCssExtractPlugin.loader,
                cacheLoader(),
                {
                  loader: "css-loader",
                  options: {
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
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  };
}

export default [createConfig(true), createConfig(false)];
