import ApiDispatcher from './ApiDispatcher';

export default new class CategoryApi {
    getCategories() {
        return new Promise((resolve, reject) => {
            ApiDispatcher.dispatch('/api/category', { method: 'GET', credentials: 'include' }, resolve, reject);
        });
    }
}();
