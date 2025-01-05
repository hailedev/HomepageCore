import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { Link, Switch, Route } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Container } from 'flux/utils';
import UserStore from 'UserStore';
import UserActionCreators from 'UserActionCreators';
import HomeLandingPage from './home/HomeLandingPage';
import PostPage from './post/PostPage';
import AboutPage from './about/AboutPage';
import ResumePage from './resume/ResumePage';
import FeedbackPage from './feedback/FeedbackPage';
import ProjectsPage from './projects/ProjectsPage';
import EditPage from './admin/EditPage';
import AdminPage from './admin/AdminPage';

class Main extends Component {
    static getStores() {
        return [UserStore];
    }
    static calculateState() {
        return { user: UserStore.getState() };
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        UserActionCreators.setUserInfo();
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            this.setState({ loaded: true });
        });
    }

    signOut() {
        UserActionCreators.signOutUser();
    }

    images() {
        window.location.pathname = 'images';
    }

    render() {
        const adminNav = (
            <div className="admin-nav">
                <span className="user-name-wrapper">
                    <svg>
                        <path d="M25,13c0-6.6166992-5.3828125-12-12-12S1,6.3833008,1,13c0,3.383606,1.413208,6.4386597,3.673645,8.6222534  c0.0529175,0.0689087,0.1156006,0.1247559,0.1889648,0.171814C7.0038452,23.7769165,9.8582764,25,13,25  s5.9961548-1.2230835,8.1373901-3.2059326c0.0733643-0.0470581,0.1360474-0.1029053,0.1889648-0.171814  C23.586792,19.4386597,25,16.383606,25,13z M13,2.5c5.7900391,0,10.5,4.7104492,10.5,10.5  c0,2.4549561-0.8532715,4.7108154-2.2702637,6.5008545c-0.6505127-2.0978394-2.5076294-3.7401123-5.0281372-4.4957886  c1.3735962-0.9940796,2.2720337-2.6046143,2.2720337-4.4244995c0-3.0141602-2.4550781-5.4663086-5.4736328-5.4663086  s-5.4736328,2.4521484-5.4736328,5.4663086c0,1.8198853,0.8984375,3.4304199,2.2720337,4.4244995  c-2.5205078,0.7556763-4.3776245,2.3979492-5.0281372,4.4957886C3.3532715,17.7108154,2.5,15.4549561,2.5,13  C2.5,7.2104492,7.2099609,2.5,13,2.5z M9.0263672,10.5805664c0-2.1870117,1.7822266-3.9663086,3.9736328-3.9663086  s3.9736328,1.7792969,3.9736328,3.9663086S15.1914063,14.546875,13,14.546875S9.0263672,12.7675781,9.0263672,10.5805664z   M6.0307617,20.8319702C6.2562256,18.0820313,9.1723633,16.046875,13,16.046875s6.7437744,2.0351563,6.9692383,4.7850952  C18.1130981,22.4855347,15.6757202,23.5,13,23.5S7.8869019,22.4855347,6.0307617,20.8319702z" fill="#1D1D1B" />
                    </svg>
                    {this.state.user ? <span className="user-name">{this.state.user.profile.name}</span> : null}
                </span>
                <ul>
                    <li><Link to="/admin">Admin</Link></li>
                    <li onClick={this.images} role="presentation">Images</li>
                    <li onClick={this.signOut.bind(this)} role="presentation">Logout</li>
                </ul>
            </div>
        );
        const banner = this.state.user ? <img src="/images/react.svg" alt="react" style={{ width: '90px' }} /> : 'Hai Le';
        const ribbon = (
            <Link to="/">
                <div className="ribbon-container">
                    <div className="ribbon-title-text">{banner}</div>
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
        const meta = {
            title: 'Hai Le'
        }
        return (
            <DocumentMeta {...meta}>
                <div>
                    { this.state.user ? adminNav : null }
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
                            <Route path="/edit/:id" component={EditPage} />
                            <Route path="/edit" component={EditPage} />
                            <Route path="/admin" component={AdminPage} />
                        </Switch>
                    </div>
                    <div className="footer">
                        <a href="https://github.com/hailedev/Homepage" target="_blank" rel="noopener noreferrer">Made with love by Hai Le</a>
                        <div style={{ marginTop: '10px' }}><img style={{ width: '150px' }} src="/images/monster.png" alt="" /></div>
                        <div style={{ opacity: '0.8', color: 'white' }}>Beware the copyright monster!</div>
                    </div>
                </div>
            </DocumentMeta>
        );
    }
}

export default Container.create(Main);
