/**
 * Created by Hai on 11/02/2017.
 */
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

var renderToString = require("react-dom/server").renderToString;

/*var pageContent = (
    <Router history={browserHistory}>
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
}*/

var pageContent = (
    <div className="container">
        <div className="row" style={{paddingTop:"100px",fontSize:"22px"}}>
            <div className="col-md-12">
                <span style={{color:"red",fontSize:"40px"}}>:(</span><br/><p>This page requires a minimum of Internet Explorer 11</p>
            </div>
        </div>
    </div>
);

module.exports = renderToString(pageContent);