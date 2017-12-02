var Actions = require("AppConstants").Actions;

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
});

describe("PostStore", function() {
    describe("when instantiating", function(){
        it("registers a callback with the dispatcher", function() {
            var mockDispatcher = require("DefaultDispatcher");
            var testcontext = require("stores/PostStore");
            expect(mockDispatcher.register.mock.calls.length).toBe(1);
        });
        it("initializes with no items", function(){
            var testcontext = require("stores/PostStore");
            expect(Object.keys(testcontext.getState()).length).toBe(0);
        });
    });
    describe("when an action is dispatched", function(){
        describe("and action is type fetch posts", function(){
            it("updates store", function(){
                var mockDispatcher = require("DefaultDispatcher");
                var testcontext = require("stores/PostStore");
                mockDispatcher.isDispatching.mockImplementation(function(){
                    return true;
                });
                // trigger the update
                mockDispatcher.register.mock.calls[0][0]({ type: Actions.FETCH_POST, payload: { response: {"id":"1", "title":"test"} } });
                expect(Object.keys(testcontext.getState()).length).toBe(1);
                expect(testcontext.getState()["1"].title).toBe("test");
            });
        });
    });
});