import { UserManager } from 'oidc-client';

export default new class DefaultUserManager extends UserManager {
    constructor() {
        const settings = {
            authority: AUTHORITY,
            client_id: 'spa',
            redirect_uri: `${REDIRECT_URI}/signin-callback`,
            post_logout_redirect_uri: REDIRECT_URI,
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
