var requirejs = require("requirejs");

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
                //compilation.assets[options.out] = { source: function() { return "test bla blah"; }, size: function() { return 1; } };
                callback();
            },
            function(err){
                compilation.errors.push("RequireJS: " + err);
                callback();
            }
        );
    });
};

module.exports = RequireJsPlugin;