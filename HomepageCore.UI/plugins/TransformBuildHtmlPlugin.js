function TransformBuildHtmlPlugin(options){
    this.options = options;
};
TransformBuildHtmlPlugin.prototype.apply = function(compiler){
    compiler.plugin("emit", function(compilation, callback) {
        console.log("Running TransformBuildHtmlPlugin");

            // Tags Regular Expressions
        var regexTagStartTemplate = "<!--\\s*build:(\\w+)\\s*(inline)?\\s*(optional)?\\s*(recursive)?\\s*(noprocess)?\\s*([^\\s]*)\\s*(?:\\[(.*)\\])?\\s*-->", // <!-- build:{type} (inline) (optional) (recursive) {name} [attributes...] --> {} required () optional
            regexTagEndTemplate = "<!--\\s*\\/build\\s*-->", // <!-- /build -->
            regexTagStart = "",
            regexTagEnd = "",
            isFileRegex = /\.(\w+){2,4}$/,
            processFileRegex = /\$\(([^\)]*)\)/;

        callback();
    });
};

module.exports = TransformBuildHtmlPlugin;