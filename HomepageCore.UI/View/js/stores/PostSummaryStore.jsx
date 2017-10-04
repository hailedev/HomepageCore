var DefaultDispatcher = require("DefaultDispatcher");
var Actions = require("AppConstants").Actions;

var ReduceStore = require("flux/utils").ReduceStore;
var PostSummaryStore  = function(){
    ReduceStore.call(this, DefaultDispatcher);
};

PostSummaryStore.prototype = Object.create(ReduceStore.prototype);
PostSummaryStore.prototype.getInitialState = function(){
    return [];
};
PostSummaryStore.prototype.reduce = function(state, action){
    switch(action.type){
        case Actions.FETCH_POSTSUMMARIES:
            return action.payload.response;
        case Actions.FETCH_POSTADDITIONALSUMMARIES:
            return state.concat(action.payload.response);
        default:
            return state;
    }
};

module.exports = new PostSummaryStore();