var ApiDispatcher = require("./ApiDispatcher");

var ContactApi = function(){};

ContactApi.prototype.lodgeFeedback = function(model){
    return new Promise(function(resolve, reject){
        ApiDispatcher.dispatch(fetch.bind(this,"/api/contact",
            {
                credentials:"include",
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(model)
            }),resolve,reject);
    });
};

module.exports = new ContactApi();