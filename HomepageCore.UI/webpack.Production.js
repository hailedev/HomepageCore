var path = require("path");
var merge = require("webpack-merge");
var common = require("./webpack.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var RequireJsPlugin = require("./plugins/RequireJsPlugin");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");

var outputPath = path.resolve(__dirname, "./wwwroot/");
var resumeOutputPath = outputPath + "/resume/";

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        filename: "js/[name].min.js"
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new RequireJsPlugin({
            baseUrl:"./ClientApp/submodules/InteractiveResume/src/js",
            mainConfigFile:"./ClientApp/submodules/InteractiveResume/src/js/module-bootstrap.js",
            include: ["module-bootstrap.js","main.js"],
            optimize: "uglify2",
            out: resumeOutputPath + "js/main.min.js"
        }),
        new HtmlWebpackPlugin({ 
            template: "./templates/resume-index.html",
            filename: path.join(__dirname, "./wwwroot/resume/index.html"),
            inject: false,
            application: false,
            scriptName: "js/main.min.js"
        }),
        new RequireJsPlugin({
            baseUrl:"./ClientApp/submodules/InteractiveResume/src/js",
            mainConfigFile:"./ClientApp/submodules/InteractiveResume/src/js/module-bootstrap.js",
            include: ["module-bootstrap.js","main.js"],
            optimize: "uglify2",
            out: outputPath + "/blizzard/js/main.min.js"
        }),
        new HtmlWebpackPlugin({ 
            template: "./templates/resume-index.html",
            filename: path.join(__dirname, "./wwwroot/blizzard/index.html"),
            inject: false,
            application: true,
            scriptName: "js/main.min.js"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
});