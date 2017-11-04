var React = require("react");
var DocumentTitle = require("react-document-title");
var PostStore = require("PostStore");
var PostActionCreators = require("PostActionCreators");
var DisqusThreadContainer = require("./DisqusThreadContainer");
var FacebookShareButton = require("react-share").ShareButtons.FacebookShareButton;
var FacebookIcon = require("react-share").generateShareIcon("facebook");
var TwitterShareButton = require("react-share").ShareButtons.TwitterShareButton;
var TwitterIcon = require("react-share").generateShareIcon("twitter");
var VisibilitySensor = require("react-visibility-sensor");
var SocialIcon = require("react-social-icons").SocialIcon;
var Progress = require("react-progress");
var createReactClass = require("create-react-class");

var PostPage = createReactClass({
    componentWillMount: function(){
        if(!PostStore.getState()[this.props.match.params.id]){
            PostActionCreators.getPost(this.props.match.params.id).then(function(response){
                this.setState({percent:100});
                clearInterval(this.interval);
            }.bind(this));
            this.interval = setInterval(function(){
                if(this.state.percent <= 70){
                    var percent = parseInt(Math.random()*30, 10) + this.state.percent;
                    this.setState({percent:percent});
                }
            }.bind(this),700);
        }
    },
    componentDidMount: function(){
        if(this.state.post){
            this.setState({percent:100});
        }
    },
    getInitialState: function(){
        return {titleVisible: true,percent:0};
    },
    render: function(){
        var title = "Hai Le", emailUrl = "mailto:?";
        if(this.state.post){
            title = title.concat(" | ").concat(this.state.post.title);
            emailUrl = emailUrl.concat("subject=").concat(encodeURI(this.state.post.title)).concat("&body=").concat(encodeURI(window.location.href)).concat(encodeURI("?CMP=share_btn_link"));
        }
        
        return (
            <DocumentTitle title={title}>
                <div>
                    <Progress percent={this.state.percent} color={"red"}/>
                    { 
                        this.state.post ?
                            (
                                <div className="post">
                                    <div className="row" style={{height:"170px"}}></div>
                                    <div className="row">
                                        <div className="col-md-offset-2 col-md-8">
                                            <div className="post-entry" style={{borderBottom:"2px solid #454545",paddingBottom:"15px"}}>
                                                <div className="date" style={{lineHeight:"30px"}}>
                                                    <div className="date-content">{this.state.post.day}<span className="month">{this.state.post.month}</span></div>
                                                </div>
                                                <div className="post-title">
                                                    <VisibilitySensor onChange={this.onTitleVisible} partialVisibility={false} intervalDelay={300}>
                                                        <div className="title">{this.state.post.title}</div>
                                                    </VisibilitySensor>
                                                    <div style={{display:"inline-block",marginTop:"5px",fontStyle:"italic"}}>By Hai</div>
                                                </div>
                                            </div>
                                            <div className="post-content" dangerouslySetInnerHTML={{__html:this.state.post.content}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-offset-2 col-md-8">
                                            <DisqusThreadContainer shortname="thepersonalblogofhaile"
                                                                   identifier={this.state.post.id}
                                                                   title={this.state.post.title}
                                                                   url={window.location.href}
                                                                   className="thread"/>
                                        </div>
                                    </div>
                                    <div className="share-links" style={{position:"fixed",top:"200px",opacity:this.state.titleVisible?"0":"1"}}>
                                        <div style={{fontSize:"14px",marginLeft:"-5px",fontWeight:"bold"}}>SHARE</div>
                                        <ul>
                                            <li>
                                                <FacebookShareButton url={window.location.href} title={this.state.post.title}>
                                                    <FacebookIcon iconBgStyle={{fill:"black"}} size={32} round={true}/>
                                                </FacebookShareButton>
                                            </li>
                                            <li>
                                                <TwitterShareButton url={window.location.href} title={this.state.post.title}>
                                                    <TwitterIcon iconBgStyle={{fill:"black"}} size={32} round={true}/>
                                                </TwitterShareButton>
                                            </li>
                                            <li>
                                                <SocialIcon url={emailUrl} color="black" style={{height:32,width:32}} network="email"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : null 
                    }
                </div>
            </DocumentTitle>
        );
    },
    scrollIntoView: function(){
        if(this.state.post && this.props.location.hash === "#disqus_thread"){
            var thread = document.getElementsByClassName("thread")[0];
            thread.scrollIntoView();
        }
    },
    onTitleVisible: function(isVisible){
        this.setState({titleVisible:isVisible});
    }
});

PostPage.getStores = function(){
    return [PostStore];
};

PostPage.calculateState = function(prevState,props){
    return {post:PostStore.getState()[props.match.params.id]};
};

var PostPageContainer = require("flux/utils").Container.create(PostPage,{withProps:true});

module.exports = PostPageContainer;