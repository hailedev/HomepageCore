import React from "react";
import { shallow } from "enzyme";
import _ from "lodash";
import { Actions } from "AppConstants";

describe("<EditPage />", function(){
    var mockDefaultDispatcher, mockCategoryActionCreators, mockPostActionCreators, mockUserStore;    
    beforeEach(function(){
        jest.resetModules();
        jest.mock("DefaultDispatcher");
        jest.mock("CategoryActionCreators");
        jest.mock("PostActionCreators");
        jest.mock("UserStore");
    
        // setup mocks
        mockDefaultDispatcher = require("DefaultDispatcher").default;
        mockCategoryActionCreators = require("CategoryActionCreators").default;
        mockPostActionCreators = require("PostActionCreators").default;
        mockUserStore = require("UserStore").default;

        var callbacks = [];
        mockDefaultDispatcher.register.mockImplementation(function(cb){
            callbacks.push(cb);
        });

        mockUserStore.getDispatcher.mockImplementation(function(){
            return mockDefaultDispatcher;
        });

        mockUserStore.getState.mockImplementation(function(){
            return { name: 'test' };
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
    });
    it("should render the main contaner", function(){
        var EditPage = require("pages/admin/EditPage").default;
        //var wrapper = require("enzyme").mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={EditPage}/></StaticRouter>);
        var wrapper = shallow(<EditPage match={{params:{}}} />); // issue rendering draft js in enzyme.. using shallow renderer instead
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

        var EditPage = require("pages/admin/EditPage").default;
        var wrapper = shallow(<EditPage match={{params:{id:"1"}}} />);
        return done.then(function(){
            expect(mockPostActionCreators.getPost.mock.calls.length).toBe(1);
        });
    });
    it("should show empty div when not logged in", function(){
        mockUserStore.getState.mockImplementation(function(){
            return null;
        });
        var EditPage = require("pages/admin/EditPage").default;
        var wrapper = shallow(<EditPage match={{params:{}}} />);
        expect(wrapper.find(".admin").length).toBe(0);
    });
});