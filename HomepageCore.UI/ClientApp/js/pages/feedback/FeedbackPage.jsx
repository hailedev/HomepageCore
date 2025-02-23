import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ContactApi from '../../api/ContactApi';
import WaitIcon from '../home/WaitIcon';

export default () => {
    const [errors, setErrors] = useState({ name: '', email: '', dispatch: '' });
    const [sentMsg, setSentMsg] = useState('');
    const [sending, setSending] = useState(true);

    const _customRefs = {};

    const onSubmit = () => {
        const errors = { name: '', email: '', dispatch: '' };
        setErrors(errors);
        setSentMsg('');
        setSending(true);

        if (!_customRefs.name.value) {
            errors.name = 'Please enter your name';
            _customRefs.name.focus();
        }
        if (!isEmail(_customRefs.email.value)) {
            errors.email = 'The email is invalid';
            _customRefs.email.focus();
        }
        if (errors.name || errors.email) {
            setErrors(errors);
            setSending(false);
            return;
        }
        const model = { name: _customRefs.name.value, email: _customRefs.email.value, message: _customRefs.message.value };
        ContactApi.lodgeFeedback(model)
            .then(() => {
                _customRefs.name.value = '';
                _customRefs.email.value = '';
                _customRefs.message.value = '';
                setSentMsg("Thanks for getting in touch, I'll get back to you as soon as I can");
                setSending(false);
            })
            .catch(() => {
                setErrors({ ...errors, dispatch: 'Oops.. something went wrong please try again later'});
                setSending(false);
            });
    }

    const isEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
        return re.test(email);
    }

    const label = !sending ? 'Submit' : <WaitIcon size="20px" />;
    return (
        <div className="container feedback">
            <Helmet>
                <title>Hai Le | Contact</title>
            </Helmet>
            <div className="row">
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>Got something you would like to discuss? Do get in touch if you have any questions or even just to say hi!</div>
            </div>
            <div className="row">
                <div className="col-md-offset-2 col-md-1 label">Name</div>
                <div className="col-md-7">
                    <input type="text" id="name" ref={function (input) { _customRefs.name = input; }} />
                    { errors.name ? <div className="error">{errors.name}</div> : null }
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-offset-2 col-md-1 label">Email</div>
                <div className="col-md-7">
                    <input type="email" id="email" ref={function (input) { _customRefs.email = input; }} />
                    { errors.email ? <div className="error">{errors.email}</div> : null }
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-offset-2 col-md-1 label">Message</div>
                <div className="col-md-7">
                    <textarea rows="8" id="message" ref={function (input) { _customRefs.message = input; }} />
                    { errors.dispatch ? <div className="error">{errors.dispatch}</div> : null }
                    { sentMsg ? <div>{sentMsg}</div> : null }
                </div>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-md-offset-8 col-md-2 col-xs-12">
                    <div className="button" onClick={onSubmit} role="presentation">{label}</div>
                </div>
            </div>
        </div>
    );
}
