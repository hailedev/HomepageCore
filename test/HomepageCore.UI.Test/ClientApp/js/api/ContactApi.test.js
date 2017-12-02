var testcontext = require("api/ContactApi");

var urlResult, headersResult, jsonResult = {id:"test"};
global.fetch = jest.fn().mockImplementation(function(url, headers){
    urlResult = url;
    headersResult = headers;
    return new Promise(function(resolve, reject) {
        resolve({
            json: function() { 
                return new Promise(function(resolve, reject){
                    resolve(jsonResult);
                });
            }
        });
    });
});

describe("ContactApi", function() {
    describe("when calling lodgeFeedback", function() {
        beforeEach(function(){
            expect.hasAssertions();
        });
        it("should call the correct end point", function() {
            return testcontext.lodgeFeedback().then(function(json) {
                expect(urlResult).toBe("/api/contact");
            });
        });
        it("should set the request body content", function() {
            return testcontext.lodgeFeedback({"content":"the quick brown fox jumps over the lazy dog"}).then(function(json) {
                expect(headersResult.body).toBe("{\"content\":\"the quick brown fox jumps over the lazy dog\"}");
            });
        });
    });
});