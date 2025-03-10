import React from "react";
import { StaticRouter, Route, Routes } from "react-router-dom";
import { render, act } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "store";

describe("<PostPage />", function(){
    it("should render all elements", async function(){
        jest.mock("api/PostApi");
        var mockPostApi = require("api/PostApi").default;

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

        mockPostApi.getPost.mockImplementation(function() {
            return new Promise(function(resolve, reject) {
                resolve(post);
            });
        });

        var PostPage = require("pages/post/PostPage").default;
        const { container } = await act(async () => render(<Provider store={store}><StaticRouter location={"/post/1"} context={{}}><Routes><Route path="/post/:id" element={<PostPage/>}/></Routes></StaticRouter></Provider>));

        // renders the main container
        expect(container.getElementsByClassName("post").length).toBe(1);

        // sets post content
        expect(container.getElementsByClassName("post")[0].innerHTML).toContain(post.content);

        // sets post title
        expect(container.getElementsByClassName("title")[0].innerHTML).toContain(post.title);

        // sets the data
        expect(container.getElementsByClassName("date-content")[0].outerHTML).toBe('<div class="date-content">'+post.day+'<span class="month">'+post.month+'</span></div>');
    });
});