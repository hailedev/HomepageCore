import ApiDispatcher from './ApiDispatcher';

export default new class CategoryApi {
    getCategories() {
        return new Promise(function (resolve, reject) {
            ApiDispatcher.dispatch(fetch.bind(this, '/api/category', { method: 'GET', credentials: 'include' }), resolve, reject);
        });
    }
}();
