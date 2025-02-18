import { Actions } from 'AppConstants';

export default function categoryReducer(state = [], action = {}) {
    switch (action.type) {
        case Actions.FETCH_CATEGORIES:
            return action.payload.response;
        default:
            return state;
    }
}
