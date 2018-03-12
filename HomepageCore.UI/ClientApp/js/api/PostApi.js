import ApiDispatcher from './ApiDispatcher';

export default new class PostApi {
    getPostSummaries(options) {
        return new Promise(function (resolve, reject) {
            let url = '/api/post?summary=true';
            if (options) {
                if (options.page) {
                    url = url.concat('&page=').concat(options.page);
                }
                if (options.filter) {
                    url = url.concat('&filter=').concat(options.filter);
                }
            }
            ApiDispatcher.dispatch(fetch.bind(this, url, { method: 'GET', credentials: 'include' }), resolve, reject);
        });
    }

    getPost(id, editable) {
        let url = '/api/post/'.concat(id);
        if (editable) {
            url = url.concat('?editable=true');
        }
        return new Promise(function (resolve, reject) {
            ApiDispatcher.dispatch(fetch.bind(this, url, { method: 'GET', credentials: 'include' }), resolve, reject);
        });
    }

    addPost(post) {
        return new Promise(function (resolve, reject) {
            ApiDispatcher.dispatch(fetch.bind(
                this, '/api/post/',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify(post)
                }
            ), resolve, reject);
        });
    }
}();
