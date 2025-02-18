import { Actions } from 'AppConstants';
import PostApi from '../api/PostApi';

export function getPostSummaries(range, update) {
    return async function (dispatch) {
        try {
            const response = await PostApi.getPostSummaries(range);
            dispatch({ type: update ? Actions.FETCH_POSTADDITIONALSUMMARIES : Actions.FETCH_POSTSUMMARIES, payload: { response } });
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}
