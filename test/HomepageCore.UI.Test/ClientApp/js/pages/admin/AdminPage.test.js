var React = require("react");
var shallow = require("enzyme").shallow;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;
var _ = require("lodash");
var Actions = require("AppConstants").Actions;

describe("<AdminPage />", function(){
    var mockDefaultDispatcher, mockCategoryActionCreators, mockPostActionCreators,mockUserInfoApi;    
    beforeEach(function(){
        jest.resetModules();
        jest.mock("DefaultDispatcher");
        jest.mock("CategoryActionCreators");
        jest.mock("PostActionCreators");
        jest.mock("api/UserInfoApi");
    
        // setup mocks
        mockDefaultDispatcher = require("DefaultDispatcher");
        mockCategoryActionCreators = require("CategoryActionCreators");
        mockPostActionCreators = require("PostActionCreators");
        mockUserInfoApi = require("api/UserInfoApi");

        var callbacks = [];
        mockDefaultDispatcher.register.mockImplementation(function(cb){
            callbacks.push(cb);
        });

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

        mockUserInfoApi.getUserInfo.mockImplementation(function(){
            return new Promise(function(resolve, reject){
                resolve();
            });
        });
    });
    it("should render the main contaner", function(){
        var AdminPage = require("pages/admin/AdminPage");

        //var wrapper = require("enzyme").mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={AdminPage}/></StaticRouter>);
        var wrapper = shallow(<AdminPage match={{params:{}}} />); // issue rendering draft js in enzyme.. using shallow renderer instead
        expect(wrapper.find(".admin").length).toBe(1);
    });
    it("should load post content", function(){
        expect.hasAssertions();
        var done = new Promise(function(resolve, reject){
            resolve({id:"1", title:"test", raw:'{"entityMap":{},"blocks":[{"key":"d39lt","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'});
        });
        mockPostActionCreators.getPost.mockImplementation(function(){
            return done;
        });

        var AdminPage = require("pages/admin/AdminPage");
        var wrapper = shallow(<AdminPage match={{params:{id:"1"}}} />);
        return done.then(function(){
            expect(mockPostActionCreators.getPost.mock.calls.length).toBe(1);
        });
    });
    it("should set logged in state when successful", function(){
        expect.hasAssertions();
        var done = new Promise(function(resolve, reject){
            resolve();
        });
        mockUserInfoApi.getUserInfo.mockImplementation(function(){
            return done;
        });
        var AdminPage = require("pages/admin/AdminPage");
        var wrapper = shallow(<AdminPage match={{params:{}}} />);
        return done.then(function(){
            expect(wrapper.state().loggedIn).toBe(true);
        });
    });
});