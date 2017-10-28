var Promise = require("es6-promise").Promise;
var ApiDispatcher = require("./ApiDispatcher");

var CategoryApi = function(){};

CategoryApi.prototype.getCategories = function(){
    return new Promise(function(resolve, reject){
        ApiDispatcher.dispatch(fetch.bind(this,"/api/category", { method: "GET", credentials:"include" }),resolve,reject);
    });
};

module.exports = new CategoryApi();