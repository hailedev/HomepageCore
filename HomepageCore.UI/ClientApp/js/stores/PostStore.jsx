var DefaultDispatcher = require("DefaultDispatcher");
var Actions = require("AppConstants").Actions;

var ReduceStore = require("flux/utils").ReduceStore;
var PostStore  = function(){
    ReduceStore.call(this, DefaultDispatcher);
};

PostStore.prototype = Object.create(ReduceStore.prototype);
PostStore.prototype.getInitialState = function(){
    return {};
};
PostStore.prototype.reduce = function(state, action){
    switch(action.type){
        case Actions.FETCH_POST:
            state[action.payload.response.id] = action.payload.response;
            return JSON.parse(JSON.stringify(state));
        default:
            return state;
    }
};

module.exports = new PostStore();