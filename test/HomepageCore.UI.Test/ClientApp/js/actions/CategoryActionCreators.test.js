beforeEach(function(){
    jest.resetModules();
    jest.mock("api/CategoryApi");
    jest.mock("DefaultDispatcher");
    expect.hasAssertions();
});

describe("CategoryActionCreators", function() {
    describe("when calling getCategories", function() {
        it("should call categories API", function() {
            var mockCategoryApi = require("api/CategoryApi");
            mockCategoryApi.getCategories.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });
            var testcontext = require("actions/CategoryActionCreators");

            return testcontext.getCategories().then(function(json) {
                expect(mockCategoryApi.getCategories.mock.calls.length).toBeGreaterThan(0);
            });
        });
        it("should dispatch action on success", function(){
            var mockDispatcher = require("DefaultDispatcher");
            var mockCategoryApi = require("api/CategoryApi");
            mockCategoryApi.getCategories.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });
            var testcontext = require("actions/CategoryActionCreators");

            return testcontext.getCategories().then(function(json) {
                expect(mockDispatcher.dispatch.mock.calls.length).toBeGreaterThan(0);
            });
        });
    });
});