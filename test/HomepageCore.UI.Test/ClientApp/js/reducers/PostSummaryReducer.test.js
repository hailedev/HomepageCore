import testcontext from "reducers/PostSummaryReducer";
import { Actions } from "AppConstants";

beforeEach(function(){
    jest.resetModules();
});

describe("PostSummaryReducer", function() {
    describe("when state is not provider", function(){
        it("initializes with no items", function(){
            expect(testcontext()).toHaveLength(0);
        });
    });

    describe("when an action is dispatched", function(){
        describe("and action is type fetch post summaries", function(){
            it("mutates state", function(){
                const action = { type: Actions.FETCH_POSTSUMMARIES, payload: { response: [ {"id":"1"}, {"id":"2"} ] } };
                expect(testcontext([], action)).toHaveLength(2);
            });
        });

        describe("and action is type fetch additional post summaries", function(){
            it("mutates state", function(){
                const initialState = [ {"id":"1"}, {"id":"2"} ];
                const action = { type: Actions.FETCH_POSTADDITIONALSUMMARIES, payload: { response: [ {"id":"3"} ] } };
                expect(testcontext(initialState, action)).toHaveLength(3);
            });
        });
    });
});
