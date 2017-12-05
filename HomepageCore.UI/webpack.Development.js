var path = require("path");
var merge = require("webpack-merge");
var common = require("./webpack.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var RequireJsPlugin = require("./plugins/RequireJsPlugin");

var outputPath = path.resolve(__dirname, "./wwwroot/");
var resumeOutputPath = outputPath + "/resume/";

module.exports = merge(common, {
    plugins: [
        new RequireJsPlugin({
            baseUrl:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js",
            mainConfigFile:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js/module-bootstrap.js",
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
            baseUrl:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js",
            mainConfigFile:"./HomepageCore.UI/ClientApp/submodules/InteractiveResume/src/js/module-bootstrap.js",
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
        })
    ]
});