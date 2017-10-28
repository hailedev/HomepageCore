var DefaultDispatcher = require("DefaultDispatcher");
var Actions = require("AppConstants").Actions;

var ReduceStore = require("flux/utils").ReduceStore;
var CategoryStore  = function(){
    ReduceStore.call(this, DefaultDispatcher);
};

CategoryStore.prototype = Object.create(ReduceStore.prototype);
CategoryStore.prototype.getInitialState = function(){
    return null;
};
CategoryStore.prototype.reduce = function(state, action){
    switch(action.type){
        case Actions.FETCH_CATEGORIES:
            return action.payload.response;
        default:
            return state;
    }
};

module.exports = new CategoryStore();