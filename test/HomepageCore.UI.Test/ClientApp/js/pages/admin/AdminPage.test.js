var React = require("react");
var shallow = require("enzyme").shallow;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;
var _ = require("lodash");
var Actions = require("AppConstants").Actions;

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
    jest.mock("CategoryActionCreators");
    jest.mock("PostActionCreators");
    jest.mock("api/UserInfoApi");
});

describe("<AdminPage />", function(){
    it("should render the main contaner", function(){
        var mockDefaultDispatcher = require("DefaultDispatcher");
        var mockCategoryActionCreators = require("CategoryActionCreators");
        var mockPostActionCreators = require("PostActionCreators");
        var mockUserInfoApi = require("api/UserInfoApi");

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

        var AdminPage = require("pages/admin/AdminPage");

        //var wrapper = require("enzyme").mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={AdminPage}/></StaticRouter>);
        var wrapper = shallow(<AdminPage match={{params:{}}} />); // issue rendering draft js in enzyme.. using shallow renderer instead
        expect(wrapper.find(".admin").length).toBe(1);
    });
});