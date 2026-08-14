import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { authConfig } from './authConfig';

const userManager = new UserManager({
    ...authConfig,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export const login = () => userManager.signinRedirect();
export const handleCallback = () => userManager.signinCallback();
export const getUser = () => userManager.getUser();
export const logout = () => userManager.signoutRedirect();

export default userManager;