var ApiDispatcher = function(){};
ApiDispatcher.prototype.dispatch = function(promise, resolve, reject){
    promise().then(function(response){
            return response.json();
        })
        .then(function(json){
            if(json.errors) {
                reject(json.errors);
            }else{
                resolve(json);
            }
        })
        .catch(function (error) {
            var message = "Unknown error";
            if(error.statusText){
                message = error.statusText;
            } else if(error.message){
                message = error.message;
            }
            reject([message]);
        });
};
module.exports = new ApiDispatcher();