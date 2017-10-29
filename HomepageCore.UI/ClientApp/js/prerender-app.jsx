require("whatwg-fetch");
var React = require("react");
var renderToString = require("react-dom/server").renderToString;
var match = require("react-router").match;
var RouterContext = require("react-router").RouterContext;
var Routes = require("./Routes");

module.exports = function(url){
    return new Promise(function(resolve,reject){
        match({routes:Routes, location: url}, function(err, redirect, props){
            resolve(renderToString(<RouterContext {...props}/>));
        });
    });
}