import DefaultDispatcher from 'DefaultDispatcher';
import { Actions } from 'AppConstants';
import { ReduceStore } from 'flux/utils';

export default new class CategoryStore extends ReduceStore {
    constructor() {
        super(DefaultDispatcher);
    }

    getInitialState() {
        return null;
    }

    reduce(state, action) {
        switch (action.type) {
            case Actions.FETCH_CATEGORIES:
                return action.payload.response;
            default:
                return state;
        }
    }
}();
