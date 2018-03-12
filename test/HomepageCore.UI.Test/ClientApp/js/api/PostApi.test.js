var testcontext = require("api/PostApi").default;

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

describe("PostApi", function() {
    describe("when calling getPostSummaries", function() {
        it("should call the correct end point", function() {
            expect.assertions(1);
            return testcontext.getPostSummaries().then(function(json) {
                expect(urlResult).toContain("/api/post");
            });
        });
        it("should should set the summary flag", function() {
            expect.assertions(1);
            return testcontext.getPostSummaries({}).then(function(json) {
                expect(urlResult).toContain("?summary=true");
            });
        });
        describe("with page number set", function() {
            it("should add page number to request", function() {
                expect.assertions(1);
                return testcontext.getPostSummaries({page:3}).then(function(json) {
                    expect(urlResult).toContain("&page=3");
                });
            })
        });
        describe("with filter set", function() {
            it("should add filter to request", function() {
                expect.assertions(1);
                return testcontext.getPostSummaries({filter:"1234"}).then(function(json) {
                    expect(urlResult).toContain("&filter=1234");
                });
            })
        });
    });
    describe("when calling getPost", function() {
        it("should set the post id in url", function(){
            expect.assertions(1);
            return testcontext.getPost("1234").then(function(json) {
                expect(urlResult).toBe("/api/post/1234");
            });
        });
    });
    describe("when calling addPost", function() {
        it("should set the proper headers", function() {
            expect.assertions(3);
            return testcontext.addPost({}).then(function(json) {
                expect(headersResult.method.toLowerCase()).toBe("post");
                expect(headersResult.headers["Accept"].toLowerCase()).toBe("application/json");
                expect(headersResult.headers["Content-Type"].toLowerCase()).toBe("application/json");
            });
        });
        it("should set post content", function() {
            expect.assertions(1);
            return testcontext.addPost({"content":"the quick brown fox jumps over the lazy dog"}).then(function(json) {
                expect(headersResult.body).toBe("{\"content\":\"the quick brown fox jumps over the lazy dog\"}");
            });
        });
    });
});