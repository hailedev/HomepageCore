import { Actions } from '../constants/AppConstants';
import DefaultUserManager from '../services/DefaultUserManager';

export function setUserInfo() {
    return async function (dispatch) {
        try {
            const user = await DefaultUserManager.getUser();
            dispatch({ type: Actions.FETCH_USER, payload: { user } });
            return user;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}

export function signOutUser() {
    return async function (dispatch) {
        try {
            await DefaultUserManager.signoutRedirect();
            dispatch({ type: Actions.SIGNOUT_USER, payload: null });
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}
