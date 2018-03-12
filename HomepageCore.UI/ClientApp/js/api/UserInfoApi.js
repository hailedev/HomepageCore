import ApiDispatcher from './ApiDispatcher';

export default new class UserInfoApi {
    getUserInfo() {
        return new Promise(function (resolve, reject) {
            ApiDispatcher.dispatch(fetch.bind(this, '/api/account/userinfo', { method: 'GET', credentials: 'include' }), resolve, reject);
        });
    }
}();
