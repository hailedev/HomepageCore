var DefaultDispatcher = require("DefaultDispatcher");
var PostApi = require("../api/PostApi");
var Actions = require("AppConstants").Actions;
var Promise = require("es6-promise").Promise;

var PostActionCreators = function(){ };
PostActionCreators.prototype.getPost = function(id,editable){
    return new Promise(function(resolve, reject){
        PostApi.getPost(id,editable)
            .then(function(response){
                if(!editable){
                    DefaultDispatcher.dispatch({
                        type: Actions.FETCH_POST,
                        payload: { response: response }
                    });
                }
                resolve(response);
            })
            .catch(function(error){
                reject(error);
            });
    });
};

PostActionCreators.prototype.addPost = function(post){
    return new Promise(function(resolve, reject){
        PostApi.addPost(post)
            .then(function(response){
                DefaultDispatcher.dispatch({
                    type: Actions.ADD_POST,
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