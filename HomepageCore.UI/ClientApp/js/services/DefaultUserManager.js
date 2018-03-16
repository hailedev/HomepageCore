import { UserManager } from 'oidc-client';

export default new class DefaultUserManager extends UserManager {
    constructor() {
        const settings = {
            authority: 'http://localhost:5000',
            client_id: 'spa',
            redirect_uri: 'http://localhost:5001/signin-callback',
            post_logout_redirect_uri: 'http://localhost:5001',
            response_type: 'id_token token',
            // scope: 'openid email roles',
            scope: 'openid profile api1',

            // popup_redirect_uri:'http://localhost:5000/user-manager-sample-popup-signin.html',
            // popup_post_logout_redirect_uri:'http://localhost:5000/user-manager-sample-popup-signout.html',

            // silent_redirect_uri:'http://localhost:5000/user-manager-sample-silent.html',
            // automaticSilentRenew:true,
            // silentRequestTimeout:10000,

            filterProtocolClaims: true,
            loadUserInfo: true
        };
        super(settings);
    }
}();
