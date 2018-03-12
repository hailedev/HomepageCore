import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Main from './pages/Main';

export default {
    // Prerenders the page html
    renderToString: (url) => {
        const context = {};
        return new Promise(((resolve) => {
            const htmlContent = renderToString(<StaticRouter location={url} context={context}><Route path="/" component={Main} /></StaticRouter>);
            /* if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                // redirect(301, context.url)
            } else {
                // we're good, send the response
            } */

            resolve(htmlContent);
        }));
    },
    // Rehydrates the page
    renderToNode(url) {
        const context = {};
        ReactDOM.hydrate(<StaticRouter location={url} context={context}><Route path="/" component={Main} /></StaticRouter>, document.getElementById('root'));
    }
};
