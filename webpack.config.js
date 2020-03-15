const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

const production = process.env.NODE_ENV === "production" ? true : false;

const alias = {
  "@app": path.resolve(__dirname, "./app")
};

module.exports = {
  mode: production ? "production" : "development",
  entry: "./app/index.tsx",
  devtool: production ? false : "inline-source-map",
  output: {
    publicPath: "/",
    path: path.join(__dirname, "/dist"),
    filename: production ? "[name]-[contenthash].js" : "[name].js",
    chunkFilename: production ? "[name]-[contenthash].js" : "[id].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    }),
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
                      esmodules: true
                    }
                  }
                ],
                require("@babel/preset-typescript"),
                [
                  require("@babel/preset-react"),
                  {
                    development: !production
                  }
                ]
              ]
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
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    compress: true,
    port: 9000
  }
};
