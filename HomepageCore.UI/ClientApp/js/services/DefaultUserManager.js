import { UserManager } from 'oidc-client';
import env from 'env';

export default new class DefaultUserManager extends UserManager {
    constructor() {
        const settings = {
            authority: env.OpenIdConnect.Authority,
            client_id: 'spa',
            redirect_uri: `${env.OpenIdConnect.RedirectUri}/signin-callback`,
            post_logout_redirect_uri: env.OpenIdConnect.RedirectUri,
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
