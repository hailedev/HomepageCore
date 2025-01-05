import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import ContactActionCreators from 'ContactActionCreators';
import WaitIcon from '../home/WaitIcon';

export default class FeedbackPage extends Component {
    constructor(props) {
        super(props);
        this.customRefs = {};
        this.state = { errors: { name: '', email: '', dispatch: '' }, sentMsg: '' };
    }

    onSubmit() {
        const errors = { name: '', email: '', dispatch: '' };
        this.setState({ errors, sentMsg: '', sending: true });
        if (!this.customRefs.name.value) {
            errors.name = 'Please enter your name';
            this.customRefs.name.focus();
        }
        if (!this.isEmail(this.customRefs.email.value)) {
            errors.email = 'The email is invalid';
            this.customRefs.email.focus();
        }
        if (errors.name || errors.email) {
            this.setState({ errors, sending: false });
            return;
        }
        const model = { name: this.customRefs.name.value, email: this.customRefs.email.value, message: this.customRefs.message.value };
        ContactActionCreators.lodgeFeedback(model)
            .then(() => {
                this.customRefs.name.value = '';
                this.customRefs.email.value = '';
                this.customRefs.message.value = '';
                this.setState({ sentMsg: "Thanks for getting in touch, I'll get back to you as soon as I can", sending: false });
            })
            .catch(() => {
                this.setState({ errors: { dispatch: 'Oops.. something went wrong please try again later' }, sending: false });
            });
    }

    isEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
        return re.test(email);
    }

    render() {
        const label = !this.state.sending ? 'Submit' : <WaitIcon size="20px" />;
        const meta = {
            title: 'Hai Le | Contact'
        }
        return (
            <DocumentMeta {...meta}>
                <div className="container feedback">
                    <div className="row">
                        <div style={{ marginBottom: '40px', textAlign: 'center' }}>Got something you would like to discuss? Do get in touch if you have any questions or even just to say hi!</div>
                    </div>
                    <div className="row">
                        <div className="col-md-offset-2 col-md-1 label">Name</div>
                        <div className="col-md-7">
                            <input type="text" id="name" ref={function (input) { this.customRefs.name = input; }.bind(this)} />
                            { this.state.errors.name ? <div className="error">{this.state.errors.name}</div> : null }
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-md-offset-2 col-md-1 label">Email</div>
                        <div className="col-md-7">
                            <input type="email" id="email" ref={function (input) { this.customRefs.email = input; }.bind(this)} />
                            { this.state.errors.email ? <div className="error">{this.state.errors.email}</div> : null }
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-md-offset-2 col-md-1 label">Message</div>
                        <div className="col-md-7">
                            <textarea rows="8" id="message" ref={function (input) { this.customRefs.message = input; }.bind(this)} />
                            { this.state.errors.dispatch ? <div className="error">{this.state.errors.dispatch}</div> : null }
                            { this.state.sentMsg ? <div>{this.state.sentMsg}</div> : null }
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '10px' }}>
                        <div className="col-md-offset-8 col-md-2 col-xs-12">
                            <div className="button" onClick={this.onSubmit.bind(this)} role="presentation">{label}</div>
                        </div>
                    </div>
                </div>
            </DocumentMeta>
        );
    }
}
