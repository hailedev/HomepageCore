import DefaultDispatcher from 'DefaultDispatcher';
import { Actions } from 'AppConstants';
import { ReduceStore } from 'flux/utils';

export default new class PostStore extends ReduceStore {
    constructor() {
        super(DefaultDispatcher);
    }

    getInitialState() {
        return {};
    }

    reduce(state, action) {
        switch (action.type) {
            case Actions.FETCH_POST:
                state[action.payload.response.id] = action.payload.response;
                return JSON.parse(JSON.stringify(state));
            default:
                return state;
        }
    }
}();
