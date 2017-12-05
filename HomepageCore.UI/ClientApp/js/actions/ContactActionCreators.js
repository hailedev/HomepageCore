var ContactApi = require("../api/ContactApi");

var ContactActionCreators = function(){ };
ContactActionCreators.prototype.lodgeFeedback = function(model){
    return new Promise(function(resolve, reject){
        ContactApi.lodgeFeedback(model)
            .then(function(response){
                resolve(response);
            })
            .catch(function(error){
                reject(error);
            });
    });
};

module.exports = new ContactActionCreators();