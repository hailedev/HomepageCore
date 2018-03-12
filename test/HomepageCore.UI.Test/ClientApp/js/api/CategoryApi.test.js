var testcontext = require("api/CategoryApi").default;

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

describe("CategoryApi", function() {
    describe("when calling getCategories", function() {
        it("should call the correct end point", function() {
            expect.assertions(1);
            return testcontext.getCategories().then(function(json) {
                expect(urlResult).toBe("/api/category");
            });
        });
    });
});