var React = require("react");
var DocumentTitle = require("react-document-title");
var Link = require("react-router").Link;
var Menu = require("react-burger-menu").slide;

var Main = React.createClass({
    getInitialState: function(){
        return { };
    },
    render: function(){
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
                                <li><a href="https://twitter.com/misfitdeveloper" target="_blank"><img src="/images/twitter.svg"/><span>Twitter</span></a></li>
                                <li><a href="https://www.facebook.com/hai.t.le" target="_blank"><img src="/images/facebook.svg"/><span>Facebook</span></a></li>
                                <li><a href="https://github.com/hailedev/" target="_blank"><img src="/images/github.svg"/><span>Github</span></a></li>
                                <li><a href="http://www.linkedin.com/pub/hai-le/46/50/259" target="_blank"><img src="/images/linkedin.svg"/><span>LinkedIn</span></a></li>
                            </ul>
                        </Menu>
                        <Link to={"/"} id="home-small"><img id="logo" src="/images/logo-small.png"/></Link>
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
                            <Link to={"/"} className="home-link"><img id="logo" src="/images/banner.gif"/></Link>
                            <div className="navigation-section social-links">
                                <ul>
                                    <li className="social-links-title">FIND ME ON: </li>
                                    <li className="social-links-logo"><a href="https://twitter.com/misfitdeveloper" target="_blank"><img className="social-logo" src="/images/twitter.gif"/></a></li>
                                    <li className="social-links-logo"><a href="https://www.facebook.com/hai.t.le" target="_blank"><img className="social-logo" src="/images/facebook.gif"/></a></li>
                                    <li className="social-links-logo"><a href="https://github.com/hailedev/" target="_blank"><img className="social-logo" src="/images/github.gif"/></a></li>
                                    <li className="social-links-logo"><a href="http://www.linkedin.com/pub/hai-le/46/50/259" target="_blank"><img className="social-logo" src="/images/linkedin.gif"/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container content">
                        {this.props.children}
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

/*

 <div ref="slideoutpanel">
 <div className="btn btn-info btn-sm" onClick={this.onOpenMenu}>
 <span className="glyphicon glyphicon-menu-hamburger"/>
 </div>
 </div>
 */