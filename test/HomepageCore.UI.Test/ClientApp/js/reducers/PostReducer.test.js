import testcontext from "reducers/PostReducer";
import { Actions } from "AppConstants";

beforeEach(function(){
    jest.resetModules();
});

describe("PostReducer", function() {
    describe("when state is not provider", function(){
        it("initializes with no items", function(){
            expect(testcontext()).toHaveLength(0);
        });
    });
    describe("when an action is dispatched", function(){
        describe("and action is type fetch posts", function(){
            it("mutates state", function(){
                const initialState = {"1": {"id":"1", "title":"test123"}};
                const action = { type: Actions.FETCH_POST, payload: { response: {"id":"2", "title":"test"} } };
                expect(testcontext({}, action)).toEqual({"2": {"id":"2", "title":"test"}});
                expect(testcontext(initialState, action)).toEqual({ ...initialState, "2": {"id":"2", "title":"test"} });

                action.payload.response.id = "1";
                expect(testcontext(initialState, action)).toEqual({ "1": {"id":"1", "title":"test"} });
            });
        });
    });
});