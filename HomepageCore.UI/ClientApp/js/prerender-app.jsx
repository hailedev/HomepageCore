require("whatwg-fetch");
var React = require("react");
var renderToString = require("react-dom/server").renderToString;
var match = require("react-router").match;
var RouterContext = require("react-router").RouterContext;
var Routes = require("./Routes");
var ReactDOM = require("react-dom");

module.exports = {
    // Prerenders the page html
    renderToString: function(url){
        return new Promise(function(resolve,reject){
            match({routes:Routes, location: url}, function(err, redirect, props){
                resolve(renderToString(<RouterContext {...props}/>));
            });
        });
    },
    // Rehydrates the page
    renderToNode: function(url){
        match({routes:Routes, location: url}, function(err, redirect, props){
            console.log("Hydrating content for" + url);
            ReactDOM.render(<RouterContext {...props}/>, document.getElementById("root"));
        });
    }
}