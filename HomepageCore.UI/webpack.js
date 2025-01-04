var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var ESLintPlugin = require('eslint-webpack-plugin');
var NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
var webpack = require('webpack')

var outputPath = path.resolve(__dirname, "./wwwroot/");
var jsOutputPath = outputPath + "/js/";
var cssOutputPath = outputPath + "/css/";
var imagesOutputPath = outputPath + "/images/";
var fontsOutputPath = outputPath + "/fonts/";
var resumeOutputPath = outputPath + "/resume/";

module.exports = {
    context: path.join(__dirname, "./ClientApp"),
    entry: {
        "app": ["./js/app", "./css/styles.less"],
        "prerender-app": ["./js/prerender-app"]
    },
    output: {
        path: outputPath,
        publicPath: "/",
        filename: "js/[name].js",
        library: "[name]",
		libraryTarget: "umd"
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new NodePolyfillPlugin(),
        new ESLintPlugin(),
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [outputPath + "/**/*", path.join(__dirname, "././Views/Home/*")] }),
        new MiniCssExtractPlugin({ filename: "css/styles.css" }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./js/prerender-bootstrapper.js", to: jsOutputPath },
                { from: "./*.css", to: cssOutputPath, context: "./css" },
                { from: "./*.*", to: imagesOutputPath, context: "./images" },
                { from: "./**", to: fontsOutputPath, context: "./fonts" }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./assets/**", to: resumeOutputPath, context: "./submodules/InteractiveResume/src" },
                { from: "./styles/**/*", to: resumeOutputPath, context: "./submodules/InteractiveResume/src" },
                { from: "./js/lib/jquery-1.11.2.min.js", to: resumeOutputPath + "js/lib", context: "./submodules/InteractiveResume/src" },
                { from: "./js/lib/require.js", to: resumeOutputPath + "js/lib", context: "./submodules/InteractiveResume/src" }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./assets/**", to: outputPath + "/blizzard/", context: "./submodules/InteractiveResume/src" },
                { from: "./styles/**/*", to: outputPath + "/blizzard/", context: "./submodules/InteractiveResume/src" },
                { from: "./js/lib/jquery-1.11.2.min.js", to: outputPath + "/blizzard/js/lib/", context: "./submodules/InteractiveResume/src" },
                { from: "./js/lib/require.js", to: outputPath + "/blizzard/js/lib/", context: "./submodules/InteractiveResume/src" }
            ]
        })
    ],
    resolve: {
        modules: [
            "node_modules",
            "./js/constants",
            "./js/dispatchers",
            "./js/stores",
            "./js/actions",
            "./js/api",
            "./js/common",
            "./js/services"
        ],
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    { 
                        loader: "babel-loader", 
                        options: { 
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ] 
                        } 
                    },
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 30000,
                            name: "[name]-[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(otf|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name].[ext]',
                }
            }
        ]
    }
};