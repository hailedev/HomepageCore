var Promise = require("es6-promise").Promise;
var ApiDispatcher = require("./ApiDispatcher");

var PostApi = function(){};

PostApi.prototype.getPostSummaries = function(options){
    return new Promise(function(resolve, reject){
        var url = "/api/post?summary=true";
        if(options){
            if(options.page){
                url = url.concat("&page=").concat(options.page);
            }
            if(options.filter){
                url = url.concat("&filter=").concat(options.filter);
            }
        }
        ApiDispatcher.dispatch(fetch.bind(this,url, { method: "GET", credentials:"include" }),resolve,reject);
    });
};

PostApi.prototype.getPost = function(id,editable){
    var url = "/api/post/".concat(id);
    if(editable){
        url = url.concat("?editable=true");
    }
    return new Promise(function(resolve, reject){
        ApiDispatcher.dispatch(fetch.bind(this,url, { method: "GET", credentials:"include" }),resolve,reject);
    });
};

PostApi.prototype.addPost = function(post){
    return new Promise(function(resolve, reject){
        ApiDispatcher.dispatch(fetch.bind(this,"/api/post/",
            {
                method: "POST",
                credentials:"include",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(post)
            }),resolve,reject);
    });
};

module.exports = new PostApi();