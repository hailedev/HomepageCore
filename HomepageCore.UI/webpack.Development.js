var webpack = require("webpack");
var path = require("path");
var { merge } = require("webpack-merge");
var common = require("./webpack.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var RequireJsPlugin = require("./plugins/RequireJsPlugin");

var outputPath = path.resolve(__dirname, "./wwwroot/");
var resumeOutputPath = outputPath + "/resume/";

var sourcePath = path.resolve(__dirname, "./ClientApp/submodules/InteractiveResume/src/js");
var bootstrapPath = sourcePath + "/module-bootstrap.js";

var HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackDevServerPort = 8083;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        historyApiFallback: true,
        port: webpackDevServerPort
    },
    watchOptions: {
        ignored: '**/node_modules',
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: "./templates/index.html",
            filename: path.join(__dirname, "./wwwroot/index.html"),
            inject: false,
            enableGoogleAnalytics: false,
            prerender: false,
            version: 0
        }),
        new RequireJsPlugin({
            baseUrl: sourcePath,
            mainConfigFile: bootstrapPath,
            include: ["module-bootstrap.js","main.js"],
            optimize: "none",
            out: resumeOutputPath + "js/main.js"
        }),
        new HtmlWebpackPlugin({ 
            template: "./templates/resume-index.html",
            filename: path.join(__dirname, "./wwwroot/resume/index.html"),
            inject: false,
            application: false,
            scriptName: "js/main.js"
        }),
        new RequireJsPlugin({
            baseUrl: sourcePath,
            mainConfigFile: bootstrapPath,
            include: ["module-bootstrap.js","main.js"],
            optimize: "none",
            out: outputPath + "/blizzard/js/main.js"
        }),
        new HtmlWebpackPlugin({ 
            template: "./templates/resume-index.html",
            filename: path.join(__dirname, "./wwwroot/blizzard/index.html"),
            inject: false,
            application: true,
            scriptName: "js/main.js"
        }),
        new webpack.DefinePlugin({
            AUTHORITY: JSON.stringify("http://localhost:5000"),
            REDIRECT_URI: JSON.stringify("http://localhost:5001"),
            PAGE_SIZE: 5
        })
    ]
});