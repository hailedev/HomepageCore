beforeEach(function(){
    jest.resetModules();
    jest.mock("PostApi");
    expect.hasAssertions();
});

describe("PostActionCreators", function() {
    describe("when calling getPost", function() {
        it("should call post API", function() {
            const mockPostApi = require("PostApi").default;
            mockPostApi.getPost.mockImplementation(function(id, editable){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });

            const { getPost } = require("PostActionCreators");
            const mockCallback = jest.fn(x => {});
            return getPost("1234", false)(mockCallback).then(function(json) {
                expect(mockPostApi.getPost.mock.calls.length).toBeGreaterThan(0);
                expect(mockPostApi.getPost.mock.calls[0][0]).toBe("1234");
                expect(mockPostApi.getPost.mock.calls[0][1]).toBe(false);
            });
        });
        it("should not dispatch action when editable", function(){
            const mockPostApi = require("PostApi").default;
            mockPostApi.getPost.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });

            const { getPost } = require("PostActionCreators");
            const mockCallback = jest.fn(x => {});
            return getPost("1234", true)(mockCallback).then(function(json) {
                expect(mockCallback.mock.calls.length).toBe(0);
            });
        });
        it("should reject on error", function(){
            const mockPostApi = require("PostApi").default;
            mockPostApi.getPost.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    reject("something broke..");
                });
            });

            const { getPost } = require("PostActionCreators");
            const mockCallback = jest.fn(x => {});
            return getPost("1234", true)(mockCallback).catch(function(error) {
                expect(error).toBe("something broke..");
            });
        });
    });
    describe("when calling addPost", function(){
        it("should call post API", function() {
            const mockPostApi = require("PostApi").default;
            mockPostApi.addPost.mockImplementation(function(post){
                return new Promise(function(resolve, reject){
                    resolve(post);
                });
            });

            const { addPost } = require("PostActionCreators");
            const mockCallback = jest.fn(x => {});
            return addPost({"content":"the quick brown fox"})(mockCallback).then(function(json) {
                expect(mockPostApi.addPost.mock.calls.length).toBeGreaterThan(0);
                expect(json.content).toBe("the quick brown fox");
            });
        });
        it("should dispatch action", function(){
            const mockPostApi = require("PostApi").default;
            mockPostApi.addPost.mockImplementation(function(post){
                return new Promise(function(resolve, reject){
                    resolve(post);
                });
            });

            const { addPost } = require("PostActionCreators");
            const mockCallback = jest.fn(x => {});
            return addPost({"content":"the quick brown fox"})(mockCallback).then(function(json) {
                expect(mockCallback.mock.calls.length).toBeGreaterThan(0);
            });
        });
    });
});