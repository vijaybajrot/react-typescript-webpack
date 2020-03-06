const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

function externals(
    context /*:string*/,
    request /*:string*/,
    callback /*:(?any, ?string) => void*/,
) {
    let file;
    try {
        // $FlowFixMe
        file = require.resolve(request, {
            paths: [context],
        });
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return callback();
        } else {
            throw err;
        }
    }

    if (file.startsWith(path.join(__dirname, '../models'))) {
        callback(null, `commonjs ${path.resolve('../build', file)}`);
    } else if (request.startsWith('.') || file.indexOf('node_modules') === -1) {
        callback();
    } else if (/\.js$/.test(file)) {
        callback(null, 'commonjs ' + request);
    } else {
        callback();
    }
}

const production = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    mode: production ? 'production' : 'development',
    entry: './app/index.tsx',
    devtool: production ? "inline-source-map" : false,
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dist'),
        filename: production ? '[contenthash].js' : '[name].js',
        chunkFilename: production ? '[contenthash].js' : '[id].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.js|tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    require('@babel/preset-env'),
                                    {
                                        corejs: 3,
                                        modules: false,
                                        useBuiltIns: 'usage',
                                        targets: {
                                            esmodules: true,
                                        },
                                    },
                                ],
                                require('@babel/preset-typescript'),
                                [
                                    require('@babel/preset-react'),
                                    {
                                        development: !production,
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    //'postcss-loader',
                    {
                        loader: 'sass-loader',
                    },
                ]
            },

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        compress: true,
        port: 9000
    }
}