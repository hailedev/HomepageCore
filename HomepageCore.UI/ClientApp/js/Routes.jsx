var React = require("react");
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;

var Main = require("./pages/Main");
var HomeLandingPage = require("./pages/home/HomeLandingPage");
var PostPage = require("./pages/post/PostPage");
var AboutPage = require("./pages/about/AboutPage");
var ResumePage = require("./pages/resume/ResumePage");
var FeedbackPage = require("./pages/feedback/FeedbackPage");
var ProjectsPage = require("./pages/projects/ProjectsPage");
var AdminPage = require("./pages/admin/AdminPage");

module.exports = (
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
);