import * as path from "path";
import * as webpack from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as nodeExternals from "webpack-node-externals";
import * as LoadablePlugin from "@loadable/webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";

import { alias } from "./common.config";

export default {
  name: "server",
  target: "node",
  mode: "production",
  entry: path.resolve("server/index.tsx"),
  devtool: false,
  output: {
    publicPath: "/",
    path: path.resolve("build"),
    filename: "[name]-server.js",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    //new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "index.html")
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
    //new BundleAnalyzerPlugin()
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
                      node: "current"
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
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          emitFile: false
        }
      }
    ]
  },
  externals: ["@loadable/component", nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
