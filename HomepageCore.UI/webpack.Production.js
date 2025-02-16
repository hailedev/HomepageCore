var path = require("path");
var { merge } = require("webpack-merge");
var common = require("./webpack.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var RequireJsPlugin = require("./plugins/RequireJsPlugin");
var webpack = require("webpack");
var TerserPlugin = require("terser-webpack-plugin");

var outputPath = path.resolve(__dirname, "./wwwroot/");
var resumeOutputPath = outputPath + "/resume/";

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: "source-map",
    output: {
        filename: "js/[name].min.js"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: "./templates/index.html",
            filename: path.join(__dirname, "./wwwroot/index.html"),
            inject: false,
            enableGoogleAnalytics: true,
            prerender: false,
            version: process.env.version
        }),
        new RequireJsPlugin({
            baseUrl:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js",
            mainConfigFile:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js/module-bootstrap.js",
            include: ["module-bootstrap.js","main.js"],
            optimize: "uglify2",
            out: resumeOutputPath + "js/main." + process.env.version + ".min.js"
        }),
        new HtmlWebpackPlugin({ 
            template: "./templates/resume-index.html",
            filename: path.join(__dirname, "./wwwroot/resume/index.html"),
            inject: false,
            application: false,
            scriptName: "js/main." + process.env.version + ".min.js"
        }),
        new RequireJsPlugin({
            baseUrl:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js",
            mainConfigFile:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js/module-bootstrap.js",
            include: ["module-bootstrap.js","main.js"],
            optimize: "uglify2",
            out: outputPath + "/blizzard/js/main." + process.env.version + ".min.js"
        }),
        new HtmlWebpackPlugin({ 
            template: "./templates/resume-index.html",
            filename: path.join(__dirname, "./wwwroot/blizzard/index.html"),
            inject: false,
            application: true,
            scriptName: "js/main." + process.env.version + ".min.js"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            },
            AUTHORITY: JSON.stringify("https://identity.hai.codes"),
            REDIRECT_URI: JSON.stringify("https://hai.codes"),
            PAGE_SIZE: 5
        })
    ]
});