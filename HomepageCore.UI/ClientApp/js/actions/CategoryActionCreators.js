var DefaultDispatcher = require("DefaultDispatcher");
var CategoryApi = require("../api/CategoryApi");
var Actions = require("AppConstants").Actions;

var CategoryActionCreators = function(){ };
CategoryActionCreators.prototype.getCategories = function(id){
    return new Promise(function(resolve, reject){
        CategoryApi.getCategories()
            .then(function(response){
                DefaultDispatcher.dispatch({
                    type: Actions.FETCH_CATEGORIES,
                    payload: { response: response }
                });
                resolve(response);
            })
            .catch(function(error){
                reject(error);
            });
    });
};

module.exports = new CategoryActionCreators();