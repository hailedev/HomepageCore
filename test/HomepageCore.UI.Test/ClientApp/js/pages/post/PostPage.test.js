import React from "react";
import { mount } from "enzyme";
import { StaticRouter, Route } from "react-router-dom";
import _ from "lodash";
import { Actions } from "AppConstants";

beforeEach(function(){
    jest.resetModules();
    jest.mock("DefaultDispatcher");
    jest.mock("PostActionCreators");
});

describe("<PostPage />", function(){
    it("should render all elements", function(){
        var mockDefaultDispatcher = require("DefaultDispatcher").default;
        var mockPostActionCreators = require("PostActionCreators").default;

        // setup dispatcher
        var callbacks = [];
        mockDefaultDispatcher.register.mockImplementation(function(callback){
            callbacks.push(callback);
        });

        // setup post action creator
        var post = {
            id:"1",
            title:"test1",
            blurb:"the quick brown fox",
            content:"the quick brown fox jumps over the lazy dog",
            categoryId:"cat1",
            day: 1,
            month: "Jan"
        };
        mockPostActionCreators.getPost.mockImplementation(function(){
            return new Promise(function(resolve, reject){
                mockDefaultDispatcher.isDispatching.mockImplementation(function(){
                    return true;
                });
                _(callbacks).each(function(cb){
                    cb({
                        type: Actions.FETCH_POST,
                        payload: { 
                            response: post
                        }
                    });
                });
                mockDefaultDispatcher.isDispatching.mockImplementation(function(){
                    return false;
                });
                resolve();
            });
        });

        var PostPage = require("pages/post/PostPage").default;
        var wrapper = mount(<StaticRouter location={"/post/1"} context={{}}><Route path="/post/:id" component={PostPage}/></StaticRouter>);

        // renders the main container
        expect(wrapper.find(".post").length).toBe(1);

        // sets post content
        expect(wrapper.find(".post-content").html()).toContain(post.content);

        // sets post title
        expect(wrapper.find(".title").html()).toContain(post.title);

        // sets the data
        expect(wrapper.find(".date-content").html()).toBe('<div class="date-content">'+post.day+'<span class="month">'+post.month+'</span></div>');
    });
});