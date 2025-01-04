import DefaultDispatcher from 'DefaultDispatcher';
import { Actions } from 'AppConstants';
import { ReduceStore } from 'flux/utils';

export default new class PostSummaryStore extends ReduceStore {
    constructor() {
        super(DefaultDispatcher);
    }

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case Actions.FETCH_POSTSUMMARIES:
                return action.payload.response;
            case Actions.FETCH_POSTADDITIONALSUMMARIES:
                return state.concat(action.payload.response);
            default:
                return state;
        }
    }
}();
