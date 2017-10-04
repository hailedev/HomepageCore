var DefaultDispatcher = require("DefaultDispatcher");
var PostApi = require("../api/PostApi");
var Actions = require("AppConstants").Actions;
var Promise = require("es6-promise").Promise;

var PostActionCreators = function(){ };
PostActionCreators.prototype.getPostSummaries = function(range, update){
    return new Promise(function(resolve, reject){
        PostApi.getPostSummaries(range)
            .then(function(response){
                DefaultDispatcher.dispatch({
                    type: update ? Actions.FETCH_POSTADDITIONALSUMMARIES : Actions.FETCH_POSTSUMMARIES,
                    payload: { response: response }
                });
                resolve(response);
            })
            .catch(function(error){
                reject(error);
            });
    });
};

module.exports = new PostActionCreators();