beforeEach(function(){
    jest.resetModules();
    jest.mock("api/PostApi");
    jest.mock("DefaultDispatcher");
    expect.hasAssertions();
});

describe("PostSummaryActionCreators", function() {
    describe("when calling getPostSummaries", function() {
        it("should call post API with range", function() {
            var mockPostApi = require("api/PostApi");
            mockPostApi.getPostSummaries.mockImplementation(function(range){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });
            var testcontext = require("actions/PostSummaryActionCreators");

            return testcontext.getPostSummaries({"start":0, "end":5}, false).then(function(json) {
                expect(mockPostApi.getPostSummaries.mock.calls.length).toBeGreaterThan(0);
                expect(mockPostApi.getPostSummaries.mock.calls[0][0].start).toBe(0);
                expect(mockPostApi.getPostSummaries.mock.calls[0][0].end).toBe(5);
            });
        });
        it("should dispatch fetch post additional summaries action when update is true", function(){
            var actions = require("AppConstants").Actions;
            var mockDispatcher = require("DefaultDispatcher");
            var mockPostApi = require("api/PostApi");
            mockPostApi.getPostSummaries.mockImplementation(function(post){
                return new Promise(function(resolve, reject){
                    resolve(post);
                });
            });
            var testcontext = require("actions/PostSummaryActionCreators");

            return testcontext.getPostSummaries({"start":0, "end":5}, true).then(function(json) {
                expect(mockDispatcher.dispatch.mock.calls.length).toBeGreaterThan(0);
                expect(mockDispatcher.dispatch.mock.calls[0][0].type).toBe(actions.FETCH_POSTADDITIONALSUMMARIES);
            });
        });
    });
});