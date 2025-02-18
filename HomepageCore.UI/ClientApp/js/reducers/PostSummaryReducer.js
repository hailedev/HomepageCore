import { Actions } from 'AppConstants';

export default function postSummaryReducer(state = [], action = {}) {
    switch (action.type) {
        case Actions.FETCH_POSTSUMMARIES:
            return action.payload.response;
        case Actions.FETCH_POSTADDITIONALSUMMARIES:
            return state.concat(action.payload.response);
        default:
            return state;
    }
}
