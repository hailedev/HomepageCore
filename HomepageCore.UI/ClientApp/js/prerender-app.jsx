require("whatwg-fetch");
var React = require("react");
var renderToString = require("react-dom/server").renderToString;
var StaticRouter = require("react-router-dom").StaticRouter;
var ReactDOM = require("react-dom");
var Route = require("react-router-dom").Route;
var Main = require("./pages/Main");

module.exports = {
    // Prerenders the page html
    renderToString: function(url){
        var context = {};
        return new Promise(function(resolve,reject){
            var htmlContent = renderToString(<StaticRouter location={url} context={context}><Route path="/" component={Main}/></StaticRouter>);
            /*if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                // redirect(301, context.url)
            } else {
                // we're good, send the response
            }*/

            resolve(htmlContent);
        });
    },
    // Rehydrates the page
    renderToNode: function(url){
        console.log("Hydrating content for " + url);
        var context = {};
        ReactDOM.hydrate(<StaticRouter location={url} context={context}><Route path="/" component={Main}/></StaticRouter>, document.getElementById("root"));
    }
}