import { Actions } from 'AppConstants';

export default function postReducer(state = {}, action = {}) {
    switch (action.type) {
        case Actions.FETCH_POST:
            return { ...state, [action.payload.response.id]: action.payload.response };
        default:
            return state;
    }
}
