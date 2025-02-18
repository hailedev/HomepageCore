import { Actions } from 'AppConstants';

export default function userReducer(state = null, action = {}) {
    switch (action.type) {
        case Actions.FETCH_USER:
            return action.payload.user;
        case Actions.SIGNOUT_USER:
            return null;
        default:
            return state;
    }
}
