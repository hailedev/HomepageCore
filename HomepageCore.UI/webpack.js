var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

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
        new CleanWebpackPlugin([outputPath + "/**/*", path.join(__dirname, "././Views/Home/*")]),
        new ExtractTextPlugin("css/styles.css"),
        new CopyWebpackPlugin([
            { from: "./js/prerender-bootstrapper.js", to: jsOutputPath },
            { from: "./*.css", to: cssOutputPath, context: "./css" },
            { from: "./*.*", to: imagesOutputPath, context: "./images" },
            { from: "./**", to: fontsOutputPath, context: "./fonts" },
        ]),
        new CopyWebpackPlugin([
            { from: "./assets/**", to: resumeOutputPath, context: "./submodules/InteractiveResume/src" },
            { from: "./styles/**/*", to: resumeOutputPath, context: "./submodules/InteractiveResume/src" },
            { from: "./js/lib/jquery-1.11.2.min.js", to: resumeOutputPath + "js/lib", context: "./submodules/InteractiveResume/src" },
            { from: "./js/lib/require.js", to: resumeOutputPath + "js/lib", context: "./submodules/InteractiveResume/src" }
        ]),
        new CopyWebpackPlugin([
            { from: "./assets/**", to: outputPath + "/blizzard/", context: "./submodules/InteractiveResume/src" },
            { from: "./styles/**/*", to: outputPath + "/blizzard/", context: "./submodules/InteractiveResume/src" },
            { from: "./js/lib/jquery-1.11.2.min.js", to: outputPath + "/blizzard/js/lib/", context: "./submodules/InteractiveResume/src" },
            { from: "./js/lib/require.js", to: outputPath + "/blizzard/js/lib/", context: "./submodules/InteractiveResume/src" }
        ]),
        new HtmlWebpackPlugin({ 
            template: "./templates/index.html",
            filename: path.join(__dirname, "./Views/Home/Index.cshtml"),
            inject: false,
            enableGoogleAnalytics: false
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
            "./js/common"
        ],
        extensions: [".js", ".jsx"],
        alias: {
            "env": path.resolve(__dirname, "./appsettings.Development.json")
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react"]
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("css-loader!less-loader")
            }
        ]
    }
};