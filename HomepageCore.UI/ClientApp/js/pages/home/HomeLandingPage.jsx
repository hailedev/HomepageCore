var React = require("react");
var DocumentTitle = require("react-document-title");
var CSSTransition = require("react-transition-group").CSSTransition;
var TransitionGroup = require("react-transition-group").TransitionGroup;
var PostSummaryActionCreators = require("PostSummaryActionCreators");
var PostSummaryStore = require("PostSummaryStore");
var CategoryStore = require("CategoryStore");
var CategoryActionCreators = require("CategoryActionCreators");
var Categories = require("AppConstants").Categories;
var Link = require("react-router-dom").Link;
var env = require("env");
var WaitIcon = require("./WaitIcon");
var createReactClass = require("create-react-class");

var HomeLandingPage = createReactClass({
    componentWillMount: function(){
        PostSummaryActionCreators.getPostSummaries().then(function(){
            this.loadDisqus();
        }.bind(this));
        if(this.state.categories === null) {
            CategoryActionCreators.getCategories();
        }
        this.images = [
            <img key={1} src="/images/avatar.png"/>,
            <img key={2} style={{marginTop:"-60px"}} src="/images/avatar2.png"/>,
            <img key={3} src="/images/avatar3.png"/>,
            <img key={4} style={{marginLeft:"-29px",marginTop:"-29px"}} src="/images/avatar4.png"/>,
            <img key={5} src="/images/avatar5.png"/>,
            <img key={6} src="/images/avatar.png"/>
        ];
        this.messages = [
            "Hey there!  My name's Hai, welcome to my blog",
            "I'm a .Net and web developer from Melbourne, Australia",
            "I love all things computer science and tech related",
            "I also like travelling and going on wild adventures",
            "and enjoy gaming in my down time",
            "That's all I got, take a look around and let me know what you think!"
        ];
    },
    getInitialState: function(){
        return {currentProfile:0,filter:Categories.ALL,page:1,loading:false,enableShowMore:true};
    },
    render: function(){
        var categories = [],posts = [], i;
        if(this.state.categories !== null){
            categories.push(<li key={this.state.categories.length} onClick={this.onCategoryClick.bind(this, Categories.ALL)}>All</li>);
            for(i=0; i<this.state.categories.length; i++){
                categories.push(<li key={i} onClick={this.onCategoryClick.bind(this, this.state.categories[i].id)}>{this.state.categories[i].name}</li>);
            }
        }
        for(i=0; i<this.state.posts.length; i++){
            posts.push(
                <div key={i} className="post-entry">
                    <div className="date">
                        <div className="date-content">{this.state.posts[i].day}<span className="month">{this.state.posts[i].month}</span></div>
                    </div>
                    <div className="post-title">
                        <div className="title">{this.state.posts[i].title}</div>
                        <Link to={"post/".concat(this.state.posts[i].id).concat("#disqus_thread")} style={{display:"inline-block",marginTop:"5px"}}><span className="disqus-comment-count" data-disqus-identifier={this.state.posts[i].id}>0 Comments</span></Link>
                    </div>
                    <div className="blurb">{this.state.posts[i].blurb}...<br/><Link to={"post/".concat(this.state.posts[i].id)}>Read more >></Link></div>
                </div>
            );
        }
        var showMore = !this.state.loading ?
            (
                <div className="show-more" onClick={this.onShowMore}>
                    <div>Show More</div>
                    <div style={{height:"30px",paddingLeft:"10px"}}>
                        <svg fill="#334b69" height="30" viewBox="0 0 24 24" width="30">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </div>
                </div>
            )
            :
            (
                <div style={{textAlign:"center",height:"51px"}}>
                    <WaitIcon size="40px"/>
                </div>
            );
        return (
            <DocumentTitle title={"Hai Le | Home"}>
                <div>
                    <div style={{paddingTop:"100px"}}>
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
                                <div id="arrow" onClick={this.onArrowClick}></div>
                            </div>
                        </div>
                    </div>
                    <div className="container homepage">
                        <div id="summaries" className="row">
                            <div className="col-md-8 col-xs-12">
                            {posts.length > 0 ? posts : <WaitIcon style={{display:"block",margin:"auto"}} size="40px"/>}
                            </div>
                            <div className="col-md-offset-1 col-md-3 category-container">
                                <div style={{fontFamily:"Oswald, sans-serif",fontSize:"38px",color:"#7682a8"}}>Categories</div>
                                {categories.length > 0 ? <ul className="category-list">{categories}</ul> : <WaitIcon style={{margin:"20px 60px 0"}} size="40px"/>}
                            </div>
                        </div>
                        {
                            posts.length > 0 ? (
                                <div className="row">
                                    <div className="col-md-8 col-xs-12" style={{height:"100px"}}>
                                        { this.state.enableShowMore ? showMore:null }
                                    </div>
                                </div>
                            ): null
                        }
                        <img className="preload" src="/images/avatar.png"/>
                        <img className="preload" src="/images/avatar2.png"/>
                        <img className="preload" src="/images/avatar3.png"/>
                        <img className="preload" src="/images/avatar4.png"/>
                        <img className="preload" src="/images/avatar5.png"/>
                    </div>
                </div>
            </DocumentTitle>
        );
    },
    onArrowClick: function(){
        var current = this.state.currentProfile;
        current = ++current > 5 ? 0 : current;
        this.setState({currentProfile:current});
    },
    onCategoryClick: function(category){
        this.setState({filter:category,enableShowMore:true});
        PostSummaryActionCreators.getPostSummaries({filter:category}).then(function(){
            this.loadDisqus();
        }.bind(this));
    },
    loadDisqus: function(){
        var node = document.getElementById("dsq-count-scr");
        if(node){
            node.parentNode.removeChild(node);
        }
        var disqus = document.head.getElementsByTagName("script");
        while(disqus.length > 0){
            disqus[0].parentNode.removeChild(disqus[0]);
            DISQUSWIDGETS = undefined;
        }
        var script = document.createElement("script");
        script.src = "//thepersonalblogofhaile.disqus.com/count.js";
        script.async = true;
        script.id = "dsq-count-scr";
        document.body.appendChild(script);
    },
    onShowMore: function(){
        var page = this.state.page+1;
        this.setState({loading:true,page:page});
        var options = {page:page};
        if(this.state.filter !== Categories.ALL){
            options.filter = this.state.filter;
        }
        PostSummaryActionCreators.getPostSummaries(options,true).then(function(response){
            var newState = {loading:false};
            if(response.length < env.pageSize){
                newState.enableShowMore = false;
            }
            this.setState(newState);
        }.bind(this));
    }
});

HomeLandingPage.getStores = function(){
    return [PostSummaryStore,CategoryStore];
};

HomeLandingPage.calculateState = function(prevState){
    return {posts: PostSummaryStore.getState(),categories: CategoryStore.getState()};
};

var HomeLandingPageContainer = require("flux/utils").Container.create(HomeLandingPage);

module.exports = HomeLandingPageContainer;