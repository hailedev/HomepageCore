var Actions = require("AppConstants").Actions;

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
});

describe("CategoryStore", function() {
    describe("when instantiating", function(){
        it("registers a callback with the dispatcher", function() {
            var mockDispatcher = require("DefaultDispatcher");
            var testcontext = require("stores/CategoryStore");
            expect(mockDispatcher.register.mock.calls.length).toBe(1);
        });
        it("initializes with no items", function(){
            var testcontext = require("stores/CategoryStore");
            expect(testcontext.getState()).toBeNull();
        });
    });
    describe("when an action is dispatched", function(){
        describe("and action is type fetch categories", function(){
            it("updates store", function(){
                var mockDispatcher = require("DefaultDispatcher");
                var testcontext = require("stores/CategoryStore");
                mockDispatcher.isDispatching.mockImplementation(function(){
                    return true;
                });
                // trigger the update
                mockDispatcher.register.mock.calls[0][0]({ type: Actions.FETCH_CATEGORIES, payload: { response: [{"name":"test"}] } });
                expect(testcontext.getState().length).toBe(1);
            });
        });
    });
});