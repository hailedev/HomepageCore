import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getPost } from 'PostActionCreators';
import { useParams, useLocation } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import VisibilitySensor from 'react-visibility-sensor';
import { SocialIcon } from 'react-social-icons';
import Progress from 'react-progress';
import { useSelector, useDispatch } from 'react-redux';
import DisqusThreadContainer from './DisqusThreadContainer';

export default () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const { id } = useParams();
    const { hash } = useLocation();

    const [post, setPost] = useState();
    const [titleVisible, setTitleVisible] = useState(true);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (id && !posts[id]) {
            let interval = null;
            dispatch(getPost(params.id, true)).then(() => {
                setPercent(100);
                clearInterval(interval);
            });
            interval = setInterval(() => {
                if (percent <= 70) {
                    const _percent = parseInt(Math.random() * 30, 10) + percent;
                    setPercent(_percent);
                }
            }, 700);
        }
    },[]);
    useEffect(() => {
        const post = posts[params.id];
        if (post) {
            setPost(post);
        }
    }, [posts]);

    const onTitleVisible = (isVisible) => setTitleVisible(isVisible);

    let title = 'Hai Le';
    let emailUrl = 'mailto:?';
    let image, description;
    if (post) {
        title = title.concat(' | ').concat(post.title);
        emailUrl = emailUrl.concat('subject=').concat(encodeURI(post.title)).concat('&body=').concat(encodeURI(window.location.href))
            .concat(encodeURI('?CMP=share_btn_link'));
        if (post.metaImage) {
            image = post.metaImage;
        }
        if (post.metaDescription) {
            description = post.metaDescription;
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

    return (
        <div className="container">
            <Helmet>
                <title>{title}</title>
                { meta }
            </Helmet>
            <Progress percent={percent} color="red" />
            {
                post ?
                    (
                        <div className="post">
                            <div className="row post-header" />
                            <div className="row">
                                <div className="col-md-offset-2 col-md-8">
                                    <div className="post-entry" style={{ borderBottom: '2px solid #454545', paddingBottom: '15px', display: 'flex' }}>
                                        <div className="date" style={{ lineHeight: '30px' }}>
                                            <div className="date-content">{post.day}<span className="month">{post.month}</span></div>
                                        </div>
                                        <div className="post-title">
                                            <VisibilitySensor onChange={onTitleVisible} partialVisibility={false} intervalDelay={300}>
                                                <div className="title">{post.title}</div>
                                            </VisibilitySensor>
                                            <div style={{ display: 'inline-block', marginTop: '5px', fontStyle: 'italic' }}>By Hai</div>
                                        </div>
                                    </div>
                                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-offset-2 col-md-8">
                                    <DisqusThreadContainer
                                        shortname="thepersonalblogofhaile"
                                        identifier={post.id}
                                        title={post.title}
                                        url={window.location.href}
                                        className="thread"
                                    />
                                </div>
                            </div>
                            <div className="share-links" style={{ position: 'fixed', top: '200px', opacity: titleVisible ? '0' : '1' }}>
                                <div style={{ fontSize: '14px', marginLeft: '-5px', fontWeight: 'bold' }}>SHARE</div>
                                <ul>
                                    <li>
                                        <FacebookShareButton url={window.location.href} title={post.title}>
                                            <FacebookIcon iconBgStyle={{ fill: 'black' }} size={32} round />
                                        </FacebookShareButton>
                                    </li>
                                    <li>
                                        <TwitterShareButton url={window.location.href} title={post.title}>
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
