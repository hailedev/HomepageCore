var React = require("react");
var shallow = require("enzyme").shallow;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
    jest.mock("CategoryStore");
    jest.mock("CategoryActionCreators");
    jest.mock("PostActionCreators");
    jest.mock("api/UserInfoApi");
});

describe("<AdminPage />", function(){
    it("should render the main contaner", function(){
        var mockDefaultDispatcher = require("DefaultDispatcher");
        mockDefaultDispatcher.register.mockImplementation(function(){

        });
        var mockCategoryStore = require("CategoryStore");
        mockCategoryStore.getDispatcher.mockImplementation(function(){
            return mockDefaultDispatcher;
        });
        mockCategoryStore.getState.mockImplementation(function(){
            return [{ id:"123", name:"test"}];
        });

        var mockCategoryActionCreators = require("CategoryActionCreators");
        var mockPostActionCreators = require("PostActionCreators");
        var mockUserInfoApi = require("api/UserInfoApi");
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