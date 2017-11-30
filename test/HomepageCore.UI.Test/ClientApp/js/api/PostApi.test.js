var testcontext = require("api/PostApi");

describe("PostApi", function() {
    describe("when calling getPostSummaries", function() {
        it("should should set the summary flag", function() {
            var search;
            global.fetch = jest.fn().mockImplementation(function(url, options){
                search = url;
                return new Promise(function(resolve, reject) {
                    resolve({
                        json: function() { 
                            return new Promise(function(resolve, reject){
                                resolve({id:"test"});
                            });
                        }
                    });
                });
            });
            testcontext.getPostSummaries({page:false, filter:false}).then(function(json) {
                expect(search).toContain("?summary=true");
            });
        });
    });
});