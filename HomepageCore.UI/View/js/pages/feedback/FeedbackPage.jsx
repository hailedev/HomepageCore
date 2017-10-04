var React = require("react");
var DocumentTitle = require("react-document-title");
var ContactActionCreators = require("ContactActionCreators");
var WaitIcon = require("../home/WaitIcon");

var FeedbackPage = React.createClass({
    getInitialState: function(){
        return {errors:{name:"",email:"",dispatch:""},sentMsg:""};
    },
    render: function(){
        var label = !this.state.sending?"Submit": <WaitIcon size="20px"/>;
        return (
            <DocumentTitle title={"Hai Le | Contact"}>
                <div className="feedback">
                    <div className="row">
                        <div style={{marginBottom:"40px",textAlign:"center"}}>Got something you would like to discuss? Do get in touch if you have any questions or even just to say hi!</div>
                    </div>
                    <div className="row">
                        <div className="col-md-offset-2 col-md-1 label">Name</div>
                        <div className="col-md-7">
                            <input type="text" ref="name"/>
                            { this.state.errors.name ? <div className="error">{this.state.errors.name}</div> : null }
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"20px"}}>
                        <div className="col-md-offset-2 col-md-1 label">Email</div>
                        <div className="col-md-7">
                            <input type="email" ref="email"/>
                            { this.state.errors.email ? <div className="error">{this.state.errors.email}</div> : null }
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"20px"}}>
                        <div className="col-md-offset-2 col-md-1 label">Message</div>
                        <div className="col-md-7">
                            <textarea rows="8" ref="message"/>
                            { this.state.errors.dispatch ? <div className="error">{this.state.errors.dispatch}</div> : null }
                            { this.state.sentMsg ? <div>{this.state.sentMsg}</div> : null }
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"10px"}}>
                        <div className="col-md-offset-8 col-md-2 col-xs-12">
                            <div className="button" onClick={this.onSubmit}>{label}</div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    },
    isEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    onSubmit: function() {
        var errors = {name:"",email:"",dispatch:""};
        this.setState({errors:errors,sentMsg:"",sending:true});
        if(!this.refs.name.value){
            errors.name = "Please enter your name";
            this.refs.name.focus();
        }
        if(!this.isEmail(this.refs.email.value)){
            errors.email = "The email is invalid";
            this.refs.email.focus();
        }
        if(errors.name || errors.email){
            this.setState({errors:errors,sending:false});
            return;
        }
        var model = {name:this.refs.name.value,email:this.refs.email.value,message:this.refs.message.value};
        ContactActionCreators.lodgeFeedback(model)
            .then(function(response) {
                this.refs.name.value = "";
                this.refs.email.value = "";
                this.refs.message.value = "";
                this.setState({sentMsg:"Thanks for getting in touch, I'll get back to you as soon as I can",sending:false});
            }.bind(this))
            .catch(function(ex) {
                this.setState({errors:{dispatch:"Oops.. something went wrong please try again later"},sending:false});
            }.bind(this));
    }
});

module.exports = FeedbackPage;