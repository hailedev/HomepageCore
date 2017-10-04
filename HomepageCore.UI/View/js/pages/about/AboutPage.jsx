var React = require("react");
var DocumentTitle = require("react-document-title");
var Link = require("react-router").Link;

var AboutPage = React.createClass({
    render: function(){
        return (
            <DocumentTitle title={"Hai Le | About"}>
                <div className="about">
                    <div className="row">
                        <div className="col-md-6 image">
                            <img src="/images/blog/about.jpg"/>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="main-content" style={{color:"black",backgroundColor:"rgba(255, 255, 255, 0.6)"}}>
                                Hello,
                                <br/><br/>
                                My name is Hai and welcome to my blog.  Be warned however, it is very crappy and prone to extensive periods of inactivity (eg. 6 months+).  
                                <br/><br/>
                                I am a software engineer specializing on the .Net stack and am also passionate about front-end web frameworks such as React and Angular.
                                <br/><br/>
                                At the moment my work primarily focus’ on building web services but have also worked on Windows desktop applications.  I also enjoy site design as a hobby and created all the UI elements you see here.
                                <br/><br/>
                                I am also a certified Umbraco developer, building and extending sites based on the Umbraco CMS platform.
                                <br/><br/>
                                I love what I do and love discussing all things tech related so if you are like minded do not hesitate to <Link to={"feedback"}>get in touch</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = AboutPage;