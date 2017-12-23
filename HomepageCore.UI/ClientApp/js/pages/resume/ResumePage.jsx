var React = require("react");
var DocumentTitle = require("react-document-title");
var Link = require("react-router-dom").Link;
var createReactClass = require("create-react-class");

var ResumePage = createReactClass({
    render: function(){
        return (
            <DocumentTitle title={"Hai Le | Hire Me"}>
                <div className="container hire-me">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-8">Where I'm currently working:<span style={{marginLeft:"30px"}}><a href="https://worldvision.com.au">World Vision Australia</a></span></div>
                    </div>
                    <div className="row" style={{marginTop:"20px",marginBottom:"20px"}}>
                        <div className="col-md-offset-2 col-md-8">
                            Please contact me through my social media links or <Link to={"/feedback"}>here</Link> if there are any opportunities you would like to discuss.
                            But before you do please see <a href="/resume">this</a> to see if I may suit your needs.
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"20px",marginBottom:"20px"}}>
                        <div className="col-md-offset-2 col-md-8">
                            I also take volunteer work for NGO's depending on the project and the expected commitment, so please don't hesitate to get in touch if you would like to discuss this with me.
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"20px",marginBottom:"20px"}}>
                        <div className="col-md-offset-2 col-md-8">
                            I don't take short term/commission work at the moment, but if you have design work or want me to draw stuff that would be awesome and I would make the time for that.
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = ResumePage;