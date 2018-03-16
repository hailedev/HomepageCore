import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostSummaryActionCreators from 'PostSummaryActionCreators';
import PostSummaryStore from 'PostSummaryStore';
import CategoryStore from 'CategoryStore';
import CategoryActionCreators from 'CategoryActionCreators';
import { Categories } from 'AppConstants';
import { Link } from 'react-router-dom';
import env from 'env';
import { Container } from 'flux/utils';
import WaitIcon from './WaitIcon';

class HomeLandingPage extends Component {
    static getStores() {
        return [PostSummaryStore, CategoryStore];
    }

    static calculateState() {
        return { posts: PostSummaryStore.getState(), categories: CategoryStore.getState() };
    }

    constructor(props) {
        super(props);
        this.state = { currentProfile: 0, filter: Categories.ALL, page: 1, loading: false, enableShowMore: true };
    }

    componentWillMount() {
        PostSummaryActionCreators.getPostSummaries({ page: 1 }).then(() => {
            this.loadDisqus();
        });
        if (this.state.categories === null) {
            CategoryActionCreators.getCategories();
        }
        this.images = [
            <img key={1} src="/images/avatar.png" alt="" />,
            <img key={2} style={{ marginTop: '-60px' }} src="/images/avatar2.png" alt="" />,
            <img key={3} src="/images/avatar3.png" alt="" />,
            <img key={4} style={{ marginLeft: '-29px', marginTop: '-29px' }} src="/images/avatar4.png" alt="" />,
            <img key={5} src="/images/avatar5.png" alt="" />,
            <img key={6} src="/images/avatar.png" alt="" />
        ];
        this.messages = [
            "Hey there!  My name's Hai, welcome to my blog",
            "I'm a .Net and web developer from Melbourne, Australia",
            'I love all things computer science and tech related',
            'I also like travelling and going on wild adventures',
            'and enjoy gaming in my down time',
            "That's all I got, take a look around and let me know what you think!"
        ];
    }

    onArrowClick() {
        let current = this.state.currentProfile;
        current = ++current > 5 ? 0 : current; // eslint-disable-line
        this.setState({ currentProfile: current });
    }
    onCategoryClick(category) {
        this.setState({ filter: category, enableShowMore: true });
        PostSummaryActionCreators.getPostSummaries({ page: 1, filter: category }).then(() => {
            this.loadDisqus();
        });
    }
    onShowMore() {
        const page = this.state.page + 1;
        this.setState({ loading: true, page });
        const options = { page };
        if (this.state.filter !== Categories.ALL) {
            options.filter = this.state.filter;
        }
        PostSummaryActionCreators.getPostSummaries(options, true).then((response) => {
            const newState = { loading: false };
            if (response.length < env.pageSize) {
                newState.enableShowMore = false;
            }
            this.setState(newState);
        });
    }
    loadDisqus() {
        const node = document.getElementById('dsq-count-scr');
        if (node) {
            node.parentNode.removeChild(node);
        }
        const disqus = document.head.getElementsByTagName('script');
        while (disqus.length > 0) {
            disqus[0].parentNode.removeChild(disqus[0]);
            DISQUSWIDGETS = undefined; // eslint-disable-line
        }
        const script = document.createElement('script');
        script.src = '//thepersonalblogofhaile.disqus.com/count.js';
        script.async = true;
        script.id = 'dsq-count-scr';
        document.body.appendChild(script);
    }

    render() {
        const categories = [];
        const posts = [];

        if (this.state.categories !== null) {
            categories.push(<li key={this.state.categories.length} onClick={this.onCategoryClick.bind(this, Categories.ALL)} role="presentation">All</li>);
            for (let i = 0; i < this.state.categories.length; i += 1) {
                categories.push(<li key={i} onClick={this.onCategoryClick.bind(this, this.state.categories[i].id)} role="presentation">{this.state.categories[i].name}</li>);
            }
        }
        for (let i = 0; i < this.state.posts.length; i += 1) {
            posts.push(<div key={i} className="post-entry">
                <div style={{ display: 'flex' }}>
                    <div className="date">
                        <div className="date-content">{this.state.posts[i].day}<span className="month">{this.state.posts[i].month}</span></div>
                    </div>
                    <div className="post-title">
                        <div className="title">{this.state.posts[i].title}</div>
                        <Link to={'post/'.concat(this.state.posts[i].id).concat('#disqus_thread')} style={{ display: 'inline-block', marginTop: '5px' }}><span className="disqus-comment-count" data-disqus-identifier={this.state.posts[i].id}>0 Comments</span></Link>
                    </div>
                </div>
                <div className="blurb">{this.state.posts[i].blurb}...<br /><Link to={'post/'.concat(this.state.posts[i].id)}>Read more &gt;&gt;</Link></div>
            </div>); // eslint-disable-line
        }
        const showMore = !this.state.loading ?
            (
                <div className="show-more" onClick={this.onShowMore.bind(this)} role="presentation">
                    <div>Show More</div>
                    <div style={{ height: '30px', paddingLeft: '10px' }}>
                        <svg fill="#334b69" height="30" viewBox="0 0 24 24" width="30">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </div>
                </div>
            )
            :
            (
                <div style={{ textAlign: 'center', height: '51px' }}>
                    <WaitIcon size="40px" />
                </div>
            );
        return (
            <DocumentTitle title="Hai Le | Home">
                <div>
                    <div style={{ paddingTop: '100px' }}>
                        <div id="banner">
                            <div id="avatar-home">
                                {this.images[this.state.currentProfile]}
                            </div>
                            <div id="speech-container">
                                <div id="ticker-container">
                                    <TransitionGroup>
                                        <CSSTransition classNames="messages" timeout={300} key={this.state.currentProfile}>
                                            <span className="ticker-item">{this.messages[this.state.currentProfile]}</span>
                                        </CSSTransition>
                                    </TransitionGroup>
                                </div>
                                <div id="arrow" onClick={this.onArrowClick.bind(this)} role="presentation" />
                            </div>
                        </div>
                    </div>
                    <div className="container homepage">
                        <div id="summaries" className="row">
                            <div className="col-md-8 col-xs-12">
                                {posts.length > 0 ? posts : <WaitIcon style={{ display: 'block', margin: 'auto' }} size="40px" />}
                            </div>
                            <div className="col-md-offset-1 col-md-3 category-container">
                                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '38px', color: '#7682a8' }}>Categories</div>
                                {categories.length > 0 ? <ul className="category-list">{categories}</ul> : <WaitIcon style={{ margin: '20px 60px 0' }} size="40px" />}
                            </div>
                        </div>
                        {
                            posts.length > 0 ? (
                                <div className="row">
                                    <div className="col-md-8 col-xs-12" style={{ height: '100px' }}>
                                        { this.state.enableShowMore ? showMore : null }
                                    </div>
                                </div>
                            ) : null
                        }
                        <img className="preload" src="/images/avatar.png" alt="" />
                        <img className="preload" src="/images/avatar2.png" alt="" />
                        <img className="preload" src="/images/avatar3.png" alt="" />
                        <img className="preload" src="/images/avatar4.png" alt="" />
                        <img className="preload" src="/images/avatar5.png" alt="" />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Container.create(HomeLandingPage);
