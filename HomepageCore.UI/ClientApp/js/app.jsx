import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'detect-browser';
import { BrowserRouter, Route } from 'react-router-dom';
import DefaultUserManager from 'DefaultUserManager';
import env from 'env';
import Main from './pages/Main';

window.onerror = function onerror(message, url, lineNo, colNo, error) {
    const container = document.createElement('div');

    container.style.color = 'red';
    container.style.position = 'fixed';
    container.style.background = '#eee';
    container.style.padding = '2em';
    container.style.top = '1em';
    container.style.left = '1em';

    const msg = document.createElement('pre');
    msg.innerText = [
        `Message: ${message}`,
        `URL: ${url}`,
        `Line: ${lineNo}`,
        `Column: ${colNo}`,
        `Stack: ${(error && error.stack)}`
    ].join('\n');
    container.appendChild(msg);
    document.body.appendChild(container);
};

let pageContent = <BrowserRouter><Route path="/" component={Main} /></BrowserRouter>;
if (window.location.pathname === '/signin-callback') {
    DefaultUserManager.signinRedirectCallback()
        .then((token) => {
            if (token.state && token.state.url) {
                window.location = token.state.url;
            }
        });
    pageContent = <div />;
}
if (window.location.pathname === '/signout-callback') {
    DefaultUserManager.removeUser();
    pageContent = <div />;
}
if (window.location.pathname === '/login') {
    DefaultUserManager.signinRedirect({ state: { url: `${env.OpenIdConnect.RedirectUri}/admin` } });
    pageContent = <div />;
}
if (browser && browser.name === 'ie' && !browser.version.startsWith('11')) {
    pageContent = (
        <div className="container">
            <div className="row" style={{ paddingTop: '100px', fontSize: '22px' }}>
                <div className="col-md-12">
                    <span style={{ color: 'red', fontSize: '40px' }}>:(</span><br /><p>This page requires a minimum of Internet Explorer 11</p>
                </div>
            </div>
        </div>
    );
}
ReactDOM.render(pageContent, document.getElementById('root'));
