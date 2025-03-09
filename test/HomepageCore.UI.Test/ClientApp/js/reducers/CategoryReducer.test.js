import testcontext from "reducers/CategoryReducer";
import { Actions } from "AppConstants";

beforeEach(function(){
    jest.resetModules();
});

describe("CategoryReducer", function() {
    describe("when state is not provider", function(){
        it("initializes with no items", function(){
            expect(testcontext()).toHaveLength(0);
        });
    });
    describe("when an action is dispatched", function(){
        describe("and action is type fetch categories", function(){
            it("mutates state", function(){
                const action = { type: Actions.FETCH_CATEGORIES, payload: { response: [{"name":"test"}] } };
                expect(testcontext([], action)).toEqual(action.payload.response);
                expect(testcontext([{"name":"foo"}, {"name":"bar"}], action)).toEqual(action.payload.response);
            });
        });
    });
});