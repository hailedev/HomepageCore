import { Actions } from '../constants/AppConstants';
import DefaultDispatcher from '../dispatchers/DefaultDispatcher';
import DefaultUserManager from '../services/DefaultUserManager';

export default new class UserActionCreators {
    setUserInfo() {
        return new Promise((resolve, reject) => {
            DefaultUserManager.getUser()
                .then(user => {
                    DefaultDispatcher.dispatch({
                        type: Actions.FETCH_USER,
                        payload: { user }
                    });
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    signOutUser() {
        return new Promise((resolve, reject) => {
            DefaultUserManager.signoutRedirect()
                .then(resp => {
                    DefaultDispatcher.dispatch({
                        type: Actions.SIGNOUT_USER
                    });
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}();
