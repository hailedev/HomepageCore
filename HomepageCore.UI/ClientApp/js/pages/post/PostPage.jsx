import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { getPost } from 'PostActionCreators';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import VisibilitySensor from 'react-visibility-sensor';
import { SocialIcon } from 'react-social-icons';
import Progress from 'react-progress';
import { connect } from 'react-redux';
import DisqusThreadContainer from './DisqusThreadContainer';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = { titleVisible: true, percent: 0 };
    }
    UNSAFE_componentWillMount() {
        if (!this.props.post) {
            this.props.getPost(this.props.router.params.id).then(() => {
                this.setState({ percent: 100 });
                clearInterval(this.interval);
            });
            this.interval = setInterval(() => {
                if (this.state.percent <= 70) {
                    const percent = parseInt(Math.random() * 30, 10) + this.state.percent;
                    this.setState({ percent });
                }
            }, 700);
        }
    }
    componentDidMount() {
        if (this.props.post) {
            this.setState({ percent: 100 }); // eslint-disable-line
        }
    }
    onTitleVisible(isVisible) {
        this.setState({ titleVisible: isVisible });
    }
    scrollIntoView() {
        if (this.props.post && this.props.location.hash === '#disqus_thread') {
            const thread = document.getElementsByClassName('thread')[0];
            thread.scrollIntoView();
        }
    }
    render() {
        let title = 'Hai Le';
        let emailUrl = 'mailto:?';
        let image, description;
        if (this.props.post) {
            title = title.concat(' | ').concat(this.props.post.title);
            emailUrl = emailUrl.concat('subject=').concat(encodeURI(this.props.post.title)).concat('&body=').concat(encodeURI(window.location.href))
                .concat(encodeURI('?CMP=share_btn_link'));
            if (this.props.post.metaImage) {
                image = this.props.post.metaImage;
            }
            if (this.props.post.metaDescription) {
                description = this.props.post.metaDescription;
            }
        }

        const meta = [
            <meta property="og:title" content={title} />
        ];
        if (description) {
            meta.push(<meta property="og:description" content={description} />);
        }
        if (image) {
            meta.push(<meta property="og:image" content={image} />);
        }

        const header = {
            title,
            meta
        }

        return (
            <div className="container">
                <Helmet>
                    <title>{title}</title>
                    { meta }
                </Helmet>
                <Progress percent={this.state.percent} color="red" />
                {
                    this.props.post ?
                        (
                            <div className="post">
                                <div className="row post-header" />
                                <div className="row">
                                    <div className="col-md-offset-2 col-md-8">
                                        <div className="post-entry" style={{ borderBottom: '2px solid #454545', paddingBottom: '15px', display: 'flex' }}>
                                            <div className="date" style={{ lineHeight: '30px' }}>
                                                <div className="date-content">{this.props.post.day}<span className="month">{this.props.post.month}</span></div>
                                            </div>
                                            <div className="post-title">
                                                <VisibilitySensor onChange={this.onTitleVisible.bind(this)} partialVisibility={false} intervalDelay={300}>
                                                    <div className="title">{this.props.post.title}</div>
                                                </VisibilitySensor>
                                                <div style={{ display: 'inline-block', marginTop: '5px', fontStyle: 'italic' }}>By Hai</div>
                                            </div>
                                        </div>
                                        <div className="post-content" dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-offset-2 col-md-8">
                                        <DisqusThreadContainer
                                            shortname="thepersonalblogofhaile"
                                            identifier={this.props.post.id}
                                            title={this.props.post.title}
                                            url={window.location.href}
                                            className="thread"
                                        />
                                    </div>
                                </div>
                                <div className="share-links" style={{ position: 'fixed', top: '200px', opacity: this.state.titleVisible ? '0' : '1' }}>
                                    <div style={{ fontSize: '14px', marginLeft: '-5px', fontWeight: 'bold' }}>SHARE</div>
                                    <ul>
                                        <li>
                                            <FacebookShareButton url={window.location.href} title={this.props.post.title}>
                                                <FacebookIcon iconBgStyle={{ fill: 'black' }} size={32} round />
                                            </FacebookShareButton>
                                        </li>
                                        <li>
                                            <TwitterShareButton url={window.location.href} title={this.props.post.title}>
                                                <TwitterIcon iconBgStyle={{ fill: 'black' }} size={32} round />
                                            </TwitterShareButton>
                                        </li>
                                        <li>
                                            <SocialIcon url={emailUrl} color="black" style={{ height: 32, width: 32 }} network="email" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : null
                }
            </div>
        );
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

function mapStateToProps(state, ownProps) {
    const { posts } = state;
    const post = posts[ownProps.router.params.id];
    return { post }
}

export default withRouter(connect(mapStateToProps, { getPost })(PostPage));
