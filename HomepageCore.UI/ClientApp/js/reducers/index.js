import { combineReducers } from 'redux';
import categories from './CategoryReducer';
import posts from './PostReducer';
import postSummaries from './PostSummaryReducer';
import user from './UserReducer';

const rootReducer = combineReducers({
    categories,
    posts,
    postSummaries,
    user
});

export default rootReducer;
