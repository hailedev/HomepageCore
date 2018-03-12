var React = require("react");
var mount = require("enzyme").mount;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;
var _ = require("lodash");
var Actions = require("AppConstants").Actions;

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
    jest.mock("CategoryActionCreators");
    jest.mock("PostSummaryActionCreators");
    jest.mock("env");
});

describe("<HomeLandingPage />", function(){
    it("should render all elements", function(){
        var mockDefaultDispatcher = require("DefaultDispatcher").default;
        var mockCategoryActionCreators = require("CategoryActionCreators").default;
        var mockPostSummaryActionCreators = require("PostSummaryActionCreators").default;

        // setup dispatcher
        var callbacks = [];
        mockDefaultDispatcher.register.mockImplementation(function(callback){
            callbacks.push(callback);
        });

        // setup post action creator
        mockPostSummaryActionCreators.getPostSummaries.mockImplementation(function(){
            return new Promise(function(resolve, reject){
                mockDefaultDispatcher.isDispatching.mockImplementation(function(){
                    return true;
                });
                _(callbacks).each(function(cb){
                    cb({
                        type: Actions.FETCH_POSTSUMMARIES,
                        payload: { 
                            response: [
                                {
                                    id:"1",
                                    title:"test1",
                                    blurb:"the quick brown fox",
                                    categoryId:"cat1",
                                    day: 1,
                                    month: "Jan"
                                },
                                {
                                    id:"2",
                                    title:"test2",
                                    blurb:"the quick brown fox",
                                    categoryId:"cat2",
                                    day: 1,
                                    month: "Feb"
                                }
                            ] 
                        }
                    });
                });
                mockDefaultDispatcher.isDispatching.mockImplementation(function(){
                    return false;
                });
                resolve();
            });
        });

        // setup category action creator
        mockCategoryActionCreators.getCategories.mockImplementation(function(){
            return new Promise(function(resolve, reject){
                mockDefaultDispatcher.isDispatching.mockImplementation(function(){
                    return true;
                });
                _(callbacks).each(function(cb){
                    cb({
                        type: Actions.FETCH_CATEGORIES,
                        payload: { response: [{id:"1", title:"test1"}, {id:"2", title:"test2"}] }
                    });
                });
                mockDefaultDispatcher.isDispatching.mockImplementation(function(){
                    return false;
                });
                resolve();
            });
        });

        var HomeLandingPage = require("pages/home/HomeLandingPage").default;
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={HomeLandingPage}/></StaticRouter>);

        // renders the main container
        expect(wrapper.find(".homepage").length).toBe(1);
    });
});