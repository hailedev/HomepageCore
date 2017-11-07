var requirejs = require("requirejs");
var path = require("path");
var fs = require("fs");

function RequireJsPlugin(options){
    this.options = options;
};
RequireJsPlugin.prototype.apply = function(compiler){
    var LOG_LEVEL_TRACE = 0, LOG_LEVEL_WARN = 2;
    var options = this.options;
    options.logLevel = LOG_LEVEL_WARN;
    options.error = false;

    compiler.plugin("emit", function(compilation, callback) {
        console.log("Running requirejs");
        requirejs.optimize(options,
            function(files){
                fs.readFile(options.out, function(err, data){
                    compilation.assets[path.relative(compiler.options.output.path, options.out)] = { source: function() { return new Buffer(data); }, size: function() { return Buffer.byteLength(data); } };
                    callback();
                });
                /*fs.stat(options.out, function(err, stat){
                    compilation.assets[path.relative(compiler.options.output.path, options.out)] = { source: function() { return options.baseUrl; }, size: function() { return stat.size; } };
                    callback();
                });*/
            },
            function(err){
                compilation.errors.push("RequireJS: " + err);
                callback();
            }
        );
    });
};

module.exports = RequireJsPlugin;