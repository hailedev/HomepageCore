beforeEach(function(){
    jest.resetModules();
    jest.mock("CategoryApi");
    expect.hasAssertions();
});

describe("CategoryActionCreators", function() {
    describe("when calling getCategories", function() {
        it("should call categories API", function() {
            const mockCategoryApi = require("CategoryApi").default;
            mockCategoryApi.getCategories.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });

            const { getCategories } = require("CategoryActionCreators");
            const mockCallback = jest.fn(x => {});
            return getCategories()(mockCallback).then(function(json) {
                expect(mockCategoryApi.getCategories.mock.calls.length).toBeGreaterThan(0);
            });
        });
        it("should dispatch action on success", function(){
            const mockCategoryApi = require("CategoryApi").default;
            mockCategoryApi.getCategories.mockImplementation(function(){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });

            const { getCategories } = require("CategoryActionCreators");
            const mockCallback = jest.fn(x => {});
            return getCategories()(mockCallback).then(function(json) {
                expect(mockCallback.mock.calls.length).toBeGreaterThan(0);
            });
        });
    });
});