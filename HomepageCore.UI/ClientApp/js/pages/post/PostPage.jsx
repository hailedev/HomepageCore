import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PostStore from 'PostStore';
import PostActionCreators from 'PostActionCreators';
import { ShareButtons, generateShareIcon } from 'react-share';
import VisibilitySensor from 'react-visibility-sensor';
import { SocialIcon } from 'react-social-icons';
import Progress from 'react-progress';
import { Container } from 'flux/utils';
import DisqusThreadContainer from './DisqusThreadContainer';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

class PostPage extends Component {
    static getStores() {
        return [PostStore];
    }

    static calculateState(prevState, props) {
        return { post: PostStore.getState()[props.match.params.id] };
    }

    constructor(props) {
        super(props);
        this.state = { titleVisible: true, percent: 0 };
    }
    componentWillMount() {
        if (!PostStore.getState()[this.props.match.params.id]) {
            PostActionCreators.getPost(this.props.match.params.id).then(() => {
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
        if (this.state.post) {
            this.setState({ percent: 100 }); // eslint-disable-line
        }
    }
    onTitleVisible(isVisible) {
        this.setState({ titleVisible: isVisible });
    }
    scrollIntoView() {
        if (this.state.post && this.props.location.hash === '#disqus_thread') {
            const thread = document.getElementsByClassName('thread')[0];
            thread.scrollIntoView();
        }
    }
    render() {
        let title = 'Hai Le';
        let emailUrl = 'mailto:?';
        if (this.state.post) {
            title = title.concat(' | ').concat(this.state.post.title);
            emailUrl = emailUrl.concat('subject=').concat(encodeURI(this.state.post.title)).concat('&body=').concat(encodeURI(window.location.href))
                .concat(encodeURI('?CMP=share_btn_link'));
        }

        return (
            <DocumentTitle title={title}>
                <div className="container">
                    <Progress percent={this.state.percent} color="red" />
                    {
                        this.state.post ?
                            (
                                <div className="post">
                                    <div className="row" style={{ height: '170px' }} />
                                    <div className="row">
                                        <div className="col-md-offset-2 col-md-8">
                                            <div className="post-entry" style={{ borderBottom: '2px solid #454545', paddingBottom: '15px', display: 'flex' }}>
                                                <div className="date" style={{ lineHeight: '30px' }}>
                                                    <div className="date-content">{this.state.post.day}<span className="month">{this.state.post.month}</span></div>
                                                </div>
                                                <div className="post-title">
                                                    <VisibilitySensor onChange={this.onTitleVisible.bind(this)} partialVisibility={false} intervalDelay={300}>
                                                        <div className="title">{this.state.post.title}</div>
                                                    </VisibilitySensor>
                                                    <div style={{ display: 'inline-block', marginTop: '5px', fontStyle: 'italic' }}>By Hai</div>
                                                </div>
                                            </div>
                                            <div className="post-content" dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-offset-2 col-md-8">
                                            <DisqusThreadContainer
                                                shortname="thepersonalblogofhaile"
                                                identifier={this.state.post.id}
                                                title={this.state.post.title}
                                                url={window.location.href}
                                                className="thread"
                                            />
                                        </div>
                                    </div>
                                    <div className="share-links" style={{ position: 'fixed', top: '200px', opacity: this.state.titleVisible ? '0' : '1' }}>
                                        <div style={{ fontSize: '14px', marginLeft: '-5px', fontWeight: 'bold' }}>SHARE</div>
                                        <ul>
                                            <li>
                                                <FacebookShareButton url={window.location.href} title={this.state.post.title}>
                                                    <FacebookIcon iconBgStyle={{ fill: 'black' }} size={32} round />
                                                </FacebookShareButton>
                                            </li>
                                            <li>
                                                <TwitterShareButton url={window.location.href} title={this.state.post.title}>
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
            </DocumentTitle>
        );
    }
}

export default Container.create(PostPage, { withProps: true });
