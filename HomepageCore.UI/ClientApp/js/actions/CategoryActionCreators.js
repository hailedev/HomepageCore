import DefaultDispatcher from 'DefaultDispatcher';
import { Actions } from 'AppConstants';
import CategoryApi from '../api/CategoryApi';

export default new class CategoryActionCreators {
    getCategories() {
        return new Promise((resolve, reject) => {
            CategoryApi.getCategories()
                .then(response => {
                    DefaultDispatcher.dispatch({
                        type: Actions.FETCH_CATEGORIES,
                        payload: { response }
                    });
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}();
