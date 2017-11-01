var prerendering = require('aspnet-prerendering');
var prerenderService = require("./prerender-app");

module.exports = prerendering.createServerRenderer(function(params) {
    return new Promise(function (resolve, reject) {
        prerenderService.renderToString(params.absoluteUrl).then(function(htmlOutput){
            resolve({ html: htmlOutput });
        });
    });
});