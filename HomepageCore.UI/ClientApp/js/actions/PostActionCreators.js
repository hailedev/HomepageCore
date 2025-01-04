import DefaultDispatcher from 'DefaultDispatcher';
import { Actions } from 'AppConstants';
import PostApi from '../api/PostApi';

export default new class PostActionCreators {
    getPost(id, editable) {
        return new Promise(((resolve, reject) => {
            PostApi.getPost(id, editable)
                .then(response => {
                    if (!editable) {
                        DefaultDispatcher.dispatch({
                            type: Actions.FETCH_POST,
                            payload: { response }
                        });
                    }
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        }));
    }

    addPost(post) {
        return new Promise((resolve, reject) => {
            PostApi.addPost(post)
                .then(response => {
                    DefaultDispatcher.dispatch({
                        type: Actions.ADD_POST,
                        payload: { response }
                    });
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    deletePost(id) {
        return new Promise((resolve, reject) => {
            PostApi.deletePost(id)
                .then(response => {
                    DefaultDispatcher.dispatch({
                        type: Actions.DELETE_POST,
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
