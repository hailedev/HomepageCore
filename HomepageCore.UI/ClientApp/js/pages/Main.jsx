var React = require("react");
var DocumentTitle = require("react-document-title");
var Link = require("react-router-dom").Link;
var Menu = require("react-burger-menu").slide;
var Switch = require("react-router-dom").Switch;
var Route = require("react-router-dom").Route;

var HomeLandingPage = require("./home/HomeLandingPage");
var PostPage = require("./post/PostPage");
var AboutPage = require("./about/AboutPage");
var ResumePage = require("./resume/ResumePage");
var FeedbackPage = require("./feedback/FeedbackPage");
var ProjectsPage = require("./projects/ProjectsPage");
var AdminPage = require("./admin/AdminPage");
var createReactClass = require("create-react-class");

var Main = createReactClass({
    componentDidMount: function(){
        window.addEventListener('load', function(){
            this.setState({loaded: true});
        }.bind(this));
    },
    getInitialState: function(){
        return { };
    },
    render: function(){
        var ribbon = (
            <Link to={"/"}>
                <div className="ribbon-container">
                    <div className="ribbon-title-text">Hai Le</div>
                    <div className="ribbon-title-sep">W</div>
                    <div className="ribbon-main">
                        <div className="ribbon-left"></div>
                        <div className="ribbon-right"></div>
                    </div>
                    <div className="stitching">
                        <div className="stitching-left"></div>
                        <div className="stitching-right"></div>
                    </div>
                </div>
            </Link>);
        return (
            <DocumentTitle title={"Hai Le"}>
                <div>
                    <div className="navigation-container">
                        <Menu className="hamburger">
                            <ul className="side-menu">
                                <li><Link to={"/about"}>About</Link></li>
                                <li><Link to={"/projects"}>Projects</Link></li>
                                <li><Link to={"/feedback"}>Contact</Link></li>
                                <li><Link to={"/hire-me"}>Hire Me</Link></li>
                            </ul>
                            <div style={{width:"100%",borderTop:"2px solid #0097A7"}}></div>
                            <ul className="side-social">
                                <li><a href="https://github.com/hailedev/" target="_blank"><img src="/images/github.svg"/><span>Github</span></a></li>
                                <li><a href="https://codepen.io/hailedev/" target="_blank"><img src="/images/codepen.svg"/><span>Codepen</span></a></li>
                                <li><a href="https://twitter.com/misfitdeveloper" target="_blank"><img src="/images/twitter.svg"/><span>Twitter</span></a></li>
                                <li><a href="http://www.linkedin.com/pub/hai-le/46/50/259" target="_blank"><img src="/images/linkedin.svg"/><span>LinkedIn</span></a></li>
                            </ul>
                        </Menu>
                        <Link to={"/"} id="home-small"><span className="logo logo-wrap reverse">E</span><span className="logo">Hai Le</span><span className="logo logo-wrap">E</span></Link>
                        <div className="navigation container">
                            <div className="navigation-section">
                                <ul>
                                    <li style={{width:"20%"}}><Link to={"/about"}>About</Link></li>
                                    <li style={{width:"27%"}}><Link to={"/projects"}>Projects</Link></li>
                                    <li style={{width:"25%"}}><Link to={"/feedback"}>Contact</Link></li>
                                    <li><Link to={"/hire-me"}>Hire Me</Link></li>
                                </ul>
                                <ul className="indicator">
                                    <li style={{width:"20%"}} className={this.props.location.pathname === "about" || this.props.location.pathname === "/about"?"selected":null}>
                                        <div style={{marginLeft:"5px"}} className="arrow-up"></div>
                                    </li>
                                    <li style={{width:"27%"}} className={this.props.location.pathname === "projects" || this.props.location.pathname === "/projects"?"selected":null}>
                                        <div style={{marginLeft:"18px"}} className="arrow-up"></div>
                                    </li>
                                    <li style={{width:"25%"}} className={this.props.location.pathname === "feedback" || this.props.location.pathname === "/feedback"?"selected":null}>
                                        <div style={{marginLeft:"18px"}} className="arrow-up"></div>
                                    </li>
                                    <li className={this.props.location.pathname === "hire-me" || this.props.location.pathname === "/hire-me"?"selected":null}>
                                        <div style={{marginLeft:"10px"}} className="arrow-up"></div>
                                    </li>
                                </ul>
                            </div>
                            {this.state.loaded ? ribbon : <div className="ribbon-placeholder"></div>}
                            <div className="navigation-section social-links">
                                <ul>
                                    <li className="social-links-title">FIND ME ON: </li>
                                    <li className="social-links-logo"><a href="https://github.com/hailedev/" target="_blank"><img className="social-logo" src="/images/github.gif"/></a></li>
                                    <li className="social-links-logo"><a href="https://codepen.io/hailedev/" target="_blank"><img className="social-logo" src="/images/codepen.gif"/></a></li>
                                    <li className="social-links-logo"><a href="https://twitter.com/misfitdeveloper" target="_blank"><img className="social-logo" src="/images/twitter.gif"/></a></li>
                                    <li className="social-links-logo"><a href="http://www.linkedin.com/pub/hai-le/46/50/259" target="_blank"><img className="social-logo" src="/images/linkedin.gif"/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container content">
                        <Switch>
                            <Route exact path="/" component={HomeLandingPage}/>
                            <Route path="/about" component={AboutPage}/>
                            <Route path="/hire-me" component={ResumePage}/>
                            <Route path="/feedback" component={FeedbackPage}/>
                            <Route path="/projects" component={ProjectsPage}/>
                            <Route path="/post/:id" component={PostPage}/>
                            <Route path="/admin" component={AdminPage}/>
                            <Route path="/admin/:id" component={AdminPage}/>
                        </Switch>
                    </div>
                    <div className="footer">
                        <a href="https://github.com/hailedev/Homepage" target="_blank">Made with love by Hai Le</a>
                        <div style={{marginTop:"10px"}}><img style={{width:"150px"}} src="/images/monster.png"/></div>
                        <div style={{opacity:"0.8",color:"white"}}>Beware the copyright monster!</div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = Main;