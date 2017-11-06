function ActivateRazorPlugin(options){
    this.options = options;
};
ActivateRazorPlugin.prototype.apply = function(compiler){
    compiler.plugin("compilation", function(compilation) {
        compilation.plugin("html-webpack-plugin-after-html-processing", function(htmlPluginData, callback) {
            console.log("Running activate razor");
            htmlPluginData.html = htmlPluginData.html.replace(/<!-- razor:\s?(.|[\s\S]*?)\s?-->/g, "$1");
            callback(null, htmlPluginData);
        });
    });
};

module.exports = ActivateRazorPlugin;