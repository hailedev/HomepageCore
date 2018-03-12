import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, Switch, Route } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import HomeLandingPage from './home/HomeLandingPage';
import PostPage from './post/PostPage';
import AboutPage from './about/AboutPage';
import ResumePage from './resume/ResumePage';
import FeedbackPage from './feedback/FeedbackPage';
import ProjectsPage from './projects/ProjectsPage';
import AdminPage from './admin/AdminPage';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            this.setState({ loaded: true });
        });
    }

    render() {
        const ribbon = (
            <Link to="/">
                <div className="ribbon-container">
                    <div className="ribbon-title-text">Hai Le</div>
                    <div className="ribbon-title-sep">W</div>
                    <div className="ribbon-main">
                        <div className="ribbon-left" />
                        <div className="ribbon-right" />
                    </div>
                    <div className="stitching">
                        <div className="stitching-left" />
                        <div className="stitching-right" />
                    </div>
                </div>
            </Link>);
        return (
            <DocumentTitle title="Hai Le">
                <div>
                    <div className="navigation-container">
                        <Menu className="hamburger">
                            <ul className="side-menu">
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/feedback">Contact</Link></li>
                                <li><Link to="/hire-me">Hire Me</Link></li>
                            </ul>
                            <div style={{ width: '100%', borderTop: '2px solid #0097A7' }} />
                            <ul className="side-social">
                                <li><a href="https://github.com/hailedev/" target="_blank" rel="noopener noreferrer"><img src="/images/github.svg" alt="github" /><span>Github</span></a></li>
                                <li><a href="https://codepen.io/hailedev/" target="_blank" rel="noopener noreferrer"><img src="/images/codepen.svg" alt="codepen" /><span>Codepen</span></a></li>
                                <li><a href="https://twitter.com/misfitdeveloper" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.svg" alt="twitter" /><span>Twitter</span></a></li>
                                <li><a href="http://www.linkedin.com/pub/hai-le/46/50/259" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.svg" alt="linkedin" /><span>LinkedIn</span></a></li>
                            </ul>
                        </Menu>
                        <Link to="/" id="home-small"><span className="logo logo-wrap reverse">E</span><span className="logo">Hai Le</span><span className="logo logo-wrap">E</span></Link>
                        <div className="navigation container">
                            <div className="navigation-section">
                                <ul>
                                    <li style={{ width: '20%' }}><Link to="/about">About</Link></li>
                                    <li style={{ width: '27%' }}><Link to="/projects">Projects</Link></li>
                                    <li style={{ width: '25%' }}><Link to="/feedback">Contact</Link></li>
                                    <li><Link to="/hire-me">Hire Me</Link></li>
                                </ul>
                                <ul className="indicator">
                                    <li style={{ width: '20%' }} className={this.props.location.pathname === 'about' || this.props.location.pathname === '/about' ? 'selected' : null}>
                                        <div style={{ marginLeft: '5px' }} className="arrow-up" />
                                    </li>
                                    <li style={{ width: '27%' }} className={this.props.location.pathname === 'projects' || this.props.location.pathname === '/projects' ? 'selected' : null}>
                                        <div style={{ marginLeft: '18px' }} className="arrow-up" />
                                    </li>
                                    <li style={{ width: '25%' }} className={this.props.location.pathname === 'feedback' || this.props.location.pathname === '/feedback' ? 'selected' : null}>
                                        <div style={{ marginLeft: '18px' }} className="arrow-up" />
                                    </li>
                                    <li className={this.props.location.pathname === 'hire-me' || this.props.location.pathname === '/hire-me' ? 'selected' : null}>
                                        <div style={{ marginLeft: '10px' }} className="arrow-up" />
                                    </li>
                                </ul>
                            </div>
                            {this.state.loaded ? ribbon : <div className="ribbon-placeholder" />}
                            <div className="navigation-section social-links">
                                <ul>
                                    <li className="social-links-title">FIND ME ON: </li>
                                    <li className="social-links-logo"><a href="https://github.com/hailedev/" target="_blank" rel="noopener noreferrer"><img className="social-logo" src="/images/github.gif" alt="github" /></a></li>
                                    <li className="social-links-logo"><a href="https://codepen.io/hailedev/" target="_blank" rel="noopener noreferrer"><img className="social-logo" src="/images/codepen.gif" alt="codepen" /></a></li>
                                    <li className="social-links-logo"><a href="https://twitter.com/misfitdeveloper" target="_blank" rel="noopener noreferrer"><img className="social-logo" src="/images/twitter.gif" alt="twitter" /></a></li>
                                    <li className="social-links-logo"><a href="http://www.linkedin.com/pub/hai-le/46/50/259" target="_blank" rel="noopener noreferrer"><img className="social-logo" src="/images/linkedin.gif" alt="linkedin" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={HomeLandingPage} />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/hire-me" component={ResumePage} />
                            <Route path="/feedback" component={FeedbackPage} />
                            <Route path="/projects" component={ProjectsPage} />
                            <Route path="/post/:id" component={PostPage} />
                            <Route path="/admin/:id" component={AdminPage} />
                            <Route path="/admin" component={AdminPage} />
                        </Switch>
                    </div>
                    <div className="footer">
                        <a href="https://github.com/hailedev/Homepage" target="_blank" rel="noopener noreferrer">Made with love by Hai Le</a>
                        <div style={{ marginTop: '10px' }}><img style={{ width: '150px' }} src="/images/monster.png" alt="" /></div>
                        <div style={{ opacity: '0.8', color: 'white' }}>Beware the copyright monster!</div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}
