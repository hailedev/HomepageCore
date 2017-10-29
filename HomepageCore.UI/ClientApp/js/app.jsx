/**
 * Created by Hai on 11/02/2017.
 */
window.onerror = function (message, url, lineNo, colNo, error) {
    console.log(arguments);
    var container = document.createElement('div');

    container.style.color = 'red';
    container.style.position = 'fixed';
    container.style.background = '#eee';
    container.style.padding = '2em';
    container.style.top = '1em';
    container.style.left = '1em';

    var msg = document.createElement('pre');
    msg.innerText = [
        'Message: ' + message,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + colNo,
        'Stack: ' + (error && error.stack)
    ].join('\n');
    container.appendChild(msg);
    document.body.appendChild(container);
};
require("whatwg-fetch");
var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var browserHistory = require("react-router").browserHistory;

var browser = require("detect-browser");
var Routes = require("./Routes");

var onUpdate = function(){
    window.scrollTo(0, 0);
};
var pageContent = <Router routes={Routes} history={browserHistory} onUpdate={onUpdate}/>;
if(browser && browser.name === "ie" && !browser.version.startsWith("11")){
    pageContent = (
        <div className="container">
            <div className="row" style={{paddingTop:"100px",fontSize:"22px"}}>
                <div className="col-md-12">
                    <span style={{color:"red",fontSize:"40px"}}>:(</span><br/><p>This page requires a minimum of Internet Explorer 11</p>
                </div>
            </div>
        </div>
    );
}
ReactDOM.render(pageContent, document.getElementById("root"));