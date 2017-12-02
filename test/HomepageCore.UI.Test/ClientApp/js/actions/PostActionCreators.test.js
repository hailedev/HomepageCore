beforeEach(function(){
    jest.resetModules();
    jest.mock("api/PostApi");
    jest.mock("DefaultDispatcher");
    expect.hasAssertions();
});

describe("PostActionCreators", function() {
    describe("when calling getPost", function() {
        it("should call post API", function() {
            var mockPostApi = require("api/PostApi");
            mockPostApi.getPost.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });
            var testcontext = require("actions/PostActionCreators");

            return testcontext.getPost("1234", false).then(function(json) {
                expect(mockPostApi.getPost.mock.calls.length).toBeGreaterThan(0);
                expect(mockPostApi.getPost.mock.calls[0][0]).toBe("1234");
                expect(mockPostApi.getPost.mock.calls[0][1]).toBe(false);
            });
        });
        it("should not dispatch action when editable", function(){
            var mockDispatcher = require("DefaultDispatcher");
            var mockPostApi = require("api/PostApi");
            mockPostApi.getPost.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });
            var testcontext = require("actions/PostActionCreators");

            return testcontext.getPost("1234", true).then(function(json) {
                expect(mockDispatcher.dispatch.mock.calls.length).toBe(0);
            });
        });
        it("should reject on error", function(){
            var mockPostApi = require("api/PostApi");
            mockPostApi.getPost.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    reject("something broke..");
                });
            });
            var testcontext = require("actions/PostActionCreators");

            return testcontext.getPost("1234", true).catch(function(error) {
                expect(error).toBe("something broke..");
            });
        });
    });
    describe("when calling addPost", function(){
        it("should call post API", function() {
            var mockPostApi = require("api/PostApi");
            mockPostApi.addPost.mockImplementation(function(post){
                return new Promise(function(resolve, reject){
                    resolve(post);
                });
            });
            var testcontext = require("actions/PostActionCreators");

            return testcontext.addPost({"content":"the quick brown fox"}).then(function(json) {
                expect(mockPostApi.addPost.mock.calls.length).toBeGreaterThan(0);
                expect(json.content).toBe("the quick brown fox");
            });
        });
        it("should dispatch action", function(){
            var mockDispatcher = require("DefaultDispatcher");
            var mockPostApi = require("api/PostApi");
            mockPostApi.addPost.mockImplementation(function(post){
                return new Promise(function(resolve, reject){
                    resolve(post);
                });
            });
            var testcontext = require("actions/PostActionCreators");

            return testcontext.addPost({"content":"the quick brown fox"}).then(function(json) {
                expect(mockDispatcher.dispatch.mock.calls.length).toBeGreaterThan(0);
            });
        });
    });
});