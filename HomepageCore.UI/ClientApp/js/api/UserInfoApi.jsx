var Promise = require("es6-promise").Promise;
var ApiDispatcher = require("./ApiDispatcher");

var UserInfoApi = function(){};

UserInfoApi.prototype.getUserInfo = function(){
    return new Promise(function(resolve, reject){
        ApiDispatcher.dispatch(fetch.bind(this,"/api/account/userinfo", { method: "GET", credentials:"include" }),resolve,reject);
    });
};

module.exports = new UserInfoApi();