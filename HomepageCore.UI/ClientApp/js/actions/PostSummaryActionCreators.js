import DefaultDispatcher from 'DefaultDispatcher';
import { Actions } from 'AppConstants';
import PostApi from '../api/PostApi';

export default new class PostActionCreators {
    getPostSummaries(range, update) {
        return new Promise(((resolve, reject) => {
            PostApi.getPostSummaries(range)
                .then((response) => {
                    DefaultDispatcher.dispatch({
                        type: update ? Actions.FETCH_POSTADDITIONALSUMMARIES : Actions.FETCH_POSTSUMMARIES,
                        payload: { response }
                    });
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        }));
    }
}();
