import { ReduceStore } from 'flux/utils';
import DefaultDispatcher from '../dispatchers/DefaultDispatcher';
import { Actions } from '../constants/AppConstants';

export default new class UserStore extends ReduceStore {
    constructor() {
        super(DefaultDispatcher);
    }
    getInitialState() {
        return null;
    }
    reduce(state, action) {
        switch (action.type) {
            case Actions.FETCH_USER:
                return action.payload.user;
            case Actions.SIGNOUT_USER:
                return null;
            default:
                return state;
        }
    }
}();
