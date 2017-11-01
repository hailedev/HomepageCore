/**
 * Created by Hai on 11/02/2017.
 */
module.exports = function (grunt) {
    var target = grunt.option("target") || "debug";
    target = target.toLowerCase();
    var minify = grunt.option("minify") || (target === "release");

    var paths = [
        "./js/constants",
        "./js/dispatchers",
        "./js/stores",
        "./js/actions",
        "./js/api",
        "./js/common"
    ];
    
    grunt.initConfig({
        env: {
            dist: {
                NODE_ENV : target === "debug" ? "development" : "production"
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {presets: ["react"]}]
                    ],
                    alias: [
                        target === "debug" ? "../appsettings.Development.json:env" : "../appsettings.Production.json:env"
                    ],
                    browserifyOptions:{
                        paths:paths,
                        debug:false,
                        extensions: [".jsx"]
                    }
                },
                files: {
                    "../wwwroot/js/app.js": ["./js/app.jsx"]
                }
            },
            prerender: {
                options: {
                    transform: [
                        ["babelify", {presets: ["react"]}],
                        ["aliasify", {aliases: {"env":target === "debug" ? "../appsettings.Development.json" : "../appsettings.Production.json"}}]
                    ],
                    browserifyOptions:{
                        paths:paths,
                        debug:false,
                        extensions: [".jsx"],
                        standalone: "prerenderService"
                    }
                },
                files: {
                    "../wwwroot/js/prerender-app.js": ["./js/prerender-app.jsx"]
                }
            }
        },
        less: {
            dist: {
                files: {
                    "../wwwroot/css/styles.css": ["./css/*.less"]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    "../wwwroot/css/styles.min.css": ["../wwwroot/css/*.css"]
                }
            }
        },
        uglify: {
            options:{
                compress:{
                    dead_code: true,  // discard unreachable code
                    drop_debugger : true,  // discard “debugger” statements
                    global_defs : {      // global definitions
                        "DEBUG": false
                    }
                }
            },
            dist: {
                files: {
                    "../wwwroot/js/app.min.js": ["../wwwroot/js/app.js"],
                    "../wwwroot/js/prerender-app.min.js": ["../wwwroot/js/prerender-app.js"]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, src: ["./images/**"], dest: "../wwwroot/", flatten: false, filter: "isFile"},
                    {expand: true, src: ["./**/*.css"], cwd: "./css", dest: "../wwwroot/css/", flatten: false},
                    {expand: true, src: ["./fonts/**"], dest: "../wwwroot/fonts/", flatten: true, filter: "isFile"},
                    {expand: true, cwd: "js", src: ["prerender-bootstrapper.js"], dest: "../wwwroot/js/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["assets/**"], dest: "../wwwroot/resume/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["styles/**/*"], dest: "../wwwroot/resume/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["js/lib/jquery-1.11.2.min.js"], dest:"../wwwroot/resume/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["js/lib/require.js"], dest:"../wwwroot/resume/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["assets/**"], dest: "../wwwroot/blizzard/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["styles/**/*"], dest: "../wwwroot/blizzard/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["js/lib/jquery-1.11.2.min.js"], dest:"../wwwroot/blizzard/"},
                    {expand: true, cwd: "./submodules/InteractiveResume/src/", src: ["js/lib/require.js"], dest:"../wwwroot/blizzard/"}
                ]
            }
        },
        clean: {
            options: {
                force: true
            },
            build: ["../wwwroot", "../Views/Home/Index.cshtml"],
            minify: ["../wwwroot/js/app.js", "../wwwroot/js/prerender-app.js", "../wwwroot/css/styles.css"],
            template: ["../Views/Home/index.html"]
        },
        htmlbuild:{
            release:{
                src: "templates/index.html",
                dest: "../Views/Home/",
                options: {
                    beautify:true,
                    scripts: {
                        bundle: ["../wwwroot/js/app.min.js"],
                        prerender: ["../wwwroot/js/prerender-app.min.js"]
                    },
                    styles: {
                        bundle: ["../wwwroot/css/styles.min.css","../wwwroot/css/RichEditor.css"]
                    }
                }
            },
            debug:{
                src: "templates/index.html",
                dest: "../Views/Home/",
                options: {
                    beautify:true,
                    scripts: {
                        bundle: ["../wwwroot/js/app.js"],
                        prerender: ["../wwwroot/js/prerender-app.js"]
                    },
                    styles: {
                        bundle: ["../wwwroot/css/styles.css","../wwwroot/css/RichEditor.css"]
                    }
                }
            },
            submodule:{
                src: "./submodules/InteractiveResume/src/index.html",
                dest: "../wwwroot/resume/",
                options: {
                    beautify:true,
                    scripts: {
                        bundle: [target === "debug" ? "../wwwroot/resume/js/main.js" : "../wwwroot/resume/js/main.min.js"]
                    },
                    data: {
                        application: false
                    }
                }
            }
        },
        process:{
            "convert-to-razor":{
                options: {
                    process: function(src, dest, content, fileObject){
                        return content.replace(/<!-- razor:\s?(.|[\s\S]*?)\s?-->/g, "$1");
                    }
                },
                files:[
                    {
                        src: "../Views/Home/index.html",
                        dest: "../Views/Home/Index.cshtml"
                    }
                ]
            }
        },
        "string-replace":{
            dist:{
                files: {
                    "../Views/Home/index.html":"../Views/Home/index.html"
                },
                options:{
                    replacements: [
                        {
                            pattern: /\.\.\/\.\.\/wwwroot\/js\/(.*).js/g,
                            replacement: "js/$1.js"
                        },
                        {
                            pattern: /\.\.\/\.\.\/wwwroot\/css\/(.*).css/g,
                            replacement: "css/$1.css"
                        }
                    ]
                }
            }
        },
        requirejs:{
            compile:{
                options:{
                    baseUrl:"./submodules/InteractiveResume/src/js",
                    mainConfigFile:"./submodules/InteractiveResume/src/js/module-bootstrap.js",
                    include: ["module-bootstrap.js","main.js"],
                    optimize: target === "debug" ?"none" : "uglify2",
                    out: target === "debug" ?"../wwwroot/resume/js/main.js" : "../wwwroot/resume/js/main.min.js"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-html-build");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-rename");
    grunt.loadNpmTasks("grunt-process");
    grunt.file.setBase("./ClientApp");
    
    var tasks = ["env", "clean:build", "browserify", "less", "requirejs", "copy"];
    if(minify || target === "release"){
        tasks.push("uglify");
        tasks.push("cssmin");
        tasks.push("clean:minify");
    }
    tasks.push("htmlbuild:".concat(target));
    tasks.push("htmlbuild:submodule");
    tasks.push("string-replace");
    tasks.push("process");
    tasks.push("clean:template");
    grunt.registerTask("build", tasks);
};