var prerendering = require('aspnet-prerendering');

module.exports = prerendering.createServerRenderer(function(params) {
    return new Promise(function (resolve, reject) {
        resolve({ html: require("./prerender-app") });
    });
});