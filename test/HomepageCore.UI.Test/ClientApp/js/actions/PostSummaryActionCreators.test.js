beforeEach(function(){
    jest.resetModules();
    jest.mock("PostApi");
    expect.hasAssertions();
});

describe("PostSummaryActionCreators", function() {
    describe("when calling getPostSummaries", function() {
        it("should call post API with range", function() {
            const mockPostApi = require("PostApi").default;
            mockPostApi.getPostSummaries.mockImplementation(function(range){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });

            const { getPostSummaries } = require("PostSummaryActionCreators");
            const mockCallback = jest.fn(x => {});
            return getPostSummaries({"start":0, "end":5}, false)(mockCallback).then(function(json) {
                expect(mockPostApi.getPostSummaries.mock.calls.length).toBeGreaterThan(0);
                expect(mockPostApi.getPostSummaries.mock.calls[0][0].start).toBe(0);
                expect(mockPostApi.getPostSummaries.mock.calls[0][0].end).toBe(5);
            });
        });
        it("should dispatch fetch post additional summaries action when update is true", function(){
            var actions = require("AppConstants").Actions;
            const mockPostApi = require("PostApi").default;
            mockPostApi.getPostSummaries.mockImplementation(function(post){
                return new Promise(function(resolve, reject){
                    resolve(post);
                });
            });

            const { getPostSummaries } = require("PostSummaryActionCreators");
            const mockCallback = jest.fn(x => {});
            return getPostSummaries({"start":0, "end":5}, true)(mockCallback).then(function(json) {
                expect(mockCallback.mock.calls.length).toBeGreaterThan(0);
                expect(mockCallback.mock.calls[0][0].type).toBe(actions.FETCH_POSTADDITIONALSUMMARIES);
            });
        });
    });
});