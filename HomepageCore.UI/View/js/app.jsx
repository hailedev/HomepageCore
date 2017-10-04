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
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var browserHistory = require("react-router").browserHistory;

var Main = require("./pages/Main");
var HomeLandingPage = require("./pages/home/HomeLandingPage");
var PostPage = require("./pages/post/PostPage");
var AboutPage = require("./pages/about/AboutPage");
var ResumePage = require("./pages/resume/ResumePage");
var FeedbackPage = require("./pages/feedback/FeedbackPage");
var ProjectsPage = require("./pages/projects/ProjectsPage");
var AdminPage = require("./pages/admin/AdminPage");

var browser = require("detect-browser");
var onUpdate = function(){
    window.scrollTo(0, 0);
};
var pageContent = (
    <Router history={browserHistory} onUpdate={onUpdate}>
        <Route path="/" component={Main}>
            <IndexRoute component={HomeLandingPage}/>
            <Route path="about" component={AboutPage}/>
            <Route path="hire-me" component={ResumePage}/>
            <Route path="feedback" component={FeedbackPage}/>
            <Route path="projects" component={ProjectsPage}/>
            <Route path="post/:id" component={PostPage}/>
            <Route path="admin" component={AdminPage}/>
            <Route path="admin/:id" component={AdminPage}/>
        </Route>
    </Router>);
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