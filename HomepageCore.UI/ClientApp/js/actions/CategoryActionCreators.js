import { Actions } from 'AppConstants';
import CategoryApi from '../api/CategoryApi';

export function getCategories() {
    return async function (dispatch) {
        try {
            const response = await CategoryApi.getCategories();
            dispatch({ type: Actions.FETCH_CATEGORIES, payload: { response } });
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}
