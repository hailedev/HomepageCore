import { Actions } from 'AppConstants';
import PostApi from '../api/PostApi';

export function getPost(id, editable) {
    return async function (dispatch) {
        try {
            const response = await PostApi.getPost(id, editable);
            dispatch({ type: Actions.FETCH_POST, payload: { response } });
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}

export function addPost(post) {
    return async function (dispatch) {
        try {
            const response = await PostApi.addPost(post);
            dispatch({ type: Actions.ADD_POST, payload: { response } });
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}

export function deletePost(id) {
    return async function (dispatch) {
        try {
            const response = await PostApi.deletePost(id);
            dispatch({ type: Actions.DELETE_POST, payload: { response } });
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}
