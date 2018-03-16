import ApiDispatcher from './ApiDispatcher';

export default new class PostApi {
    getPostSummaries(options) {
        return new Promise((resolve, reject) => {
            let url = '/api/post?summary=true';
            if (options) {
                if (options.page) {
                    url = url.concat('&page=').concat(options.page);
                }
                if (options.filter) {
                    url = url.concat('&filter=').concat(options.filter);
                }
            }
            ApiDispatcher.dispatch(url, { method: 'GET', credentials: 'include' }, resolve, reject);
        });
    }

    getPost(id, editable) {
        let url = '/api/post/'.concat(id);
        if (editable) {
            url = url.concat('?editable=true');
        }
        return new Promise((resolve, reject) => {
            ApiDispatcher.dispatch(url, { method: 'GET', credentials: 'include' }, resolve, reject);
        });
    }

    addPost(post) {
        return new Promise((resolve, reject) => {
            ApiDispatcher.dispatch(
                '/api/post/',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify(post)
                }, resolve, reject
            );
        });
    }

    deletePost(id) {
        return new Promise((resolve, reject) => {
            ApiDispatcher.dispatch('/api/post/'.concat(id), { method: 'DELETE', credentials: 'include' }, resolve, reject);
        });
    }
}();
