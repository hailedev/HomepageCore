var testcontext = require("api/UserInfoApi").default;

var urlResult;
global.fetch = jest.fn().mockImplementation(function(url, headers){
    urlResult = url;
    return new Promise(function(resolve, reject) {
        resolve({
            json: function() { 
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            }
        });
    });
});

describe("UserInfoApi", function() {
    describe("when calling getUserInfo", function() {
        it("should call the correct end point", function() {
            expect.assertions(1);
            return testcontext.getUserInfo().then(function(json) {
                expect(urlResult).toBe("/api/account/userinfo");
            });
        });
    });
});