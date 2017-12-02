var Actions = require("AppConstants").Actions;

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
});

describe("PostSummaryStore", function() {
    describe("when instantiating", function(){
        it("registers a callback with the dispatcher", function() {
            var mockDispatcher = require("DefaultDispatcher");
            var testcontext = require("stores/PostSummaryStore");
            expect(mockDispatcher.register.mock.calls.length).toBe(1);
        });
        it("initializes with no items", function(){
            var testcontext = require("stores/PostSummaryStore");
            expect(testcontext.getState().length).toBe(0);
        });
    });
    describe("when an action is dispatched", function(){
        describe("and action is type fetch post summaries", function(){
            it("updates store", function(){
                var mockDispatcher = require("DefaultDispatcher");
                var testcontext = require("stores/PostSummaryStore");
                mockDispatcher.isDispatching.mockImplementation(function(){
                    return true;
                });
                // trigger the update
                mockDispatcher.register.mock.calls[0][0]({ type: Actions.FETCH_POSTSUMMARIES, payload: { response: [ {"id":"1"}, {"id":"2"} ] } });
                expect(testcontext.getState().length).toBe(2);

                mockDispatcher.register.mock.calls[0][0]({ type: Actions.FETCH_POSTADDITIONALSUMMARIES, payload: { response: [ {"id":"3"} ] } });
                expect(testcontext.getState().length).toBe(3);
            });
        });
    });
});