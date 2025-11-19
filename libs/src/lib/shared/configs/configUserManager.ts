import { UserManager } from 'oidc-client-ts';

const config = {
    authority: 'https://127.0.0.1:4301',       // Your auth server URL
    client_id: 'oidc-client',
    redirect_uri: 'http://localhost:4400/shop/callback', // Your React app callback
    response_type: 'code',                   // Authorization Code Flow
    scope: 'openid profile',
    post_logout_redirect_uri: 'http://localhost:4400/',
    automaticSilentRenew: true,             // optional, renew tokens automatically
};

export const userManager = new UserManager(config);

userManager.events.addUserLoaded((user) => {
    console.log('User loaded:', user);
});

userManager.events.addAccessTokenExpiring(() => {
    console.log('Access token is about to expire');
});

userManager.events.addAccessTokenExpired(() => {
    console.log('Access token has expired');
    userManager.removeUser();
});

userManager.events.addSilentRenewError((error) => {
    console.error('Silent renew error:', error);
});

userManager.events.addUserSignedOut(() => {
    console.log('User signed out');
    userManager.removeUser();
});
userManager.events.addUserSignedIn(() => {
    console.log('User signed in');
});

//export  userManager;